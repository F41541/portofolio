import { NextResponse } from "next/server";
import { checkTransactionStatus } from "@/lib/duitku";
import { createOrder, getOrderById, updateOrderStatus } from "@/lib/orders";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId =
      searchParams.get("orderId") || searchParams.get("merchantOrderId");

    if (!orderId) {
      return NextResponse.json(
        { error: "Parameter 'orderId' wajib disertakan." },
        { status: 400 }
      );
    }

    const cleanOrderId = orderId.trim();
    let order = await getOrderById(cleanOrderId);

    // Fallback: jika tidak ada di lokal, periksa langsung ke Duitku
    let syncedWithDuitku = false;
    let liveDuitkuResponse = null;

    if (!order) {
      try {
        const duitkuStatus = await checkTransactionStatus(cleanOrderId);
        if (duitkuStatus && (duitkuStatus.statusCode === "00" || duitkuStatus.statusCode === "01")) {
          const status = duitkuStatus.statusCode === "00" ? "SUCCESS" : "PENDING";
          order = await createOrder({
            orderId: cleanOrderId,
            productId: "custom-order",
            productTitle: "Layanan Laxstudio",
            customerName: "Pelanggan",
            customerEmail: "",
            customerPhone: "",
            amount: duitkuStatus.amount ? Math.round(Number(duitkuStatus.amount)) : 0,
            paymentMethod: "DUITKU",
            reference: duitkuStatus.reference,
            status,
            resultCode: duitkuStatus.statusCode,
          });
          syncedWithDuitku = true;
          liveDuitkuResponse = duitkuStatus;
        }
      } catch {
        // Abaikan kegagalan fallback gateway, lanjutkan ke 404
      }
    }

    if (!order) {
      return NextResponse.json(
        { error: `Pesanan dengan ID '${cleanOrderId}' tidak ditemukan.` },
        { status: 404 }
      );
    }

    // Jika pesanan masih PENDING, sinkronkan langsung dengan server Duitku
    if (order.status === "PENDING" && !syncedWithDuitku) {
      try {
        const duitkuStatus = await checkTransactionStatus(order.orderId);
        syncedWithDuitku = true;
        liveDuitkuResponse = duitkuStatus;

        if (duitkuStatus.statusCode === "00") {
          const updated = await updateOrderStatus(order.orderId, "SUCCESS", {
            reference: duitkuStatus.reference || order.reference,
            resultCode: "00",
          });
          order = updated || order;
        } else if (duitkuStatus.statusCode === "02") {
          const updated = await updateOrderStatus(order.orderId, "EXPIRED", {
            resultCode: "02",
          });
          order = updated || order;
        }
      } catch (checkErr) {
        console.warn(
          `[Duitku Status Sync Warning for ${cleanOrderId}]:`,
          checkErr instanceof Error ? checkErr.message : checkErr
        );
      }
    }

    return NextResponse.json({
      success: true,
      order,
      syncedWithDuitku,
      duitkuResponse: liveDuitkuResponse,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const orderId = body.orderId || body.merchantOrderId;

    if (!orderId) {
      return NextResponse.json(
        { error: "Field 'orderId' wajib disertakan dalam request body." },
        { status: 400 }
      );
    }

    const cleanOrderId = String(orderId).trim();
    let order = await getOrderById(cleanOrderId);

    let syncedWithDuitku = false;
    let liveDuitkuResponse = null;

    if (!order) {
      try {
        const duitkuStatus = await checkTransactionStatus(cleanOrderId);
        if (duitkuStatus && (duitkuStatus.statusCode === "00" || duitkuStatus.statusCode === "01")) {
          const status = duitkuStatus.statusCode === "00" ? "SUCCESS" : "PENDING";
          order = await createOrder({
            orderId: cleanOrderId,
            productId: "custom-order",
            productTitle: "Layanan Laxstudio",
            customerName: "Pelanggan",
            customerEmail: "",
            customerPhone: "",
            amount: duitkuStatus.amount ? Math.round(Number(duitkuStatus.amount)) : 0,
            paymentMethod: "DUITKU",
            reference: duitkuStatus.reference,
            status,
            resultCode: duitkuStatus.statusCode,
          });
          syncedWithDuitku = true;
          liveDuitkuResponse = duitkuStatus;
        }
      } catch {
        // Continue to 404
      }
    }

    if (!order) {
      return NextResponse.json(
        { error: `Pesanan dengan ID '${cleanOrderId}' tidak ditemukan.` },
        { status: 404 }
      );
    }

    if (order.status === "PENDING" && !syncedWithDuitku) {
      try {
        const duitkuStatus = await checkTransactionStatus(order.orderId);
        syncedWithDuitku = true;
        liveDuitkuResponse = duitkuStatus;

        if (duitkuStatus.statusCode === "00") {
          const updated = await updateOrderStatus(order.orderId, "SUCCESS", {
            reference: duitkuStatus.reference || order.reference,
            resultCode: "00",
          });
          order = updated || order;
        } else if (duitkuStatus.statusCode === "02") {
          const updated = await updateOrderStatus(order.orderId, "EXPIRED", {
            resultCode: "02",
          });
          order = updated || order;
        }
      } catch (checkErr) {
        console.warn(
          `[Duitku Status Sync Warning for ${cleanOrderId}]:`,
          checkErr instanceof Error ? checkErr.message : checkErr
        );
      }
    }

    return NextResponse.json({
      success: true,
      order,
      syncedWithDuitku,
      duitkuResponse: liveDuitkuResponse,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
