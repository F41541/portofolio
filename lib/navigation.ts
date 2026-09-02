export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  tags: string[];
}

export interface BlogPostItem {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface RouteItem {
  name: string;
  href: string;
  description: string;
  shortcut?: string;
}

export interface SocialLinkItem {
  name: string;
  href: string;
  handle: string;
  external: true;
}

export const NAV_ROUTES: RouteItem[] = [
  { name: "Beranda", href: "/", description: "Ringkasan & Sorotan Utama" },
  { name: "Proyek", href: "/projects", description: "Aplikasi web, sistem produksi & open source" },
  { name: "Artikel", href: "/blog", description: "Tulisan teknis & catatan engineering" },
  { name: "Tentang", href: "/about", description: "Latar belakang, tech stack & pengalaman" },
  { name: "Kontak", href: "/contact", description: "Hubungi untuk diskusi & kolaborasi proyek" },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "autonomous-agent-platform",
    title: "Enterprise SaaS ERP & CRM Platform",
    description: "Platform manajemen bisnis terpadu berbasis Laravel 11, Inertia, dan Vue 3.",
    category: "Full-Stack",
    href: "/projects/autonomous-agent-platform",
    tags: ["Laravel 11", "Vue 3", "Inertia.js", "PostgreSQL"],
  },
  {
    id: "distributed-rag-engine",
    title: "Modern Next.js 15 E-Commerce Portal",
    description: "Toko online berkecepatan tinggi dengan Server Actions dan integrasi payment gateway.",
    category: "Frontend & SPA",
    href: "/projects/distributed-rag-engine",
    tags: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "high-throughput-event-stream",
    title: "RESTful API & Payment Gateway Hub",
    description: "Backend microservice terpusat untuk routing transaksi dan pemrosesan webhook.",
    category: "Backend & API",
    href: "/projects/high-throughput-event-stream",
    tags: ["Laravel", "PHP 8.3", "Redis", "MySQL"],
  },
  {
    id: "developer-knowledge-canvas",
    title: "Modern Interactive UI Component System",
    description: "Koleksi komponen UI modern dan accessible untuk ekosistem Vue 3 & React.",
    category: "Open Source",
    href: "/projects/developer-knowledge-canvas",
    tags: ["Vue 3", "React 19", "TypeScript", "Tailwind CSS"],
  },
];

export const BLOG_POSTS_DATA: BlogPostItem[] = [
  {
    id: "optimizing-nextjs-web-vitals",
    title: "Optimasi Next.js 15 untuk Performa Core Web Vitals Skala Besar",
    description: "Teknik mencapai skor hijau Core Web Vitals dengan RSC streaming dan edge caching.",
    category: "Frontend",
    href: "/blog/optimizing-nextjs-web-vitals",
    date: "Jan 2026",
    readTime: "5 menit baca",
    tags: ["Next.js", "React", "Performa"],
  },
  {
    id: "building-resilient-ai-agents",
    title: "Membangun Arsitektur Aplikasi Web Skalabel & Fault-Tolerant",
    description: "Prinsip state persistence, circuit breaker, dan error handling tangguh pada web production.",
    category: "Arsitektur",
    href: "/blog/building-resilient-ai-agents",
    date: "Feb 2026",
    readTime: "7 menit baca",
    tags: ["Arsitektur", "Laravel", "Backend"],
  },
  {
    id: "distributed-vector-search",
    title: "Strategi Optimasi Query Relasional dan Caching Redis pada Beban Tinggi",
    description: "Meningkatkan throughput endpoint database dari ratusan milidetik menjadi hitungan milidetik.",
    category: "Database",
    href: "/blog/distributed-vector-search",
    date: "Jan 2026",
    readTime: "6 menit baca",
    tags: ["Database", "PostgreSQL", "Redis"],
  },
];

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    name: "GitHub",
    href: "https://github.com/laxcyyfa",
    handle: "@laxcyyfa",
    external: true,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/mfaisalfahri",
    handle: "in/mfaisalfahri",
    external: true,
  },
  {
    name: "Email",
    href: "mailto:faisal.fahri@example.com",
    handle: "faisal.fahri@example.com",
    external: true,
  },
];
