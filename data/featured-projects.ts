export interface FeaturedProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  slug: string;
  category: "Full-Stack" | "Frontend & SPA" | "Backend & API" | "Open Source";
  featured: boolean;
  status: "Production" | "Active Benchmark" | "Live Demo" | "Open Source";
  stats: {
    label: string;
    value: string;
  }[];
  architecture: {
    flow: string[];
    highlights: string[];
  };
  metrics: {
    latency: string;
    throughput: string;
    uptime?: string;
  };
  techStack: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  caseStudyUrl: string;
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "erp-saas-umkm",
    title: "ERP SaaS Multi-Tenant UMKM",
    tagline: "Platform manajemen operasional dan bisnis multi-tenant berbasis Laravel 12, Stancl Tenancy, Vue 3, dan Inertia.js.",
    description:
      "Aplikasi ERP multi-tenant all-in-one yang mengelola tenant mandiri, modul pembelian & procurement, quality control (QC) gudang, pelacakan mutasi stok/kadaluarsa, manufaktur (Bill of Materials & Order Produksi), serta Point of Sale (POS) terintegrasi dengan REST API katalog publik.",
    slug: "erp-saas-umkm",
    category: "Full-Stack",
    featured: true,
    status: "Production",
    stats: [
      { label: "Arsitektur", value: "Multi-Tenant" },
      { label: "Modul Utama", value: "ERP + POS + BOM" },
      { label: "Tech Stack", value: "Laravel 12 + Vue 3" },
    ],
    architecture: {
      flow: ["Domain Tenant / Central", "Stancl Tenancy Middleware", "Laravel 12 Service Layer", "Inertia Vue 3 SPA", "MySQL Database"],
      highlights: [
        "Isolasi data tenant berbasis subdomain mandiri dengan central domain super-admin",
        "Modul manajemen master data lengkap (produk, varian multi-foto, kategori, unit, supplier, pricing)",
        "Alur procurement gudang terintegrasi (Purchase Order, Goods Receipt, QC, dan Reorder)",
      ],
    },
    metrics: {
      latency: "Fast SSR/SPA",
      throughput: "Multi-Tenant",
    },
    techStack: ["Laravel 12", "Vue 3", "Inertia.js", "Stancl Tenancy", "Tailwind CSS", "Radix Vue", "MySQL"],
    githubUrl: "https://github.com/F41541/erp-saas-umkm",
    caseStudyUrl: "/projects/erp-saas-umkm",
  },
  {
    id: "ibu-egar_keuangan",
    title: "Sistem Informasi Keuangan & Tabungan Siswa",
    tagline: "Platform pencatatan kas, billing SPP batch, manajemen tabungan siswa/lembaga, dan integrasi payment gateway Duitku.",
    description:
      "Aplikasi pengelolaan keuangan institusi pendidikan yang mencakup manajemen tagihan batch SPP siswa, pencatatan transaksi kas masuk & kas keluar dengan proteksi pembatalan (void transaction), mutasi tabungan siswa & lembaga, ekspor laporan keuangan instan ke format PDF dan Excel, serta online payment gateway Duitku.",
    slug: "ibu-egar_keuangan",
    category: "Full-Stack",
    featured: true,
    status: "Production",
    stats: [
      { label: "Payment Gateway", value: "Duitku API" },
      { label: "Export Engine", value: "PDF & Excel" },
      { label: "Sistem Billing", value: "Batch SPP Auto" },
    ],
    architecture: {
      flow: ["Client (Vue 3 + Tailwind v4)", "Inertia.js Bridge", "Laravel 13 Core & Services", "Duitku Payment Gateway", "MySQL Database"],
      highlights: [
        "Fitur batch generate tagihan SPP bulanan otomatis dan pelacakan status pembayaran per siswa",
        "Audit trail transaksi kas masuk/keluar dengan mekanisme void transparan",
        "Ekspor laporan keuangan komprehensif harian, bulanan, dan yayasan via DomPDF & Maatwebsite Excel",
      ],
    },
    metrics: {
      latency: "Instant Export",
      throughput: "High Integrity",
    },
    techStack: ["Laravel 13", "Vue 3", "Inertia.js", "Tailwind CSS v4", "Duitku API", "DomPDF", "MySQL"],
    githubUrl: "https://github.com/F41541/ibu-egar_keuangan",
    caseStudyUrl: "/projects/ibu-egar_keuangan",
  },
  {
    id: "ibu-egar_bimbel-ahe",
    title: "Sistem Manajemen Operasional & Presensi Bimbel AHE",
    tagline: "Sistem administrasi bimbingan belajar terpadu dengan multi-role access, penjadwalan tetap, dan live board presensi.",
    description:
      "Platform operasional bimbel yang melayani cabang bimbingan belajar dengan role Admin, Mentor (Pengajar), dan Staf Presensi. Mendukung pengelolaan cabang, jadwal belajar tetap & fleksibel, portal presensi mentor disertai catatan evaluasi siswa, live board monitoring real-time, serta generator pesan siaran (broadcast) WhatsApp.",
    slug: "ibu-egar_bimbel-ahe",
    category: "Full-Stack",
    featured: true,
    status: "Production",
    stats: [
      { label: "Akses Peran", value: "Multi-Role RBAC" },
      { label: "Monitoring", value: "Live Board Presensi" },
      { label: "Komunikasi", value: "WA Broadcast Gen" },
    ],
    architecture: {
      flow: ["Role Interface (Admin/Mentor/Staf)", "Inertia Vue 3", "Laravel 13 Policy Layer", "Live Schedule Engine", "MySQL Database"],
      highlights: [
        "Hak akses berbasis peran (RBAC) granular untuk Admin Cabang, Mentor/Tutor, dan Staf Presensi",
        "Live Board presensi interaktif untuk staf presensi memantau okupansi slot belajar real-time",
        "Portal khusus mentor untuk absensi mengajar, pengajuan cuti, reschedule sesi, dan evaluasi hasil belajar",
      ],
    },
    metrics: {
      latency: "Real-Time Board",
      throughput: "Multi-Branch",
    },
    techStack: ["Laravel 13", "Vue 3", "Inertia.js", "Tailwind CSS v4", "Radix Vue", "Ziggy", "MySQL"],
    githubUrl: "https://github.com/F41541/ibu-egar_bimbel-ahe",
    caseStudyUrl: "/projects/ibu-egar_bimbel-ahe",
  },
];
