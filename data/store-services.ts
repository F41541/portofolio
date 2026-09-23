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

export const SERVICES: StoreServiceItem[] = [
  {
    id: "website-astro-seo",
    title: "Website UMKM, Profil Bisnis & Local SEO",
    category: "Website & Local SEO",
    price: 500000,
    description:
      "Website profil profesional, landing page promosi kilat, dan katalog UMKM berbasis Astro. Dioptimasi untuk kecepatan loading instan (< 1.5 detik), integrasi Google Maps, tombol WhatsApp, dan ranking Google Local SEO.",
    features: [
      "Desain modern, mobile-friendly & loading kilat (< 1.5 detik)",
      "Optimasi Local SEO terstruktur (Google Search & Maps)",
      "Integrasi WhatsApp Chat langsung & Formulir Kontak",
      "Termasuk hosting statis & panduan kelola konten mandiri",
    ],
    badge: "Mulai Murah",
    tier: "TIER 1 (ASTRO)",
    stack: "Astro + Tailwind CSS + Local SEO",
    isStartingFrom: true,
  },
  {
    id: "ecommerce-duitku-store",
    title: "Toko Online & Integrasi Payment Gateway Duitku",
    category: "E-Commerce & Gateway",
    price: 1200000,
    description:
      "Terima pembayaran otomatis dari pelanggan secara instan melalui QRIS, Virtual Account bank nasional (BCA, Mandiri, BRI, BNI), dan gerai retail via integrasi resmi gateway Duitku.",
    features: [
      "Katalog produk lengkap & keranjang belanja interaktif",
      "Integrasi resmi Duitku (QRIS & Virtual Account Otomatis)",
      "Notifikasi konfirmasi pembayaran otomatis via Webhook",
      "Dashboard admin untuk pantau pesanan & mutasi bayar",
    ],
    badge: "QRIS & VA Otomatis",
    tier: "TIER 2 (E-COMMERCE)",
    stack: "E-Commerce + Duitku API v2",
    isStartingFrom: true,
  },
  {
    id: "webapp-nextjs-saas",
    title: "Web App Interaktif, Portal Klien & SaaS MVP",
    category: "Web Application — Next.js",
    price: 2500000,
    description:
      "Aplikasi web interaktif, portal klien terproteksi, dan dashboard analitik bervelocity tinggi berbasis Next.js 16 (App Router), React 19, Prisma ORM, dan standar UI modern shadcn/ui.",
    features: [
      "Arsitektur Next.js 16 Server Components & App Router",
      "Database relasional type-safe dengan Prisma ORM",
      "Sistem Otentikasi lengkap (OAuth Google & Email)",
      "Dashboard statistik interaktif & visualisasi data real-time",
    ],
    badge: "SaaS & Dashboard",
    tier: "TIER 3 (NEXT.JS)",
    stack: "Next.js 16 + React 19 + Prisma",
    isStartingFrom: true,
  },
  {
    id: "business-system-laravel",
    title: "Sistem Informasi Bisnis, POS Kasir & ERP",
    category: "Business System — Laravel Vue",
    price: 3500000,
    description:
      "Pengembangan sistem backend Laravel, Vue 3, dan Inertia.js untuk otomatisasi operasional bisnis, inventory gudang multi-cabang, kasir POS online, dan pelaporan keuangan berkala berbasis business logic.",
    features: [
      "Arsitektur Monolitik Inertia.js v2 + Vue 3 bertenaga & reaktif",
      "Manajemen inventaris stok gudang & sistem kasir POS online",
      "Granular Role & Permission pengguna terproteksi (RBAC)",
      "Otomatisasi ekspor laporan keuangan ke format PDF / Excel",
    ],
    badge: "Flagship Solution",
    tier: "TIER 4 (LARAVEL + VUE)",
    stack: "Laravel 11/12 + Vue 3 + Inertia.js",
    isStartingFrom: true,
    isPopular: true,
  },
];

export function getServiceById(id: string): StoreServiceItem | undefined {
  const directMatch = SERVICES.find((service) => service.id === id);
  if (directMatch) return directMatch;

  // Backward-compatibility aliases for legacy order IDs & test fixtures
  const legacyAliases: Record<string, string> = {
    "modern-landing-page": "website-astro-seo",
    "erp-system-umkm": "business-system-laravel",
    "custom-web-application": "webapp-nextjs-saas",
    "ecommerce-cms-store": "ecommerce-duitku-store",
    "managed-care-retainer": "business-system-laravel",
  };

  const aliasId = legacyAliases[id];
  if (aliasId) {
    return SERVICES.find((service) => service.id === aliasId);
  }

  return undefined;
}
