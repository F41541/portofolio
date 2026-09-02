"use client";

import * as React from "react";
import Link from "next/link";
import { FEATURED_PROJECTS } from "@/data/featured-projects";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ArrowUpRight,
  Zap,
  Activity,
  Cpu,
  GitBranch,
  Star,
  GitFork,
  Radio,
  Server,
  Layers,
  CheckCircle2,
  Sparkles,
  Search,
  Database,
  Terminal,
  ShieldCheck,
} from "lucide-react";

export function BentoGrid() {
  const flagship = FEATURED_PROJECTS[0]; // Autonomous Multi-Agent Orchestration Platform
  const ragPipeline = FEATURED_PROJECTS[1]; // Vector Search & RAG

  // Live counter simulation states
  const [latency, setLatency] = React.useState(8.4);
  const [p99Latency, setP99Latency] = React.useState(11.2);
  const [activeSessions, setActiveSessions] = React.useState(104280);
  const [streamStep, setStreamStep] = React.useState(0);

  // Periodic subtle live data tick simulation
  React.useEffect(() => {
    const interval = setInterval(() => {
      setLatency((prev) => +(8.2 + Math.random() * 0.5).toFixed(1));
      setP99Latency((prev) => +(11.0 + Math.random() * 0.6).toFixed(1));
      setActiveSessions((prev) => prev + Math.floor(Math.random() * 7) - 3);
      setStreamStep((prev) => (prev + 1) % 5);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="featured-work" className="py-16 md:py-24 border-b border-border-subtle/60 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[300px] bg-emerald-500/5 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[250px] bg-cyan-500/5 blur-[120px] pointer-events-none -z-10" />

      <Container className="space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <Badge variant="emerald" dot>
                Arsitektur &amp; Portofolio Pilihan
              </Badge>
              <span className="text-xs font-mono text-text-muted">SYSTEM_INDEX: 0x4A</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary">
              Proyek Unggulan &amp;{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Sistem Utama
              </span>
            </h2>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              Tinjauan mendalam pada arsitektur produksi, alur kerja full-stack,
              dan optimasi database berkecepatan tinggi.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/projects">
              <Button variant="secondary" size="md" className="gap-2 group">
                <span>Lihat Semua Proyek</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-emerald-400" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Tech-Brutalist Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 auto-rows-[minmax(180px,auto)]">
          {/* ============================================================ */}
          {/* CARD 1: Flagship System Showcase (Col 2, Row 2) */}
          {/* ============================================================ */}
          <div className="md:col-span-2 lg:col-span-2 md:row-span-2 group relative rounded-2xl bg-surface-card border border-border-subtle hover:border-emerald-500/40 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10">
            {/* Top row */}
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <Badge variant="emerald" dot>
                    {flagship.status}
                  </Badge>
                  <span className="text-xs font-mono text-text-muted bg-surface-elevated px-2 py-0.5 rounded border border-border-subtle">
                    {flagship.category}
                  </span>
                </div>

                {/* Metrics Pill */}
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-border-subtle/80 font-mono text-xs">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Latency {flagship.metrics.latency}</span>
                  </span>
                  <span className="text-border-subtle">•</span>
                  <span className="text-cyan-400 font-semibold">{flagship.metrics.throughput}</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary group-hover:text-emerald-400 transition-colors">
                  <Link href={flagship.caseStudyUrl} className="focus:outline-none flex items-center gap-2">
                    <span>{flagship.title}</span>
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400 flex-shrink-0" />
                  </Link>
                </h3>
                <p className="text-sm sm:text-base text-text-secondary mt-2.5 leading-relaxed">
                  {flagship.description}
                </p>
              </div>

              {/* Interactive / Animated Architecture Flow Diagram */}
              <div className="rounded-xl bg-surface-ground/90 border border-border-subtle p-4 font-mono text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-border-subtle/70 pb-2 text-text-muted">
                  <span className="flex items-center gap-1.5 text-text-secondary">
                    <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                    <span>AGENT_ORCHESTRATION_TOPOLOGY</span>
                  </span>
                  <span className="text-[11px] text-emerald-400/90 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE_STATE
                  </span>
                </div>

                {/* Node Flow */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-1 text-center">
                  {flagship.architecture.flow.map((node, i) => {
                    const isActive = streamStep === i;
                    return (
                      <div
                        key={i}
                        className={`p-2 rounded-lg border text-[11px] transition-all duration-300 ${
                          isActive
                            ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-semibold shadow-md shadow-emerald-500/20 scale-[1.02]"
                            : "bg-surface-elevated/80 border-border-subtle text-text-secondary"
                        }`}
                      >
                        <div className="text-[9px] text-text-muted">LANGKAH 0{i + 1}</div>
                        <div className="truncate mt-0.5">{node}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Highlights checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-border-subtle/50 text-[11px] text-text-secondary">
                  {flagship.architecture.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-left">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-2">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                {flagship.stats.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-surface-elevated/60 border border-border-subtle/80 flex flex-col"
                  >
                    <span className="text-lg sm:text-xl font-bold font-mono text-text-primary">
                      {s.value}
                    </span>
                    <span className="text-[11px] text-text-muted mt-0.5">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions & Tech Tags */}
            <div className="pt-6 mt-6 border-t border-border-subtle/60 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {flagship.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs font-mono text-text-secondary bg-surface-elevated rounded border border-border-subtle"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Link href={flagship.caseStudyUrl}>
                <Button variant="primary" size="sm" className="gap-2">
                  <span>Pelajari Studi Kasus</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* ============================================================ */}
          {/* CARD 2: Neural Search & RAG Pipeline (Col 2) */}
          {/* ============================================================ */}
          <div className="md:col-span-2 lg:col-span-2 group relative rounded-2xl bg-surface-card border border-border-subtle hover:border-cyan-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="cyan" dot>
                    {ragPipeline.status}
                  </Badge>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    Rust + Qdrant
                  </span>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-xs text-text-muted">
                  <Database className="w-3.5 h-3.5 text-cyan-400" />
                  <span>50M+ VECTORS</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary group-hover:text-cyan-400 transition-colors">
                  <Link href={ragPipeline.caseStudyUrl} className="flex items-center gap-2">
                    <span>{ragPipeline.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                  </Link>
                </h3>
                <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">
                  {ragPipeline.description}
                </p>
              </div>

              {/* Animated RAG data flow representation */}
              <div className="rounded-xl bg-surface-ground/90 border border-border-subtle p-3.5 font-mono text-xs space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-text-muted">
                  <span className="flex items-center gap-1 text-cyan-400">
                    <Search className="w-3.5 h-3.5" />
                    <span>HYBRID_RETRIEVAL_STREAM</span>
                  </span>
                  <span className="text-text-secondary font-semibold">P99: {latency}ms</span>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto py-1">
                  <div className="px-2.5 py-1.5 rounded bg-surface-elevated border border-border-subtle text-text-secondary whitespace-nowrap text-[11px]">
                    User Query
                  </div>
                  <span className="text-cyan-400 text-xs font-bold">→</span>
                  <div className="px-2.5 py-1.5 rounded bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 whitespace-nowrap text-[11px] font-semibold">
                    Dense + BM25 RRF
                  </div>
                  <span className="text-cyan-400 text-xs font-bold">→</span>
                  <div className="px-2.5 py-1.5 rounded bg-surface-elevated border border-border-subtle text-text-secondary whitespace-nowrap text-[11px]">
                    Qdrant HNSW
                  </div>
                  <span className="text-cyan-400 text-xs font-bold">→</span>
                  <div className="px-2.5 py-1.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 whitespace-nowrap text-[11px]">
                    Context Pack
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-border-subtle/60 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {ragPipeline.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs font-mono text-text-secondary bg-surface-elevated rounded border border-border-subtle"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Link
                href={ragPipeline.caseStudyUrl}
                className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>Studi Kasus Lengkap</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* ============================================================ */}
          {/* CARD 3: Live Latency & Performance Benchmark (Col 1) */}
          {/* ============================================================ */}
          <div className="md:col-span-1 lg:col-span-1 rounded-2xl bg-surface-card border border-border-subtle p-6 flex flex-col justify-between group hover:border-emerald-500/30 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
                    Telemetrics
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  LIVE
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-text-primary">
                  Performa Endpoint
                </h4>
                <p className="text-xs text-text-secondary mt-1">
                  Rata-rata latensi round-trip respon API.
                </p>
              </div>

              {/* Big metric ticker */}
              <div className="p-3 rounded-xl bg-surface-ground border border-border-subtle space-y-2">
                <div className="flex items-baseline justify-between font-mono">
                  <span className="text-2xl font-extrabold text-emerald-400">
                    {latency}
                  </span>
                  <span className="text-xs text-text-muted">ms / request</span>
                </div>

                <div className="w-full bg-surface-elevated rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (latency / 15) * 100)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-text-muted pt-1">
                  <span>P99: {p99Latency}ms</span>
                  <span>100k req/s target</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border-subtle/50 text-[11px] font-mono text-text-secondary flex items-center justify-between">
              <span>SLA Uptime</span>
              <span className="text-emerald-400 font-bold">99.995%</span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* CARD 4: Active Open Source Contributions & GitHub (Col 1) */}
          {/* ============================================================ */}
          <div className="md:col-span-1 lg:col-span-1 rounded-2xl bg-surface-card border border-border-subtle p-6 flex flex-col justify-between group hover:border-cyan-500/30 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
                    Open Source
                  </span>
                </div>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-text-primary transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              <div>
                <h4 className="text-base font-bold text-text-primary">
                  Open Source &amp; Komunitas
                </h4>
                <p className="text-xs text-text-secondary mt-1">
                  Repositori publik, package, dan UI component tools.
                </p>
              </div>

              {/* GitHub Star stats */}
              <div className="grid grid-cols-2 gap-2 font-mono">
                <div className="p-2.5 rounded-xl bg-surface-ground border border-border-subtle flex flex-col">
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400/20" />
                    <span className="font-bold">2.4k+</span>
                  </div>
                  <span className="text-[10px] text-text-muted mt-1">GitHub Stars</span>
                </div>

                <div className="p-2.5 rounded-xl bg-surface-ground border border-border-subtle flex flex-col">
                  <div className="flex items-center gap-1 text-cyan-400 text-xs">
                    <GitFork className="w-3.5 h-3.5" />
                    <span className="font-bold">480+</span>
                  </div>
                  <span className="text-[10px] text-text-muted mt-1">Forks / Clones</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border-subtle/50 flex items-center justify-between text-[11px] font-mono">
              <span className="text-text-muted">Active Sessions</span>
              <span className="text-cyan-400 font-bold">
                {activeSessions.toLocaleString()}
              </span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* CARD 5: Technology Radar / Current Research (Col 2) */}
          {/* ============================================================ */}
          <div className="md:col-span-2 lg:col-span-2 rounded-2xl bg-surface-card border border-border-subtle p-6 sm:p-7 flex flex-col justify-between group hover:border-emerald-500/30 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                    Eksplorasi Teknologi &amp; Riset
                  </span>
                </div>
                <span className="text-xs font-mono text-text-muted">2026</span>
              </div>

              <div>
                <h4 className="text-xl font-bold text-text-primary">
                  Arsitektur Web Modern &amp; Server Components (RSC)
                </h4>
                <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                  Mengembangkan pola rendering hybrid di Next.js 16 / Nuxt 3, optimasi query database Eloquent &amp; Prisma, serta interaksi real-time tanpa latency.
                </p>
              </div>

              {/* Research Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
                <div className="p-2.5 rounded-lg bg-surface-ground border border-border-subtle/80 space-y-1">
                  <span className="text-emerald-400 font-semibold block text-[11px]">TERAPKAN</span>
                  <p className="text-text-secondary text-[11px]">Laravel 12, Vue 3, Next.js 16</p>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-ground border border-border-subtle/80 space-y-1">
                  <span className="text-cyan-400 font-semibold block text-[11px]">UJI COBA</span>
                  <p className="text-text-secondary text-[11px]">Inertia v2, Server Actions, Redis</p>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-ground border border-border-subtle/80 space-y-1">
                  <span className="text-amber-400 font-semibold block text-[11px]">EVALUASI</span>
                  <p className="text-text-secondary text-[11px]">Edge Functions, AI Web Integrations</p>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-border-subtle/60 flex items-center justify-between">
              <span className="text-xs font-mono text-text-muted">
                Status: Eksplorasi Aktif
              </span>
              <Link
                href="/blog"
                className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Baca Artikel Riset</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
