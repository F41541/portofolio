"use client";

import React, { useState, useMemo } from "react";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SearchFilterBar } from "@/components/ui/SearchFilterBar";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Project } from "@/lib/projects";

export interface ProjectsIndexClientProps {
  projects: Project[];
}

export const ProjectsIndexClient: React.FC<ProjectsIndexClientProps> = ({
  projects,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const categories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach((p) => {
      if (p.frontmatter.category) cats.add(p.frontmatter.category);
    });
    const list = ["Semua", ...Array.from(cats)];
    if (projects.some((p) => Boolean(p.frontmatter.githubUrl)) && !list.includes("Open Source")) {
      list.push("Open Source");
    }
    return list;
  }, [projects]);

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

      const matchesCategory = (() => {
        if (selectedCategory === "Semua") return true;

        if (selectedCategory === "Open Source") {
          return (
            Boolean(frontmatter.githubUrl) ||
            frontmatter.category.toLowerCase().includes("open source") ||
            frontmatter.tags.some((t) => t.toLowerCase().includes("open source"))
          );
        }

        if (frontmatter.category.toLowerCase() === selectedCategory.toLowerCase()) {
          return true;
        }

        if (selectedCategory === "Full-Stack") {
          return frontmatter.category.toLowerCase().includes("full-stack");
        }
        if (selectedCategory === "Frontend & SPA") {
          return frontmatter.category.toLowerCase().includes("frontend");
        }
        if (selectedCategory === "Backend & API") {
          return (
            frontmatter.category.toLowerCase().includes("backend") ||
            frontmatter.category.toLowerCase().includes("api")
          );
        }

        return false;
      })();

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchQuery, selectedCategory]);

  return (
    <section className="pt-12 pb-16 md:pt-20 md:pb-24 border-b border-border-subtle/60 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[300px] bg-accent-emerald/5 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[250px] bg-accent-cyan/5 blur-[120px] pointer-events-none -z-10" />

      <Container>
        {/* Hero Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
            Proyek Rekayasa &amp;{" "}
            <span className="bg-gradient-to-r from-accent-emerald to-accent-cyan bg-clip-text text-transparent">
              Aplikasi Web
            </span>
          </h1>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Aplikasi web full-stack produksi, microservices RESTful API, integrasi payment gateway, dan sistem komponen UI interaktif performa tinggi.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <SearchFilterBar
          className="mb-10"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchPlaceholder="Cari proyek berdasarkan teknologi (Laravel, Vue 3, Next.js, Redis, PostgreSQL)..."
        />

        {/* Results Stats */}
        <div className="flex items-center justify-between mb-6 text-xs text-text-muted">
          <span>
            Menampilkan <strong className="text-text-primary">{filteredProjects.length}</strong> dari {projects.length} proyek
            {selectedCategory !== "Semua" && (
              <> dalam kategori <span className="text-accent-emerald font-medium">[{selectedCategory}]</span></>
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
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Semua");
              }}
              variant="secondary"
              size="sm"
              className="mt-4 border-accent-emerald/40 text-accent-emerald hover:bg-accent-emerald/10"
            >
              Reset semua filter
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
};
