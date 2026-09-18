import { NextResponse } from "next/server";
import { getPaymentMethods, PAYMENT_CHANNELS } from "@/lib/duitku";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawAmount = searchParams.get("amount") || "10000";
    const amount = Math.max(10000, Math.round(Number(rawAmount) || 10000));

    try {
      const result = await getPaymentMethods(amount);
      if (!result.paymentFee || result.paymentFee.length === 0) {
        throw new Error("No payment channels returned by gateway");
      }
      return NextResponse.json({
        success: true,
        source: "duitku_live",
        amount,
        paymentFee: result.paymentFee,
      });
    } catch (duitkuError) {
      console.warn(
        "[Duitku Payment Methods API Error, returning static fallback channels]:",
        duitkuError instanceof Error ? duitkuError.message : duitkuError
      );

      // Fallback ke daftar channel standar jika Duitku API offline atau belum tervalidasi
      const fallbackFees = PAYMENT_CHANNELS.map((ch) => ({
        paymentMethod: ch.code,
        paymentName: ch.name,
        paymentImage: "",
        totalFee: "0",
      }));

      return NextResponse.json({
        success: true,
        source: "fallback",
        amount,
        paymentFee: fallbackFees,
      });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rawAmount = body.amount || 10000;
    const amount = Math.max(10000, Math.round(Number(rawAmount) || 10000));

    try {
      const result = await getPaymentMethods(amount);
      if (!result.paymentFee || result.paymentFee.length === 0) {
        throw new Error("No payment channels returned by gateway");
      }
      return NextResponse.json({
        success: true,
        source: "duitku_live",
        amount,
        paymentFee: result.paymentFee,
      });
    } catch (duitkuError) {
      console.warn(
        "[Duitku Payment Methods API Error, returning static fallback channels]:",
        duitkuError instanceof Error ? duitkuError.message : duitkuError
      );

      const fallbackFees = PAYMENT_CHANNELS.map((ch) => ({
        paymentMethod: ch.code,
        paymentName: ch.name,
        paymentImage: "",
        totalFee: "0",
      }));

      return NextResponse.json({
        success: true,
        source: "fallback",
        amount,
        paymentFee: fallbackFees,
      });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
