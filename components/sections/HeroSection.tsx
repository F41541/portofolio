"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  ArrowDown,
  ArrowUpRight,
  Layers,
  Code2,
  Database,
  GraduationCap,
} from "lucide-react";

export function HeroSection() {
  const highlights = [
    {
      category: "01 // Full-Stack",
      value: "Laravel + Vue",
      label: "Full-Stack Inertia.js & REST API",
      icon: Layers,
    },
    {
      category: "02 // Frontend",
      value: "Next.js & React",
      label: "Modern UI, TypeScript & Tailwind",
      icon: Code2,
    },
    {
      category: "03 // Database",
      value: "MySQL & Postgres",
      label: "Relational DB & Query Optimization",
      icon: Database,
    },
    {
      category: "04 // Pendidikan",
      value: "S.Kom (UCIC)",
      label: "Teknik Informatika, IPK 3.64",
      icon: GraduationCap,
    },
  ];

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-border-subtle/60">
      {/* Background radial glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent-emerald/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-accent-cyan/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <Container className="space-y-12">
        {/* Main Hero Header with Motion Stagger */}
        <div className="max-w-4xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2"
          >
          </motion.div>

          {/* High-Contrast Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-text-primary leading-[1.1]"
          >
            Membangun{" "}
            <span className="bg-gradient-to-r from-accent-emerald to-accent-cyan bg-clip-text text-transparent">
              Aplikasi Web Modern
            </span>{" "}
            yang Cepat, Bersih, &amp; Skalabel
          </motion.h1>

          {/* Sub-headline Value Proposition */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-3xl"
          >
            Halo, saya <strong>M. Faisal Fahri</strong>. Spesialis dalam merancang full-stack web application menggunakan ekosistem <strong>Laravel</strong>, <strong>Vue.js</strong>, <strong>Inertia.js</strong>, dan <strong>Next.js / React</strong> dengan arsitektur database relasional yang efisien dan antarmuka responsif.
          </motion.p>

          {/* Action Buttons with Visual Hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="pt-2 flex flex-wrap items-center gap-4"
          >
            <Button
              href="#featured-work"
              variant="primary"
              size="lg"
              className="gap-2.5 shadow-xl shadow-accent-emerald/20 group"
            >
              <span>Lihat Proyek Pilihan</span>
              <ArrowDown className="w-4 h-4 transition-transform duration-fast ease-spring-snappy group-hover:translate-y-0.5" />
            </Button>

            <Button
              href="/store"
              variant="secondary"
              size="lg"
              className="gap-2"
            >
              <span>Katalog Layanan</span>
              <ArrowUpRight className="w-4 h-4 text-accent-emerald" />
            </Button>

            <Button
              href="/contact"
              variant="ghost"
              size="lg"
              className="gap-1.5"
            >
              <span>Hubungi Saya</span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        {/* Competency Telemetry Dock (Clean Engineering Strip - No AI-Slop Borders) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="pt-6"
        >
          <div className="rounded-2xl border border-border-subtle bg-surface-card/60 backdrop-blur-md shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border-subtle/80">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 flex flex-col justify-between space-y-4 transition-all duration-fast ease-spring-natural hover:bg-surface-elevated/50 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-widest text-text-muted/70 uppercase">
                        {item.category}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-border-subtle flex items-center justify-center text-text-muted group-hover:text-accent-emerald group-hover:border-accent-emerald/40 group-hover:scale-105 transition-all duration-fast ease-spring-snappy">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-lg sm:text-xl font-bold tracking-tight text-text-primary group-hover:text-accent-emerald transition-colors">
                        {item.value}
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {item.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
