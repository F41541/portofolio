import type { Metadata } from "next";
import {
  Mail,
  Clock,
  Globe2,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ContactForm } from "@/components/contact";
import { SOCIAL_LINKS } from "@/lib/navigation";
import { BreadcrumbListJsonLd } from "@/components/seo";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Kontak & Kolaborasi | Laxstudio",
  description:
    "Hubungi Laxstudio (M. Faisal Fahri) untuk pembuatan aplikasi web full-stack, pengembangan frontend modern (Vue / React / Next.js), backend Laravel, atau konsultasi teknis.",
  openGraph: {
    title: "Kontak & Kolaborasi | Laxstudio",
    description:
      "Tersedia untuk proyek full-stack web application, frontend modern, dan konsultasi teknis.",
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="relative flex-1 flex flex-col overflow-hidden">
      <BreadcrumbListJsonLd
        items={[
          { name: "Beranda", url: SITE_URL },
          { name: "Kontak", url: `${SITE_URL}/contact` },
        ]}
      />

      <section className="py-16 md:py-24 relative flex-1 flex flex-col">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[350px] bg-accent-emerald/5 blur-[140px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[250px] bg-accent-cyan/5 blur-[120px] pointer-events-none -z-10" />

        <Container className="space-y-12">
          {/* Page Header */}
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
              Mari Bangun Aplikasi Web{" "}
              <span className="bg-gradient-to-r from-accent-emerald to-accent-cyan bg-clip-text text-transparent">
                Impian Anda.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              Apakah Anda membutuhkan full-stack web application bersama Laxstudio berbasis Laravel + Vue/React, migrasi web ke Next.js 16, atau perancangan RESTful API terintegrasi — mari diskusikan bersama.
            </p>
          </div>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Info & Credentials (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Email Card */}
            <div className="p-6 rounded-2xl border border-border-subtle bg-surface-card space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-accent-emerald/10 border border-accent-emerald/20 flex items-center justify-center text-accent-emerald">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted">
                      Email Langsung
                    </div>
                    <a
                      href="mailto:mfaisalfahri02@gmail.com"
                      className="text-sm font-semibold text-text-primary hover:text-accent-emerald transition-colors"
                    >
                      mfaisalfahri02@gmail.com
                    </a>
                  </div>
                </div>
                <Badge variant="emerald" className="text-[10px]">
                  Utama
                </Badge>
              </div>

              <div className="pt-3 border-t border-border-subtle grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-text-secondary">
                  <Clock className="w-3.5 h-3.5 text-accent-emerald" />
                  <span>Respon: &lt; 24 Jam</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Globe2 className="w-3.5 h-3.5 text-accent-cyan" />
                  <span>Cirebon (WIB)</span>
                </div>
              </div>

              <div className="pt-3 border-t border-border-subtle text-xs text-text-muted leading-relaxed font-sans">
                <span className="font-semibold text-text-primary">Domisili:</span> Desa Sedonglor, Kec. Sedong, Kab. Cirebon, Jawa Barat
              </div>
            </div>

            {/* Quick Consultation Card */}
            <div className="p-6 rounded-2xl border border-accent-emerald/30 bg-gradient-to-b from-accent-emerald/5 to-transparent space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-accent-emerald/20 border border-accent-emerald/40 flex items-center justify-center text-accent-emerald">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text-primary">
                      Jadwalkan Diskusi Teknis
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5">
                      Konsultasi langsung lingkup proyek & timeline
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-text-secondary leading-relaxed">
                Ingin diskusi langsung mengenai arsitektur sistem, estimasi pengerjaan, atau kerja sama proyek? Silakan kirimkan email langsung atau isi formulir di samping.
              </p>

              <a
                href="mailto:mfaisalfahri02@gmail.com?subject=Undangan%20Diskusi%20Proyek%20Web"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-accent-emerald/10 hover:bg-accent-emerald/20 border border-accent-emerald/30 text-accent-emerald text-xs font-semibold transition-colors"
              >
                <span>Kirim Email Diskusi</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Social Signal Badges */}
            <div className="p-6 rounded-2xl border border-border-subtle bg-surface-card space-y-3">
              <div className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                Profil &amp; Media Sosial
              </div>
              <div className="grid grid-cols-1 gap-2">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-surface-elevated hover:bg-surface-elevated/80 border border-border-subtle hover:border-accent-emerald/30 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-medium text-text-primary group-hover:text-accent-emerald transition-colors">
                        {link.name}
                      </div>
                      <div className="text-[11px] text-text-muted">
                        {link.handle}
                      </div>
                    </div>
                    <ExternalLink className="w-3 h-3 text-text-muted group-hover:text-accent-emerald transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Container>
      </section>
    </div>
  );
}
