export interface CommandOutput {
  type: "text" | "tree" | "projects" | "skills" | "experience" | "contact" | "hire" | "stack" | "help" | "error";
  text?: string;
  data?: any;
}

export interface TerminalExecutionResult {
  clear?: boolean;
  output: CommandOutput;
}

export interface ProjectInfo {
  name: string;
  slug: string;
  tagline: string;
  tags: string[];
  metrics: string;
}

export interface SkillCategory {
  category: string;
  items: { name: string; level?: string; notes?: string }[];
}

export interface CareerItem {
  role: string;
  company: string;
  period: string;
  highlights: string[];
}

export const TERMINAL_PROJECTS: ProjectInfo[] = [
  {
    name: "Enterprise SaaS ERP & CRM",
    slug: "modern-saas-erp-crm",
    tagline: "Sistem ERP bisnis modular dengan arsitektur Laravel 11, Inertia, dan Vue 3",
    tags: ["Laravel 11", "Vue 3", "Inertia.js", "PostgreSQL", "Redis"],
    metrics: "250k+ tx/bln, p99 < 85ms",
  },
  {
    name: "Next.js 15 E-Commerce Portal",
    slug: "nextjs-ecommerce-portal",
    tagline: "Toko online ultra cepat dengan Server Actions, App Router & Payment Gateway",
    tags: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Midtrans"],
    metrics: "Lighthouse 99/100, LCP 0.8s",
  },
  {
    name: "RESTful API & Payment Hub",
    slug: "rest-api-payment-gateway",
    tagline: "Microservice routing pembayaran & webhook processing terpusat",
    tags: ["Laravel", "PHP 8.3", "Node.js", "Redis", "MySQL", "Docker"],
    metrics: "50k tx/day, zero loss",
  },
  {
    name: "Interactive UI Component Kit",
    slug: "developer-ui-component-kit",
    tagline: "Koleksi komponen UI modern & accessible untuk ekosistem Vue 3 & React",
    tags: ["Vue 3", "React 19", "TypeScript", "Tailwind CSS"],
    metrics: "40+ Components, 60 FPS",
  },
];

export const TERMINAL_SKILLS: SkillCategory[] = [
  {
    category: "Frontend & Web UI",
    items: [
      { name: "Vue.js Ecosystem", notes: "Vue 3, Nuxt 3, Composition API, Pinia" },
      { name: "React Ecosystem", notes: "React 19, Next.js 15 (App Router), Server Actions" },
      { name: "Full-Stack Bridge", notes: "Inertia.js (Vue & React)" },
      { name: "Styling & UI", notes: "Tailwind CSS, Radix UI, Framer Motion" },
    ],
  },
  {
    category: "Backend & Frameworks",
    items: [
      { name: "Laravel & PHP", notes: "Laravel 11/12, PHP 8.3+, Service Layer, Eloquent" },
      { name: "Node.js / Express", notes: "TypeScript REST APIs, Middleware, Async Worker" },
      { name: "API & Webhooks", notes: "RESTful Design, Swagger/OpenAPI, Payment Integrations" },
    ],
  },
  {
    category: "Database & Caching",
    items: [
      { name: "Relational DB", notes: "MySQL, PostgreSQL, Prisma ORM, Indexing Optimization" },
      { name: "In-Memory Store", notes: "Redis (Caching, Queue Workers, Rate Limiting)" },
    ],
  },
  {
    category: "DevOps & Tooling",
    items: [
      { name: "Containers & OS", notes: "Docker, Docker Compose, Linux Ubuntu, Nginx" },
      { name: "CI/CD & Hosting", notes: "GitHub Actions, VPS Linux, Vercel, Git" },
    ],
  },
];

export const TERMINAL_EXPERIENCE: CareerItem[] = [
  {
    role: "Lead Full-Stack Web Developer",
    company: "Digital Inovasi Studio",
    period: "2023 - Sekarang",
    highlights: [
      "Memimpin arsitektur web ERP & CRM dengan Laravel 11, Inertia, dan Vue 3.",
      "Optimasi query database PostgreSQL & Redis caching, memangkas latensi API hingga <90ms.",
      "Membangun design system komponen reusable untuk mempercepat sprint tim.",
    ],
  },
  {
    role: "Senior Frontend & Web Developer",
    company: "Nusantara Tech Solusindo",
    period: "2021 - 2023",
    highlights: [
      "Memimpin migrasi web portal ke Next.js 15 & Tailwind CSS (Core Web Vitals Skor 98+).",
      "Mengembangkan SPA POS & E-Commerce berbasis Vue 3 dengan integrasi payment gateway.",
      "Mengurangi bundle JavaScript sebesar 35% melalui code-splitting dan dynamic imports.",
    ],
  },
  {
    role: "Full-Stack Web Developer",
    company: "Kreasi Media Solusi",
    period: "2020 - 2021",
    highlights: [
      "Merancang dan mendeploy 15+ aplikasi web kustom menggunakan Laravel & Vue.js.",
      "Membangun modul RBAC dan custom report generator berbasis data relasional.",
    ],
  },
];

export const TERMINAL_CONTACT = {
  email: "faisal.fahri@example.com",
  github: "https://github.com/laxcyyfa",
  linkedin: "https://linkedin.com/in/mfaisalfahri",
  location: "Indonesia (WIB / UTC+7)",
};

export const TERMINAL_HIRE = {
  status: "🟢 Available for full-time / freelance opportunities",
  roles: [
    "Full-Stack Web Developer (Laravel + Vue / React)",
    "Senior Frontend Developer (Vue.js / Next.js / TypeScript)",
    "Web Application Consultant & Architecture Review",
  ],
  engagementTypes: [
    "Full-Time (Remote / Hybrid)",
    "Contract / Project-based Development",
    "Technical Consultation & Code Review",
  ],
  focusAreas: [
    "Modern Web App Development (Laravel 11, Inertia.js, Vue 3, Next.js 15)",
    "API & Database Optimization (PostgreSQL, MySQL, Redis)",
    "High-Performance Frontend & Design Systems (Tailwind CSS, TypeScript)",
  ],
};

export const TERMINAL_WHOAMI = {
  name: "M. Faisal Fahri",
  role: "Full-Stack Web Developer & Spesialis Frontend",
  location: "Indonesia (WIB / UTC+7)",
  bio: "Full-Stack Web Developer yang berfokus membangun aplikasi web modern yang cepat, clean, dan mudah dimaintain. Berpengalaman luas dalam ekosistem Laravel, Vue.js, React, Next.js, dan arsitektur database relasional.",
  interests: ["Arsitektur Web Modern", "Laravel & Inertia.js", "Vue 3 & React / Next.js", "Performa Web & UX"],
};

export const TERMINAL_STACK = {
  runtime: "Next.js 16 (Turbopack) + React 19 + TypeScript",
  frontend_ecosystem: "Vue 3, Nuxt 3, React 19, Next.js 16, Inertia.js, Tailwind CSS",
  backend_stack: "Laravel 11/12, PHP 8.3+, Node.js, Express",
  database_cache: "PostgreSQL, MySQL, Redis, Prisma ORM, Eloquent",
  devops_infra: "Docker, Docker Compose, Linux Nginx, GitHub Actions, Vercel",
};

export const AVAILABLE_COMMANDS = [
  { command: "help", description: "Menampilkan daftar perintah terminal yang tersedia" },
  { command: "skills", description: "Lihat ringkasan keahlian (Frontend, Backend, Database, DevOps)" },
  { command: "projects", description: "Eksplorasi proyek-proyek unggulan dan sistem web" },
  { command: "experience", description: "Riwayat pengalaman kerja dan rekam jejak teknis" },
  { command: "hire", description: "Status ketersediaan proyek, role target, dan model kerjasama" },
  { command: "contact", description: "Informasi kontak langsung, email, dan link sosial" },
  { command: "whoami", description: "Profil singkat, bio, dan fokus keahlian M. Faisal Fahri" },
  { command: "stack", description: "Arsitektur tech stack yang digunakan" },
  { command: "clear", description: "Bersihkan layar terminal" },
];

export function executeTerminalCommand(input: string): TerminalExecutionResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      output: {
        type: "text",
        text: "",
      },
    };
  }

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (cmd) {
    case "clear":
    case "cls":
      return {
        clear: true,
        output: {
          type: "text",
          text: "",
        },
      };

    case "help":
    case "?":
    case "man":
      return {
        output: {
          type: "help",
          data: AVAILABLE_COMMANDS,
        },
      };

    case "skills":
    case "skill":
    case "tech":
    case "techstack":
      return {
        output: {
          type: "skills",
          data: TERMINAL_SKILLS,
        },
      };

    case "projects":
    case "project":
    case "work":
    case "portfolio":
      return {
        output: {
          type: "projects",
          data: TERMINAL_PROJECTS,
        },
      };

    case "experience":
    case "exp":
    case "history":
    case "resume":
    case "career":
      return {
        output: {
          type: "experience",
          data: TERMINAL_EXPERIENCE,
        },
      };

    case "contact":
    case "email":
    case "social":
    case "reach":
      return {
        output: {
          type: "contact",
          data: TERMINAL_CONTACT,
        },
      };

    case "hire":
    case "hireme":
    case "availability":
    case "status":
      return {
        output: {
          type: "hire",
          data: TERMINAL_HIRE,
        },
      };

    case "whoami":
    case "about":
    case "bio":
    case "author":
      return {
        output: {
          type: "text",
          data: TERMINAL_WHOAMI,
          text: `Nama: ${TERMINAL_WHOAMI.name}\nRole: ${TERMINAL_WHOAMI.role}\nLokasi: ${TERMINAL_WHOAMI.location}\n\n${TERMINAL_WHOAMI.bio}\n\nFokus: ${TERMINAL_WHOAMI.interests.join(" • ")}`,
        },
      };

    case "stack":
    case "sysinfo":
    case "specs":
      return {
        output: {
          type: "stack",
          data: TERMINAL_STACK,
        },
      };

    case "sudo":
      return {
        output: {
          type: "error",
          text: `sudo: permission denied: ${args.join(" ") || "command"}. Mode guest aktif.`,
        },
      };

    case "exit":
    case "quit":
      return {
        output: {
          type: "text",
          text: "Sesi terminal interaktif tetap aktif. Ketik 'help' untuk daftar perintah.",
        },
      };

    default: {
      const lower = trimmed.toLowerCase();
      if (lower.includes("halo") || lower.includes("hello") || lower.includes("hi") || lower.includes("hai")) {
        return {
          output: {
            type: "text",
            text: "Halo! Terminal interaktif M. Faisal Fahri siap digunakan. Ketik 'help' atau klik tombol perintah di atas untuk mulai eksplorasi.",
          },
        };
      }

      if (lower.includes("laravel") || lower.includes("vue") || lower.includes("react") || lower.includes("next")) {
        return {
          output: {
            type: "text",
            text: "Keahlian utama mencakup Laravel 11/12, Vue 3, React 19, Next.js 15, dan Inertia.js. Ketik 'skills' atau 'projects' untuk melihat detailnya.",
          },
        };
      }

      if (lower.includes("rate") || lower.includes("gaji") || lower.includes("hire") || lower.includes("available")) {
        return {
          output: {
            type: "hire",
            data: TERMINAL_HIRE,
          },
        };
      }

      return {
        output: {
          type: "error",
          text: `Perintah tidak ditemukan: "${trimmed}". Ketik 'help' untuk melihat daftar perintah.`,
        },
      };
    }
  }
}
