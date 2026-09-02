import type { Metadata } from "next";
import {
  Mail,
  KeyRound,
  Clock,
  Globe2,
  Calendar,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ContactForm } from "@/components/contact";
import { SOCIAL_LINKS } from "@/lib/navigation";
import { BreadcrumbListJsonLd } from "@/components/seo";

export const metadata: Metadata = {
  title: "Kontak & Kolaborasi | M. Faisal Fahri",
  description:
    "Hubungi M. Faisal Fahri untuk pembuatan aplikasi web full-stack, pengembangan frontend modern (Vue / React / Next.js), backend Laravel, atau konsultasi teknis.",
  openGraph: {
    title: "Kontak & Kolaborasi | M. Faisal Fahri",
    description:
      "Tersedia untuk proyek full-stack web application, frontend modern, dan konsultasi teknis.",
    url: "https://faisalfahri.dev/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-16 lg:py-20 flex-1 flex flex-col">
      <BreadcrumbListJsonLd
        items={[
          { name: "Beranda", url: "https://faisalfahri.dev" },
          { name: "Kontak", url: "https://faisalfahri.dev/contact" },
        ]}
      />
      <Container className="flex-1 flex flex-col justify-center">
        {/* Page Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <Badge variant="emerald" dot className="font-mono text-xs">
            Direct Transmission Channel
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
            Mari Bangun Aplikasi Web{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Impian Anda.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Apakah Anda membutuhkan full-stack web application berbasis Laravel + Vue/React, migrasi web ke Next.js 15, atau perancangan RESTful API terintegrasi — mari diskusikan bersama.
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
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-text-muted">
                      Direct Email
                    </div>
                    <a
                      href="mailto:faisal.fahri@example.com"
                      className="text-sm font-semibold text-text-primary hover:text-emerald-400 transition-colors font-mono"
                    >
                      faisal.fahri@example.com
                    </a>
                  </div>
                </div>
                <Badge variant="emerald" className="font-mono text-[10px]">
                  Primary
                </Badge>
              </div>

              <div className="pt-3 border-t border-border-subtle grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="flex items-center gap-2 text-text-secondary">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Respon: &lt; 24 Jam</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>WIB (UTC+7)</span>
                </div>
              </div>
            </div>

            {/* Quick Consultation Card */}
            <div className="p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/5 to-transparent space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
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
                Ingin diskusi langsung via video call atau Google Meet? Jadwalkan sesi meeting untuk membahas kebutuhan arsitektur dan estimasi proyek Anda.
              </p>

              <a
                href="mailto:faisal.fahri@example.com?subject=Undangan%20Diskusi%20Proyek"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold transition-colors"
              >
                <span>Kirim Undangan Meeting</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Social Signal Badges */}
            <div className="p-6 rounded-2xl border border-border-subtle bg-surface-card space-y-3">
              <div className="text-xs font-mono font-semibold text-text-muted uppercase tracking-wider">
                Profil &amp; Media Sosial
              </div>
              <div className="grid grid-cols-1 gap-2">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-surface-elevated hover:bg-surface-elevated/80 border border-border-subtle hover:border-emerald-500/30 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-medium text-text-primary group-hover:text-emerald-400 transition-colors">
                        {link.name}
                      </div>
                      <div className="text-[10px] font-mono text-text-muted">
                        {link.handle}
                      </div>
                    </div>
                    <ExternalLink className="w-3 h-3 text-text-muted group-hover:text-emerald-400 transition-colors" />
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
    </div>
  );
}
