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
  title: "Contact & Collaboration | Alex Vance",
  description:
    "Get in touch for architectural consulting, AI systems engineering leadership, and high-impact contract builds. Guaranteed 24-hour response SLA.",
  openGraph: {
    title: "Contact & Collaboration | Alex Vance",
    description:
      "Available for select architectural consulting, AI engineering leadership, and high-impact contract builds.",
    url: "https://alexvance.dev/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-16 lg:py-20 flex-1 flex flex-col">
      <BreadcrumbListJsonLd
        items={[
          { name: "Home", url: "https://alexvance.dev" },
          { name: "Contact", url: "https://alexvance.dev/contact" },
        ]}
      />
      <Container className="flex-1 flex flex-col justify-center">
        {/* Page Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <Badge variant="emerald" dot className="font-mono text-xs">
            Direct Transmission Channel
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
            Let&apos;s Build Something{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Extraordinary.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Whether you are designing a high-throughput multi-agent AI system,
            re-architecting distributed event pipelines, or looking for senior
            engineering leadership — let&apos;s talk.
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
                      href="mailto:alex@engineer.dev"
                      className="text-sm font-semibold text-text-primary hover:text-emerald-400 transition-colors font-mono"
                    >
                      alex@engineer.dev
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
                  <span>SLA: &lt; 24h</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>WIB (UTC+7)</span>
                </div>
              </div>
            </div>

            {/* Calendly Booking Card */}
            <div className="p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/5 to-transparent space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text-primary">
                      Schedule 30-min Technical Intro
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5">
                      Direct calendar booking for architectural scoping
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-text-secondary leading-relaxed">
                Prefer an instant video call? Pick an available slot directly on
                Calendly to discuss requirements, architecture, or deliverables.
              </p>

              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold transition-colors"
              >
                <span>Open Calendly Calendar</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* PGP Fingerprint & Security Box */}
            <div className="p-6 rounded-2xl border border-border-subtle bg-surface-card space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-text-secondary uppercase tracking-wider">
                <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
                PGP Security Fingerprint
              </div>
              <p className="text-xs text-text-muted">
                For sensitive architectural audits, zero-knowledge disclosures,
                or confidential inquiries:
              </p>
              <div className="p-3 rounded-lg bg-surface-ground border border-border-subtle font-mono text-[11px] text-emerald-400 break-all leading-relaxed select-all">
                4A89 2F1E 99C3 B7D0 E421 88FA 109D 7C62 3B4E 99F1
              </div>
            </div>

            {/* Social Signal Badges */}
            <div className="p-6 rounded-2xl border border-border-subtle bg-surface-card space-y-3">
              <div className="text-xs font-mono font-semibold text-text-muted uppercase tracking-wider">
                Verified Profiles
              </div>
              <div className="grid grid-cols-2 gap-2">
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
