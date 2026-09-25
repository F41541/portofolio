import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  CheckCircle2,
  ArrowLeft,
  MessageSquare,
  Mail,
  ShieldCheck,
  Building,
  Clock,
  AlertCircle,
  RefreshCw,
  Receipt,
} from "lucide-react";
import { createOrder, getOrderById, updateOrderStatus, Order } from "@/lib/orders";
import { checkTransactionStatus } from "@/lib/duitku";

export const metadata: Metadata = {
  title: "Konfirmasi Pembayaran | Laxstudio Store",
  description: "Status transaksi dan konfirmasi pembayaran layanan Laxstudio.",
};

interface SuccessPageProps {
  searchParams: Promise<{
    orderId?: string;
    merchantOrderId?: string;
  }>;
}

export default async function StoreSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const params = await searchParams;
  const orderId = params.orderId || params.merchantOrderId || "";

  let order: Order | null = null;
  if (orderId) {
    order = await getOrderById(orderId);

    // Fallback: Jika pesanan belum/tidak tersimpan di lokal, validasi langsung ke Duitku
    if (!order) {
      try {
        const duitkuStatus = await checkTransactionStatus(orderId);
        if (duitkuStatus && (duitkuStatus.statusCode === "00" || duitkuStatus.statusCode === "01")) {
          const status = duitkuStatus.statusCode === "00" ? "SUCCESS" : "PENDING";
          order = await createOrder({
            orderId,
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
        }
      } catch (checkErr) {
        console.warn(
          `[Success Page Status Check Warning for ${orderId}]:`,
          checkErr instanceof Error ? checkErr.message : checkErr
        );
      }
    }

    // Jika pesanan masih PENDING, coba sinkronisasi status langsung ke gateway Duitku
    if (order && order.status === "PENDING") {
      try {
        const duitkuStatus = await checkTransactionStatus(order.orderId);
        if (duitkuStatus.statusCode === "00") {
          order = await updateOrderStatus(order.orderId, "SUCCESS", {
            reference: duitkuStatus.reference || order.reference,
            resultCode: "00",
          });
        } else if (duitkuStatus.statusCode === "02") {
          order = await updateOrderStatus(order.orderId, "EXPIRED", {
            resultCode: "02",
          });
        }
      } catch (checkErr) {
        // Cek status gateway opsional, jangan gagalkan render jika Duitku timeout
        console.warn(
          `[Success Page Status Check Warning for ${orderId}]:`,
          checkErr instanceof Error ? checkErr.message : checkErr
        );
      }
    }
  }

  // Evaluasi status pesanan secara RIIL dari database & gateway
  const isFound = !!order;
  const isSuccess = order?.status === "SUCCESS";
  const isPending = order?.status === "PENDING";
  const isFailed = order?.status === "FAILED" || order?.status === "EXPIRED";

  const displayOrderId = order?.orderId || orderId || "TIDAK DITEMUKAN";
  const displayAmount = order?.amount
    ? Number(order.amount).toLocaleString("id-ID")
    : null;
  const displayProduct = order?.productTitle || "Layanan Laxstudio";

  let statusTitle = "Status Pesanan Tidak Ditemukan";
  let statusDescription =
    "Nomor pesanan yang Anda tuju tidak terdaftar di sistem kami atau belum selesai diproses. Silakan hubungi tim kami jika Anda telah menyelesaikan pembayaran.";

  let statusBadge = {
    text: "Tidak Terverifikasi",
    color: "text-rose-400 bg-rose-500/10 border-rose-500/30",
  };

  if (isFound) {
    if (isSuccess) {
      statusTitle = "Pembayaran Berhasil Dikonfirmasi!";
      statusDescription =
        "Terima kasih telah melakukan transaksi di Laxstudio. Pembayaran Anda telah terverifikasi secara resmi lunas oleh sistem Duitku Payment Gateway.";
      statusBadge = {
        text: "Terverifikasi (Lunas)",
        color:
          "text-emerald-400 bg-accent-emerald/10 border-accent-emerald/30",
      };
    } else if (isPending) {
      statusTitle = "Menunggu Konfirmasi Pembayaran";
      statusDescription =
        "Tagihan pembayaran telah diterbitkan. Silakan selesaikan pembayaran sesuai instruksi Virtual Account / QRIS Duitku. Halaman ini akan otomatis terupdate setelah pembayaran Anda terdeteksi.";
      statusBadge = {
        text: "Menunggu Pembayaran (Pending)",
        color: "text-amber-400 bg-amber-500/10 border-amber-500/30",
      };
    } else if (isFailed) {
      statusTitle = "Pembayaran Dibatalkan / Kadaluarsa";
      statusDescription =
        "Batas waktu pembayaran untuk pesanan ini telah berakhir atau transaksi telah dibatalkan oleh sistem gateway Duitku.";
      statusBadge = {
        text: "Gagal / Kadaluarsa",
        color: "text-rose-400 bg-rose-500/10 border-rose-500/30",
      };
    }
  }

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[350px] bg-accent-emerald/10 blur-[150px] pointer-events-none -z-10" />

      <Container className="max-w-2xl">
        <Card className="p-8 sm:p-10 rounded-3xl border border-border-subtle bg-surface-card/90 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-accent-emerald/10 border border-accent-emerald/30 flex items-center justify-center mx-auto text-accent-emerald shadow-lg shadow-accent-emerald/10">
            {isSuccess ? (
              <CheckCircle2 className="w-8 h-8 text-accent-emerald" />
            ) : isPending ? (
              <Clock className="w-8 h-8 text-amber-400" />
            ) : isFailed ? (
              <AlertCircle className="w-8 h-8 text-rose-400" />
            ) : (
              <ShieldCheck className="w-8 h-8 text-accent-cyan" />
            )}
          </div>

          <div className="space-y-2">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${statusBadge.color}`}
            >
              {statusBadge.text}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              {statusTitle}
            </h1>
            <p className="text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
              {statusDescription}
            </p>
          </div>

          {/* Order Details Card */}
          <div className="p-5 rounded-2xl bg-surface-elevated/70 border border-border-subtle text-left space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-border-subtle/60 pb-2.5">
              <span className="text-text-muted">Nomor Pesanan (Order ID)</span>
              <span className="font-mono font-bold text-text-primary">
                {displayOrderId}
              </span>
            </div>

            {isFound && (
              <div className="flex items-center justify-between border-b border-border-subtle/60 pb-2.5">
                <span className="text-text-muted">Layanan / Produk</span>
                <span className="font-medium text-text-primary">
                  {displayProduct}
                </span>
              </div>
            )}

            {displayAmount && (
              <div className="flex items-center justify-between border-b border-border-subtle/60 pb-2.5">
                <span className="text-text-muted">Nominal Pembayaran</span>
                <span className="font-bold text-accent-emerald">
                  Rp {displayAmount}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between border-b border-border-subtle/60 pb-2.5">
              <span className="text-text-muted">Status Transaksi</span>
              <span
                className={`inline-flex items-center gap-1.5 font-semibold ${
                  isSuccess
                    ? "text-emerald-500 dark:text-emerald-400"
                    : isPending
                    ? "text-amber-500 dark:text-amber-400"
                    : "text-rose-500 dark:text-rose-400"
                }`}
              >
                {isSuccess ? (
                  <ShieldCheck className="w-3.5 h-3.5" />
                ) : isPending ? (
                  <Clock className="w-3.5 h-3.5" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5" />
                )}
                {statusBadge.text}
              </span>
            </div>

            {order?.reference && (
              <div className="flex items-center justify-between border-b border-border-subtle/60 pb-2.5">
                <span className="text-text-muted">No. Referensi Duitku</span>
                <span className="font-mono text-text-secondary">
                  {order.reference}
                </span>
              </div>
            )}

            {order?.vaNumber && (
              <div className="flex items-center justify-between border-b border-border-subtle/60 pb-2.5">
                <span className="text-text-muted">Nomor Virtual Account</span>
                <span className="font-mono font-bold text-accent-emerald">
                  {order.vaNumber}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-text-muted">Metode Saluran</span>
              <span className="font-medium text-text-primary">
                Duitku Payment Gateway
              </span>
            </div>
          </div>

          {/* Pending Action: Refresh Status */}
          {isPending && (
            <div className="pt-1">
              <Button
                href={`/store/success?orderId=${encodeURIComponent(displayOrderId)}`}
                variant="secondary"
                size="sm"
                className="w-full gap-2 text-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Cek Ulang Status Pembayaran Terkini</span>
              </Button>
            </div>
          )}

          {/* Contact Support info as required by Duitku verification */}
          <div className="p-4 rounded-2xl bg-surface-ground border border-border-subtle text-left text-xs space-y-2">
            <div className="font-semibold text-text-primary flex items-center gap-2">
              <Building className="w-3.5 h-3.5 text-accent-emerald" />
              Kontak Bantuan &amp; Dukungan Layanan:
            </div>
            <div className="text-text-muted leading-relaxed">
              Jika membutuhkan konfirmasi faktur atau diskusi teknis lanjutan, tim kami siap membantu:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-sans">
              <div className="flex items-center gap-2 text-text-secondary">
                <Mail className="w-3.5 h-3.5 text-accent-cyan shrink-0" />
                <span>laxstudiodev@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <MessageSquare className="w-3.5 h-3.5 text-accent-emerald shrink-0" />
                <span>+62 878-9438-0774 (WhatsApp)</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              href="/store"
              variant="secondary"
              size="md"
              className="w-full sm:w-auto gap-2 text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Katalog</span>
            </Button>
            <Button
              href={`/invoices?orderId=${encodeURIComponent(displayOrderId)}`}
              variant="outline"
              size="md"
              className="w-full sm:w-auto gap-2 text-xs"
            >
              <Receipt className="w-4 h-4 text-accent-emerald" />
              <span>Lacak Faktur (/invoices)</span>
            </Button>
            <Button
              href={`https://wa.me/6287894380774?text=${encodeURIComponent(
                `Halo Laxstudio, saya ingin konfirmasi pesanan dengan Order ID: ${displayOrderId}`
              )}`}
              variant="primary"
              size="md"
              className="w-full sm:w-auto gap-2 text-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Konfirmasi via WhatsApp</span>
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
}
