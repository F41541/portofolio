import * as React from "react";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowUpRight,
  Compass,
  Cpu,
  MessageSquare,
  Phone,
  MapPin,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { LiveClock } from "./LiveClock";
import {
  NAV_ROUTES,
  PROJECTS_DATA,
  SOCIAL_LINKS,
} from "@/lib/navigation";

export const Footer: React.FC = () => {
  const getSocialIcon = (name: string) => {
    switch (name) {
      case "GitHub":
        return <Github className="w-4 h-4" />;
      case "LinkedIn":
        return <Linkedin className="w-4 h-4" />;
      case "Twitter / X":
        return <Twitter className="w-4 h-4" />;
      case "Email":
        return <Mail className="w-4 h-4" />;
      case "WhatsApp":
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <ArrowUpRight className="w-4 h-4" />;
    }
  };

  return (
    <footer className="border-t border-border-subtle bg-surface-ground/90 relative overflow-hidden">
      {/* Decorative top accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Column 1: Brand + Live Timezone & Status (lg: 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo />

            <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
              Studio rekayasa web oleh <strong>M. Faisal Fahri</strong>, membangun aplikasi web full-stack modern, performa tinggi, dan clean code dengan ekosistem Laravel, Vue, React, dan Next.js.
            </p>

            {/* Live timezone widget */}
            <LiveClock />
          </div>

          {/* Column 2: Quick Navigation (lg: 2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-accent-emerald" />
              Navigasi
            </h3>
            <ul className="space-y-2">
              {NAV_ROUTES.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className="text-sm text-text-secondary hover:text-accent-emerald transition-colors flex items-center justify-between group"
                  >
                    <span>{route.name}</span>
                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity text-accent-emerald font-mono">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Featured Projects (lg: 3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-accent-cyan" />
              Proyek Unggulan
            </h3>
            <ul className="space-y-2.5">
              {PROJECTS_DATA.map((project) => (
                <li key={project.id}>
                  <Link
                    href={project.href}
                    className="block group"
                  >
                    <div className="text-xs font-medium text-text-primary group-hover:text-accent-emerald transition-colors line-clamp-1">
                      {project.title}
                    </div>
                    <div className="text-[11px] text-text-muted font-mono mt-0.5 flex items-center gap-2">
                      <span>{project.category}</span>
                      <span>•</span>
                      <span>{project.tags[0]}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social Connect (lg: 3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
              Media Sosial &amp; Kontak
            </h3>
            <div className="space-y-2">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-surface-card/60 hover:bg-surface-elevated border border-border-subtle hover:border-accent-emerald/30 text-xs text-text-secondary hover:text-text-primary transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-text-muted group-hover:text-accent-emerald transition-colors">
                      {getSocialIcon(item.name)}
                    </span>
                    <span className="font-medium text-text-primary">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-text-muted group-hover:text-accent-emerald">
                    {item.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Support & Business Contact Info (Duitku Verification Compliance) */}
        <div className="mt-10 pt-6 border-t border-border-subtle/80 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="flex items-start gap-2.5">
            <Mail className="w-4 h-4 text-accent-cyan mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-text-primary block">Email Dukungan</span>
              <a
                href="mailto:mfaisalfahri02@gmail.com"
                className="text-text-secondary hover:text-accent-emerald transition-colors"
              >
                mfaisalfahri02@gmail.com
              </a>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Phone className="w-4 h-4 text-accent-emerald mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-text-primary block">Telepon / WhatsApp</span>
              <a
                href="https://wa.me/6282129620269"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent-emerald transition-colors"
              >
                +62 821-2962-0269
              </a>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-accent-emerald mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-text-primary block">Alamat Usaha Resmi</span>
              <span className="text-text-secondary">
                Desa Sedonglor, Kec. Sedong, Kab. Cirebon, Jawa Barat 45189
              </span>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div className="text-center sm:text-left">
            &copy; 2026 <span className="text-text-primary font-semibold">Laxstudio</span> — M. Faisal Fahri. Dibangun dengan{" "}
            <span className="text-text-secondary font-semibold">Next.js 16</span>{" "}
            &amp;{" "}
            <span className="text-text-secondary font-semibold">Tailwind CSS</span>.
          </div>
        </div>
      </Container>
    </footer>
  );
};
