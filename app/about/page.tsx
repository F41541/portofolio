import type { Metadata } from "next";
import Link from "next/link";
import {
  Cpu,
  Layers,
  Sparkles,
  Terminal,
  Code2,
  Server,
  Shield,
  Zap,
  GraduationCap,
  Award,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Laptop,
  Box,
  Binary,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProfilePageJsonLd, BreadcrumbListJsonLd } from "@/components/seo";

export const metadata: Metadata = {
  title: "Tentang Saya | M. Faisal Fahri - Full-Stack Web Developer",
  description:
    "Filosofi engineering, perjalanan pengembangan web full-stack, stack teknologi Laravel, Vue, React, Next.js, dan kontribusi proyek M. Faisal Fahri.",
  openGraph: {
    title: "Tentang Saya | M. Faisal Fahri - Full-Stack Web Developer",
    description:
      "Perjalanan karir dari web development hingga arsitektur aplikasi modern berkinerja tinggi.",
  },
};

const PHILOSOPHIES = [
  {
    icon: <Layers className="w-5 h-5 text-emerald-400" />,
    title: "Clean Architecture & Maintainability",
    subtitle: "Kerapian & Keteraturan Kode",
    description:
      "Kode yang baik bukan hanya berjalan tanpa error, tapi mudah dibaca dan dikembangkan oleh tim. Saya mengutamakan arsitektur terstruktur (Service Layer, Repositories, Domain-Driven Design) agar aplikasi siap diskalakan.",
  },
  {
    icon: <Zap className="w-5 h-5 text-cyan-400" />,
    title: "Performa & Core Web Vitals",
    subtitle: "Kecepatan Tanpa Kompromi",
    description:
      "Pengalaman pengguna berbanding lurus dengan kecepatan loading. Dari optimasi query database (eager loading, index, Redis cache) hingga code-splitting dan SSR pada frontend.",
  },
  {
    icon: <Code2 className="w-5 h-5 text-emerald-400" />,
    title: "Komponen Reusable & Type Safety",
    subtitle: "Efisiensi Siklus Pengembangan",
    description:
      "Menggunakan TypeScript dan Tailwind CSS untuk menciptakan sistem komponen modular yang konsisten, aman dari runtime error, dan mempercepat delivery fitur baru.",
  },
  {
    icon: <Shield className="w-5 h-5 text-cyan-400" />,
    title: "Keamanan & Integritas Data",
    subtitle: "Security by Design",
    description:
      "Menerapkan proteksi keamanan standar industri pada level aplikasi (CSRF, XSS prevention, SQL injection defense, sanitasi input, rate limiting, dan hashing transaksi sensitif).",
  },
];

const HARDWARE_STACK = [
  {
    label: "Main Laptop",
    spec: "Laptop Workstation (AMD Ryzen / Intel Core i7, 32GB RAM, 1TB NVMe SSD)",
    desc: "Perangkat utama untuk development full-stack, multitasking Docker, dan build tools cepat",
  },
  {
    label: "Testing & Server VPS",
    spec: "Cloud VPS Linux Ubuntu Server (Nginx, Docker Compose, PostgreSQL, Redis)",
    desc: "Staging dan live production environment untuk simulasi beban server nyata",
  },
  {
    label: "Display & Setup",
    spec: "Dual Monitor 27\" IPS Display + Mechanical Keyboard",
    desc: "Setup ergonomis untuk fokus coding dan debugging jangka panjang",
  },
];

const SOFTWARE_STACK = [
  {
    category: "Editor & Terminal",
    items: ["VS Code / Cursor", "PHPStorm / WebStorm", "Zsh + Oh My Zsh", "Git CLI"],
  },
  {
    category: "Backend & Database",
    items: ["Laravel (PHP 8.3+)", "Node.js & Express", "MySQL & PostgreSQL", "Redis Cache"],
  },
  {
    category: "Frontend & UI",
    items: ["Vue 3 & Nuxt 3", "React 19 & Next.js 15", "TypeScript", "Tailwind CSS", "Inertia.js"],
  },
  {
    category: "DevOps & Tools",
    items: ["Docker & Compose", "GitHub Actions CI/CD", "Nginx Web Server", "Postman / Insomnia"],
  },
];

const CREDENTIALS = [
  {
    title: "Bachelor of Computer Science (S.Kom)",
    issuer: "Universitas / Institut Teknologi",
    period: "Pendidikan Formal",
    detail: "Fokus pada Rekayasa Perangkat Lunak, Basis Data Relasional, dan Algoritma Pemrograman.",
  },
  {
    title: "Full-Stack Web Development Certification",
    issuer: "Professional Certification Program",
    period: "Terverifikasi",
    detail: "Spesialisasi Modern PHP (Laravel), SPA Architecture (Vue/React), dan Database Optimization.",
  },
  {
    title: "Git & DevOps CI/CD Practitioner",
    issuer: "Industry Best Practices",
    period: "Terverifikasi",
    detail: "Implementasi containerization dengan Docker dan alur otomasi rilis GitHub Actions.",
  },
];

const OPEN_SOURCE_IMPACT = [
  {
    stat: "30+",
    label: "Web Projects Completed",
    desc: "Membangun sistem SaaS, aplikasi enterprise, e-commerce, dan portal interaktif modern.",
  },
  {
    stat: "100%",
    label: "Client Satisfaction",
    desc: "Fokus pada ketepatan waktu, kualitas kode bersih, dan komunikasi yang transparan.",
  },
  {
    stat: "5+ Thn",
    label: "Dedikasi di Web Engineering",
    desc: "Terus mengikuti evolusi teknologi web terkini untuk memberikan solusi paling efektif.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16 lg:py-20 flex-1 flex flex-col space-y-16 sm:space-y-24">
      {/* Inject JSON-LD */}
      <ProfilePageJsonLd
        name="Tentang | M. Faisal Fahri - Full-Stack Web Developer"
        description="Filosofi engineering, perjalanan pengembangan web full-stack, stack teknologi Laravel, Vue, React, Next.js, dan kontribusi proyek M. Faisal Fahri."
        url="https://faisalfahri.dev/about"
      />
      <BreadcrumbListJsonLd
        items={[
          { name: "Beranda", url: "https://faisalfahri.dev" },
          { name: "Tentang", url: "https://faisalfahri.dev/about" },
        ]}
      />

      <Container>
        {/* Section 1: Executive Bio */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-3">
            <Badge variant="emerald" dot className="font-mono text-xs">
              Profil Profesional
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
              Membangun Aplikasi Web Modern &amp;{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Solusi Skalabel
              </span>
            </h1>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed pt-2">
              Halo! Saya <strong>M. Faisal Fahri</strong>, seorang Full-Stack Web Developer dengan pengalaman lebih dari 5 tahun dalam membangun aplikasi web bisnis, sistem SaaS, portal e-commerce, dan dashboard interaktif.
            </p>
          </div>

          {/* Narrative paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-text-secondary leading-relaxed font-normal border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <p>
              Fokus utama saya adalah memadukan keandalan arsitektur backend <strong>Laravel (PHP)</strong> dan database relasional dengan antarmuka frontend modern yang responsif menggunakan <strong>Vue.js</strong>, <strong>React</strong>, <strong>Next.js</strong>, dan <strong>Tailwind CSS</strong>.
            </p>
            <p>
              Saya terbiasa menangani siklus pengembangan end-to-end: mulai dari perancangan skema database, pembuatan RESTful API, integrasi payment gateway / third-party service, hingga deployment server produksi menggunakan Docker dan CI/CD.
            </p>
            <p>
              Prinsip kerja saya sederhana: menulis kode yang bersih (clean code), terstruktur, mudah di-maintenance, dan selalu mengutamakan performa serta pengalaman pengguna (UX).
            </p>
          </div>

          {/* Quick Stat Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className="p-4 rounded-xl bg-surface-card border border-border-subtle">
              <div className="text-2xl font-bold font-mono text-emerald-400">
                5+
              </div>
              <div className="text-xs text-text-muted mt-1">
                Tahun Pengalaman Web Dev
              </div>
            </div>
            <div className="p-4 rounded-xl bg-surface-card border border-border-subtle">
              <div className="text-2xl font-bold font-mono text-cyan-400">
                30+
              </div>
              <div className="text-xs text-text-muted mt-1">
                Aplikasi Web Selesai
              </div>
            </div>
            <div className="p-4 rounded-xl bg-surface-card border border-border-subtle">
              <div className="text-2xl font-bold font-mono text-emerald-400">
                &lt;100ms
              </div>
              <div className="text-xs text-text-muted mt-1">
                Rata-rata Respon API
              </div>
            </div>
            <div className="p-4 rounded-xl bg-surface-card border border-border-subtle">
              <div className="text-2xl font-bold font-mono text-cyan-400">
                99.9%
              </div>
              <div className="text-xs text-text-muted mt-1">
                Komitmen Kualitas &amp; Uptime
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Section 2: Engineering Philosophy */}
      <div className="bg-surface-card/40 border-y border-border-subtle py-16 sm:py-20">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-2">
              <Badge variant="cyan" className="font-mono text-xs">
                Prinsip Kerja
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                Prinsip &amp; Standar Pengembangan
              </h2>
              <p className="text-sm sm:text-base text-text-secondary">
                Pendekatan teknis yang saya terapkan dalam setiap baris kode, arsitektur database, dan antarmuka web.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PHILOSOPHIES.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-surface-card border border-border-subtle hover:border-border-accent transition-all space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-surface-elevated border border-border-subtle flex items-center justify-center group-hover:border-emerald-500/40 transition-colors">
                      {item.icon}
                    </div>
                    <span className="font-mono text-xs text-text-muted">
                      0{idx + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-text-primary group-hover:text-emerald-400 transition-colors">
                      {item.title}
                    </h3>
                    <div className="text-xs font-mono text-emerald-400/80 mt-0.5">
                      {item.subtitle}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Section 3: Hardware & Software Setup */}
      <Container>
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-2">
            <Badge variant="emerald" className="font-mono text-xs">
              Environment
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
              Development Environment &amp; Toolchain
            </h2>
            <p className="text-sm sm:text-base text-text-secondary">
              Perangkat keras dan toolchain perangkat lunak yang mendukung alur kerja pengembangan web yang cepat dan andal.
            </p>
          </div>

          <div className="space-y-8">
            {/* Hardware */}
            <div className="space-y-4">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
                <Laptop className="w-4 h-4 text-emerald-400" />
                Hardware Setup
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {HARDWARE_STACK.map((hw, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-surface-card border border-border-subtle space-y-2"
                  >
                    <div className="text-xs font-mono font-semibold text-emerald-400">
                      {hw.label}
                    </div>
                    <div className="text-sm font-semibold text-text-primary leading-snug">
                      {hw.spec}
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {hw.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Software Tooling Grid */}
            <div className="space-y-4">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                Software &amp; Frameworks
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SOFTWARE_STACK.map((group, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-surface-card border border-border-subtle space-y-3"
                  >
                    <div className="text-xs font-mono font-semibold text-text-secondary">
                      {group.category}
                    </div>
                    <ul className="space-y-1.5">
                      {group.items.map((item, i) => (
                        <li
                          key={i}
                          className="text-xs text-text-muted flex items-center gap-2 font-mono"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
                          <span className="text-text-primary">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Section 4: Education, Credentials & Open Source */}
      <div className="bg-surface-card/40 border-y border-border-subtle py-16 sm:py-20">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-2">
              <Badge variant="cyan" className="font-mono text-xs">
                Kredensial &amp; Pengalaman
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                Pendidikan &amp; Rekam Jejak
              </h2>
              <p className="text-sm sm:text-base text-text-secondary">
                Latar belakang pendidikan, sertifikasi kompetensi, dan dampak proyek yang telah dibangun.
              </p>
            </div>

            {/* Impact Numbers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {OPEN_SOURCE_IMPACT.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-surface-card border border-border-subtle space-y-2"
                >
                  <div className="text-3xl font-bold font-mono text-emerald-400">
                    {item.stat}
                  </div>
                  <div className="text-sm font-semibold text-text-primary">
                    {item.label}
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Education & Certs */}
            <div className="space-y-4 pt-4">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                Pendidikan &amp; Sertifikasi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CREDENTIALS.map((cred, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-surface-card border border-border-subtle space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-emerald-400 border border-emerald-500/20">
                          {cred.period}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-text-primary pt-1">
                        {cred.title}
                      </h4>
                      <p className="text-xs text-emerald-400 font-mono">
                        {cred.issuer}
                      </p>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed pt-2">
                      {cred.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Section 5: Direct CTA */}
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-surface-card to-cyan-500/10 p-8 sm:p-12 text-center space-y-6">
            <div className="space-y-3 max-w-xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                Siap Berkolaborasi Membangun Proyek Anda?
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Punya ide aplikasi web baru, butuh migrasi sistem, atau ingin berdiskusi teknis? Mari terhubung dan diskusikan kebutuhan Anda.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" variant="primary" className="w-full sm:w-auto font-mono text-sm group">
                  <span>Mulai Diskusi</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/projects" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto font-mono text-sm">
                  <span>Lihat Semua Proyek</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
