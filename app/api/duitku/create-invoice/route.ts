import { NextResponse } from "next/server";
import { requestDuitkuInquiry } from "@/lib/duitku";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      productTitle,
      price,
      customerName,
      customerEmail,
      customerPhone,
      paymentMethod,
    } = body;

    if (!productTitle || !price || !customerEmail) {
      return NextResponse.json(
        { error: "Nama produk, harga, dan email wajib diisi." },
        { status: 400 }
      );
    }

    const numericAmount = Math.round(Number(price));
    if (isNaN(numericAmount) || numericAmount < 10000) {
      return NextResponse.json(
        { error: "Nominal pembayaran minimal adalah Rp 10.000 (sesuai ketentuan Duitku)." },
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

    const duitkuResponse = await requestDuitkuInquiry({
      merchantOrderId,
      paymentAmount: numericAmount,
      paymentMethod: paymentMethod || "BC", // Mandatory in Duitku v2 (default: BCA VA)
      productDetails: productTitle.slice(0, 50),
      email: trimmedEmail,
      customerVaName: (customerName || "Pelanggan").trim().slice(0, 20),
      phoneNumber: (customerPhone || "081907761002").trim().slice(0, 50),
    });

    if (duitkuResponse.statusCode === "00" && duitkuResponse.paymentUrl) {
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
