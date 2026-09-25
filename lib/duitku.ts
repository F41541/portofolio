import crypto from "crypto";

export interface DuitkuConfig {
  apiKey: string;
  merchantCode: string;
  callbackUrl: string;
  returnUrl: string;
  baseUrl: string;
  inquiryUrl: string;
  statusUrl: string;
  paymentMethodUrl: string;
}

export interface PaymentChannel {
  code: string;
  name: string;
  category: "Virtual Account" | "QRIS" | "E-Wallet" | "Retail" | "Kartu Kredit";
  isActive?: boolean;
  statusNote?: string;
}

export const PAYMENT_CHANNELS: PaymentChannel[] = [
  // Virtual Account Aktif
  { code: "M2", name: "Mandiri Virtual Account", category: "Virtual Account", image: "https://images.duitku.com/hotlink-ok/MV.PNG", isActive: true },
  { code: "BR", name: "BRI Virtual Account (BRIVA)", category: "Virtual Account", image: "https://images.duitku.com/hotlink-ok/BR.PNG", isActive: true },
  { code: "I1", name: "BNI Virtual Account", category: "Virtual Account", image: "https://images.duitku.com/hotlink-ok/I1.PNG", isActive: true },
  { code: "BT", name: "Permata Bank Virtual Account", category: "Virtual Account", image: "https://images.duitku.com/hotlink-ok/BT.PNG", isActive: true },
  { code: "VA", name: "Maybank Virtual Account", category: "Virtual Account", image: "https://images.duitku.com/hotlink-ok/VA.PNG", isActive: true },
  // Gerai Retail (Dalam Proses Pengajuan Duitku)
  {
    code: "FT",
    name: "Alfamart / Alfamidi / Dan+Dan",
    category: "Retail",
    image: "https://images.duitku.com/hotlink-ok/FT.PNG",
    isActive: false,
    statusNote: "Dalam Proses Pengajuan Duitku (Segera Hadir)",
  },
  // QRIS (Dalam Proses Pengajuan Duitku / Maintenance)
  {
    code: "SP",
    name: "QRIS (Semua E-Wallet & Mobile Banking)",
    category: "QRIS",
    image: "https://images.duitku.com/hotlink-ok/SP.PNG",
    isActive: false,
    statusNote: "Maintenance / Dalam Proses Pengajuan Duitku (7-14 Hari)",
  },
];

export function getDuitkuConfig(): DuitkuConfig {
  const isProduction = process.env.DUITKU_ENV === "production";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://laxstudio.my.id";
  const baseUrl = isProduction
    ? "https://passport.duitku.com"
    : "https://sandbox.duitku.com";

  return {
    apiKey: process.env.DUITKU_API_KEY || "",
    merchantCode: process.env.DUITKU_MERCHANT_CODE || "",
    callbackUrl:
      process.env.DUITKU_CALLBACK_URL || `${siteUrl}/api/duitku/callback`,
    returnUrl: process.env.DUITKU_RETURN_URL || `${siteUrl}/store/success`,
    baseUrl,
    inquiryUrl: `${baseUrl}/webapi/api/merchant/v2/inquiry`,
    statusUrl: `${baseUrl}/webapi/api/merchant/transactionStatus`,
    paymentMethodUrl: `${baseUrl}/webapi/api/merchant/paymentmethod/getpaymentmethod`,
  };
}

export function generateInquirySignature(
  merchantCode: string,
  merchantOrderId: string,
  paymentAmount: number,
  apiKey: string
): string {
  // Duitku API v2: stringToSign = merchantCode + merchantOrderId + paymentAmount
  // signature = HMAC_SHA256(stringToSign, apiKey)
  const stringToSign = `${merchantCode}${merchantOrderId}${paymentAmount}`;
  return crypto.createHmac("sha256", apiKey).update(stringToSign).digest("hex");
}

function safeTimingCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf-8");
  const bufB = Buffer.from(b, "utf-8");
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function verifyCallbackSignature(
  merchantCode: string,
  amount: string | number,
  merchantOrderId: string,
  apiKey: string,
  receivedSignature: string
): boolean {
  if (!receivedSignature || !merchantCode || !apiKey) return false;
  const cleanReceived = receivedSignature.trim().toLowerCase();

  // Duitku API v2 modern specification: HMAC-SHA256
  // stringToSign = merchantCode + amount + merchantOrderId
  const hmacStringToSign = `${merchantCode}${amount}${merchantOrderId}`;
  const hmacCalculated = crypto
    .createHmac("sha256", apiKey)
    .update(hmacStringToSign)
    .digest("hex")
    .toLowerCase();

  if (safeTimingCompare(cleanReceived, hmacCalculated)) {
    return true;
  }

  // Backward-compatibility: Duitku legacy MD5 signature
  // stringToSign = merchantCode + amount + merchantOrderId + apiKey
  const md5StringToSign = `${merchantCode}${amount}${merchantOrderId}${apiKey}`;
  const md5Calculated = crypto
    .createHash("md5")
    .update(md5StringToSign)
    .digest("hex")
    .toLowerCase();

  if (safeTimingCompare(cleanReceived, md5Calculated)) {
    return true;
  }

  return false;
}

export interface CreateInvoiceParams {
  merchantOrderId: string;
  paymentAmount: number;
  paymentMethod?: string;
  productDetails: string;
  email: string;
  customerVaName?: string;
  phoneNumber?: string;
}

export interface DuitkuInquiryResponse {
  statusCode: string;
  statusMessage: string;
  paymentUrl?: string;
  reference?: string;
  vaNumber?: string;
  qrString?: string;
  amount?: string;
}

export async function requestDuitkuInquiry(
  params: CreateInvoiceParams
): Promise<DuitkuInquiryResponse> {
  const config = getDuitkuConfig();
  if (!config.apiKey || !config.merchantCode) {
    throw new Error(
      "Duitku credentials (DUITKU_API_KEY, DUITKU_MERCHANT_CODE) are not configured in environment."
    );
  }

  // Strict parameter formatting according to Duitku v2 Inquiry specification
  const paymentAmount = Math.round(Number(params.paymentAmount));
  const merchantOrderId = params.merchantOrderId.trim().slice(0, 50);
  const paymentMethod = (params.paymentMethod?.trim() || "M2").slice(0, 5);
  const email = params.email.trim().slice(0, 50);
  const phoneNumber = (params.phoneNumber || "").trim().slice(0, 50);
  const customerVaName = (params.customerVaName || "Pelanggan").trim().slice(0, 20);
  const productDetails = (params.productDetails || "Layanan Laxstudio").trim().slice(0, 255);

  const signature = generateInquirySignature(
    config.merchantCode,
    merchantOrderId,
    paymentAmount,
    config.apiKey
  );

  const payload = {
    merchantCode: config.merchantCode,
    paymentAmount: paymentAmount,
    paymentMethod: paymentMethod, // Mandatory in v2/inquiry (e.g. BC, M2, SP, VC)
    merchantOrderId: merchantOrderId,
    productDetails: productDetails,
    email: email,
    phoneNumber: phoneNumber,
    additionalParam: "",
    merchantUserInfo: "",
    customerVaName: customerVaName, // Mandatory for VA (max 20 chars)
    callbackUrl: config.callbackUrl.slice(0, 255),
    returnUrl: `${config.returnUrl}?orderId=${encodeURIComponent(merchantOrderId)}&amount=${paymentAmount}`.slice(0, 255),
    signature: signature,
    expiryPeriod: 1440, // 24 hours in minutes
    itemDetails: [
      {
        name: productDetails.slice(0, 50),
        price: paymentAmount,
        quantity: 1,
      },
    ],
    customerDetail: {
      firstName: customerVaName,
      lastName: "",
      email: email,
      phoneNumber: phoneNumber,
    },
  };

  const response = await fetch(config.inquiryUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Duitku API HTTP error (${response.status}): ${errorText || response.statusText}`
    );
  }

  const result = (await response.json()) as DuitkuInquiryResponse;
  return result;
}

// -------------------------------------------------------------
// Tahap 2: Check Transaction Status
// -------------------------------------------------------------

export interface DuitkuTransactionStatusResponse {
  merchantOrderId: string;
  reference?: string;
  amount?: string;
  fee?: string;
  statusCode: string; // "00" = SUCCESS, "01" = PENDING, "02" = CANCELED / EXPIRED
  statusMessage: string;
}

export function generateStatusSignature(
  merchantCode: string,
  merchantOrderId: string,
  apiKey: string
): string {
  // String to sign: merchantCode + merchantOrderId
  // Formula: HMAC_SHA256(stringToSign, apiKey)
  const stringToSign = `${merchantCode}${merchantOrderId}`;
  return crypto.createHmac("sha256", apiKey).update(stringToSign).digest("hex");
}

export async function checkTransactionStatus(
  merchantOrderId: string
): Promise<DuitkuTransactionStatusResponse> {
  const config = getDuitkuConfig();
  if (!config.apiKey || !config.merchantCode) {
    throw new Error(
      "Duitku credentials (DUITKU_API_KEY, DUITKU_MERCHANT_CODE) are not configured in environment."
    );
  }

  const cleanOrderId = merchantOrderId.trim().slice(0, 50);
  const signature = generateStatusSignature(
    config.merchantCode,
    cleanOrderId,
    config.apiKey
  );

  const payload = {
    merchantCode: config.merchantCode,
    merchantOrderId: cleanOrderId,
    signature,
  };

  const response = await fetch(config.statusUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Duitku Status Check HTTP error (${response.status}): ${errorText || response.statusText}`
    );
  }

  const result = (await response.json()) as DuitkuTransactionStatusResponse;
  return result;
}

// -------------------------------------------------------------
// Tahap 2: Get Payment Methods & Fee Calculation
// -------------------------------------------------------------

export interface DuitkuPaymentMethodItem {
  paymentMethod: string;
  paymentName: string;
  paymentImage?: string;
  totalFee: string;
}

export interface DuitkuPaymentMethodsResponse {
  responseCode: string;
  responseMessage: string;
  paymentFee?: DuitkuPaymentMethodItem[];
}

export function formatDuitkuDatetime(date: Date = new Date()): string {
  // Format in Asia/Jakarta (WIB) timezone as Duitku is an Indonesian payment gateway
  const formatter = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  return formatter.format(date).replace("T", " ");
}

export function generatePaymentMethodSignature(
  merchantCode: string,
  amount: number,
  datetime: string,
  apiKey: string
): string {
  // String to sign: merchantcode + amount + datetime
  // Formula: HMAC_SHA256(stringToSign, apiKey)
  const stringToSign = `${merchantCode}${amount}${datetime}`;
  return crypto.createHmac("sha256", apiKey).update(stringToSign).digest("hex");
}

export async function getPaymentMethods(
  amount: number
): Promise<DuitkuPaymentMethodsResponse> {
  const config = getDuitkuConfig();
  if (!config.apiKey || !config.merchantCode) {
    throw new Error(
      "Duitku credentials (DUITKU_API_KEY, DUITKU_MERCHANT_CODE) are not configured in environment."
    );
  }

  const numericAmount = Math.round(Number(amount));
  const datetime = formatDuitkuDatetime();
  const signature = generatePaymentMethodSignature(
    config.merchantCode,
    numericAmount,
    datetime,
    config.apiKey
  );

  const payload = {
    merchantcode: config.merchantCode,
    amount: numericAmount,
    datetime,
    signature,
  };

  const response = await fetch(config.paymentMethodUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Duitku Get Payment Methods HTTP error (${response.status}): ${errorText || response.statusText}`
    );
  }

  const result = (await response.json()) as DuitkuPaymentMethodsResponse;
  if (result.responseCode && result.responseCode !== "00") {
    throw new Error(
      `Duitku Get Payment Methods error (${result.responseCode}): ${result.responseMessage || "Unknown error"}`
    );
  }
  return result;
}
