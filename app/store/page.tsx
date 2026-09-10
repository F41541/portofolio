import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ContactCta } from "@/components/sections";
import { BreadcrumbListJsonLd } from "@/components/seo";
import { SITE_URL } from "@/lib/utils";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Layanan & Etalase Jasa | Laxstudio",
  description:
    "Etalase penawaran jasa pengembangan aplikasi web full-stack, sistem kasir & ERP UMKM, serta integrasi payment gateway oleh Laxstudio (M. Faisal Fahri).",
  openGraph: {
    title: "Layanan & Jasa Web Development | Laxstudio",
    description:
      "Layanan pengembangan web berbasis Laravel, Vue, React, Next.js, dan integrasi payment gateway terpercaya oleh Laxstudio.",
    url: `${SITE_URL}/store`,
  },
};

const SERVICES = [
  {
    id: "fullstack-web-app",
    title: "Aplikasi Web Full-Stack (SaaS & Sistem Bisnis)",
    category: "Full-Stack Development",
    description:
      "Pengembangan web application terpadu berbasis arsitektur modern Laravel (PHP) & Vue 3 / Inertia.js / Next.js. Cocok untuk ERP multi-tenant, sistem manajemen internal, dan otomasi alur kerja bisnis.",
    features: [
      "Arsitektur database relasional (MySQL / PostgreSQL) terstruktur",
      "Manajemen hak akses pengguna bertingkat (Granular RBAC)",
      "Dashboard analitik responsif dengan performa loading cepat",
      "Clean code, modular, dan mudah dikembangkan di masa depan",
    ],
    badge: "Populer",
  },
  {
    id: "payment-gateway-integration",
    title: "Integrasi Payment Gateway & Modul Finansial",
    category: "Fintech & API Integration",
    description:
      "Integrasi jalur pembayaran online resmi (Duitku, Midtrans, dll) untuk sistem billing SPP, kasir online, dan e-commerce dengan proteksi webhook aman dan mutasi kas real-time.",
    features: [
      "Penerimaan Virtual Account, QRIS, E-Wallet, dan Retail Outlet",
      "Callback webhook otomatis dengan proteksi signature & idempotency",
      "Pencatatan kas masuk/keluar transparan dengan audit trail",
      "Ekspor laporan transaksi berkala ke format PDF dan Excel",
    ],
    badge: "Spesialisasi",
  },
  {
    id: "frontend-portal-landing",
    title: "Modern Landing Page & Web Portal Interaktif",
    category: "Frontend & Web Portal",
    description:
      "Pembuatan landing page performa tinggi dan portal perusahaan menggunakan Next.js / Vue 3 dengan optimasi SEO prima dan loading kilat.",
    features: [
      "Performa skor hijau Core Web Vitals (Lighthouse 95+)",
      "SEO on-page terstruktur dengan JSON-LD Schema",
      "Desain modern dengan mode terang & gelap",
      "Form kontak terhubung langsung ke email",
    ],
    badge: "Efisien",
  },
];

export default function StorePage() {
  return (
    <div className="relative flex-1 flex flex-col overflow-hidden">
      <BreadcrumbListJsonLd
        items={[
          { name: "Beranda", url: SITE_URL },
          { name: "Layanan", url: `${SITE_URL}/store` },
        ]}
      />

      <section className="py-16 md:py-24 border-b border-border-subtle/60 relative">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-accent-emerald/5 blur-[140px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-accent-cyan/5 blur-[120px] pointer-events-none -z-10" />

        <Container className="space-y-12">
          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
              Layanan Pengembangan{" "}
              <span className="bg-gradient-to-r from-accent-emerald to-accent-cyan bg-clip-text text-transparent">
                Perangkat Lunak &amp; Web
              </span>
            </h1>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              Menyediakan solusi rekayasa web profesional untuk kebutuhan digitalisasi bisnis, sistem operasional lembaga, dan integrasi transaksi online terpercaya.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <Card
                key={service.id}
                hoverGlow
                className="p-6 sm:p-7 rounded-2xl flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="neutral" className="text-xs">
                      {service.category}
                    </Badge>
                    <Badge variant="emerald" className="text-[10px]">
                      {service.badge}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-emerald transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features list */}
                  <div className="pt-2 space-y-2 border-t border-border-subtle/80">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-text-secondary">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-border-subtle">
                  <Button href="/contact" variant="secondary" size="sm" className="w-full gap-2 group-hover:border-accent-emerald/50">
                    <span>Konsultasikan Kebutuhan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Merchant & Trust Policy Box (Compliant with Payment Gateway Review) */}
          <Card className="mt-8 p-8 rounded-2xl bg-surface-elevated/40 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-emerald/10 border border-accent-emerald/20 flex items-center justify-center text-accent-emerald">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-text-primary">
                  Informasi Penyedia Layanan &amp; Kontak Resmi (Laxstudio)
                </h3>
                <p className="text-xs text-text-muted">
                  Kepatuhan operasional &amp; transparansi pengembang
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs text-text-secondary">
              <div className="p-3.5 rounded-xl bg-surface-card border border-border-subtle space-y-1">
                <div className="text-text-muted">Studio / Brand</div>
                <div className="font-semibold text-accent-emerald">Laxstudio</div>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-card border border-border-subtle space-y-1">
                <div className="text-text-muted">Pengembang Utama</div>
                <div className="font-semibold text-text-primary">M. Faisal Fahri, S.Kom</div>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-card border border-border-subtle space-y-1">
                <div className="text-text-muted">Email Korespondensi</div>
                <div className="font-semibold text-text-primary truncate">mfaisalfahri02@gmail.com</div>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-card border border-border-subtle space-y-1">
                <div className="text-text-muted">Alamat / Domisili</div>
                <div className="font-semibold text-text-primary">Sedong, Cirebon, Jawa Barat</div>
              </div>
            </div>

            <div className="text-xs text-text-muted leading-relaxed font-sans pt-2 border-t border-border-subtle">
              Alur kerja pemesanan mencakup: (1) Diskusi awal lingkup kerja &amp; estimasi timeline, (2) Penyusunan dokumen requirement &amp; penawaran resmi, (3) Fase pengerjaan &amp; staging demo, (4) Pengujian, handover deployment, serta garansi pemeliharaan.
            </div>
          </Card>
        </Container>
      </section>

      {/* Direct CTA */}
      <ContactCta />
    </div>
  );
}
