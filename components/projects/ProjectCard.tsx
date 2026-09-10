import React from "react";
import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink, Activity, Layers } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Project } from "@/lib/projects";

export interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, featured = false }) => {
  const { frontmatter, slug } = project;

  // Category styling helper
  const getCategoryBadgeVariant = (cat: string) => {
    switch (cat) {
      case "Full-Stack":
        return "emerald" as const;
      case "Frontend & SPA":
        return "cyan" as const;
      case "Backend & API":
        return "neutral" as const;
      default:
        return "neutral" as const;
    }
  };

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border border-border-subtle bg-surface-card p-6 sm:p-7 transition-all duration-normal ease-spring-natural hover:border-accent-emerald/40 hover:bg-surface-elevated/40 hover:shadow-2xl hover:shadow-accent-emerald/10 hover:-translate-y-1.5 ${
        featured ? "md:col-span-2 border-accent-emerald/30 bg-accent-emerald/5" : ""
      }`}
    >
      <div className="space-y-4">
        {/* Top Header Row: Category Badge & Status / Metrics */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <Badge variant={getCategoryBadgeVariant(frontmatter.category)}>
              {frontmatter.category}
            </Badge>
            {frontmatter.featured && (
              <Badge variant="emerald" className="text-[11px]">
                Studi Kasus Pilihan
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Layers className="w-3.5 h-3.5 text-accent-emerald/70" />
            <span>{frontmatter.tags[0] || "System"}</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary group-hover:text-accent-emerald transition-colors duration-200">
            <Link href={`/projects/${slug}`} className="focus:outline-none flex items-center justify-between gap-2">
              <span>{frontmatter.title}</span>
              <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-accent-emerald shrink-0" />
            </Link>
          </h3>
          {frontmatter.subtitle && (
            <p className="mt-2 text-sm sm:text-base text-text-secondary leading-relaxed">
              {frontmatter.subtitle}
            </p>
          )}
        </div>

        {/* Key Metrics Callouts */}
        {frontmatter.metrics && frontmatter.metrics.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
            {frontmatter.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-surface-ground/90 border border-border-subtle/80 flex items-center gap-2 text-xs"
              >
                <Activity className="w-3.5 h-3.5 text-accent-emerald shrink-0" />
                <span className="text-text-primary font-medium truncate">{metric}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs text-text-secondary bg-surface-elevated rounded border border-border-subtle hover:border-text-muted transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Actions: Live Demo, GitHub & Deep Dive Case Study */}
      <div className="mt-6 pt-5 border-t border-border-subtle/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {frontmatter.githubUrl && (
            <a
              href={frontmatter.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lihat source code di GitHub"
              className="p-2 rounded-lg bg-surface-elevated text-text-secondary hover:text-text-primary hover:border-text-primary/30 border border-border-subtle transition-colors text-xs flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">Source Code</span>
            </a>
          )}
          {frontmatter.liveDemoUrl && (
            <a
              href={frontmatter.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buka Live Demo"
              className="p-2 rounded-lg bg-surface-elevated text-text-secondary hover:text-text-primary hover:border-text-primary/30 border border-border-subtle transition-colors text-xs flex items-center gap-1.5"
            >
              <ExternalLink className="w-4 h-4 text-accent-cyan" />
              <span className="hidden sm:inline">Demo Langsung</span>
            </a>
          )}
        </div>

        <Button href={`/projects/${slug}`} variant="secondary" size="sm" className="gap-1.5 group/btn">
          <span>Baca Studi Kasus</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 text-accent-emerald" />
        </Button>
      </div>
    </div>
  );
};
