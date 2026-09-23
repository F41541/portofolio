"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  CheckCircle2,
  ShoppingCart,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Clock,
  FileText,
  RotateCcw,
  MessageSquare,
} from "lucide-react";
import { CheckoutModal, CheckoutProduct } from "./CheckoutModal";

export interface StoreServiceItem {
  id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  features: string[];
  badge: string;
  tier?: string;
  stack?: string;
  isStartingFrom?: boolean;
  isPopular?: boolean;
}

interface StoreCatalogClientProps {
  services: StoreServiceItem[];
}

export const StoreCatalogClient: React.FC<StoreCatalogClientProps> = ({
  services,
}) => {
  const [selectedProduct, setSelectedProduct] = React.useState<CheckoutProduct | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenCheckout = (service: StoreServiceItem) => {
    setSelectedProduct({
      id: service.id,
      title: service.title,
      price: service.price,
      description: service.description,
      badge: service.badge,
    });
    setIsModalOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      {/* Products & Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {services.map((service) => {
          const formattedPrice = `Rp ${service.price.toLocaleString("id-ID")}`;
          return (
            <Card
              key={service.id}
              hoverGlow
              className={`p-6 rounded-2xl flex flex-col justify-between group relative transition-all duration-normal ease-spring-natural ${
                service.isPopular
                  ? "border-accent-emerald/60 bg-accent-emerald/[0.03] ring-1 ring-accent-emerald/30 shadow-xl shadow-accent-emerald/10"
                  : ""
              }`}
            >
              <div className="space-y-4">
                {/* Exactly 2 Badges: Category & Status */}
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="neutral" className="text-[10px] truncate max-w-[65%]">
                    {service.category}
                  </Badge>
                  <Badge
                    variant={service.isPopular ? "emerald" : "neutral"}
                    className="text-[10px] shrink-0 font-medium"
                  >
                    {service.badge}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-text-primary group-hover:text-accent-emerald transition-colors leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs text-text-secondary mt-2 leading-relaxed min-h-[44px]">
                    {service.description}
                  </p>
                </div>

                {/* Technology Stack Marquee (Running continuously to the left without shimmer icon) */}
                {service.stack && (
                  <div
                    className="overflow-hidden rounded-lg bg-surface-card/80 border border-border-subtle py-1.5 px-2.5 text-[11px] text-text-secondary font-mono relative"
                    title={service.stack}
                  >
                    <div className="animate-marquee-left flex items-center gap-6">
                      <span>{service.stack}</span>
                      <span aria-hidden="true" className="text-text-muted/40 font-bold">
                        •
                      </span>
                      <span aria-hidden="true">{service.stack}</span>
                      <span aria-hidden="true" className="text-text-muted/40 font-bold">
                        •
                      </span>
                    </div>
                  </div>
                )}

                {/* Price Display in Rupiah (Psychological Anchor) */}
                <div className="p-3 rounded-xl bg-surface-elevated/70 border border-border-subtle/80 flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] text-text-muted font-medium block">
                      Estimasi Investasi:
                    </span>
                    <span className="text-[10px] text-accent-emerald font-bold uppercase tracking-wider">
                      Mulai Dari
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-accent-emerald font-mono tracking-tight">
                      {formattedPrice}
                    </span>
                    <span className="text-[10px] text-text-muted block">
                      (Paket Dasar / DP)
                    </span>
                  </div>
                </div>

                {/* Features list */}
                <div className="pt-2 space-y-2 border-t border-border-subtle/80">
                  <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                    Cakupan Fitur Dasar:
                  </div>
                  {service.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-text-secondary"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing Psychology Notice */}
                <p className="text-[11px] text-text-muted italic px-1 pt-1 leading-tight">
                  * Biaya akhir menyesuaikan kompleksitas modul &amp; kebutuhan SOP bisnis Anda.
                </p>
              </div>

              {/* Dual CTA: Duitku Checkout DP & WhatsApp Custom Scope Consultation */}
              <div className="pt-5 mt-5 border-t border-border-subtle space-y-2">
                <Button
                  onClick={() => handleOpenCheckout(service)}
                  variant={service.isPopular ? "primary" : "secondary"}
                  size="sm"
                  className="w-full gap-2 shadow-sm"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Pesan Paket Dasar (DP)</span>
                </Button>
                <a
                  href={`https://wa.me/6282129620269?text=${encodeURIComponent(
                    `Halo Laxstudio, saya tertarik dengan paket ${service.title} (Mulai Rp ${service.price.toLocaleString("id-ID")}). Saya ingin konsultasi kebutuhan fitur kustom dan rincian biayanya.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full gap-2 px-3 py-2 text-xs font-semibold rounded-xl bg-surface-card hover:bg-surface-elevated hover:text-accent-emerald border border-border-subtle transition-colors text-text-secondary"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-accent-emerald" />
                  <span>Konsultasi Fitur via WA</span>
                </a>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Official Customer Support & Business Information Box */}
      <Card className="mt-12 p-6 sm:p-8 rounded-3xl bg-surface-elevated/40 border border-border-subtle space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle/80 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-accent-emerald/10 border border-accent-emerald/30 flex items-center justify-center text-accent-emerald">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-text-primary">
                  Kontak Dukungan Resmi &amp; Identitas Usaha (Laxstudio)
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20">
                  Terverifikasi
                </span>
              </div>
              <p className="text-xs text-text-muted mt-0.5">
                Saluran resmi korespondensi pengembang dan bantuan pelanggan untuk pembayaran Duitku
              </p>
            </div>
          </div>
        </div>

        {/* Support Grid: Email, Phone, Address, Hours */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-surface-card border border-border-subtle space-y-2">
            <div className="flex items-center gap-2 text-text-muted">
              <Mail className="w-4 h-4 text-accent-cyan" />
              <span className="font-semibold text-text-primary">Email Support</span>
            </div>
            <a
              href="mailto:mfaisalfahri02@gmail.com"
              className="text-text-primary hover:text-accent-emerald transition-colors font-medium block break-all"
            >
              mfaisalfahri02@gmail.com
            </a>
            <div className="text-[11px] text-text-muted">
              Respon tiket &lt; 24 jam kerja
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface-card border border-border-subtle space-y-2">
            <div className="flex items-center gap-2 text-text-muted">
              <Phone className="w-4 h-4 text-accent-emerald" />
              <span className="font-semibold text-text-primary">Nomor Telepon / WA</span>
            </div>
            <a
              href="https://wa.me/6282129620269"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary hover:text-accent-emerald transition-colors font-medium block font-mono"
            >
              +62 821-2962-0269
            </a>
            <div className="text-[11px] text-text-muted">
              Tersedia WhatsApp &amp; Panggilan
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface-card border border-border-subtle space-y-2">
            <div className="flex items-center gap-2 text-text-muted">
              <MapPin className="w-4 h-4 text-accent-emerald" />
              <span className="font-semibold text-text-primary">Alamat Usaha</span>
            </div>
            <p className="text-text-secondary leading-snug">
              Desa Sedonglor, Kec. Sedong, Kab. Cirebon, Jawa Barat 45189
            </p>
            <div className="text-[11px] text-text-muted">
              Domisili Resmi Usaha
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface-card border border-border-subtle space-y-2">
            <div className="flex items-center gap-2 text-text-muted">
              <Clock className="w-4 h-4 text-accent-cyan" />
              <span className="font-semibold text-text-primary">Jam Operasional</span>
            </div>
            <p className="text-text-secondary leading-snug font-medium">
              Senin – Jumat: 08:30 – 17:00 WIB
            </p>
            <div className="text-[11px] text-text-muted">
              Sabtu &amp; Minggu: Janji Temu
            </div>
          </div>
        </div>

        {/* Terms & Refund Policy Accordion / Notice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-border-subtle text-xs text-text-muted leading-relaxed">
          <div className="p-3.5 rounded-xl bg-surface-ground border border-border-subtle/80 space-y-1.5">
            <div className="font-bold text-text-primary flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-accent-emerald" />
              Syarat &amp; Ketentuan Layanan (Terms of Service)
            </div>
            <p className="text-[11px] leading-relaxed">
              Seluruh transaksi pembayaran yang diproses merupakan pemesanan resmi jasa rekayasa perangkat lunak dan konsultasi teknis Laxstudio. Pengerjaan proyek dimulai setelah verifikasi pembayaran berhasil dan rincian requirement disepakati bersama.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-ground border border-border-subtle/80 space-y-1.5">
            <div className="font-bold text-text-primary flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-accent-cyan" />
              Kebijakan Pembatalan &amp; Pengembalian Dana (Refund)
            </div>
            <p className="text-[11px] leading-relaxed">
              Pembatalan pesanan dapat diajukan dalam waktu 24 jam sebelum pengerjaan dimulai dengan menghubungi kontak support resmi. Untuk transaksi simulasi Duitku Sandbox, tidak ada pemotongan saldo riil pada rekening pelanggan.
            </p>
          </div>
        </div>
      </Card>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={handleCloseCheckout}
        product={selectedProduct}
      />
    </>
  );
};
