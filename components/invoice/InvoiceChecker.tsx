"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  RotateCw,
  CreditCard,
  Building,
  Mail,
  MessageSquare,
  ShieldCheck,
  Calendar,
  FileText,
  Printer,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import type { Order } from "@/lib/orders";

const CHANNEL_NAMES: Record<string, string> = {
  M2: "Mandiri Virtual Account",
  BR: "BRI Virtual Account (BRIVA)",
  I1: "BNI Virtual Account",
  BT: "Permata Bank Virtual Account",
  VA: "Maybank Virtual Account",
  FT: "Alfamart / Alfamidi / Dan+Dan",
  P1: "Kantor Pos Indonesia",
  PE: "Pegadaian",
  BC: "BCA Virtual Account",
  IR: "Indomaret",
  SP: "QRIS (Semua E-Wallet & M-Banking)",
  DA: "DANA",
  OV: "OVO",
  VC: "Kartu Kredit / Debit Online",
  DUITKU: "Duitku Payment Gateway",
};

export const InvoiceChecker: React.FC = () => {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get("orderId") || searchParams.get("id") || "";

  const [orderIdInput, setOrderIdInput] = React.useState(initialOrderId);
  const [currentOrder, setCurrentOrder] = React.useState<Order | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [copiedField, setCopiedField] = React.useState<string | null>(null);
  const [hasSearched, setHasSearched] = React.useState(false);

  const fetchInvoice = React.useCallback(async (idToSearch: string, isSilentSync = false) => {
    const cleanId = idToSearch.trim();
    if (!cleanId) {
      setErrorMessage("Silakan masukkan Nomor Order / Invoice ID terlebih dahulu.");
      return;
    }

    if (isSilentSync) {
      setIsSyncing(true);
    } else {
      setIsLoading(true);
      setErrorMessage(null);
    }

    try {
      const res = await fetch(`/api/duitku/status?orderId=${encodeURIComponent(cleanId)}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || `Invoice '${cleanId}' tidak ditemukan.`);
      }

      setCurrentOrder(data.order);
      setHasSearched(true);
      setErrorMessage(null);

      // Update browser URL query without reloading
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("orderId", cleanId);
        window.history.replaceState({}, "", url.toString());
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memuat status invoice.";
      setErrorMessage(msg);
      if (!isSilentSync) {
        setCurrentOrder(null);
      }
      setHasSearched(true);
    } finally {
      setIsLoading(false);
      setIsSyncing(false);
    }
  }, []);

  // Auto-fetch on page load if query param present
  React.useEffect(() => {
    if (initialOrderId) {
      fetchInvoice(initialOrderId);
    }
  }, [initialOrderId, fetchInvoice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchInvoice(orderIdInput);
  };

  const handleCopy = (text: string, fieldName: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const getStatusDisplay = (status: Order["status"]) => {
    switch (status) {
      case "SUCCESS":
        return {
          label: "Lunas / Terverifikasi",
          color: "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
          description: "Pembayaran telah berhasil diterima dan divalidasi oleh sistem Duitku.",
        };
      case "PENDING":
        return {
          label: "Menunggu Pembayaran",
          color: "text-amber-500 dark:text-amber-400 bg-amber-500/10 border-amber-500/30",
          icon: <Clock className="w-5 h-5 text-amber-500 animate-pulse" />,
          description: "Tagihan telah dibuat. Silakan selesaikan pembayaran sesuai instruksi.",
        };
      case "FAILED":
        return {
          label: "Pembayaran Dibatalkan / Gagal",
          color: "text-red-500 dark:text-red-400 bg-red-500/10 border-red-500/30",
          icon: <XCircle className="w-5 h-5 text-red-500" />,
          description: "Transaksi tidak dapat diproses atau telah dibatalkan.",
        };
      case "EXPIRED":
        return {
          label: "Tagihan Kadaluarsa",
          color: "text-zinc-500 dark:text-zinc-400 bg-zinc-500/10 border-zinc-500/30",
          icon: <AlertCircle className="w-5 h-5 text-zinc-400" />,
          description: "Batas waktu pembayaran telah habis. Silakan buat pesanan baru.",
        };
      default:
        return {
          label: status,
          color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/30",
          icon: <AlertCircle className="w-5 h-5 text-cyan-400" />,
          description: "Status transaksi dalam proses.",
        };
    }
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return "-";
    try {
      const d = new Date(isoString);
      return new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Jakarta",
      }).format(d) + " WIB";
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Bar Form */}
      <Card className="p-6 sm:p-8 rounded-3xl border border-border-subtle bg-surface-card/90 shadow-xl backdrop-blur-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="invoice-search-input"
              className="text-sm font-semibold text-text-primary flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-accent-emerald" />
              Lacak &amp; Cek Nomor Invoice Pesanan
            </label>
            <p className="text-xs text-text-secondary leading-relaxed">
              Masukkan Nomor Order ID (contoh: <code className="text-accent-emerald font-mono font-medium">LAX-1789...</code>) untuk melihat detail rincian tagihan, status pembayaran Duitku, nomor Virtual Account, atau tautan pembayaran.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Input
                id="invoice-search-input"
                type="text"
                placeholder="Contoh: LAX-1789758100616"
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                className="font-mono text-sm py-3 pl-4 pr-10"
                required
              />
              {orderIdInput && (
                <button
                  type="button"
                  onClick={() => setOrderIdInput("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-muted hover:text-text-primary px-1.5 py-0.5 rounded"
                  title="Hapus"
                >
                  ✕
                </button>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isLoading || !orderIdInput.trim()}
              className="gap-2 shrink-0 font-semibold shadow-md shadow-accent-emerald/15"
            >
              {isLoading ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Memeriksa...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Cari Invoice</span>
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Error message */}
        {errorMessage && (
          <div className="mt-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/25 text-xs text-red-400 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">Pencarian Tidak Berhasil</p>
              <p className="leading-relaxed opacity-90">{errorMessage}</p>
            </div>
          </div>
        )}
      </Card>

      {/* Invoice Details Card */}
      {currentOrder && (
        <Card className="p-6 sm:p-10 rounded-3xl border border-border-subtle bg-surface-card/95 shadow-2xl space-y-8 animate-fadeIn">
          {/* Header Status */}
          {(() => {
            const statusInfo = getStatusDisplay(currentOrder.status);
            return (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle/80 pb-6">
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-surface-elevated border border-border-subtle shrink-0">
                    {statusInfo.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold border ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                      {currentOrder.reference && (
                        <span className="text-[11px] font-mono text-text-muted bg-surface-ground px-2 py-0.5 rounded border border-border-subtle">
                          Ref: {currentOrder.reference}
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary tracking-tight mt-1.5">
                      {currentOrder.productTitle}
                    </h2>
                    <p className="text-xs text-text-secondary mt-0.5">
                      {statusInfo.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:self-start shrink-0">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={isSyncing}
                    onClick={() => fetchInvoice(currentOrder.orderId, true)}
                    className="gap-1.5 text-xs"
                    title="Periksa status transaksi terkini langsung ke server Duitku"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-accent-emerald" : ""}`} />
                    <span>{isSyncing ? "Sinkronisasi..." : "Perbarui Status"}</span>
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (typeof window !== "undefined") window.print();
                    }}
                    className="gap-1.5 text-xs print:hidden"
                    title="Cetak Bukti Invoice"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Cetak</span>
                  </Button>
                </div>
              </div>
            );
          })()}

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-surface-elevated/70 border border-border-subtle space-y-1">
              <span className="text-[11px] text-text-muted font-medium block">
                Nomor Order ID
              </span>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold text-text-primary truncate">
                  {currentOrder.orderId}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(currentOrder.orderId, "orderId")}
                  className="text-text-muted hover:text-accent-emerald p-1 transition-colors"
                  title="Salin Nomor Order"
                >
                  {copiedField === "orderId" ? (
                    <Check className="w-3.5 h-3.5 text-accent-emerald" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface-elevated/70 border border-border-subtle space-y-1">
              <span className="text-[11px] text-text-muted font-medium block">
                Total Nominal Tagihan
              </span>
              <span className="text-base font-extrabold text-accent-emerald font-mono">
                Rp {currentOrder.amount.toLocaleString("id-ID")}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-surface-elevated/70 border border-border-subtle space-y-1">
              <span className="text-[11px] text-text-muted font-medium block">
                Metode Pembayaran
              </span>
              <span className="text-xs font-semibold text-text-primary block truncate">
                {CHANNEL_NAMES[currentOrder.paymentMethod] || currentOrder.paymentMethod}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-surface-elevated/70 border border-border-subtle space-y-1">
              <span className="text-[11px] text-text-muted font-medium block">
                Waktu Pemesanan
              </span>
              <span className="text-xs font-medium text-text-secondary block truncate">
                {formatDate(currentOrder.createdAt)}
              </span>
            </div>
          </div>

          {/* Action box for PENDING orders */}
          {currentOrder.status === "PENDING" && (
            <div className="p-6 rounded-3xl bg-amber-500/[0.06] border border-amber-500/30 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-amber-500" />
                    Instruksi Pembayaran Tagihan
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Pesanan Anda sedang menunggu pelunasan. Silakan bayar sesuai metode yang telah Anda pilih:
                  </p>
                </div>

                {currentOrder.paymentUrl && (
                  <Button
                    href={currentOrder.paymentUrl}
                    variant="primary"
                    size="sm"
                    className="gap-2 shrink-0 font-semibold shadow-md shadow-accent-emerald/20"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Bayar di Halaman Duitku</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>

              {/* Virtual Account Box */}
              {currentOrder.vaNumber && (
                <div className="p-4 rounded-2xl bg-surface-card border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-text-muted block">
                      Nomor Virtual Account ({CHANNEL_NAMES[currentOrder.paymentMethod] || "VA"})
                    </span>
                    <span className="text-lg font-mono font-extrabold text-accent-emerald tracking-wider">
                      {currentOrder.vaNumber}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => handleCopy(currentOrder.vaNumber!, "vaNumber")}
                    className="gap-1.5 self-start sm:self-auto"
                  >
                    {copiedField === "vaNumber" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-accent-emerald" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Nomor VA</span>
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* QR String info */}
              {currentOrder.qrString && (
                <div className="p-4 rounded-2xl bg-surface-card border border-amber-500/20 space-y-2">
                  <span className="text-[11px] text-text-muted block font-medium">
                    String QRIS EMVCo Duitku
                  </span>
                  <div className="p-2.5 rounded-xl bg-surface-ground font-mono text-[11px] text-text-secondary break-all border border-border-subtle">
                    {currentOrder.qrString}
                  </div>
                  <p className="text-[11px] text-text-muted">
                    Buka tautan pembayaran Duitku di atas untuk memindai QR Code resmi menggunakan aplikasi e-wallet Anda.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Customer & Technical Details */}
          <div className="border-t border-border-subtle/80 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <span className="font-semibold text-text-primary block">
                Data Pemesan / Pelanggan:
              </span>
              <div className="p-3.5 rounded-xl bg-surface-elevated/50 border border-border-subtle space-y-1 text-text-secondary">
                <p>Nama: <strong className="text-text-primary">{currentOrder.customerName}</strong></p>
                {currentOrder.customerEmail && (
                  <p>Email: <span className="font-mono">{currentOrder.customerEmail}</span></p>
                )}
                {currentOrder.customerPhone && (
                  <p>WhatsApp: <span className="font-mono">{currentOrder.customerPhone}</span></p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-semibold text-text-primary block">
                Metadata Transaksi:
              </span>
              <div className="p-3.5 rounded-xl bg-surface-elevated/50 border border-border-subtle space-y-1 text-text-secondary">
                <p>Status Gateway: <strong className="text-text-primary">{currentOrder.status}</strong></p>
                <p>Waktu Pembaruan: <span>{formatDate(currentOrder.updatedAt)}</span></p>
                {currentOrder.resultCode && (
                  <p>Result Code: <span className="font-mono">{currentOrder.resultCode}</span></p>
                )}
              </div>
            </div>
          </div>

          {/* Official Support Info */}
          <div className="p-4 rounded-2xl bg-surface-ground border border-border-subtle text-left text-xs space-y-2">
            <div className="font-semibold text-text-primary flex items-center gap-2">
              <Building className="w-3.5 h-3.5 text-accent-emerald" />
              Bantuan &amp; Konfirmasi Pembayaran:
            </div>
            <p className="text-text-muted leading-relaxed">
              Jika Anda telah mentransfer namun status belum berubah menjadi Lunas, klik tombol <strong>Perbarui Status</strong> di atas atau hubungi tim kami dengan melampirkan Nomor Order ID:
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1 font-sans">
              <a
                href={`https://wa.me/6287894380774?text=Halo%20Laxstudio,%20saya%20ingin%20konfirmasi%20pembayaran%20dengan%20Order%20ID:%20${encodeURIComponent(currentOrder.orderId)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent-emerald hover:underline font-medium"
              >
                <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                <span>Konfirmasi via WhatsApp</span>
              </a>
              <a
                href="mailto:laxstudiodev@gmail.com"
                className="inline-flex items-center gap-2 text-accent-cyan hover:underline font-medium"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>laxstudiodev@gmail.com</span>
              </a>
            </div>
          </div>
        </Card>
      )}

      {/* Initial Empty State Helper */}
      {!currentOrder && !errorMessage && !isLoading && (
        <Card className="p-8 text-center rounded-3xl border border-dashed border-border-subtle bg-surface-elevated/30 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-surface-elevated border border-border-subtle flex items-center justify-center mx-auto text-text-muted">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-text-primary">
            Belum Ada Invoice yang Ditampilkan
          </h3>
          <p className="text-xs text-text-muted max-w-md mx-auto leading-relaxed">
            Ketik nomor invoice atau Order ID pesanan Anda pada form pencarian di atas, lalu tekan tombol <strong>Cari Invoice</strong> untuk memuat data transaksi.
          </p>
        </Card>
      )}
    </div>
  );
};
