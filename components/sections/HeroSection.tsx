"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ArrowDown,
  Terminal,
  Activity,
  Layers,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

export interface HeroSectionProps {
  onScrollToTerminal?: () => void;
}

export function HeroSection({ onScrollToTerminal }: HeroSectionProps) {
  const stats = [
    {
      value: "5+ Thn",
      label: "Pengalaman Web Development",
      icon: Activity,
    },
    {
      value: "30+",
      label: "Web App & Proyek Selesai",
      icon: Layers,
    },
    {
      value: "<100ms",
      label: "Rata-rata Respon API",
      icon: Zap,
    },
    {
      value: "99.9%",
      label: "Uptime & Stabilitas Sistem",
      icon: ShieldCheck,
    },
  ];

  const handleTerminalClick = (e: React.MouseEvent) => {
    if (onScrollToTerminal) {
      e.preventDefault();
      onScrollToTerminal();
    } else {
      const terminalElem = document.getElementById("interactive-terminal");
      if (terminalElem) {
        e.preventDefault();
        terminalElem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-border-subtle/60">
      {/* Background radial glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <Container className="space-y-12">
        {/* Main Hero Header */}
        <div className="max-w-4xl space-y-6">
          {/* Tech Badge */}
          <div className="inline-flex items-center p-0.5 rounded-full bg-gradient-to-r from-emerald-500/30 via-cyan-500/30 to-emerald-500/30 border border-emerald-500/30 shadow-lg shadow-emerald-500/5">
            <Badge
              variant="emerald"
              dot
              className="bg-surface-card/90 text-emerald-400 font-mono text-xs sm:text-sm px-3.5 py-1 tracking-wide uppercase font-semibold"
            >
              Full-Stack Web Developer &amp; Frontend Specialist
            </Badge>
          </div>

          {/* High-Contrast Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary leading-[1.1]">
            Membangun{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Aplikasi Web Modern
            </span>{" "}
            yang Cepat, Bersih, &amp; Skalabel
          </h1>

          {/* Sub-headline Value Proposition */}
          <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-3xl">
            Spesialis dalam merancang full-stack web application menggunakan ekosistem <strong>Laravel</strong>, <strong>Vue.js</strong>, <strong>React</strong>, dan <strong>Next.js 15</strong> dengan arsitektur database yang efisien dan UI interaktif berkinerja tinggi.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link href="#featured-work" scroll={true}>
              <Button
                variant="primary"
                size="lg"
                className="gap-2.5 shadow-xl shadow-emerald-500/20 group"
              >
                <span>Lihat Proyek Pilihan</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </Button>
            </Link>

            <a
              href="#interactive-terminal"
              onClick={handleTerminalClick}
            >
              <Button
                variant="secondary"
                size="lg"
                className="gap-2.5 hover:border-emerald-500/50 hover:bg-surface-elevated/80 transition-all"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Interactive Terminal</span>
              </Button>
            </a>

            <Link href="/contact">
              <Button
                variant="ghost"
                size="lg"
                className="gap-1.5 text-text-muted hover:text-text-primary"
              >
                <span>Hubungi Saya</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl bg-surface-card/60 backdrop-blur-md border border-border-subtle shadow-xl">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="space-y-1.5 border-l-2 border-emerald-500/30 pl-4 sm:pl-6 transition-all hover:border-emerald-400 group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-text-primary font-mono group-hover:text-emerald-400 transition-colors">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-text-secondary font-medium leading-tight">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
