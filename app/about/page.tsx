import type { Metadata } from "next";
import {
  Layers,
  Code2,
  Shield,
  Zap,
  GraduationCap,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ContactCta } from "@/components/sections/ContactCta";
import { ProfilePageJsonLd, BreadcrumbListJsonLd } from "@/components/seo";
import { SITE_URL } from "@/lib/utils";
import { TECH_STACK, TECH_CATEGORIES } from "@/data/tech-stack";

export const metadata: Metadata = {
  title: "Tentang | Laxstudio - M. Faisal Fahri",
  description:
    "Profil profesional M. Faisal Fahri (S.Kom), pengembang di balik Laxstudio, filosofi clean architecture, dan keahlian tech stack.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Tentang | Laxstudio - M. Faisal Fahri",
    description:
      "Profil, pendidikan Teknik Informatika UCIC (IPK 3.64), dan keahlian pengembangan aplikasi web modern.",
    url: `${SITE_URL}/about`,
  },
};

const PHILOSOPHIES = [
  {
    icon: <Layers className="w-5 h-5 text-accent-emerald" />,
    title: "Clean Architecture & Maintainability",
    subtitle: "Kerapian & Keteraturan Kode",
    description:
      "Kode yang baik bukan hanya berjalan tanpa error, tapi mudah dibaca dan dikembangkan oleh tim. Saya mengutamakan arsitektur terstruktur (Service Layer, Form Requests, Domain Isolation) agar aplikasi siap diskalakan.",
  },
  {
    icon: <Zap className="w-5 h-5 text-accent-cyan" />,
    title: "Performa & Efisiensi Database",
    subtitle: "Kecepatan Tanpa Kompromi",
    description:
      "Pengalaman pengguna berbanding lurus dengan kecepatan respon sistem. Mulai dari optimasi query relasional (eager loading, indeks terstruktur) hingga caching Redis dan bundle rendering yang ringan.",
  },
  {
    icon: <Code2 className="w-5 h-5 text-accent-emerald" />,
    title: "Komponen Reusable & Type Safety",
    subtitle: "Efisiensi Siklus Pengembangan",
    description:
      "Menggunakan Vue 3, React, TypeScript, dan Tailwind CSS untuk menciptakan sistem komponen modular yang konsisten, mudah dipelihara, dan minim runtime error.",
  },
  {
    icon: <Shield className="w-5 h-5 text-accent-cyan" />,
    title: "Keamanan & Integritas Data",
    subtitle: "Security by Design",
    description:
      "Menerapkan proteksi keamanan standar industri pada level aplikasi (CSRF, XSS prevention, sanitasi input, transaksi DB bertransaksional, rate limiting, dan proteksi callback webhook).",
  },
];

const CREDENTIALS = [
  {
    title: "Sarjana Komputer (S.Kom) - IPK 3.64",
    issuer: "Universitas Catur Insan Cendekia (UCIC) Cirebon",
    period: "Lulusan 2025/2026",
    detail: "Lulusan S1 Program Studi Teknik Informatika dengan peminatan Rekayasa Perangkat Lunak, Arsitektur Web, dan Basis Data Relasional.",
  },
  {
    title: "Full-Stack Web Development",
    issuer: "Fokus Keahlian",
    period: "Kompetensi Utama",
    detail: "Spesialisasi Modern PHP & Laravel 12/13, Inertia.js, Vue 3, Tailwind CSS, serta arsitektur database MySQL & PostgreSQL.",
  },
  {
    title: "Sistem Multi-Tenancy & Integrasi Finansial",
    issuer: "Solusi Bisnis & Produksi",
    period: "Implementasi Nyata",
    detail: "Pengalaman membangun arsitektur SaaS multi-tenant untuk UMKM dan sistem billing lembaga terintegrasi payment gateway Duitku.",
  },
];

const PROFILE_HIGHLIGHTS = [
  {
    stat: "3.64",
    label: "IPK Kelulusan (S.Kom)",
    desc: "S1 Teknik Informatika Universitas Catur Insan Cendekia (UCIC) Cirebon.",
  },
  {
    stat: "Laravel",
    label: "Backend & Multi-Tenancy",
    desc: "Spesialisasi Laravel 12/13, Stancl Tenancy, dan arsitektur database relasional.",
  },
  {
    stat: "Vue 3",
    label: "Inertia.js & Tailwind",
    desc: "Pengalaman pengguna SPA yang responsif, modular, dan bersih tanpa overhead berlebih.",
  },
];

const SOFTWARE_STACK = TECH_CATEGORIES.filter((c) => c.id !== "all").map((cat) => ({
  category: cat.label,
  items: TECH_STACK.filter((t) => t.category === cat.id).map((t) => t.name),
}));

export default function AboutPage() {
  return (
    <div className="relative flex-1 flex flex-col overflow-hidden">
      {/* Inject JSON-LD */}
      <ProfilePageJsonLd
        name="Tentang | Laxstudio - M. Faisal Fahri"
        description="Profil profesional M. Faisal Fahri (S.Kom), pengembang di balik Laxstudio, filosofi clean architecture, dan keahlian tech stack."
        url={`${SITE_URL}/about`}
      />
      <BreadcrumbListJsonLd
        items={[
          { name: "Beranda", url: SITE_URL },
          { name: "Tentang", url: `${SITE_URL}/about` },
        ]}
      />

      {/* Section 1: Executive Bio & Hero */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-border-subtle/60">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent-emerald/10 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-accent-cyan/5 blur-[100px] rounded-full pointer-events-none -z-10" />

        <Container className="space-y-12">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary leading-[1.15]">
              Membangun Solusi Web Modern &amp;{" "}
              <span className="bg-gradient-to-r from-accent-emerald to-accent-cyan bg-clip-text text-transparent">
                Terstruktur Rapi
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary leading-relaxed">
              Halo! Saya <strong>M. Faisal Fahri, S.Kom</strong>, Full-Stack Web Developer di balik <strong>Laxstudio</strong> yang berdomisili di Cirebon, Jawa Barat.
            </p>

            {/* Narrative paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-text-secondary leading-relaxed font-normal border-l-2 border-accent-emerald/30 pl-4 sm:pl-6 pt-1">
              <p>
                Fokus utama saya adalah memadukan keandalan arsitektur backend <strong>Laravel (PHP)</strong> dan database relasional <strong>MySQL / PostgreSQL</strong> dengan antarmuka frontend modern yang responsif menggunakan <strong>Vue 3</strong>, <strong>Inertia.js</strong>, <strong>React / Next.js</strong>, dan <strong>Tailwind CSS</strong>.
              </p>
              <p>
                Saya memiliki pengalaman nyata dalam membangun sistem bisnis multi-modul, seperti platform <strong>ERP SaaS Multi-Tenant</strong> untuk UMKM, sistem informasi <strong>keuangan &amp; billing institusi</strong> yang terintegrasi payment gateway Duitku, serta sistem manajemen <strong>operasional &amp; live presensi</strong> bimbingan belajar.
              </p>
              <p>
                Prinsip kerja saya berakar pada penulisan kode yang bersih (<em>clean code</em>), terstruktur, mudah dipelihara (<em>maintainable</em>), dan berorientasi pada kemudahan penggunaan (<em>user experience</em>).
              </p>
            </div>
          </div>

          {/* Impact Numbers Grid (Spans full Container width) */}
          <div className="pt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl bg-surface-card/60 backdrop-blur-md border border-border-subtle shadow-xl">
              {PROFILE_HIGHLIGHTS.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="text-3xl font-bold font-mono text-accent-emerald">
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
          </div>
        </Container>
      </section>

      {/* Section 2: Education & Credentials */}
      <section className="py-16 md:py-24 border-b border-border-subtle/60 relative">
        <div className="absolute top-1/2 right-10 w-[450px] h-[300px] bg-accent-cyan/5 blur-[140px] pointer-events-none -z-10" />

        <Container className="space-y-10">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary">
              Pendidikan Formal &amp;{" "}
              <span className="bg-gradient-to-r from-accent-emerald to-accent-cyan bg-clip-text text-transparent">
                Rekam Jejak
              </span>
            </h2>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              Latar belakang akademis resmi dan fokus kompetensi teknik rekayasa perangkat lunak.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CREDENTIALS.map((cred, idx) => (
              <Card
                key={idx}
                hoverGlow
                className="p-6 sm:p-7 rounded-2xl space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="emerald" className="text-[11px] font-mono">
                      {cred.period}
                    </Badge>
                    <GraduationCap className="w-4 h-4 text-accent-emerald" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-text-primary pt-1">
                    {cred.title}
                  </h3>
                  <p className="text-xs font-mono text-accent-emerald">
                    {cred.issuer}
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed pt-3 border-t border-border-subtle/60">
                  {cred.detail}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 3: Engineering Philosophy */}
      <section className="py-16 md:py-24 border-b border-border-subtle/60 relative">
        <div className="absolute bottom-10 left-10 w-[500px] h-[300px] bg-accent-emerald/5 blur-[140px] pointer-events-none -z-10" />

        <Container className="space-y-10">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary">
              Prinsip &amp;{" "}
              <span className="bg-gradient-to-r from-accent-emerald to-accent-cyan bg-clip-text text-transparent">
                Standar Pengembangan
              </span>
            </h2>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              Pendekatan teknis yang saya terapkan dalam setiap baris kode, arsitektur database, dan antarmuka web.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PHILOSOPHIES.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-surface-card border border-border-subtle hover:border-accent-emerald/40 transition-all space-y-4 group hover:shadow-2xl hover:shadow-accent-emerald/5"
              >
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-surface-elevated border border-border-subtle flex items-center justify-center group-hover:border-accent-emerald/40 transition-colors">
                    {item.icon}
                  </div>
                  <span className="font-mono text-xs text-text-muted">
                    0{idx + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary group-hover:text-accent-emerald transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono text-accent-emerald/90 mt-1">
                    {item.subtitle}
                  </div>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 4: Software & Framework Stack */}
      <section className="py-16 md:py-24 border-b border-border-subtle/60 relative">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-accent-cyan/5 blur-[140px] pointer-events-none -z-10" />

        <Container className="space-y-10">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary">
              Software &amp;{" "}
              <span className="bg-gradient-to-r from-accent-emerald to-accent-cyan bg-clip-text text-transparent">
                Framework Stack
              </span>
            </h2>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              Teknologi yang saya gunakan secara intensif untuk membangun aplikasi web produksi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SOFTWARE_STACK.map((group, idx) => (
              <Card
                key={idx}
                hoverGlow
                className="p-6 rounded-2xl space-y-4"
              >
                <div className="text-xs font-mono font-bold text-accent-emerald uppercase tracking-wider">
                  {group.category}
                </div>
                <ul className="space-y-2.5">
                  {group.items.map((item, i) => (
                    <li
                      key={i}
                      className="text-xs text-text-muted flex items-center gap-2.5 font-mono"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald/70 shrink-0" />
                      <span className="text-text-primary">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 5: Direct CTA */}
      <ContactCta />
    </div>
  );
}
