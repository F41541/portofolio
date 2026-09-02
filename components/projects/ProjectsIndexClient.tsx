"use client";

import React, { useState, useMemo } from "react";
import { Search, FolderGit2, Sparkles, FilterX, Code2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Project } from "@/lib/projects";

export interface ProjectsIndexClientProps {
  projects: Project[];
  categories: { category: string; count: number }[];
}

const PRESET_TABS = ["Semua", "Full-Stack", "Frontend & SPA", "Backend & API", "Open Source"];

export const ProjectsIndexClient: React.FC<ProjectsIndexClientProps> = ({
  projects,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const { frontmatter } = project;
      const matchesSearch =
        searchQuery.trim() === "" ||
        frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (frontmatter.subtitle &&
          frontmatter.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        frontmatter.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        frontmatter.metrics.some((m) =>
          m.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "Semua" ||
        frontmatter.category.toLowerCase() === selectedCategory.toLowerCase() ||
        (selectedCategory === "Full-Stack" &&
          (frontmatter.category.includes("Full-Stack") || frontmatter.tags.some((t) => t.includes("Full-Stack") || t.includes("Laravel") || t.includes("Inertia")))) ||
        (selectedCategory === "Frontend & SPA" &&
          (frontmatter.category.includes("Frontend") || frontmatter.tags.some((t) => t.includes("Vue") || t.includes("React") || t.includes("Next.js")))) ||
        (selectedCategory === "Backend & API" &&
          (frontmatter.category.includes("Backend") || frontmatter.tags.some((t) => t.includes("API") || t.includes("PHP") || t.includes("Node")))) ||
        (selectedCategory === "Open Source" &&
          (frontmatter.category.includes("Open Source") || frontmatter.tags.some((t) => t.includes("Open Source"))));

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchQuery, selectedCategory]);

  return (
    <div className="py-12 md:py-20">
      <Container>
        {/* Hero Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="emerald" dot>
              Portofolio Proyek
            </Badge>
            <span className="text-xs font-mono text-text-muted flex items-center gap-1">
              <FolderGit2 className="w-3.5 h-3.5 text-accent-cyan" />
              {projects.length} Arsitektur Aplikasi Web
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary">
            Proyek Rekayasa &amp; Aplikasi Web
          </h1>
          <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed">
            Aplikasi web full-stack produksi, microservices RESTful API, integrasi payment gateway, dan sistem komponen UI interaktif performa tinggi.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-10 p-6 rounded-2xl border border-border-subtle bg-surface-card/60 backdrop-blur-md space-y-5">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input
              type="text"
              placeholder="Cari proyek berdasarkan teknologi (Laravel, Vue 3, Next.js, Redis, PostgreSQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-surface-elevated/80 border-border-subtle focus:border-accent-emerald text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-text-muted hover:text-text-primary px-1.5 py-0.5 rounded bg-surface-ground"
              >
                Hapus
              </button>
            )}
          </div>

          {/* Preset Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border-subtle/50">
            <span className="text-xs font-mono text-text-muted flex items-center gap-1 mr-1">
              <Code2 className="w-3 h-3 text-accent-emerald" />
              Kategori:
            </span>

            {PRESET_TABS.map((tab) => {
              const isSelected = selectedCategory === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setSelectedCategory(tab)}
                  className={`text-xs px-3.5 py-1.5 rounded-full transition-all duration-200 font-medium ${
                    isSelected
                      ? "bg-accent-emerald text-surface-ground font-semibold shadow-md shadow-emerald-500/20"
                      : "bg-surface-elevated text-text-secondary hover:text-text-primary border border-border-subtle hover:border-text-muted"
                  }`}
                >
                  {tab}
                </button>
              );
            })}

            {selectedCategory !== "Semua" && (
              <button
                onClick={() => setSelectedCategory("Semua")}
                className="ml-auto text-xs text-accent-emerald hover:underline flex items-center gap-1"
              >
                <FilterX className="w-3 h-3" />
                Reset kategori
              </button>
            )}
          </div>
        </div>

        {/* Results Stats */}
        <div className="flex items-center justify-between mb-6 text-xs text-text-muted">
          <span>
            Menampilkan <strong className="text-text-primary">{filteredProjects.length}</strong> dari {projects.length} proyek
            {selectedCategory !== "Semua" && (
              <> dalam kategori <span className="text-accent-emerald font-mono">[{selectedCategory}]</span></>
            )}
            {searchQuery && (
              <> yang cocok dengan &ldquo;<span className="text-accent-cyan">{searchQuery}</span>&rdquo;</>
            )}
          </span>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center rounded-2xl border border-dashed border-border-subtle bg-surface-card/30">
            <Sparkles className="w-8 h-8 text-accent-emerald mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-semibold text-text-primary">Tidak ada proyek yang cocok</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Coba gunakan kata kunci pencarian lain atau ubah filter kategori.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Semua");
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-accent-emerald bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-colors"
            >
              Reset semua filter
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};
