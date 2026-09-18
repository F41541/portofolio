import { NextResponse } from "next/server";
import { requestDuitkuInquiry, PAYMENT_CHANNELS } from "@/lib/duitku";
import { getServiceById } from "@/data/store-services";
import { createOrder } from "@/lib/orders";

// In-memory rate limiting: IP -> array of timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 10; // 10 invoice creations per 10 mins

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW
  );

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);

  // Periodic cleanup if map grows too large
  if (rateLimitMap.size > 1000) {
    for (const [key, times] of rateLimitMap.entries()) {
      const valid = times.filter((t) => now - t < RATE_LIMIT_WINDOW);
      if (valid.length === 0) {
        rateLimitMap.delete(key);
      } else {
        rateLimitMap.set(key, valid);
      }
    }
  }

  return false;
}

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : "127.0.0.1";

    if (checkRateLimit(clientIp)) {
      return NextResponse.json(
        {
          error:
            "Terlalu banyak permintaan pembuatan tagihan. Silakan coba kembali dalam beberapa menit.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      productId,
      price: clientPrice,
      customerName,
      customerEmail,
      customerPhone,
      paymentMethod,
    } = body;

    // 1. Validasi productId & ambil harga resmi dari server
    if (!productId || typeof productId !== "string") {
      return NextResponse.json(
        { error: "Parameter 'productId' wajib disertakan." },
        { status: 400 }
      );
    }

    const service = getServiceById(productId.trim());
    if (!service) {
      return NextResponse.json(
        { error: `Produk atau layanan dengan ID '${productId}' tidak ditemukan.` },
        { status: 404 }
      );
    }

    // 2. Tolak harga kiriman klien jika tidak cocok dengan harga server
    if (
      clientPrice !== undefined &&
      Math.round(Number(clientPrice)) !== Math.round(service.price)
    ) {
      return NextResponse.json(
        {
          error:
            "Harga pesanan tidak valid atau telah dimodifikasi oleh klien. Transaksi dibatalkan demi integritas data.",
        },
        { status: 400 }
      );
    }

    const price = service.price;
    const productTitle = service.title;

    if (!customerEmail) {
      return NextResponse.json(
        { error: "Alamat email pelanggan wajib diisi." },
        { status: 400 }
      );
    }

    // Format & validate email (Duitku limit: max 50 chars)
    const trimmedEmail = customerEmail.trim().slice(0, 50);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "Format alamat email tidak valid (contoh: nama@domain.com)." },
        { status: 400 }
      );
    }

    // Generate unique merchantOrderId (Duitku limit: max 50 chars)
    const merchantOrderId = `LAX-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const cleanPhone = (customerPhone || "").trim().slice(0, 50);
    const cleanName = (customerName || "Pelanggan").trim().slice(0, 50);

    const chosenMethod = (paymentMethod || "M2").trim();
    const channelInfo = PAYMENT_CHANNELS.find((c) => c.code === chosenMethod);

    if (channelInfo && channelInfo.isActive === false) {
      return NextResponse.json(
        {
          error: `Metode pembayaran ${channelInfo.name} saat ini belum aktif (${channelInfo.statusNote || "Dalam proses aktivasi Duitku"}). Silakan pilih Virtual Account aktif (Mandiri, BRI, BNI, Permata, Maybank) atau Alfamart.`,
        },
        { status: 400 }
      );
    }

    // Request inquiry ke Duitku
    const duitkuResponse = await requestDuitkuInquiry({
      merchantOrderId,
      paymentAmount: price,
      paymentMethod: chosenMethod, // Mandatory in Duitku v2 (default: M2 - Mandiri VA)
      productDetails: productTitle.slice(0, 50),
      email: trimmedEmail,
      customerVaName: cleanName.slice(0, 20),
      phoneNumber: cleanPhone,
    });

    if (duitkuResponse.statusCode === "00") {
      // Simpan pesanan ke storage persisten lokal dengan status PENDING
      await createOrder({
        orderId: merchantOrderId,
        productId: service.id,
        productTitle: service.title,
        customerName: cleanName,
        customerEmail: trimmedEmail,
        customerPhone: cleanPhone,
        amount: price,
        paymentMethod: chosenMethod,
        paymentUrl: duitkuResponse.paymentUrl,
        reference: duitkuResponse.reference,
        vaNumber: duitkuResponse.vaNumber,
        qrString: duitkuResponse.qrString,
        status: "PENDING",
      });

      return NextResponse.json({
        success: true,
        merchantOrderId,
        paymentUrl: duitkuResponse.paymentUrl,
        reference: duitkuResponse.reference,
        vaNumber: duitkuResponse.vaNumber,
        qrString: duitkuResponse.qrString,
        statusMessage: duitkuResponse.statusMessage,
      });
    }

    return NextResponse.json(
      {
        error:
          duitkuResponse.statusMessage ||
          `Duitku Error code: ${duitkuResponse.statusCode}`,
        raw: duitkuResponse,
      },
      { status: 400 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error("[Duitku Create Invoice Error]:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
