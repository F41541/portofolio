export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  type: "Full-time" | "Contract" | "Leadership" | "Advisory" | "Freelance";
  current?: boolean;
  description: string;
  achievements: string[];
  techStack: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "lead-fullstack-engineer",
    role: "Lead Full-Stack Web Developer",
    company: "Digital Inovasi Studio",
    companyUrl: "https://example.com",
    location: "Indonesia (Remote / Hybrid)",
    period: "2023 — Sekarang",
    type: "Full-time",
    current: true,
    description:
      "Memimpin arsitektur aplikasi web full-stack, perancangan RESTful API terintegrasi, dan pengembangan dashboard interaktif berbasis Vue.js & React/Next.js.",
    achievements: [
      "Mengembangkan platform ERP & CRM berbasis Laravel dan Inertia Vue 3 yang mempercepat alur operasional klien hingga 40%.",
      "Mengoptimalkan query database PostgreSQL/MySQL dan Redis caching sehingga memangkas waktu load endpoint API dari 850ms ke <90ms.",
      "Membangun reusable UI component system dengan Tailwind CSS dan TypeScript untuk meningkatkan konsistensi dan kecepatan sprint tim developer.",
      "Mengimplementasikan pipeline CI/CD otomatis via GitHub Actions dan containerized deployment dengan Docker.",
    ],
    techStack: ["Laravel", "Vue.js", "Inertia.js", "React", "Next.js", "TypeScript", "Tailwind CSS", "MySQL", "PostgreSQL", "Docker", "Redis"],
  },
  {
    id: "senior-frontend-developer",
    role: "Senior Frontend & Web Developer",
    company: "Nusantara Tech Solusindo",
    companyUrl: "https://example.com",
    location: "Jakarta, Indonesia",
    period: "2021 — 2023",
    type: "Full-time",
    description:
      "Bertanggung jawab atas arsitektur frontend frontend-heavy client applications, migrasi ke Next.js & Vue 3, serta integrasi REST API real-time.",
    achievements: [
      "Memimpin migrasi web portal legacy ke Next.js (App Router) & Tailwind CSS, meningkatkan skor Google Core Web Vitals (LCP < 1.2s, Skor 98+).",
      "Mengembangkan sistem POS & E-Commerce SPA berbasis Vue 3 (Pinia) dengan integrasi payment gateway Midtrans dan Xendit.",
      "Mengurangi ukuran bundle JavaScript sebesar 35% melalui code-splitting cerdas dan dynamic imports.",
      "Berkolaborasi erat dengan Product Manager dan UI/UX Designer untuk menerjemahkan wireframe Figma menjadi kode modular siap produksi.",
    ],
    techStack: ["Vue.js", "Nuxt.js", "React", "Next.js", "TypeScript", "Tailwind CSS", "REST API", "Pinia", "Zustand"],
  },
  {
    id: "full-stack-web-developer",
    role: "Full-Stack Web Developer",
    company: "Kreasi Media Solusi",
    companyUrl: "https://example.com",
    location: "Bandung, Indonesia",
    period: "2020 — 2021",
    type: "Full-time",
    description:
      "Membangun aplikasi web berbasis Laravel dan JavaScript modern untuk berbagai klien industri enterprise, pendidikan, dan UMKM.",
    achievements: [
      "Merancang dan mendeploy 15+ website dan web application kustom menggunakan Laravel, Blade, Vue.js, dan MySQL.",
      "Membangun modul autentikasi role-based access control (RBAC) dan custom reporting engine dengan export Excel/PDF.",
      "Mengintegrasikan layanan third-party seperti SMS/WhatsApp Gateway, Mailgun, dan Cloud Storage (S3 / Cloudinary).",
    ],
    techStack: ["Laravel", "PHP", "Vue.js", "JavaScript", "Bootstrap", "Tailwind CSS", "MySQL", "Git"],
  },
  {
    id: "freelance-web-consultant",
    role: "Freelance Web Developer & Consultant",
    company: "Self-Employed",
    companyUrl: "https://github.com/laxcyyfa",
    location: "Remote",
    period: "2019 — 2020",
    type: "Freelance",
    description:
      "Menyediakan jasa konsultasi dan pengembangan website kustom, landing page performa tinggi, dan perbaikan performa website klien.",
    achievements: [
      "Menyelesaikan 20+ proyek website company profile, landing page, dan sistem inventaris untuk berbagai klien UMKM dan startup lokal.",
      "Membantu klien meningkatkan SEO on-page dan page speed performance hingga mencapai skor hijau Google Lighthouse.",
    ],
    techStack: ["Laravel", "Vue.js", "PHP", "JavaScript", "HTML/CSS", "WordPress", "MySQL"],
  },
];
