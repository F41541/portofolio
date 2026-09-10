import test from "node:test";
import assert from "node:assert";
import crypto from "node:crypto";
import {
  generateInquirySignature,
  verifyCallbackSignature,
  getDuitkuConfig,
} from "../lib/duitku.ts";

test("Duitku Config: URL switches dynamically based on DUITKU_ENV", () => {
  const originalEnv = process.env.DUITKU_ENV;

  try {
    process.env.DUITKU_ENV = "sandbox";
    const sandboxConfig = getDuitkuConfig();
    assert.strictEqual(
      sandboxConfig.inquiryUrl,
      "https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry"
    );

    process.env.DUITKU_ENV = "production";
    const prodConfig = getDuitkuConfig();
    assert.strictEqual(
      prodConfig.inquiryUrl,
      "https://passport.duitku.com/webapi/api/merchant/v2/inquiry"
    );
  } finally {
    process.env.DUITKU_ENV = originalEnv;
  }
});

test("Duitku Inquiry Signature: complies with API v2 HMAC-SHA256 formula", () => {
  const merchantCode = "DS35240";
  const merchantOrderId = "LAX-TEST-001";
  const amount = 50000;
  const apiKey = "test_api_key_12345";

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

test("Duitku Callback Verification: accepts valid modern HMAC-SHA256 signature", () => {
  const merchantCode = "DS35240";
  const amount = "50000";
  const merchantOrderId = "LAX-TEST-001";
  const apiKey = "test_api_key_12345";

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
  const merchantCode = "DS35240";
  const amount = "50000";
  const merchantOrderId = "LAX-TEST-001";
  const apiKey = "test_api_key_12345";

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

test("Duitku Callback Verification: rejects invalid signature", () => {
  const merchantCode = "DS35240";
  const amount = "50000";
  const merchantOrderId = "LAX-TEST-001";
  const apiKey = "test_api_key_12345";

  const result = verifyCallbackSignature(
    merchantCode,
    amount,
    merchantOrderId,
    apiKey,
    "invalid_fake_signature_hex"
  );

  assert.strictEqual(result, false);
});
