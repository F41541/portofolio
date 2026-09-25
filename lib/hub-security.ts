import crypto from "crypto";

export interface ClientWhitelistEntry {
  clientId: string;
  name: string;
  webhookUrlEnv: string;
  defaultWebhookUrl: string;
}

/**
 * Whitelist klien resmi yang diizinkan menggunakan Payment Hub.
 * Anti-SSRF: Target webhook dikunci secara statis pada environment variable,
 * TIDAK PERNAH menerima target webhook dari request body klien.
 */
export const CLIENT_WHITELIST: Record<string, ClientWhitelistEntry> = {
  tkpertiwi: {
    clientId: "tkpertiwi",
    name: "TK Pertiwi Keuangan",
    webhookUrlEnv: "TKPERTIWI_WEBHOOK_URL",
    defaultWebhookUrl: "https://tkpertiwi.my.id/api/subscription/duitku-callback",
  },
};

/**
 * Mendapatkan URL Webhook klien secara aman dari environment variable.
 */
export function getClientWebhookUrl(clientId: string): string | null {
  const client = CLIENT_WHITELIST[clientId.toLowerCase()];
  if (!client) return null;

  return process.env[client.webhookUrlEnv] || client.defaultWebhookUrl;
}

/**
 * Membuat signature HMAC-SHA256 untuk autentikasi antar-server.
 * Format stringToSign: `${clientId}:${timestamp}:${rawBody}`
 */
export function generateHubSignature(
  clientId: string,
  timestamp: number,
  rawBody: string,
  secretKey: string
): string {
  const stringToSign = `${clientId.trim().toLowerCase()}:${timestamp}:${rawBody}`;
  return crypto.createHmac("sha256", secretKey).update(stringToSign).digest("hex");
}

/**
 * Constant-time safe string compare untuk menggagalkan timing attacks.
 */
function safeTimingCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf-8");
  const bufB = Buffer.from(b, "utf-8");
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export interface VerifySignatureResult {
  valid: boolean;
  reason?: string;
}

/**
 * Verifikasi signature HMAC-SHA256 dari request klien/server lain.
 * Mencakup:
 * 1. Pengecekan drift timestamp (Anti-Replay Attack, max 300 detik / 5 menit)
 * 2. Komparasi timing-safe (Anti-Timing Attack)
 */
export function verifyHubSignature(
  clientId: string,
  timestamp: number,
  rawBody: string,
  secretKey: string,
  receivedSignature: string,
  maxDriftSeconds: number = 300
): VerifySignatureResult {
  if (!clientId || !timestamp || !secretKey || !receivedSignature) {
    return { valid: false, reason: "Header otentikasi tidak lengkap." };
  }

  // 1. Anti-Replay: Validasi toleransi timestamp
  const now = Math.floor(Date.now() / 1000);
  const drift = Math.abs(now - timestamp);
  if (drift > maxDriftSeconds) {
    return {
      valid: false,
      reason: `Timestamp kadaluarsa (drift: ${drift}s, max: ${maxDriftSeconds}s). Kemungkinan replay attack.`,
    };
  }

  // 2. Anti-Timing Attack: Constant-time HMAC comparison
  const expectedSignature = generateHubSignature(clientId, timestamp, rawBody, secretKey);
  const isMatch = safeTimingCompare(
    receivedSignature.trim().toLowerCase(),
    expectedSignature.toLowerCase()
  );

  if (!isMatch) {
    return { valid: false, reason: "Signature tidak valid atau payload telah dimodifikasi." };
  }

  return { valid: true };
}
