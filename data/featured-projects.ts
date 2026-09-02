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
    id: "modern-saas-erp-crm",
    title: "Enterprise SaaS ERP & CRM Platform",
    tagline: "Platform manajemen bisnis terpadu berbasis Laravel 11, Inertia.js, dan Vue 3 dengan real-time dashboard.",
    description:
      "Aplikasi enterprise all-in-one yang mengelola modul finansial, inventaris multi-gudang, manajemen pesanan, dan CRM. Dibangun menggunakan arsitektur modular di Laravel dengan frontend reaktif Vue 3 melalui Inertia.js, dilengkapi background queue processing untuk ekspor data skala besar.",
    slug: "autonomous-agent-platform",
    category: "Full-Stack",
    featured: true,
    status: "Production",
    stats: [
      { label: "Transaksi / Bln", value: "250k+" },
      { label: "Waktu Respon", value: "<85ms" },
      { label: "Uptime Sistem", value: "99.98%" },
    ],
    architecture: {
      flow: ["Client (Vue 3 + Tailwind)", "Inertia Bridge", "Laravel 11 App Layer", "Redis Queue & Cache", "PostgreSQL DB"],
      highlights: [
        "Single-Page App experience tanpa REST API overhead berlebih",
        "Role-Based Access Control (RBAC) granular hingga level permission fitur",
        "Optimasi query Eloquent dengan eager loading & database indexing terstruktur",
      ],
    },
    metrics: {
      latency: "<85ms",
      throughput: "1.2k rps",
      uptime: "99.98%",
    },
    techStack: ["Laravel 11", "Vue 3", "Inertia.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Redis", "Docker"],
    githubUrl: "https://github.com/laxcyyfa/saas-erp-platform",
    liveDemoUrl: "https://demo.faisalfahri.dev/erp",
    caseStudyUrl: "/projects/autonomous-agent-platform",
  },
  {
    id: "nextjs-ecommerce-portal",
    title: "High-Performance Modern E-Commerce Platform",
    tagline: "Platform e-commerce kilat dengan Next.js 15 App Router, Server Actions, dan Midtrans Gateway.",
    description:
      "Toko daring modern dengan fokus pada performa Core Web Vitals dan SEO optimal. Memanfaatkan Next.js 15 Server Components untuk dynamic streaming render, integrasi checkout multi-payment gateway, kalkulasi ongkos kirim real-time, dan headless CMS.",
    slug: "distributed-rag-engine",
    category: "Frontend & SPA",
    featured: true,
    status: "Production",
    stats: [
      { label: "Lighthouse Score", value: "99/100" },
      { label: "LCP Performance", value: "0.8s" },
      { label: "Checkout Conversion", value: "+28%" },
    ],
    architecture: {
      flow: ["Next.js 15 RSC", "Edge Caching", "Server Actions", "Payment Webhook Handler", "PostgreSQL DB"],
      highlights: [
        "Rendering SSR dengan streaming Suspense untuk pengalaman belanja instan",
        "Validasi form tipe-aman dengan Zod dan React Hook Form",
        "Integrasi webhook payment otomatis dengan proteksi idempotent",
      ],
    },
    metrics: {
      latency: "<50ms",
      throughput: "3.5k rps",
      uptime: "99.99%",
    },
    techStack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Midtrans API"],
    githubUrl: "https://github.com/laxcyyfa/nextjs-ecommerce-portal",
    liveDemoUrl: "https://ecommerce.faisalfahri.dev",
    caseStudyUrl: "/projects/distributed-rag-engine",
  },
  {
    id: "rest-api-payment-gateway",
    title: "High-Throughput RESTful API & Payment Gateway Hub",
    tagline: "Backend microservice terpusat untuk routing transaksi, multi-channel notification, dan webhook handling.",
    description:
      "Layanan backend performa tinggi yang menghubungkan berbagai gateway pembayaran dan vendor pihak ketiga dengan sistem internal. Menggunakan asynchronous job queues di Redis, rate limiting otomatis, serta logging audit trail transaksi yang mendalam.",
    slug: "high-throughput-event-stream",
    category: "Backend & API",
    featured: true,
    status: "Production",
    stats: [
      { label: "Daily Transactions", value: "50,000+" },
      { label: "Webhook Processing", value: "<120ms" },
      { label: "Zero Loss Semantics", value: "100%" },
    ],
    architecture: {
      flow: ["API Gateway / Nginx", "Laravel / Node Service", "Redis Queue Cluster", "Database Outbox", "Third-Party APIs"],
      highlights: [
        "Sistem retry otomatis dengan exponential backoff untuk kegagalan webhook",
        "Enkripsi payload sensitif standar PCI-DSS compliance",
        "Dokumentasi interaktif OpenAPI / Swagger terintegrasi",
      ],
    },
    metrics: {
      latency: "12ms",
      throughput: "2.5k rps",
      uptime: "99.99%",
    },
    techStack: ["Laravel", "PHP 8.3", "Node.js", "Redis", "MySQL", "Docker", "Nginx"],
    githubUrl: "https://github.com/laxcyyfa/payment-gateway-hub",
    liveDemoUrl: "https://api-docs.faisalfahri.dev",
    caseStudyUrl: "/projects/high-throughput-event-stream",
  },
  {
    id: "developer-ui-component-kit",
    title: "Modern Interactive UI Component System",
    tagline: "Koleksi komponen UI modern, accessible, dan modular untuk framework Vue 3 & React.",
    description:
      "Design system opensource yang dirancang untuk mempercepat perakitan antarmuka web modern. Mendukung dark mode dinamis, keyboard navigation lengkap (WAI-ARIA compliant), dan integrasi mulus dengan Tailwind CSS.",
    slug: "developer-knowledge-canvas",
    category: "Open Source",
    featured: true,
    status: "Open Source",
    stats: [
      { label: "Komponen", value: "40+ UI Kits" },
      { label: "Aksesibilitas", value: "WCAG AA" },
      { label: "Framework", value: "Vue 3 & React" },
    ],
    architecture: {
      flow: ["Core Design Tokens", "Tailwind Plugin", "Vue & React Primitives", "Docsite Playground"],
      highlights: [
        "Headless primitives dengan fleksibilitas styling tak terbatas",
        "Dukungan penuh TypeScript dengan auto-complete props akurat",
        "Ukuran bundle ekstra ringan dengan zero unnecessary dependencies",
      ],
    },
    metrics: {
      latency: "0ms overhead",
      throughput: "60 fps",
    },
    techStack: ["Vue 3", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/laxcyyfa/developer-ui-kit",
    liveDemoUrl: "https://ui-kit.faisalfahri.dev",
    caseStudyUrl: "/projects/developer-knowledge-canvas",
  },
];
