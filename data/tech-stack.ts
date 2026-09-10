export type TechCategory =
  | "all"
  | "frontend"
  | "backend"
  | "database"
  | "tools-devops";

export interface TechItem {
  name: string;
  category: "frontend" | "backend" | "database" | "tools-devops";
  level: "Mastery" | "Advanced" | "Proficient";
  years: number;
  productionUsage: string;
  featured?: boolean;
  tags: string[];
}

export const TECH_STACK: TechItem[] = [
  // Frontend & Web Architecture
  {
    name: "Vue 3 & Inertia.js",
    category: "frontend",
    level: "Mastery",
    years: 3,
    productionUsage: "Single Page Applications (SPA), Composition API, Inertia bridge tanpa REST boilerplate, integrasi modular dengan Laravel backend.",
    featured: true,
    tags: ["Vue 3", "Inertia.js", "Composition API", "Radix Vue"],
  },
  {
    name: "React & Next.js",
    category: "frontend",
    level: "Advanced",
    years: 2,
    productionUsage: "App Router, Server Components, SSR rendering, performa Core Web Vitals, dan arsitektur komponen modular responsif.",
    featured: true,
    tags: ["React 19", "Next.js 15", "App Router", "SSR"],
  },
  {
    name: "TypeScript",
    category: "frontend",
    level: "Advanced",
    years: 2,
    productionUsage: "Type-safety end-to-end, schema validation contracts, refactoring aman, dan pencegahan runtime error.",
    featured: true,
    tags: ["Type Safety", "Generics", "Strict", "Clean Code"],
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    level: "Mastery",
    years: 3,
    productionUsage: "Design system tokens, styling responsif mobile-first, animasi transisi halus, serta implementasi dark mode.",
    featured: true,
    tags: ["Tailwind v3/v4", "Design Systems", "Responsive UI", "Dark Mode"],
  },

  // Backend & APIs
  {
    name: "Laravel (PHP)",
    category: "backend",
    level: "Mastery",
    years: 3,
    productionUsage: "Laravel 11/12/13, Service Layer architecture, Queue jobs, Eloquent ORM, Spatie Permissions, dan Stancl Tenancy (Multi-Tenant).",
    featured: true,
    tags: ["Laravel 12/13", "PHP 8.2+", "Stancl Tenancy", "Eloquent", "Queues"],
  },
  {
    name: "RESTful API & Integrasi",
    category: "backend",
    level: "Mastery",
    years: 3,
    productionUsage: "Desain API standar, webhook handling pembayaran (Duitku), rate limiting, sanitasi input, dan dokumentasi endpoint.",
    featured: true,
    tags: ["REST API", "Payment Webhooks", "Duitku API", "JSON"],
  },

  // Databases & Cache
  {
    name: "MySQL & PostgreSQL",
    category: "database",
    level: "Mastery",
    years: 3,
    productionUsage: "Perancangan skema relasional, indexing terstruktur, migrasi database, relasi multi-table kompleks, dan transaksi ACID.",
    featured: true,
    tags: ["MySQL", "PostgreSQL", "Relational DB", "Indexing"],
  },
  {
    name: "Redis",
    category: "database",
    level: "Advanced",
    years: 2,
    productionUsage: "In-memory caching untuk data frekuensi tinggi, session caching, dan background queue processing.",
    featured: true,
    tags: ["Redis", "Caching", "Queues"],
  },

  // Tools, Cloud & DevOps
  {
    name: "Git & GitHub",
    category: "tools-devops",
    level: "Mastery",
    years: 3,
    productionUsage: "Version control sistematis, manajemen branch, repositori open-source, dan kolaborasi kode.",
    featured: true,
    tags: ["Git", "GitHub", "Version Control"],
  },
  {
    name: "Docker & Containerization",
    category: "tools-devops",
    level: "Advanced",
    years: 2,
    productionUsage: "Containerization lingkungan dev/prod dengan Docker Compose (PHP-FPM, Nginx, MySQL, Redis).",
    featured: true,
    tags: ["Docker", "Docker Compose", "Nginx"],
  },
  {
    name: "Linux & Server Environment",
    category: "tools-devops",
    level: "Advanced",
    years: 3,
    productionUsage: "Pengoperasian sistem server Linux (Ubuntu), Nginx reverse proxy, shell automation, dan process management.",
    featured: false,
    tags: ["Linux", "Ubuntu", "Bash", "Nginx"],
  },
];

export const TECH_CATEGORIES: { id: TechCategory; label: string; count?: number }[] = [
  { id: "all", label: "Semua Teknologi" },
  { id: "frontend", label: "Frontend & Web UI" },
  { id: "backend", label: "Backend & API" },
  { id: "database", label: "Database & Cache" },
  { id: "tools-devops", label: "DevOps & Tooling" },
];
