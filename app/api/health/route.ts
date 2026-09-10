import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "laxstudio-portfolio",
    duitkuEnv: process.env.DUITKU_ENV || "sandbox",
  });
}
