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
  CheckCircle,
  HelpCircle,
} from "lucide-react";

export function TechStackSection() {
  const [activeCategory, setActiveCategory] = React.useState<TechCategory>("all");
  const [hoveredTech, setHoveredTech] = React.useState<TechItem | null>(null);

  const filteredSkills = React.useMemo(() => {
    if (activeCategory === "all") return TECH_STACK;
    return TECH_STACK.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const getCategoryIcon = (category: TechCategory) => {
    switch (category) {
      case "ai-ml":
        return <Cpu className="w-4 h-4" />;
      case "backend":
        return <Server className="w-4 h-4" />;
      case "frontend":
        return <Layout className="w-4 h-4" />;
      case "cloud-devops":
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
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[300px] bg-emerald-500/5 blur-[150px] pointer-events-none -z-10" />

      <Container className="space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <Badge variant="emerald" dot>
                Production Capabilities
              </Badge>
              <span className="text-xs font-mono text-text-muted">STACK_REGISTRY: v2.6</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary">
              Core Tech Stack &amp;{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Tooling
              </span>
            </h2>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              Curated technologies battle-tested across production systems, high-scale microservices,
              and low-latency AI pipelines.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-text-muted bg-surface-card px-3 py-1.5 rounded-lg border border-border-subtle flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hover cards for production usage details</span>
            </span>
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
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-surface-elevated text-emerald-400 shadow-sm border border-emerald-500/30"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated/50 border border-transparent"
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? "bg-emerald-500/20 text-emerald-300"
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
            <div
              key={tech.name}
              onMouseEnter={() => setHoveredTech(tech)}
              onMouseLeave={() => setHoveredTech(null)}
              className="group relative rounded-xl bg-surface-card border border-border-subtle hover:border-emerald-500/40 p-5 transition-all duration-200 flex flex-col justify-between hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-0.5"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-lg bg-surface-ground border border-border-subtle text-emerald-400 group-hover:border-emerald-500/30 group-hover:scale-105 transition-all">
                      <Code2 className="w-4 h-4" />
                    </span>
                    <div>
                      <h3 className="font-bold text-base text-text-primary group-hover:text-emerald-400 transition-colors">
                        {tech.name}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-text-muted mt-0.5">
                        <span>{tech.years} Yrs Exp</span>
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
                    className="px-2 py-0.5 text-[11px] font-mono text-text-muted bg-surface-elevated rounded border border-border-subtle/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Highlights & Metrics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-xl bg-surface-card/60 border border-border-subtle flex items-start gap-3">
            <Zap className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-text-primary">Performance First</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Zero-allocation algorithms in Go &amp; SIMD vector calculations in Rust for sub-millisecond hot paths.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-card/60 border border-border-subtle flex items-start gap-3">
            <Cpu className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-text-primary">Agentic Architectures</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                State machine graph execution, dynamic tool binding, and robust memory checkpointing with LangGraph &amp; Redis.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-card/60 border border-border-subtle flex items-start gap-3">
            <Cloud className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-text-primary">Zero-Downtime Infra</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Cloud-native Kubernetes deployments, global edge routing via Cloudflare Workers, and multi-region resilience.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
