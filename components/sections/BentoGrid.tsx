import * as React from "react";
import Link from "next/link";
import { FEATURED_PROJECTS } from "@/data/featured-projects";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ArrowUpRight,
  Layers,
  CheckCircle2,
  Cpu,
  Github,
  CreditCard,
  CalendarCheck,
} from "lucide-react";

interface BentoSubProjectCardProps {
  project: (typeof FEATURED_PROJECTS)[number];
  variant: "cyan" | "emerald";
  badgeCategory: string;
  subtitleIcon: React.ComponentType<{ className?: string }>;
  subtitleText: string;
}

function BentoSubProjectCard({
  project,
  variant,
  badgeCategory,
  subtitleIcon: SubtitleIcon,
  subtitleText,
}: BentoSubProjectCardProps) {
  const isCyan = variant === "cyan";
  const hoverBorder = isCyan ? "hover:border-accent-cyan/40" : "hover:border-accent-emerald/40";
  const hoverShadow = isCyan ? "hover:shadow-accent-cyan/10" : "hover:shadow-accent-emerald/10";
  const titleHover = isCyan ? "group-hover:text-accent-cyan" : "group-hover:text-accent-emerald";
  const iconColor = isCyan ? "text-accent-cyan" : "text-accent-emerald";

  return (
    <div
      className={`lg:col-span-6 group relative rounded-2xl bg-surface-card border border-border-subtle ${hoverBorder} p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl ${hoverShadow}`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge variant={variant}>{project.status}</Badge>
            <Badge variant={variant}>
              {badgeCategory}
            </Badge>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <SubtitleIcon className={`w-3.5 h-3.5 ${iconColor}`} />
            <span>{subtitleText}</span>
          </div>
        </div>

        <div>
          <h3 className={`text-xl sm:text-2xl font-bold tracking-tight text-text-primary ${titleHover} transition-colors`}>
            <Link href={project.caseStudyUrl} className="inline-flex items-center gap-2">
              <span>{project.title}</span>
              <ArrowUpRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${iconColor}`} />
            </Link>
          </h3>
          <p className="text-sm text-text-secondary mt-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Highlights */}
        <div className="rounded-xl bg-surface-ground/90 border border-border-subtle p-3.5 text-xs space-y-2">
          {project.architecture.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2 text-text-secondary text-[11px]">
              <CheckCircle2 className={`w-3.5 h-3.5 ${iconColor} mt-0.5 shrink-0`} />
              <span>{h}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {project.stats.map((s, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg bg-surface-elevated/60 border border-border-subtle/80 flex flex-col"
            >
              <span className="text-sm font-bold text-text-primary truncate">
                {s.value}
              </span>
              <span className="text-[10px] text-text-muted mt-0.5">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="pt-5 mt-5 border-t border-border-subtle/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs text-text-secondary bg-surface-elevated rounded border border-border-subtle"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <Button
              href={project.githubUrl}
              variant="secondary"
              size="sm"
              className="gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </Button>
          )}
          <Button
            href={project.caseStudyUrl}
            variant="primary"
            size="sm"
            className="gap-1"
          >
            <span>Detail</span>
            <ArrowUpRight className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function BentoGrid() {
  const [erpProject, keuanganProject, bimbelProject] = FEATURED_PROJECTS;

  return (
    <section id="featured-work" className="py-16 md:py-24 border-b border-border-subtle/60 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[300px] bg-accent-emerald/5 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[250px] bg-accent-cyan/5 blur-[120px] pointer-events-none -z-10" />

      <Container className="space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary">
              Proyek Unggulan &amp;{" "}
              <span className="bg-gradient-to-r from-accent-emerald to-accent-cyan bg-clip-text text-transparent">
                Sistem Produksi
              </span>
            </h2>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              Arsitektur aplikasi web nyata yang dibangun dengan ekosistem <strong>Laravel</strong>, <strong>Inertia.js</strong>, <strong>Vue 3</strong>, dan integrasi payment gateway.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button href="/projects" variant="secondary" size="md" className="gap-2 group">
              <span>Lihat Semua Proyek</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-accent-emerald" />
            </Button>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* ============================================================ */}
          {/* PROJECT 1: ERP SaaS Multi-Tenant UMKM (Flagship - 12 Cols) */}
          {/* ============================================================ */}
          {erpProject && (
            <div className="lg:col-span-12 group relative rounded-2xl bg-surface-card border border-border-subtle hover:border-accent-emerald/40 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-accent-emerald/10">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="emerald">
                      {erpProject.status}
                    </Badge>
                    <Badge variant="neutral">
                      Multi-Tenancy Architecture
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-accent-emerald font-medium">
                    <Cpu className="w-4 h-4" />
                    <span>Stancl Tenancy + Laravel 12</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary group-hover:text-accent-emerald transition-colors">
                    <Link href={erpProject.caseStudyUrl} className="focus:outline-none inline-flex items-center gap-2">
                      <span>{erpProject.title}</span>
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-accent-emerald" />
                    </Link>
                  </h3>
                  <p className="text-sm sm:text-base text-text-secondary mt-2.5 leading-relaxed max-w-4xl">
                    {erpProject.description}
                  </p>
                </div>

                {/* Architecture Flow */}
                <div className="rounded-xl bg-surface-ground/90 border border-border-subtle p-4 text-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-border-subtle/70 pb-2 text-text-muted">
                    <span className="flex items-center gap-1.5 text-text-secondary font-medium">
                      <Layers className="w-3.5 h-3.5 text-accent-emerald" />
                      <span>Arsitektur &amp; Alur Data Multi-Tenant</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-1 text-center">
                    {erpProject.architecture.flow.map((node, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg border border-border-subtle bg-surface-elevated/80 text-text-secondary text-[11px]"
                      >
                        <div className="text-[10px] text-text-muted font-medium">Tahap {i + 1}</div>
                        <div className="truncate mt-0.5 font-medium">{node}</div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-border-subtle/50 text-[11px] text-text-secondary">
                    {erpProject.architecture.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-left">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {erpProject.stats.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-surface-elevated/60 border border-border-subtle/80 flex flex-col"
                    >
                      <span className="text-base sm:text-lg font-bold text-text-primary">
                        {s.value}
                      </span>
                      <span className="text-xs text-text-muted mt-0.5">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions & Tech Tags */}
              <div className="pt-6 mt-6 border-t border-border-subtle/60 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {erpProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs text-text-secondary bg-surface-elevated rounded border border-border-subtle"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {erpProject.githubUrl && (
                    <Button
                      href={erpProject.githubUrl}
                      variant="secondary"
                      size="sm"
                      className="gap-2"
                    >
                      <Github className="w-4 h-4" />
                      <span>Lihat di GitHub</span>
                    </Button>
                  )}
                  <Button
                    href={erpProject.caseStudyUrl}
                    variant="primary"
                    size="sm"
                    className="gap-1.5"
                  >
                    <span>Studi Kasus</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* PROJECT 2: Sistem Keuangan Lembaga (6 Cols) */}
          {/* ============================================================ */}
          {keuanganProject && (
            <BentoSubProjectCard
              project={keuanganProject}
              variant="cyan"
              badgeCategory="Fintech & Billing"
              subtitleIcon={CreditCard}
              subtitleText="Duitku Payment Gateway"
            />
          )}

          {/* ============================================================ */}
          {/* PROJECT 3: Sistem Operasional Bimbel AHE (6 Cols) */}
          {/* ============================================================ */}
          {bimbelProject && (
            <BentoSubProjectCard
              project={bimbelProject}
              variant="emerald"
              badgeCategory="Multi-Role RBAC"
              subtitleIcon={CalendarCheck}
              subtitleText="Live Presensi & Jadwal"
            />
          )}
        </div>
      </Container>
    </section>
  );
}
