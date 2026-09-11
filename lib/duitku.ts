import crypto from "crypto";

export interface DuitkuConfig {
  apiKey: string;
  merchantCode: string;
  callbackUrl: string;
  returnUrl: string;
  inquiryUrl: string;
}

export interface PaymentChannel {
  code: string;
  name: string;
  category: "Virtual Account" | "QRIS" | "E-Wallet" | "Kartu Kredit";
}

export const PAYMENT_CHANNELS: PaymentChannel[] = [
  { code: "BC", name: "BCA Virtual Account", category: "Virtual Account" },
  { code: "M2", name: "Mandiri Virtual Account", category: "Virtual Account" },
  { code: "I1", name: "BNI Virtual Account", category: "Virtual Account" },
  { code: "BR", name: "BRI Virtual Account (BRIVA)", category: "Virtual Account" },
  { code: "BT", name: "Permata Bank Virtual Account", category: "Virtual Account" },
  { code: "VA", name: "Maybank Virtual Account", category: "Virtual Account" },
  { code: "SP", name: "QRIS (ShopeePay / All E-Wallet)", category: "QRIS" },
  { code: "DA", name: "DANA", category: "E-Wallet" },
  { code: "OV", name: "OVO", category: "E-Wallet" },
  { code: "VC", name: "Kartu Kredit / Debit", category: "Kartu Kredit" },
];

export function getDuitkuConfig(): DuitkuConfig {
  const isProduction = process.env.DUITKU_ENV === "production";
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://laxstudio.my.id";

  return {
    apiKey: process.env.DUITKU_API_KEY || "8350faa667034294a9be2ccf034484f7",
    merchantCode: process.env.DUITKU_MERCHANT_CODE || "DS35240",
    callbackUrl:
      process.env.DUITKU_CALLBACK_URL || `${siteUrl}/store/duitku-callback`,
    returnUrl: process.env.DUITKU_RETURN_URL || `${siteUrl}/store/success`,
    inquiryUrl: isProduction
      ? "https://passport.duitku.com/webapi/api/merchant/v2/inquiry"
      : "https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry",
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

export function verifyCallbackSignature(
  merchantCode: string,
  amount: string | number,
  merchantOrderId: string,
  apiKey: string,
  receivedSignature: string
): boolean {
  if (!receivedSignature) return false;
  const cleanReceived = receivedSignature.trim().toLowerCase();

  // Duitku API v2 modern specification: HMAC-SHA256
  // stringToSign = merchantcode + amount + merchantOrderId
  const hmacStringToSign = `${merchantCode}${amount}${merchantOrderId}`;
  const hmacCalculated = crypto
    .createHmac("sha256", apiKey)
    .update(hmacStringToSign)
    .digest("hex")
    .toLowerCase();

  if (cleanReceived === hmacCalculated) {
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

  return cleanReceived === md5Calculated;
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

  // Strict parameter formatting according to Duitku v2 Inquiry specification
  const paymentAmount = Math.round(Number(params.paymentAmount));
  const merchantOrderId = params.merchantOrderId.trim().slice(0, 50);
  const paymentMethod = (params.paymentMethod?.trim() || "BC").slice(0, 2);
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
