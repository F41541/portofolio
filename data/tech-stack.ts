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
  iconSlug?: string;
  tags: string[];
}

export interface TechCategoryGroup {
  id: TechCategory;
  name: string;
  description: string;
  skills: TechItem[];
}

export const TECH_STACK: TechItem[] = [
  // Frontend & Web Architecture
  {
    name: "Vue.js & Nuxt",
    category: "frontend",
    level: "Mastery",
    years: 4,
    productionUsage: "Single Page Applications (SPA), SSR dengan Nuxt 3, Composition API, Pinia state management, dan arsitektur komponen modular responsif.",
    featured: true,
    tags: ["Vue 3", "Nuxt 3", "Composition API", "Pinia"],
  },
  {
    name: "React 19 & Next.js 15",
    category: "frontend",
    level: "Mastery",
    years: 4,
    productionUsage: "App Router, Server Components (RSC), dynamic server action mutations, optimasi Core Web Vitals, dan performa client-side fluid.",
    featured: true,
    tags: ["React 19", "Next.js 15", "App Router", "Server Actions"],
  },
  {
    name: "TypeScript",
    category: "frontend",
    level: "Mastery",
    years: 4,
    productionUsage: "Type-safety end-to-end, dynamic generic utilities, typing schema validasi, integrasi API contracts, dan minim runtime errors.",
    featured: true,
    tags: ["Type Safety", "Generics", "Strict", "Clean Code"],
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    level: "Mastery",
    years: 4,
    productionUsage: "Design system custom tokens, dark mode and high-contrast styling, responsive layouts, dan animasi UI interaktif modern.",
    featured: true,
    tags: ["Design Systems", "CSS3", "Responsive", "UI/UX"],
  },
  {
    name: "Inertia.js",
    category: "frontend",
    level: "Mastery",
    years: 3,
    productionUsage: "Monolith modern tanpa REST boilerplate: integrasi seamless Laravel backend dengan frontend Vue 3 atau React.",
    featured: true,
    tags: ["Full-Stack", "Inertia Vue", "Inertia React", "SPA Monolith"],
  },

  // Backend & APIs
  {
    name: "Laravel (PHP)",
    category: "backend",
    level: "Mastery",
    years: 5,
    productionUsage: "RESTful API development, Service Layer architecture, Queue jobs, Event-driven architecture, Eloquent ORM, dan Sanctum / JWT authentication.",
    featured: true,
    tags: ["Laravel 11/12", "PHP 8.3+", "REST API", "Queues", "Eloquent"],
  },
  {
    name: "Node.js & Express / NestJS",
    category: "backend",
    level: "Advanced",
    years: 3,
    productionUsage: "Microservices, async I/O streaming, API Gateway, middleware autentikasi, serta integrasi webhook payment & third-party services.",
    featured: true,
    tags: ["Node.js", "Express", "REST API", "Backend"],
  },
  {
    name: "RESTful API & Webhooks",
    category: "backend",
    level: "Mastery",
    years: 5,
    productionUsage: "Desain API standar industri, API rate limiting, robust error handling, webhook idempotency, dan dokumentasi OpenAPI/Swagger.",
    featured: false,
    tags: ["REST", "Webhooks", "Swagger", "Postman"],
  },

  // Databases & Cache
  {
    name: "MySQL & PostgreSQL",
    category: "database",
    level: "Mastery",
    years: 5,
    productionUsage: "Relational database schema design, indexing optimization (B-Tree/GIN), complex query profiling, migrations, dan ACID transactions.",
    featured: true,
    tags: ["Relational DB", "SQL", "Indexing", "Query Optimization"],
  },
  {
    name: "Redis",
    category: "database",
    level: "Advanced",
    years: 3,
    productionUsage: "High-speed in-memory caching, rate-limiting, session management, dan asynchronous queue background processing.",
    featured: true,
    tags: ["In-Memory", "Caching", "Queues", "Rate Limiting"],
  },
  {
    name: "Prisma ORM / Eloquent",
    category: "database",
    level: "Mastery",
    years: 4,
    productionUsage: "Database abstraction, schema migrations otomatis, relasi multi-table kompleks, dan query batching hemat bandwidth.",
    featured: false,
    tags: ["ORM", "Migrations", "Schema Design"],
  },

  // Tools, Cloud & DevOps
  {
    name: "Git & GitHub",
    category: "tools-devops",
    level: "Mastery",
    years: 5,
    productionUsage: "Branching strategies (Gitflow/Trunk-based), code review workflows, pull request automation, dan semantic release tagging.",
    featured: true,
    tags: ["Version Control", "GitHub", "Code Review"],
  },
  {
    name: "Docker & Containerization",
    category: "tools-devops",
    level: "Advanced",
    years: 3,
    productionUsage: "Multi-stage production Dockerfile, konsistensi dev/prod environment dengan Docker Compose (PHP-FPM, Nginx, Node, Postgres, Redis).",
    featured: true,
    tags: ["Containers", "Docker Compose", "Nginx", "PHP-FPM"],
  },
  {
    name: "CI/CD & Deployment (GitHub Actions, Vercel, VPS)",
    category: "tools-devops",
    level: "Advanced",
    years: 3,
    productionUsage: "Automated test runner, automated build/deploy ke VPS Linux (Nginx/SSL Certbot) dan cloud hosting modern seperti Vercel / Railway.",
    featured: false,
    tags: ["CI/CD", "Linux VPS", "Nginx", "GitHub Actions", "Vercel"],
  },
  {
    name: "Linux & Terminal (Ubuntu/Debian)",
    category: "tools-devops",
    level: "Advanced",
    years: 4,
    productionUsage: "Server configuration, Nginx reverse proxy, cron jobs, process manager (Supervisor, PM2), dan shell scripting automation.",
    featured: false,
    tags: ["Linux", "Bash", "Nginx", "PM2", "Supervisor"],
  },
];

export const TECH_CATEGORIES: { id: TechCategory; label: string; count?: number }[] = [
  { id: "all", label: "Semua Teknologi" },
  { id: "frontend", label: "Frontend & Web UI" },
  { id: "backend", label: "Backend & API" },
  { id: "database", label: "Database & Cache" },
  { id: "tools-devops", label: "DevOps & Tooling" },
];
