import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactCta } from "@/components/sections";
import { BreadcrumbListJsonLd } from "@/components/seo";
import { SITE_URL } from "@/lib/utils";
import { StoreCatalogClient, StoreServiceItem } from "@/components/store";

export const metadata: Metadata = {
  title: "Layanan & Etalase Produk | Laxstudio",
  description:
    "Katalog penawaran resmi jasa pengembangan aplikasi web full-stack, sistem bisnis UMKM, dan integrasi payment gateway terpercaya Duitku oleh Laxstudio (M. Faisal Fahri).",
  openGraph: {
    title: "Layanan & Jasa Web Development | Laxstudio",
    description:
      "Daftar layanan resmi pengembangan aplikasi web modern, landing page, dan integrasi payment gateway resmi Duitku dengan harga transparan.",
    url: `${SITE_URL}/store`,
  },
};

const SERVICES: StoreServiceItem[] = [
  {
    id: "modern-landing-page",
    title: "Modern Landing Page & Profil Bisnis",
    category: "Frontend & Web Portal",
    price: 1250000,
    description:
      "Pembuatan landing page performa tinggi dan profil bisnis modern berbasis Next.js 16 & Tailwind CSS. Dioptimasi untuk Core Web Vitals, SEO Google prima, dan responsif sempurna di semua perangkat.",
    features: [
      "Performa loading kilat Core Web Vitals (Lighthouse 95+)",
      "SEO on-page terstruktur dengan Schema JSON-LD",
      "Desain modern, interaktif, dan responsif lintas perangkat",
      "Formulir kontak terhubung langsung ke WhatsApp & Email",
    ],
    badge: "Cepat & Efisien",
  },
  {
    id: "erp-system-umkm",
    title: "Sistem ERP & Manajemen Bisnis UMKM",
    category: "ERP & Operasional Bisnis",
    price: 3850000,
    description:
      "Sistem operasional internal terpadu berbasis Laravel (PHP) & Vue 3 / Inertia.js untuk otomatisasi alur kerja, pengelolaan inventaris stok, kasir POS online, dan pelaporan keuangan berkala.",
    features: [
      "Manajemen multi-cabang & kontrol stok gudang real-time",
      "Sistem kasir online (POS) & pencatatan transaksi kas",
      "Manajemen hak akses pengguna bertingkat (Granular RBAC)",
      "Ekspor laporan keuangan otomatis ke format PDF / Excel",
    ],
    badge: "Solusi Populer",
    isPopular: true,
  },
  {
    id: "ecommerce-cms-store",
    title: "Platform E-Commerce & CMS Toko Online",
    category: "E-Commerce & Toko Online",
    price: 2750000,
    description:
      "Pembuatan toko online mandiri dengan antarmuka belanja modern ala marketplace: katalog produk variasi, keranjang belanja, dashboard admin kelola pesanan, dan integrasi payment gateway Duitku otomatis.",
    features: [
      "Katalog produk lengkap dengan manajemen stok & varian",
      "Keranjang belanja interaktif & formulir checkout ringkas",
      "Integrasi resmi gateway Duitku (VA, QRIS, E-Wallet, Retail)",
      "Dashboard admin untuk memantau pesanan & mutasi bayar",
    ],
    badge: "Etalase Penjualan",
  },
  {
    id: "custom-web-application",
    title: "Aplikasi Web Custom & Solusi SaaS Khusus",
    category: "Full-Stack Custom Development",
    price: 5000000,
    description:
      "Solusi rekayasa perangkat lunak web kustom yang dirancang khusus sesuai alur SOP bisnis dan kebutuhan spesifik Anda dengan arsitektur modular, scalable, dan clean code.",
    features: [
      "Arsitektur database relasional (MySQL / PostgreSQL) teroptimasi",
      "Integrasi API pihak ketiga & webhook aman",
      "Dashboard analitik metrik bisnis dengan visualisasi interaktif",
      "Garansi pemeliharaan teknis & dokumentasi penggunaan sistem",
    ],
    badge: "Spesifikasi Khusus",
  },
];

export default function StorePage() {
  return (
    <div className="relative flex-1 flex flex-col overflow-hidden">
      <BreadcrumbListJsonLd
        items={[
          { name: "Beranda", url: SITE_URL },
          { name: "Layanan & Etalase", url: `${SITE_URL}/store` },
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
              Layanan &amp; Modul Solusi{" "}
              <span className="bg-gradient-to-r from-accent-emerald to-accent-cyan bg-clip-text text-transparent">
                Rekayasa Web
              </span>
            </h1>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              Daftar penawaran paket jasa pengembangan perangkat lunak, integrasi payment gateway Duitku, dan modul sistem bisnis dengan tarif harga transparan (Rupiah) dan pemesanan langsung.
            </p>
          </div>

          {/* Interactive Store Catalog with Rupiah Prices & Checkout Modal */}
          <StoreCatalogClient services={SERVICES} />
        </Container>
      </section>

      {/* Direct CTA */}
      <ContactCta />
    </div>
  );
}
