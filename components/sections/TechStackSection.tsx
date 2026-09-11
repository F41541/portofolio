"use client";

import * as React from "react";
import { TECH_STACK, TECH_CATEGORIES, TechCategory, TechItem } from "@/data/tech-stack";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  Code2,
  Cpu,
  Server,
  Layout,
  Cloud,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";

export function TechStackSection() {
  const [activeCategory, setActiveCategory] = React.useState<TechCategory>("all");

  const filteredSkills = React.useMemo(() => {
    if (activeCategory === "all") return TECH_STACK;
    return TECH_STACK.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const getCategoryIcon = (category: TechCategory) => {
    switch (category) {
      case "frontend":
        return <Layout className="w-4 h-4" />;
      case "backend":
        return <Server className="w-4 h-4" />;
      case "database":
        return <Cpu className="w-4 h-4" />;
      case "tools-devops":
        return <Cloud className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  const getLevelBadgeVariant = (level: TechItem["level"]): "emerald" | "cyan" | "neutral" => {
    switch (level) {
      case "Mastery":
        return "emerald";
      case "Advanced":
        return "cyan";
      default:
        return "neutral";
    }
  };

  return (
    <section id="tech-stack" className="py-16 md:py-24 border-b border-border-subtle/60 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[300px] bg-accent-emerald/5 blur-[150px] pointer-events-none -z-10" />

      <Container className="space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary">
              Keahlian Tech Stack &amp;{" "}
              <span className="bg-gradient-to-r from-accent-emerald to-accent-cyan bg-clip-text text-transparent">
                Toolchain
              </span>
            </h2>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              Kombinasi teknologi yang terbukti andal dalam membangun aplikasi web bisnis, sistem e-commerce, dan RESTful API performa tinggi.
            </p>
          </div>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-surface-card rounded-xl border border-border-subtle w-fit max-w-full overflow-x-auto">
          {TECH_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count =
              cat.id === "all"
                ? TECH_STACK.length
                : TECH_STACK.filter((s) => s.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 min-h-[40px] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-fast ease-spring-snappy whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-emerald active:scale-95 ${
                  isActive
                    ? "bg-surface-elevated text-accent-emerald shadow-sm border border-accent-emerald/30 font-semibold"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated/50 border border-transparent"
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-medium ${
                    isActive
                      ? "bg-accent-emerald/20 text-accent-emerald"
                      : "bg-surface-ground text-text-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tech Stack Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredSkills.map((tech) => (
            <Card
              key={tech.name}
              hoverGlow
              className="group relative p-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-lg bg-surface-ground border border-border-subtle text-accent-emerald group-hover:border-accent-emerald/30 group-hover:scale-105 transition-all">
                      <Code2 className="w-4 h-4" />
                    </span>
                    <div>
                      <h3 className="font-bold text-base text-text-primary group-hover:text-accent-emerald transition-colors">
                        {tech.name}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] text-text-secondary font-medium mt-0.5">
                        <span>{tech.years} Thn Pengalaman</span>
                        <span>•</span>
                        <span className="capitalize">{tech.category.replace("-", " / ")}</span>
                      </div>
                    </div>
                  </div>

                  <Badge variant={getLevelBadgeVariant(tech.level)}>
                    {tech.level}
                  </Badge>
                </div>

                {/* Production Usage Context */}
                <p className="text-xs text-text-secondary leading-relaxed bg-surface-ground/70 p-2.5 rounded-lg border border-border-subtle/70">
                  {tech.productionUsage}
                </p>
              </div>

              {/* Tags */}
              <div className="pt-3 mt-3 border-t border-border-subtle/50 flex flex-wrap gap-1.5">
                {tech.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[11px] text-text-secondary font-medium bg-surface-elevated rounded border border-border-subtle/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Highlights & Metrics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <Card className="p-4 bg-surface-card/60 flex items-start gap-3">
            <Zap className="w-5 h-5 text-accent-emerald flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-text-primary">Fokus Performa</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Optimasi rendering SSR/SSG, efisiensi query database (eager loading &amp; indexing), dan Redis caching.
              </p>
            </div>
          </Card>

          <Card className="p-4 bg-surface-card/60 flex items-start gap-3">
            <Cpu className="w-5 h-5 text-accent-cyan flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-text-primary">Arsitektur Modular</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Penerapan Service Layer terstruktur di Laravel serta sistem komponen reusable dengan TypeScript &amp; Tailwind CSS.
              </p>
            </div>
          </Card>

          <Card className="p-4 bg-surface-card/60 flex items-start gap-3">
            <Cloud className="w-5 h-5 text-accent-emerald flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-text-primary">Deployment &amp; CI/CD</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Deployment konsisten dengan Docker Compose, konfigurasi Nginx reverse proxy di VPS Linux, dan otomasi GitHub Actions.
              </p>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
