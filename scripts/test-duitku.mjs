import test from "node:test";
import assert from "node:assert";
import crypto from "node:crypto";
import {
  generateInquirySignature,
  verifyCallbackSignature,
  generateStatusSignature,
  generatePaymentMethodSignature,
  formatDuitkuDatetime,
  getDuitkuConfig,
} from "../lib/duitku.ts";
import { getServiceById, SERVICES } from "../data/store-services.ts";
import {
  createOrder,
  getOrderById,
  updateOrderStatus,
} from "../lib/orders.ts";
import { processDuitkuCallback } from "../lib/duitku-callback.ts";
import { closeDbPool } from "../lib/db.ts";

test("Duitku Config: URL switches dynamically based on DUITKU_ENV", () => {
  const originalEnv = process.env.DUITKU_ENV;

  try {
    process.env.DUITKU_ENV = "sandbox";
    const sandboxConfig = getDuitkuConfig();
    assert.strictEqual(
      sandboxConfig.inquiryUrl,
      "https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry"
    );
    assert.strictEqual(
      sandboxConfig.statusUrl,
      "https://sandbox.duitku.com/webapi/api/merchant/transactionStatus"
    );
    assert.strictEqual(
      sandboxConfig.paymentMethodUrl,
      "https://sandbox.duitku.com/webapi/api/merchant/paymentmethod/getpaymentmethod"
    );

    process.env.DUITKU_ENV = "production";
    const prodConfig = getDuitkuConfig();
    assert.strictEqual(
      prodConfig.inquiryUrl,
      "https://passport.duitku.com/webapi/api/merchant/v2/inquiry"
    );
    assert.strictEqual(
      prodConfig.statusUrl,
      "https://passport.duitku.com/webapi/api/merchant/transactionStatus"
    );
    assert.strictEqual(
      prodConfig.paymentMethodUrl,
      "https://passport.duitku.com/webapi/api/merchant/paymentmethod/getpaymentmethod"
    );
  } finally {
    process.env.DUITKU_ENV = originalEnv;
  }
});

test("Duitku Config: No hardcoded fallback secrets when env is unset", () => {
  const originalKey = process.env.DUITKU_API_KEY;
  const originalMerchant = process.env.DUITKU_MERCHANT_CODE;

  try {
    delete process.env.DUITKU_API_KEY;
    delete process.env.DUITKU_MERCHANT_CODE;

    const config = getDuitkuConfig();
    assert.strictEqual(config.apiKey, "");
    assert.strictEqual(config.merchantCode, "");
  } finally {
    process.env.DUITKU_API_KEY = originalKey;
    process.env.DUITKU_MERCHANT_CODE = originalMerchant;
  }
});

test("Duitku Inquiry Signature: complies with API v2 HMAC-SHA256 formula", () => {
  const merchantCode = "D24777";
  const merchantOrderId = "LAX-TEST-001";
  const amount = 1250000;
  const apiKey = "902b96828cac74a98025e537a605f181";

  const signature = generateInquirySignature(
    merchantCode,
    merchantOrderId,
    amount,
    apiKey
  );

  const expectedStringToSign = `${merchantCode}${merchantOrderId}${amount}`;
  const expectedSignature = crypto
    .createHmac("sha256", apiKey)
    .update(expectedStringToSign)
    .digest("hex");

  assert.strictEqual(signature, expectedSignature);
  assert.strictEqual(signature.length, 64);
});

test("Duitku Status Signature: complies with HMAC-SHA256(merchantCode + merchantOrderId)", () => {
  const merchantCode = "D24777";
  const merchantOrderId = "LAX-ORD-12345";
  const apiKey = "902b96828cac74a98025e537a605f181";

  const signature = generateStatusSignature(merchantCode, merchantOrderId, apiKey);
  const expectedSignature = crypto
    .createHmac("sha256", apiKey)
    .update(`${merchantCode}${merchantOrderId}`)
    .digest("hex");

  assert.strictEqual(signature, expectedSignature);
  assert.strictEqual(signature.length, 64);
});

test("Duitku Payment Method Signature: complies with HMAC-SHA256(merchantcode + amount + datetime)", () => {
  const merchantCode = "D24777";
  const amount = 500000;
  const datetime = "2026-09-19 14:30:00";
  const apiKey = "902b96828cac74a98025e537a605f181";

  const signature = generatePaymentMethodSignature(
    merchantCode,
    amount,
    datetime,
    apiKey
  );

  const expectedSignature = crypto
    .createHmac("sha256", apiKey)
    .update(`${merchantCode}${amount}${datetime}`)
    .digest("hex");

  assert.strictEqual(signature, expectedSignature);
  assert.strictEqual(signature.length, 64);

  // Check datetime format
  const formatted = formatDuitkuDatetime(new Date("2026-09-19T10:05:08"));
  assert.match(formatted, /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
});

test("Duitku Callback Verification: accepts valid modern HMAC-SHA256 signature", () => {
  const merchantCode = "D24777";
  const amount = "1250000";
  const merchantOrderId = "LAX-TEST-001";
  const apiKey = "902b96828cac74a98025e537a605f181";

  const stringToSign = `${merchantCode}${amount}${merchantOrderId}`;
  const validHmac = crypto
    .createHmac("sha256", apiKey)
    .update(stringToSign)
    .digest("hex");

  const result = verifyCallbackSignature(
    merchantCode,
    amount,
    merchantOrderId,
    apiKey,
    validHmac
  );

  assert.strictEqual(result, true);
});

test("Duitku Callback Verification: accepts valid legacy MD5 signature fallback", () => {
  const merchantCode = "D24777";
  const amount = "1250000";
  const merchantOrderId = "LAX-TEST-001";
  const apiKey = "902b96828cac74a98025e537a605f181";

  const stringToSign = `${merchantCode}${amount}${merchantOrderId}${apiKey}`;
  const validMd5 = crypto
    .createHash("md5")
    .update(stringToSign)
    .digest("hex");

  const result = verifyCallbackSignature(
    merchantCode,
    amount,
    merchantOrderId,
    apiKey,
    validMd5
  );

  assert.strictEqual(result, true);
  assert.strictEqual(validMd5.length, 32);
});

test("Duitku Callback Verification: timingSafeEqual safely rejects invalid signature of arbitrary length", () => {
  const merchantCode = "D24777";
  const amount = "1250000";
  const merchantOrderId = "LAX-TEST-001";
  const apiKey = "902b96828cac74a98025e537a605f181";

  // Different length - should not throw RangeError and should return false
  assert.strictEqual(
    verifyCallbackSignature(merchantCode, amount, merchantOrderId, apiKey, "short"),
    false
  );

  // Same length (64 chars) but incorrect hash
  const wrongHmac = "0".repeat(64);
  assert.strictEqual(
    verifyCallbackSignature(merchantCode, amount, merchantOrderId, apiKey, wrongHmac),
    false
  );
});

test("Server-Side Price Lookup: getServiceById strictly validates prices", () => {
  const service = getServiceById("website-astro-seo");
  assert.ok(service);
  assert.strictEqual(service.price, 500000);
  assert.strictEqual(service.title, "Website UMKM, Profil Bisnis & Local SEO");

  const erpService = getServiceById("business-system-laravel");
  assert.ok(erpService);
  assert.strictEqual(erpService.price, 3500000);
  assert.strictEqual(erpService.title, "Sistem Informasi Bisnis, POS Kasir & ERP");

  const legacyLanding = getServiceById("modern-landing-page");
  assert.ok(legacyLanding);
  assert.strictEqual(legacyLanding.id, "website-astro-seo");

  const unknown = getServiceById("non-existent-product");
  assert.strictEqual(unknown, undefined);
});

test("Order Persistence & Status Transitions: create, retrieve, and update orders", async () => {
  const testOrderId = `TEST-ORD-${Date.now()}`;
  const order = await createOrder({
    orderId: testOrderId,
    productId: "modern-landing-page",
    productTitle: "Modern Landing Page & Profil Bisnis",
    customerName: "Budi Santoso",
    customerEmail: "budi@example.com",
    customerPhone: "081234567890",
    amount: 1250000,
    paymentMethod: "M2",
    status: "PENDING",
  });

  assert.strictEqual(order.orderId, testOrderId);
  assert.strictEqual(order.status, "PENDING");
  assert.ok(order.createdAt);

  // Retrieve order
  const fetched = await getOrderById(testOrderId);
  assert.ok(fetched);
  assert.strictEqual(fetched.amount, 1250000);

  // Update order to SUCCESS
  const updated = await updateOrderStatus(testOrderId, "SUCCESS", {
    reference: "DUITKU-REF-1234",
    resultCode: "00",
  });

  assert.ok(updated);
  assert.strictEqual(updated.status, "SUCCESS");
  assert.strictEqual(updated.reference, "DUITKU-REF-1234");
});

test("Webhook Handler: validates merchantCode, signature, order, and responds with 200 OK", async () => {
  const merchantCode = "D24777";
  const apiKey = "902b96828cac74a98025e537a605f181";
  const originalEnvCode = process.env.DUITKU_MERCHANT_CODE;
  const originalEnvKey = process.env.DUITKU_API_KEY;

  try {
    process.env.DUITKU_MERCHANT_CODE = merchantCode;
    process.env.DUITKU_API_KEY = apiKey;

    // Create a real order in store
    const testOrderId = `WH-TEST-${Date.now()}`;
    const amount = 1250000;
    await createOrder({
      orderId: testOrderId,
      productId: "modern-landing-page",
      productTitle: "Modern Landing Page & Profil Bisnis",
      customerName: "Tes Webhook",
      customerEmail: "webhook@example.com",
      customerPhone: "081234567890",
      amount,
      paymentMethod: "M2",
      status: "PENDING",
    });

    // 1. Wrong Merchant Code -> 400 Invalid Merchant Code
    const wrongMerchantReq = new Request("http://localhost:3000/api/duitku/callback", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        merchantCode: "WRONG_MERCHANT",
        amount: String(amount),
        merchantOrderId: testOrderId,
        signature: "abc",
      }).toString(),
    });
    const wrongMerchantRes = await processDuitkuCallback(wrongMerchantReq);
    assert.strictEqual(wrongMerchantRes.status, 400);
    assert.strictEqual(await wrongMerchantRes.text(), "Invalid Merchant Code");

    // 2. Bad Signature -> 401 Bad Signature
    const badSigReq = new Request("http://localhost:3000/api/duitku/callback", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        merchantCode,
        amount: String(amount),
        merchantOrderId: testOrderId,
        signature: "bad_signature_value".padEnd(64, "0"),
      }).toString(),
    });
    const badSigRes = await processDuitkuCallback(badSigReq);
    assert.strictEqual(badSigRes.status, 401);
    assert.strictEqual(await badSigRes.text(), "Bad Signature");

    // 3. Amount Mismatch -> 400 Amount mismatch
    const stringToSignWrongAmount = `${merchantCode}99999${testOrderId}`;
    const wrongAmountSig = crypto
      .createHmac("sha256", apiKey)
      .update(stringToSignWrongAmount)
      .digest("hex");

    const amountMismatchReq = new Request("http://localhost:3000/api/duitku/callback", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        merchantCode,
        amount: "99999",
        merchantOrderId: testOrderId,
        signature: wrongAmountSig,
      }).toString(),
    });
    const amountMismatchRes = await processDuitkuCallback(amountMismatchReq);
    assert.strictEqual(amountMismatchRes.status, 400);
    assert.strictEqual(await amountMismatchRes.text(), "Amount mismatch");

    // 4. Valid Webhook -> 200 OK with plain text "OK"
    const validStringToSign = `${merchantCode}${amount}${testOrderId}`;
    const validSig = crypto
      .createHmac("sha256", apiKey)
      .update(validStringToSign)
      .digest("hex");

    const validReq = new Request("http://localhost:3000/api/duitku/callback", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        merchantCode,
        amount: String(amount),
        merchantOrderId: testOrderId,
        signature: validSig,
        resultCode: "00",
        reference: "DUITKU-REF-SUCCESS",
      }).toString(),
    });

    const validRes = await processDuitkuCallback(validReq);
    assert.strictEqual(validRes.status, 200);
    assert.strictEqual(await validRes.text(), "OK");

    // Check that order status updated in database to SUCCESS
    const updatedOrder = await getOrderById(testOrderId);
    assert.ok(updatedOrder);
    assert.strictEqual(updatedOrder.status, "SUCCESS");
    assert.strictEqual(updatedOrder.reference, "DUITKU-REF-SUCCESS");

    // 5. Idempotent check -> subsequent calls for SUCCESS order still return 200 OK
    const replayReq = new Request("http://localhost:3000/api/duitku/callback", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        merchantCode,
        amount: String(amount),
        merchantOrderId: testOrderId,
        signature: validSig,
        resultCode: "00",
        reference: "DUITKU-REF-SUCCESS",
      }).toString(),
    });
    const replayRes = await processDuitkuCallback(replayReq);
    assert.strictEqual(replayRes.status, 200);
    assert.strictEqual(await replayRes.text(), "OK");
  } finally {
    process.env.DUITKU_MERCHANT_CODE = originalEnvCode;
    process.env.DUITKU_API_KEY = originalEnvKey;
  }
});

test("Webhook Handler: supports JSON payload, mixed-case headers, and decimal amounts", async () => {
  const merchantCode = "D24777";
  const apiKey = "902b96828cac74a98025e537a605f181";
  const originalEnvCode = process.env.DUITKU_MERCHANT_CODE;
  const originalEnvKey = process.env.DUITKU_API_KEY;

  try {
    process.env.DUITKU_MERCHANT_CODE = merchantCode;
    process.env.DUITKU_API_KEY = apiKey;

    const testOrderId = `JSON-TEST-${Date.now()}`;
    const amount = 3850000;
    await createOrder({
      orderId: testOrderId,
      productId: "erp-system-umkm",
      productTitle: "Sistem ERP & Manajemen Bisnis UMKM",
      customerName: "Budi JSON",
      customerEmail: "json@example.com",
      customerPhone: "081234567890",
      amount,
      paymentMethod: "SP",
      status: "PENDING",
    });

    // Duitku may send amount with decimals e.g. "3850000.00"
    const amountStr = "3850000.00";
    const stringToSign = `${merchantCode}${amountStr}${testOrderId}`;
    const validSig = crypto
      .createHmac("sha256", apiKey)
      .update(stringToSign)
      .digest("hex");

    // Test with UPPERCASE Content-Type header
    const jsonReq = new Request("http://localhost:3000/api/duitku/callback", {
      method: "POST",
      headers: { "Content-Type": "APPLICATION/JSON; charset=utf-8" },
      body: JSON.stringify({
        merchantCode,
        amount: amountStr,
        merchantOrderId: testOrderId,
        signature: validSig,
        resultCode: "00",
        reference: "DUITKU-REF-JSON",
        productDetails: "Sistem ERP & Manajemen Bisnis UMKM",
      }),
    });

    const jsonRes = await processDuitkuCallback(jsonReq);
    assert.strictEqual(jsonRes.status, 200);
    assert.strictEqual(await jsonRes.text(), "OK");

    const updated = await getOrderById(testOrderId);
    assert.ok(updated);
    assert.strictEqual(updated.status, "SUCCESS");
    assert.strictEqual(updated.reference, "DUITKU-REF-JSON");
  } finally {
    process.env.DUITKU_MERCHANT_CODE = originalEnvCode;
    process.env.DUITKU_API_KEY = originalEnvKey;
  }
});

test("Webhook Handler: returns 500 when server credentials are not configured", async () => {
  const originalEnvCode = process.env.DUITKU_MERCHANT_CODE;
  const originalEnvKey = process.env.DUITKU_API_KEY;

  try {
    delete process.env.DUITKU_MERCHANT_CODE;
    delete process.env.DUITKU_API_KEY;

    const req = new Request("http://localhost:3000/api/duitku/callback", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        merchantCode: "D24777",
        amount: "100000",
        merchantOrderId: "MISSING-ENV-ORD",
        signature: "abc",
      }).toString(),
    });

    const res = await processDuitkuCallback(req);
    // Server config error must return 500 to allow Duitku retry
    assert.strictEqual(res.status, 500);
    assert.strictEqual(await res.text(), "Server configuration error");
  } finally {
    process.env.DUITKU_MERCHANT_CODE = originalEnvCode;
    process.env.DUITKU_API_KEY = originalEnvKey;
  }
});

test("Duitku Datetime Formatter: aligns with Asia/Jakarta (WIB) timezone", () => {
  // Test a known UTC instant
  const utcDate = new Date("2026-09-19T00:00:00Z"); // 00:00 UTC = 07:00 WIB
  const formatted = formatDuitkuDatetime(utcDate);
  assert.strictEqual(formatted, "2026-09-19 07:00:00");

  // Output must match YYYY-MM-DD HH:mm:ss format
  assert.match(formatted, /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
});

test.after(async () => {
  await closeDbPool();
});

