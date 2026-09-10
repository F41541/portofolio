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
} from "lucide-react";

export const metadata: Metadata = {
  title: "Konfirmasi Pembayaran | Laxstudio Store",
  description: "Status transaksi dan konfirmasi pembayaran layanan Laxstudio.",
};

interface SuccessPageProps {
  searchParams: Promise<{
    orderId?: string;
    merchantOrderId?: string;
    amount?: string;
    resultCode?: string;
  }>;
}

export default async function StoreSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const params = await searchParams;
  const orderId = params.orderId || params.merchantOrderId || "LAX-TEST-ORD";
  const amount = params.amount
    ? Number(params.amount).toLocaleString("id-ID")
    : null;

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center py-16 md:py-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[350px] bg-accent-emerald/10 blur-[150px] pointer-events-none -z-10" />

      <Container className="max-w-2xl">
        <Card className="p-8 sm:p-10 rounded-3xl border border-border-subtle bg-surface-card/90 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-accent-emerald/10 border border-accent-emerald/30 flex items-center justify-center mx-auto text-accent-emerald shadow-lg shadow-accent-emerald/10">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20">
              Transaksi Sandbox Duitku
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Permintaan Pembayaran Diterima!
            </h1>
            <p className="text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
              Terima kasih telah melakukan pemesanan di Laxstudio. Pembayaran simulasi Anda telah dicatat oleh payment gateway Duitku Sandbox.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="p-5 rounded-2xl bg-surface-elevated/70 border border-border-subtle text-left space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-border-subtle/60 pb-2.5">
              <span className="text-text-muted">Nomor Pesanan (Order ID)</span>
              <span className="font-mono font-bold text-text-primary">
                {orderId}
              </span>
            </div>
            {amount && (
              <div className="flex items-center justify-between border-b border-border-subtle/60 pb-2.5">
                <span className="text-text-muted">Nominal Pembayaran</span>
                <span className="font-bold text-accent-emerald">
                  Rp {amount}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between border-b border-border-subtle/60 pb-2.5">
              <span className="text-text-muted">Status Transaksi</span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                Terverifikasi (Sandbox)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-muted">Metode Saluran</span>
              <span className="font-medium text-text-primary">
                Duitku Payment Gateway
              </span>
            </div>
          </div>

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
                <span>mfaisalfahri02@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <MessageSquare className="w-3.5 h-3.5 text-accent-emerald shrink-0" />
                <span>+62 819-0776-1002 (WhatsApp)</span>
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
              <span>Kembali ke Katalog Layanan</span>
            </Button>
            <Button
              href="https://wa.me/6281907761002"
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
