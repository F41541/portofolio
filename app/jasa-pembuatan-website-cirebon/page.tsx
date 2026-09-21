import type { Metadata } from "next";
import Link from "next/link";
import {
  Globe,
  CheckCircle2,
  MapPin,
  MessageSquare,
  ArrowRight,
  Clock,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Database,
  CreditCard,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ContactCta } from "@/components/sections/ContactCta";
import {
  BreadcrumbListJsonLd,
  LocalBusinessJsonLd,
  FAQPageJsonLd,
} from "@/components/seo";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Jasa Pembuatan Website & Aplikasi Cirebon | Laxstudio - Sedong",
  description:
    "Jasa pembuatan website profesional dan sistem aplikasi web kustom di Cirebon, Sedong, dan Ciayumajakuning oleh Laxstudio (M. Faisal Fahri). Solusi website UMKM, Company Profile, Kasir POS & ERP performa tinggi.",
  keywords: [
    "Jasa Pembuatan Website Cirebon",
    "Jasa Pembuatan Aplikasi Cirebon",
    "Jasa Pembuatan Website di Cirebon",
    "Jasa Pembuatan Aplikasi di Cirebon",
    "Jasa Pembuatan Website Sedong",
    "Jasa Pembuatan Website Sedonglor",
    "Web Developer Cirebon",
    "Software House Cirebon",
    "Jasa Website UMKM Cirebon",
    "Jasa Aplikasi Laravel Cirebon",
    "Jasa Website Ciayumajakuning",
    "Konsultan IT Cirebon",
    "Laxstudio Cirebon",
  ],
  alternates: {
    canonical: "/jasa-pembuatan-website-cirebon",
  },
  openGraph: {
    title: "Jasa Pembuatan Website & Aplikasi Cirebon | Laxstudio",
    description:
      "Studio rekayasa web modern di Cirebon. Pembuatan website instan UMKM, company profile profesional, dan sistem informasi/aplikasi web kustom.",
    url: `${SITE_URL}/jasa-pembuatan-website-cirebon`,
    siteName: "Laxstudio",
    locale: "id_ID",
    type: "website",
  },
};

const SERVICES = [
  {
    icon: <Globe className="w-6 h-6 text-accent-emerald" />,
    title: "Website Company Profile & Bisnis Lokal",
    description:
      "Website profil profesional untuk perusahaan, kantor instansi, klinik, lembaga pendidikan, dan bisnis lokal di Cirebon. Tampilan modern, mobile-first, dan teroptimasi SEO Google.",
    features: [
      "Desain Eksklusif & Responsif HP/Tablet",
      "SEO On-Page Terstruktur (Mudah Ditemukan di Google)",
      "Integrasi WhatsApp Chat & Google Maps",
      "Performa Cepat (Load < 1.5 detik)",
    ],
    price: "Mulai Rp 600.000",
  },
  {
    icon: <Database className="w-6 h-6 text-accent-cyan" />,
    title: "Sistem Informasi & Aplikasi Web Kustom",
    description:
      "Pengembangan sistem backend Laravel, Vue/Inertia, dan React/Next.js untuk otomasi operasional bisnis, inventory gudang, absensi, hingga ERP skala UMKM.",
    features: [
      "Arsitektur Data Bersih & Skalabel",
      "Role & Permission Pengguna Terproteksi",
      "Ekspor Laporan PDF/Excel Otomatis",
      "Dashboard Statistik Interaktif Real-Time",
    ],
    price: "Mulai Rp 2.500.000",
  },
  {
    icon: <CreditCard className="w-6 h-6 text-accent-emerald" />,
    title: "Integrasi Payment Gateway & Toko Online",
    description:
      "Terima pembayaran otomatis dari pelanggan secara instan melalui QRIS, Virtual Account bank nasional (BCA, Mandiri, BRI, BNI), dan E-Wallet resmi via Duitku Gateway.",
    features: [
      "Notifikasi Otomatis Webhook Real-time",
      "Cek Status Tagihan & Invoice Digital",
      "Keamanan Transaksi HMAC-SHA256",
      "Bebas Biaya Maintenance Berulang Rumit",
    ],
    price: "Mulai Rp 1.200.000",
  },
];

const LOCAL_AREAS = [
  {
    name: "Kabupaten Cirebon",
    desc: "Sedong, Lemahabang, Sindanglaut, Sumber, Ciledug, Weru, Kedawung, Arjawinangun, dan seluruh kecamatan se-Kabupaten Cirebon.",
  },
  {
    name: "Kota Cirebon",
    desc: "Kesambi, Kejaksan, Harjamukti, Pekalipan, Lemahwungkuk, dan kawasan bisnis pusat kota.",
  },
  {
    name: "Basis Operasional (Studio)",
    desc: "Desa Sedonglor, Kecamatan Sedong, Kabupaten Cirebon, Jawa Barat 45189.",
  },
  {
    name: "Wilayah Ciayumajakuning",
    desc: "Kabupaten Kuningan (Cilimus, Jalaksana, Kota Kuningan), Majalengka, dan Indramayu.",
  },
];

const FAQS = [
  {
    question: "Berapa biaya jasa pembuatan website atau aplikasi di Cirebon oleh Laxstudio?",
    answer:
      "Biaya sangat fleksibel dan transparan menyesuaikan skala kebutuhan Anda. Untuk Landing Page / Website Profil UMKM mulai dari Rp 600.000. Untuk website dinamis bisnis atau toko online mulai dari Rp 1.500.000, dan untuk sistem aplikasi web kustom (ERP/Kasir/POS) mulai dari Rp 2.500.000. Seluruh paket sudah termasuk konsultasi, domain, hosting, dan garansi teknis.",
  },
  {
    question: "Apakah bisa konsultasi langsung (tatap muka / offline) di wilayah Cirebon atau Sedong?",
    answer:
      "Tentu bisa! Bagi klien yang berdomisili di wilayah Kabupaten Cirebon, Kota Cirebon, Kecamatan Sedong, dan sekitarnya (termasuk Kuningan), kita dapat menjadwalkan pertemuan tatap muka untuk mendiskusikan kebutuhan sistem, rancangan alur bisnis, serta demonstrasi aplikasi secara langsung.",
  },
  {
    question: "Berapa lama estimasi waktu pengerjaan proyek website?",
    answer:
      "Untuk landing page atau website profil bisnis sederhana membutuhkan waktu sekitar 3–7 hari kerja. Sedangkan untuk sistem aplikasi web kustom, sistem kasir, atau modul ERP biasanya memakan waktu antara 2 hingga 4 minggu tergantung pada kompleksitas fitur yang diminta.",
  },
  {
    question: "Apa keunggulan Laxstudio dibandingkan pembuat website lainnya di Cirebon?",
    answer:
      "Laxstudio dikembangkan langsung oleh M. Faisal Fahri (S.Kom), praktisi Full-Stack Developer dengan standar Clean Architecture. Kami tidak menggunakan template bajakan yang berat atau rentan malware. Setiap website dibangun dengan performa tinggi (Next.js/Laravel/Tailwind CSS), teroptimasi SEO lokal Google, mobile responsive, dan memiliki dukungan pemeliharaan langsung tanpa perantara pihak ketiga.",
  },
  {
    question: "Apakah website yang dibuat sudah terdaftar dan bisa dicari di Google?",
    answer:
      "Ya, setiap website yang kami kembangkan sudah dilengkapi konfigurasi teknis SEO lengkap: sitemap.xml, robots.txt, metadata terstruktur, OpenGraph media sosial, dan didaftarkan langsung ke Google Search Console agar dapat terindeks dengan cepat pada hasil penelusuran lokal.",
  },
];

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Halo Laxstudio, saya tertarik konsultasi jasa pembuatan website / aplikasi di Cirebon. Bisa minta informasi estimasi dan paket layanannya?"
);
const WHATSAPP_URL = `https://wa.me/6282129620269?text=${WHATSAPP_MESSAGE}`;

export default function JasaWebsiteCirebonPage() {
  return (
    <div className="relative flex-1 flex flex-col overflow-hidden">
      {/* Schema Structured Data */}
      <LocalBusinessJsonLd
        name="Laxstudio - Jasa Pembuatan Website & Aplikasi Cirebon"
        description="Jasa pembuatan website profesional dan sistem aplikasi web di Cirebon, Sedong, dan Ciayumajakuning oleh Laxstudio (M. Faisal Fahri). Solusi UMKM, Company Profile, Kasir POS & ERP kustom."
        url={`${SITE_URL}/jasa-pembuatan-website-cirebon`}
      />
      <FAQPageJsonLd mainEntity={FAQS} />
      <BreadcrumbListJsonLd
        items={[
          { name: "Beranda", url: SITE_URL },
          {
            name: "Jasa Pembuatan Website Cirebon",
            url: `${SITE_URL}/jasa-pembuatan-website-cirebon`,
          },
        ]}
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-border-subtle/60">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-accent-emerald/10 blur-[140px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[320px] h-[260px] bg-accent-cyan/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <Container className="space-y-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-accent-emerald/40 text-accent-emerald bg-accent-emerald/5 gap-1.5 py-1 px-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>Cirebon • Sedong • Ciayumajakuning</span>
            </Badge>
            <Badge variant="outline" className="border-accent-cyan/40 text-accent-cyan bg-accent-cyan/5 gap-1.5 py-1 px-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Rekayasa Web &amp; Sistem Modern</span>
            </Badge>
          </div>

          <div className="max-w-4xl space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
              Jasa Pembuatan Website &amp;{" "}
              <span className="bg-gradient-to-r from-accent-emerald via-accent-cyan to-accent-emerald bg-clip-text text-transparent">
                Aplikasi Web di Cirebon
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-3xl">
              Tingkatkan kredibilitas bisnis dan otomasi operasional usaha Anda bersama <strong>Laxstudio</strong>. 
              Kami melayani pembuatan website instan UMKM, company profile profesional, hingga sistem aplikasi kustom (POS, ERP, Billing) dengan basis studio di <strong>Sedong, Kabupaten Cirebon</strong>.
            </p>
          </div>

          {/* Dual Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-accent-emerald text-background font-semibold text-base shadow-lg shadow-accent-emerald/20 hover:bg-accent-emerald/90 transition-all active:scale-[0.98]"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>Konsultasi Gratis via WhatsApp</span>
            </a>

            <Link
              href="/store"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-border-default bg-surface-elevated/40 hover:bg-surface-elevated text-text-primary font-medium text-base transition-all hover:border-accent-cyan/40"
            >
              <span>Lihat Paket Layanan &amp; Harga</span>
              <ArrowRight className="w-4 h-4 text-text-tertiary" />
            </Link>
          </div>

          {/* Value Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-border-subtle/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-border-subtle flex items-center justify-center text-accent-emerald">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-text-tertiary uppercase tracking-wider font-semibold">Keamanan</p>
                <p className="text-sm font-semibold text-text-primary">Clean Architecture</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-border-subtle flex items-center justify-center text-accent-cyan">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-text-tertiary uppercase tracking-wider font-semibold">Tampilan</p>
                <p className="text-sm font-semibold text-text-primary">100% Mobile-First</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-border-subtle flex items-center justify-center text-accent-emerald">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-text-tertiary uppercase tracking-wider font-semibold">Kecepatan</p>
                <p className="text-sm font-semibold text-text-primary">Pengerjaan Tepat Waktu</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-border-subtle flex items-center justify-center text-accent-cyan">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-text-tertiary uppercase tracking-wider font-semibold">Konsultasi</p>
                <p className="text-sm font-semibold text-text-primary">Tatap Muka / Online</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 border-b border-border-subtle/60 bg-surface-ground/30">
        <Container className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="outline" className="border-border-default text-accent-emerald bg-accent-emerald/5">
              Solusi Web Spesialis
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
              Layanan Pembuatan Website &amp; Software di Cirebon
            </h2>
            <p className="text-text-secondary text-sm sm:text-base">
              Dari website bisnis yang elegan untuk memenangkan pencarian Google hingga sistem operasional internal yang menghemat waktu kerja Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((s, idx) => (
              <Card
                key={idx}
                className="p-6 md:p-8 flex flex-col justify-between border-border-subtle/80 hover:border-accent-emerald/40 transition-all hover:shadow-xl hover:shadow-accent-emerald/5 group"
              >
                <div className="space-y-5">
                  <div className="w-12 h-12 rounded-xl bg-surface-ground border border-border-subtle flex items-center justify-center group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-emerald transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  <ul className="space-y-2.5 pt-2 border-t border-border-subtle/60 text-xs sm:text-sm text-text-muted">
                    {s.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent-emerald shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-border-subtle/60 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-text-tertiary">Estimasi Investasi</span>
                    <p className="text-base font-bold text-text-primary">{s.price}</p>
                  </div>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-emerald hover:underline"
                  >
                    <span>Tanya Dulu</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Regional Service Areas */}
      <section className="py-16 md:py-24 border-b border-border-subtle/60">
        <Container className="space-y-10">
          <div className="max-w-3xl space-y-4">
            <Badge variant="outline" className="border-border-default text-accent-cyan bg-accent-cyan/5">
              Cakupan Wilayah Layanan
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
              Melayani Klien se-Cirebon, Sedong, &amp; Ciayumajakuning
            </h2>
            <p className="text-text-secondary leading-relaxed text-base">
              Kami siap melayani pembuatan website untuk pemilik usaha lokal, UMKM, instansi, yayasan, dan profesional di seluruh wilayah berikut:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LOCAL_AREAS.map((area, idx) => (
              <Card key={idx} className="p-5 border-border-subtle/80 space-y-2 bg-surface-elevated/30">
                <div className="flex items-center gap-2 text-accent-emerald font-bold text-base">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{area.name}</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {area.desc}
                </p>
              </Card>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-surface-elevated/40 border border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-base font-semibold text-text-primary">
                Ingin Berdiskusi Tatap Muka Langsung?
              </h4>
              <p className="text-xs sm:text-sm text-text-secondary">
                Untuk wilayah Cirebon dan Sedong, kami dapat mendatangi lokasi bisnis Anda atau bertemu di tempat yang disepakati.
              </p>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30 text-xs font-semibold hover:bg-accent-cyan/25 transition-all shrink-0"
            >
              <span>Jadwalkan Diskusi</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 border-b border-border-subtle/60 bg-surface-ground/30">
        <Container className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="outline" className="border-border-default text-accent-emerald bg-accent-emerald/5">
              Tanya Jawab (FAQ)
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-text-secondary text-sm sm:text-base">
              Informasi lengkap mengenai alur pemesanan, biaya, dan teknologi jasa pembuatan website di Cirebon.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((faq, idx) => (
              <Card key={idx} className="p-6 border-border-subtle/80 space-y-3 bg-surface-elevated/40">
                <h3 className="text-base sm:text-lg font-bold text-text-primary flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-accent-emerald shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed pl-7">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Final Bottom CTA */}
      <ContactCta />
    </div>
  );
}
