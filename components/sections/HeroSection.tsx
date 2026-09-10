"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  ArrowDown,
  Activity,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

export function HeroSection() {
  const highlights = [
    {
      value: "Laravel + Vue",
      label: "Full-Stack Inertia.js & REST API",
      icon: Layers,
    },
    {
      value: "Next.js & React",
      label: "Modern UI, TypeScript & Tailwind",
      icon: Zap,
    },
    {
      value: "MySQL & Postgres",
      label: "Relational DB & Query Optimization",
      icon: ShieldCheck,
    },
    {
      value: "S.Kom (UCIC)",
      label: "Teknik Informatika, IPK 3.64",
      icon: Activity,
    },
  ];

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-border-subtle/60">
      {/* Background radial glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent-emerald/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-accent-cyan/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <Container className="space-y-12">
        {/* Main Hero Header */}
        <div className="max-w-4xl space-y-6">
          {/* High-Contrast Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary leading-[1.1]">
            Membangun{" "}
            <span className="bg-gradient-to-r from-accent-emerald to-accent-cyan bg-clip-text text-transparent">
              Aplikasi Web Modern
            </span>{" "}
            yang Cepat, Bersih, &amp; Skalabel
          </h1>

          {/* Sub-headline Value Proposition */}
          <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-3xl">
            Halo, saya <strong>M. Faisal Fahri</strong>. Spesialis dalam merancang full-stack web application menggunakan ekosistem <strong>Laravel</strong>, <strong>Vue.js</strong>, <strong>Inertia.js</strong>, dan <strong>Next.js / React</strong> dengan arsitektur database relasional yang efisien dan antarmuka responsif.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Button
              href="#featured-work"
              variant="primary"
              size="lg"
              className="gap-2.5 shadow-xl shadow-accent-emerald/20 group"
            >
              <span>Lihat Proyek Pilihan</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </Button>

            <Button
              href="/store"
              variant="secondary"
              size="lg"
              className="gap-2 hover:border-accent-emerald/50 hover:bg-surface-elevated/80 transition-all"
            >
              <span>Katalog Layanan</span>
              <ArrowUpRight className="w-4 h-4 text-accent-emerald" />
            </Button>

            <Button
              href="/contact"
              variant="ghost"
              size="lg"
              className="gap-1.5 text-text-muted hover:text-text-primary"
            >
              <span>Hubungi Saya</span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl bg-surface-card/60 backdrop-blur-md border border-border-subtle shadow-xl">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="space-y-1.5 border-l-2 border-accent-emerald/30 pl-4 sm:pl-6 transition-all hover:border-accent-emerald group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-text-primary group-hover:text-accent-emerald transition-colors">
                      {item.value}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-text-secondary font-medium leading-tight">
                    {item.label}
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
