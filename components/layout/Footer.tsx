"use client";

import * as React from "react";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowUpRight,
  Clock,
  Terminal,
  Cpu,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import {
  NAV_ROUTES,
  PROJECTS_DATA,
  BLOG_POSTS_DATA,
  SOCIAL_LINKS,
} from "@/lib/navigation";

export const Footer: React.FC = () => {
  const [timeStr, setTimeStr] = React.useState<string>("");

  React.useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now);
        setTimeStr(formatted);
      } catch {
        setTimeStr(new Date().toTimeString().slice(0, 8));
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="font-mono font-bold text-sm tracking-wider text-emerald-400 bg-surface-elevated px-2 py-1 rounded border border-border-subtle group-hover:border-emerald-500/50 transition-colors">
                &lt;MFF/&gt;
              </div>
              <span className="font-semibold text-text-primary text-base tracking-tight">
                Faisal<span className="text-emerald-400">.dev</span>
              </span>
            </Link>

            <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
              Membangun aplikasi web full-stack modern, performa tinggi, dan clean code dengan ekosistem Laravel, Vue, React, dan Next.js.
            </p>

            {/* Live timezone widget */}
            <div className="p-3 rounded-xl bg-surface-card border border-border-subtle space-y-2">
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span className="flex items-center gap-1.5 font-mono">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  Jakarta, ID (WIB)
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-elevated text-emerald-400 border border-emerald-500/20">
                  UTC+7
                </span>
              </div>
              <div className="font-mono text-base font-semibold text-text-primary tracking-wider flex items-center justify-between">
                <span>{timeStr || "00:00:00"}</span>
                <Badge variant="emerald" dot className="text-[10px]">
                  Online
                </Badge>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Navigation (lg: 2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              Navigasi
            </h3>
            <ul className="space-y-2">
              {NAV_ROUTES.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className="text-sm text-text-secondary hover:text-emerald-400 transition-colors flex items-center justify-between group"
                  >
                    <span>{route.name}</span>
                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400 font-mono">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Featured Projects & Research (lg: 3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              Artikel &amp; Tulisan
            </h3>
            <ul className="space-y-2.5">
              {BLOG_POSTS_DATA.slice(0, 3).map((post) => (
                <li key={post.id}>
                  <Link
                    href={post.href}
                    className="block group"
                  >
                    <div className="text-xs font-medium text-text-primary group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {post.title}
                    </div>
                    <div className="text-[11px] text-text-muted font-mono mt-0.5 flex items-center gap-2">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
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
                  className="flex items-center justify-between p-2 rounded-lg bg-surface-card/60 hover:bg-surface-elevated border border-border-subtle hover:border-emerald-500/30 text-xs text-text-secondary hover:text-text-primary transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-text-muted group-hover:text-emerald-400 transition-colors">
                      {getSocialIcon(item.name)}
                    </span>
                    <span className="font-medium text-text-primary">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-text-muted group-hover:text-emerald-400">
                    {item.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div className="font-mono text-center sm:text-left">
            &copy; 2026 <span className="text-text-primary font-semibold">M. Faisal Fahri</span>. Dibangun dengan{" "}
            <span className="text-text-secondary font-semibold">Next.js 16</span>{" "}
            &amp;{" "}
            <span className="text-text-secondary font-semibold">Tailwind CSS</span>.
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Semua sistem berjalan normal
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
