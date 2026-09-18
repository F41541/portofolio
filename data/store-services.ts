export interface StoreServiceItem {
  id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  features: string[];
  badge: string;
  isPopular?: boolean;
}

export const SERVICES: StoreServiceItem[] = [
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

export function getServiceById(id: string): StoreServiceItem | undefined {
  return SERVICES.find((service) => service.id === id);
}
