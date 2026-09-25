import { getDuitkuConfig, verifyCallbackSignature } from "./duitku.ts";
import { getOrderById, updateOrderStatus, type OrderStatus } from "./orders.ts";
import { getClientWebhookUrl, generateHubSignature } from "./hub-security.ts";

export async function processDuitkuCallback(request: Request): Promise<Response> {
  try {
    const contentType = (request.headers.get("content-type") || "").toLowerCase();
    let merchantCode = "";
    let amount = "";
    let merchantOrderId = "";
    let signature = "";
    let resultCode = "";
    let reference = "";
    let productDetail = "";

    if (contentType.includes("application/json")) {
      const json = (await request.json()) as Record<string, unknown>;
      merchantCode = (json.merchantCode ?? "").toString().trim();
      amount = json.amount !== undefined && json.amount !== null ? String(json.amount).trim() : "";
      merchantOrderId = (json.merchantOrderId ?? "").toString().trim();
      signature = (json.signature ?? "").toString().trim();
      resultCode = (json.resultCode ?? "").toString().trim();
      reference = (json.reference ?? "").toString().trim();
      productDetail = (json.productDetail ?? json.productDetails ?? "").toString().trim();
    } else if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      const formData = await request.formData();
      merchantCode = formData.get("merchantCode")?.toString().trim() || "";
      amount = formData.get("amount")?.toString().trim() || "";
      merchantOrderId = formData.get("merchantOrderId")?.toString().trim() || "";
      signature = formData.get("signature")?.toString().trim() || "";
      resultCode = formData.get("resultCode")?.toString().trim() || "";
      reference = formData.get("reference")?.toString().trim() || "";
      productDetail =
        formData.get("productDetail")?.toString().trim() ||
        formData.get("productDetails")?.toString().trim() ||
        "";
    } else {
      const rawText = await request.text();
      try {
        const json = JSON.parse(rawText) as Record<string, unknown>;
        merchantCode = (json.merchantCode ?? "").toString().trim();
        amount = json.amount !== undefined && json.amount !== null ? String(json.amount).trim() : "";
        merchantOrderId = (json.merchantOrderId ?? "").toString().trim();
        signature = (json.signature ?? "").toString().trim();
        resultCode = (json.resultCode ?? "").toString().trim();
        reference = (json.reference ?? "").toString().trim();
        productDetail = (json.productDetail ?? json.productDetails ?? "").toString().trim();
      } catch {
        const params = new URLSearchParams(rawText);
        merchantCode = params.get("merchantCode")?.trim() || "";
        amount = params.get("amount")?.trim() || "";
        merchantOrderId = params.get("merchantOrderId")?.trim() || "";
        signature = params.get("signature")?.trim() || "";
        resultCode = params.get("resultCode")?.trim() || "";
        reference = params.get("reference")?.trim() || "";
        productDetail = params.get("productDetail")?.trim() || params.get("productDetails")?.trim() || "";
      }
    }

    // 1. Validasi keberadaan parameter wajib
    if (!merchantCode || !amount || !merchantOrderId || !signature) {
      console.warn("[Duitku Webhook] Missing required parameters:", {
        merchantCode: !!merchantCode,
        amount: !!amount,
        merchantOrderId: !!merchantOrderId,
        signature: !!signature,
      });
      return new Response("Parameter tidak lengkap", {
        status: 400,
        headers: { "Content-Type": "text/plain" },
      });
    }

    const config = getDuitkuConfig();

    // Validasi konfigurasi kredensial server (jika env hilang, return 500 agar Duitku retry)
    if (!config.apiKey || !config.merchantCode) {
      console.error("[Duitku Webhook] Server Duitku credentials not configured in environment.");
      return new Response("Server configuration error", {
        status: 500,
        headers: { "Content-Type": "text/plain" },
      });
    }

    // 2. Validasi merchantCode === config.merchantCode (Cegah callback salah sasaran)
    if (merchantCode !== config.merchantCode) {
      console.warn(
        `[Duitku Webhook] Invalid Merchant Code: received '${merchantCode}', expected '${config.merchantCode}'`
      );
      return new Response("Invalid Merchant Code", {
        status: 400,
        headers: { "Content-Type": "text/plain" },
      });
    }

    // 3. Verifikasi Signature secara aman (timing-safe)
    const isValid = verifyCallbackSignature(
      merchantCode,
      amount,
      merchantOrderId,
      config.apiKey,
      signature
    );

    if (!isValid) {
      console.warn(
        `[Duitku Webhook] Bad signature received for order: ${merchantOrderId}`
      );
      return new Response("Bad Signature", {
        status: 401,
        headers: { "Content-Type": "text/plain" },
      });
    }

    // 4. Validasi Data Pesanan di Storage / Database
    const order = await getOrderById(merchantOrderId);
    if (!order) {
      console.warn(`[Duitku Webhook] Order not found in database: ${merchantOrderId}`);
      return new Response("Order not found", {
        status: 404,
        headers: { "Content-Type": "text/plain" },
      });
    }

    // 5. Validasi Kecocokan Nominal Tagihan
    const receivedAmount = Math.round(Number(amount));
    const expectedAmount = Math.round(Number(order.amount));
    if (receivedAmount !== expectedAmount) {
      console.warn(
        `[Duitku Webhook] Amount mismatch for order ${merchantOrderId}: received ${receivedAmount}, expected ${expectedAmount}`
      );
      return new Response("Amount mismatch", {
        status: 400,
        headers: { "Content-Type": "text/plain" },
      });
    }

    // 6. Proteksi Idempotensi: Jika pesanan sudah SUCCESS, jangan update ulang
    if (order.status === "SUCCESS") {
      console.log(
        `[Duitku Webhook] Order ${merchantOrderId} is already SUCCESS. Returning idempotent OK.`
      );
      if (isTkPertiwiOrder(merchantOrderId, order.productId)) {
        await forwardWebhookToClient("tkpertiwi", {
          merchantCode,
          amount: String(receivedAmount),
          merchantOrderId,
          signature,
          reference: reference || order.reference,
          resultCode,
        });
      }
      return new Response("OK", {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }

    // 7. Update status pesanan
    const newStatus: OrderStatus = resultCode === "00" ? "SUCCESS" : "FAILED";
    await updateOrderStatus(merchantOrderId, newStatus, {
      reference: reference || order.reference,
      resultCode: resultCode,
    });

    console.log(
      `[Duitku Webhook ${newStatus}] Order: ${merchantOrderId}, Amount: ${receivedAmount}, Ref: ${reference}`
    );

    // Meneruskan notifikasi webhook ke klien TK Pertiwi jika order milik TK Pertiwi
    if (newStatus === "SUCCESS" && isTkPertiwiOrder(merchantOrderId, order.productId)) {
      await forwardWebhookToClient("tkpertiwi", {
        merchantCode,
        amount: String(receivedAmount),
        merchantOrderId,
        signature,
        reference: reference || order.reference,
        resultCode,
      });
    }

    // 8. Respon resmi Duitku: Wajib HTTP 200 dengan teks polos "OK"
    return new Response("OK", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Webhook error";
    console.error("[Duitku Webhook Internal Error]:", errMessage);
    return new Response(`Error: ${errMessage}`, {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}

/**
 * Deteksi apakah pesanan berasal dari integrasi TK Pertiwi
 */
function isTkPertiwiOrder(orderId: string, productId?: string): boolean {
  return (
    orderId.startsWith("TKP-") ||
    orderId.startsWith("SEWA-") ||
    (productId ? productId.startsWith("tkpertiwi") : false)
  );
}

/**
 * Meneruskan notifikasi webhook secara aman ke aplikasi klien (TK Pertiwi)
 * Menggunakan HMAC-SHA256 signature, anti-replay timestamp, dan URL statis anti-SSRF.
 */
export async function forwardWebhookToClient(
  clientId: string,
  payload: Record<string, unknown>
): Promise<boolean> {
  const webhookUrl = getClientWebhookUrl(clientId);
  const secretKey = process.env.PAYMENT_HUB_SECRET_KEY;

  if (!webhookUrl || !secretKey) {
    console.warn(
      `[Payment Hub Forward] Diabaikan untuk client '${clientId}': webhookUrl (${webhookUrl ? "ADA" : "KOSONG"}) atau PAYMENT_HUB_SECRET_KEY belum disetel.`
    );
    return false;
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const rawBody = JSON.stringify(payload);
  const signature = generateHubSignature(clientId, timestamp, rawBody, secretKey);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Hub-Client-Id": clientId,
        "X-Hub-Timestamp": String(timestamp),
        "X-Hub-Signature": signature,
      },
      body: rawBody,
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(
        `[Payment Hub Forward Gagal] HTTP ${response.status} dari ${webhookUrl}: ${errText}`
      );
      return false;
    }

    console.log(
      `[Payment Hub Forward Berhasil] Dikirim ke ${webhookUrl} untuk order: ${payload.merchantOrderId}`
    );
    return true;
  } catch (error) {
    console.error(`[Payment Hub Forward Network Error] Target ${webhookUrl}:`, error);
    return false;
  }
}

export async function handleDuitkuGetRedirect(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("merchantOrderId") || searchParams.get("orderId");

  if (orderId) {
    return Response.redirect(
      new URL(`/store/success?orderId=${encodeURIComponent(orderId)}`, request.url)
    );
  }

  return Response.json({
    status: "OK",
    service: "Laxstudio Duitku Webhook Callback",
    message: "Endpoint active and listening for Duitku webhook notifications.",
    timestamp: new Date().toISOString(),
  });
}
