import { NextResponse } from "next/server";
import { getDuitkuConfig, verifyCallbackSignature } from "@/lib/duitku";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let merchantCode = "";
    let amount = "";
    let merchantOrderId = "";
    let signature = "";
    let resultCode = "";
    let reference = "";

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData();
      merchantCode = formData.get("merchantCode")?.toString() || "";
      amount = formData.get("amount")?.toString() || "";
      merchantOrderId = formData.get("merchantOrderId")?.toString() || "";
      signature = formData.get("signature")?.toString() || "";
      resultCode = formData.get("resultCode")?.toString() || "";
      reference = formData.get("reference")?.toString() || "";
    } else {
      const json = await request.json();
      merchantCode = json.merchantCode || "";
      amount = json.amount?.toString() || "";
      merchantOrderId = json.merchantOrderId || "";
      signature = json.signature || "";
      resultCode = json.resultCode || "";
      reference = json.reference || "";
    }

    const config = getDuitkuConfig();

    // Verify signature
    const isValid = verifyCallbackSignature(
      merchantCode,
      amount,
      merchantOrderId,
      config.apiKey,
      signature
    );

    if (!isValid) {
      console.warn("[Duitku Webhook] Invalid Signature received for order:", merchantOrderId);
      return NextResponse.json(
        { status: "FAILED", message: "Bad Signature" },
        { status: 400 }
      );
    }

    if (resultCode === "00") {
      console.log(
        `[Duitku Webhook SUCCESS] Order: ${merchantOrderId}, Amount: ${amount}, Ref: ${reference}`
      );
    } else {
      console.log(
        `[Duitku Webhook PENDING/FAILED] Order: ${merchantOrderId}, ResultCode: ${resultCode}`
      );
    }

    // Return 200 OK as expected by Duitku
    return new NextResponse("SUCCESS", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Webhook error";
    console.error("[Duitku Webhook Handler Error]:", errMessage);
    return NextResponse.json({ status: "ERROR", message: errMessage }, { status: 500 });
  }
}

// Support GET for direct browser visits or testing
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("merchantOrderId") || searchParams.get("orderId");

  if (orderId) {
    return NextResponse.redirect(
      new URL(`/store/success?orderId=${encodeURIComponent(orderId)}`, request.url)
    );
  }

  return NextResponse.json({
    status: "OK",
    service: "Laxstudio Duitku Callback Endpoint",
    message: "Endpoint active and listening for Duitku webhook notifications.",
    timestamp: new Date().toISOString(),
  });
}
