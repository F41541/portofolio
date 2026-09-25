import { NextResponse } from "next/server";
import { requestDuitkuInquiry, PAYMENT_CHANNELS } from "@/lib/duitku";
import { createOrder } from "@/lib/orders";
import {
  verifyHubSignature,
  CLIENT_WHITELIST,
} from "@/lib/hub-security";

export async function POST(request: Request) {
  try {
    const clientId = (request.headers.get("x-hub-client-id") || "").trim().toLowerCase();
    const timestampStr = (request.headers.get("x-hub-timestamp") || "").trim();
    const signature = (request.headers.get("x-hub-signature") || "").trim();

    // 1. Validasi Keberadaan Header Keamanan
    if (!clientId || !timestampStr || !signature) {
      return NextResponse.json(
        { error: "Akses ditolak: Header keamanan (X-Hub-Client-Id, X-Hub-Timestamp, X-Hub-Signature) wajib disertakan." },
        { status: 401 }
      );
    }

    // 2. Whitelist Check Klien (Anti-Impersonation)
    if (!CLIENT_WHITELIST[clientId]) {
      return NextResponse.json(
        { error: `Client ID '${clientId}' tidak terdaftar pada Payment Hub.` },
        { status: 403 }
      );
    }

    const secretKey = process.env.PAYMENT_HUB_SECRET_KEY;
    if (!secretKey) {
      console.error("[Payment Hub] PAYMENT_HUB_SECRET_KEY belum disetel di server environment.");
      return NextResponse.json(
        { error: "Konfigurasi server Payment Hub belum lengkap." },
        { status: 500 }
      );
    }

    const timestamp = parseInt(timestampStr, 10);
    if (isNaN(timestamp)) {
      return NextResponse.json(
        { error: "Format X-Hub-Timestamp tidak valid (wajib integer detik Unix timestamp)." },
        { status: 400 }
      );
    }

    // 3. Baca Raw Body dan Verifikasi Signature (Anti-Tampering & Anti-Replay)
    const rawBody = await request.text();
    const verification = verifyHubSignature(clientId, timestamp, rawBody, secretKey, signature);
    if (!verification.valid) {
      return NextResponse.json(
        { error: `Autentikasi gagal: ${verification.reason}` },
        { status: 401 }
      );
    }

    // 4. Parse & Validasi Payload
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: "Format JSON body tidak valid." },
        { status: 400 }
      );
    }

    const merchantOrderId = String(body.merchantOrderId || "").trim();
    const amount = Number(body.amount);
    const paymentMethod = String(body.paymentMethod || "").trim();
    const customerEmail = String(body.customerEmail || "").trim();
    const customerName = String(body.customerName || "Pelanggan").trim();
    const customerPhone = String(body.customerPhone || "").trim();
    const productDetails = String(body.productDetails || "Layanan Aplikasi TK Pertiwi").trim();

    if (!merchantOrderId || !amount || amount <= 0 || !customerEmail) {
      return NextResponse.json(
        { error: "Parameter 'merchantOrderId', 'amount' (>0), dan 'customerEmail' wajib diisi." },
        { status: 400 }
      );
    }

    const channelInfo = PAYMENT_CHANNELS.find((c) => c.code === paymentMethod);
    if (channelInfo && channelInfo.isActive === false) {
      return NextResponse.json(
        {
          error: `Metode pembayaran ${channelInfo.name} saat ini belum aktif di Duitku (${channelInfo.statusNote || "Dalam proses aktivasi"}). Silakan pilih Virtual Account (Mandiri, BRI, BNI, Permata, Maybank).`,
        },
        { status: 400 }
      );
    }

    // 5. Teruskan Inquiry ke Duitku Resmi Menggunakan Akun Laxstudio
    const inquiryResult = await requestDuitkuInquiry({
      merchantOrderId,
      paymentAmount: amount,
      paymentMethod,
      productDetails,
      email: customerEmail,
      customerVaName: customerName,
      phoneNumber: customerPhone,
    });

    // 6. Simpan atau Update Record Order di Database Laxstudio (Audit & Idempotensi)
    try {
      await createOrder({
        orderId: merchantOrderId,
        productId: `${clientId}-subscription`,
        productTitle: productDetails,
        customerName: customerName.slice(0, 100),
        customerEmail: customerEmail.slice(0, 100),
        customerPhone: customerPhone.slice(0, 50) || "-",
        amount: Math.round(amount),
        paymentMethod: paymentMethod || "DIRECT",
        reference: inquiryResult.reference,
        paymentUrl: inquiryResult.paymentUrl,
        vaNumber: inquiryResult.vaNumber,
        qrString: inquiryResult.qrString,
        status: "PENDING",
      });
    } catch (dbErr) {
      console.warn("[Payment Hub Warning] Gagal menyimpan order ke database internal Laxstudio:", dbErr);
      // Non-blocking: Tetap kembalikan response inquiry Duitku agar transaksi tidak gagal
    }

    return NextResponse.json({
      status: "success",
      orderId: merchantOrderId,
      reference: inquiryResult.reference,
      paymentUrl: inquiryResult.paymentUrl,
      vaNumber: inquiryResult.vaNumber,
      qrString: inquiryResult.qrString,
      amount: inquiryResult.amount || String(amount),
      statusCode: inquiryResult.statusCode,
      statusMessage: inquiryResult.statusMessage,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Internal error";
    console.error("[Payment Hub Create Error]:", errMessage);
    return NextResponse.json(
      { error: errMessage },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: "Laxstudio Centralized Payment Hub",
    status: "ACTIVE",
    version: "1.0.0",
    clients: Object.keys(CLIENT_WHITELIST),
    timestamp: new Date().toISOString(),
  });
}
