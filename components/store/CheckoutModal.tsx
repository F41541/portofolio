"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CreditCard,
  User,
  Mail,
  Phone,
  ShieldCheck,
  Loader2,
  AlertCircle,
  ExternalLink,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { FormField } from "@/components/ui/FormField";

export interface CheckoutProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  badge?: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: CheckoutProduct | null;
}

const PAYMENT_OPTIONS = [
  // Virtual Account Aktif
  { value: "M2", label: "Mandiri Virtual Account" },
  { value: "BR", label: "BRI Virtual Account (BRIVA)" },
  { value: "I1", label: "BNI Virtual Account" },
  { value: "BT", label: "Permata Bank Virtual Account" },
  { value: "VA", label: "Maybank Virtual Account" },
  // Gerai Retail Aktif
  { value: "FT", label: "Alfamart / Alfamidi / Dan+Dan" },
  // QRIS (Status: Maintenance / Dalam Pengajuan Duitku 7-14 hari kerja)
  {
    value: "SP",
    label: "QRIS (Semua E-Wallet) [Maintenance / Dalam Pengajuan Duitku]",
    disabled: true,
  },
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [customerName, setCustomerName] = React.useState("");
  const [customerEmail, setCustomerEmail] = React.useState("");
  const [customerPhone, setCustomerPhone] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("M2");
  const [paymentOptions, setPaymentOptions] = React.useState(PAYMENT_OPTIONS);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // Ambil daftar metode bayar & kalkulasi biaya real-time dari Duitku API
  React.useEffect(() => {
    if (!isOpen || !product) return;
    let isMounted = true;

    async function loadPaymentMethods() {
      try {
        const res = await fetch(`/api/duitku/payment-methods?amount=${product?.price || 10000}`);
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && data.paymentFee && Array.isArray(data.paymentFee) && data.paymentFee.length > 0) {
          const liveMethods = data.paymentFee.map(
            (item: { paymentMethod: string; paymentName: string; totalFee?: string }) => {
              const fee = Number(item.totalFee) || 0;
              const feeLabel = fee > 0 ? ` (+Rp ${fee.toLocaleString("id-ID")})` : " (Bebas Biaya)";
              return {
                value: item.paymentMethod,
                label: `${item.paymentName}${feeLabel}`,
                disabled: false,
              };
            }
          );

          // Saring metode live: hanya ambil channel yang diizinkan (exclude BC, IR, VC, DA, OV)
          const filteredLive = liveMethods.filter(
            (lm: { value: string }) => !["BC", "IR", "VC", "DA", "OV"].includes(lm.value)
          );

          // Gabungkan dengan QRIS yang sedang proses aktivasi
          const maintenanceChannels = PAYMENT_OPTIONS.filter((opt) => opt.disabled);

          const mergedOptions = [...filteredLive, ...maintenanceChannels];
          setPaymentOptions(mergedOptions);

          // Pastikan pilihan tidak mengarah ke opsi disabled
          if (!filteredLive.some((opt: { value: string }) => opt.value === paymentMethod) && filteredLive.length > 0) {
            setPaymentMethod(filteredLive[0].value);
          }
        }
      } catch {
        // Fallback tetap menggunakan PAYMENT_OPTIONS standar
      }
    }

    loadPaymentMethods();
    return () => {
      isMounted = false;
    };
  }, [isOpen, product?.id, product?.price]);

  // Close on escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail.trim()) {
      setErrorMessage("Alamat email wajib diisi untuk bukti konfirmasi pembayaran.");
      return;
    }
    if (!customerPhone.trim()) {
      setErrorMessage("Nomor WhatsApp wajib diisi untuk koordinasi teknis layanan.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/duitku/create-invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          productTitle: product.title,
          price: product.price,
          customerName: customerName.trim() || "Pelanggan",
          customerEmail: customerEmail.trim(),
          customerPhone: customerPhone.trim(),
          paymentMethod: paymentMethod || "BC",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.error || "Gagal menghubungkan ke Duitku Payment Gateway. Pastikan konfigurasi valid."
        );
      }

      if (data.paymentUrl) {
        // Redirect to Duitku Payment Page
        window.location.href = data.paymentUrl;
      } else if (data.merchantOrderId) {
        // Fallback: redirect to success/status page
        window.location.href = `/store/success?orderId=${encodeURIComponent(data.merchantOrderId)}`;
      } else {
        throw new Error("Duitku tidak mengembalikan URL pembayaran.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat memproses checkout.";
      setErrorMessage(msg);
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg rounded-3xl border border-border-subtle bg-surface-card p-6 sm:p-8 shadow-2xl z-10 space-y-5"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-accent-emerald/10 text-emerald-700 dark:text-emerald-300 border border-accent-emerald/20">
                <ShieldCheck className="w-3 h-3" />
                Duitku Payment Gateway
              </span>
              <h3 className="text-xl font-bold text-text-primary">
                Selesaikan Pembayaran
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 -mr-2 text-text-muted hover:text-text-primary rounded-xl hover:bg-surface-elevated transition-all duration-fast ease-spring-snappy focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-emerald active:scale-95"
              aria-label="Tutup form pemesanan"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Product Summary Box */}
          <div className="p-4 rounded-2xl bg-surface-elevated/80 border border-border-subtle space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-text-primary">
                  {product.title}
                </h4>
                <p className="text-xs text-text-muted mt-0.5 line-clamp-2">
                  {product.description}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs text-text-muted block">Harga</span>
                <span className="text-base font-extrabold text-accent-emerald font-mono">
                  Rp {product.price.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              id="checkout-name"
              label="Nama Pelanggan (Maks 20 Karakter)"
              icon={<User className="w-3.5 h-3.5 text-accent-emerald" />}
              required
              hint={`${customerName.length}/20`}
            >
              <Input
                type="text"
                placeholder="Contoh: Budi Santoso"
                maxLength={20}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value.slice(0, 20))}
                required
              />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                id="checkout-email"
                label="Email Konfirmasi"
                icon={<Mail className="w-3.5 h-3.5 text-accent-cyan" />}
                required
                hint="Maks 50 karakter"
              >
                <Input
                  type="email"
                  placeholder="nama@email.com"
                  maxLength={50}
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value.slice(0, 50))}
                  required
                />
              </FormField>

              <FormField
                id="checkout-phone"
                label="Nomor WhatsApp"
                icon={<Phone className="w-3.5 h-3.5 text-accent-emerald" />}
                required
                hint="08xxxxxxxxxx"
              >
                <Input
                  type="tel"
                  placeholder="081234567890"
                  maxLength={20}
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                />
              </FormField>
            </div>

            {/* Payment Method Selector (Mandatory parameter for Duitku v2) */}
            <FormField
              id="checkout-payment-method"
              label="Metode Pembayaran (Duitku Gateway)"
              icon={<Wallet className="w-3.5 h-3.5 text-accent-emerald" />}
              required
            >
              <Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                options={paymentOptions}
              />
            </FormField>

            {/* Availability Notice */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-600 dark:text-amber-400 space-y-1">
              <div className="font-semibold flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Ketersediaan Metode Pembayaran:</span>
              </div>
              <p className="leading-relaxed opacity-90">
                ✅ <strong>Virtual Account (Mandiri, BRI, BNI, Permata, Maybank)</strong> &amp; <strong>Alfamart</strong> aktif &amp; siap bayar otomatis.
                <br />
                ⏳ Channel <strong>QRIS &amp; E-Wallet</strong> sedang dalam proses verifikasi pihak penyedia Duitku (estimasi aktif 7–14 hari kerja).
              </p>
            </div>

            {/* Error message */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{errorMessage}</span>
              </div>
            )}

            {/* Disclaimer */}
            <div className="text-[11px] text-text-muted leading-relaxed font-sans bg-surface-ground/50 p-3 rounded-xl border border-border-subtle/60">
              Transaksi ini diproses secara aman melalui <strong>Duitku Payment Gateway</strong>. Anda akan diarahkan ke halaman pembayaran instruksi resmi Duitku.
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onClose}
                disabled={isLoading}
              >
                Batal
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isLoading}
                className="gap-2 shadow-lg shadow-accent-emerald/10 font-semibold"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Menghubungkan Duitku...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Lanjut ke Pembayaran Duitku</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
