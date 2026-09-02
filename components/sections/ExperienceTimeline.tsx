"use client";

import * as React from "react";
import Link from "next/link";
import { EXPERIENCES, ExperienceItem } from "@/data/experience";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Layers,
  ChevronRight,
} from "lucide-react";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-16 md:py-24 border-b border-border-subtle/60 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-[450px] h-[300px] bg-cyan-500/5 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-[450px] h-[300px] bg-emerald-500/5 blur-[140px] pointer-events-none -z-10" />

      <Container className="space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <Badge variant="cyan" dot>
                Career &amp; Engineering Track
              </Badge>
              <span className="text-xs font-mono text-text-muted">CHRONOLOGY: 2018-2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary">
              Work Experience &amp;{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Milestones
              </span>
            </h2>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              Track record of architecting mission-critical platforms, scaling microservices,
              and delivering high-impact software systems.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/Alex_Rivera_Resume.pdf"
              target="_blank"
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 bg-surface-card px-3 py-1.5 rounded-lg border border-border-subtle hover:border-emerald-500/40 transition-all"
            >
              <span>Download Full CV</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Clean Vertical Tech Timeline */}
        <div className="relative pl-6 sm:pl-8 md:pl-10 space-y-10 before:absolute before:left-[11px] sm:before:left-[15px] md:before:left-[19px] before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-emerald-400 before:via-cyan-500/60 before:to-border-subtle">
          {EXPERIENCES.map((item, index) => {
            const isCurrent = !!item.current;

            return (
              <div key={item.id} className="relative group">
                {/* Glowing Node Indicator */}
                <div className="absolute -left-[31px] sm:-left-[39px] md:-left-[47px] top-1.5 flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    {/* Ping ring for current role */}
                    {isCurrent && (
                      <span className="absolute w-5 h-5 rounded-full bg-emerald-400/40 animate-ping" />
                    )}
                    {/* Center glowing node */}
                    <div
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                        isCurrent
                          ? "bg-emerald-400 border-surface-ground shadow-lg shadow-emerald-500/50 scale-110"
                          : "bg-surface-elevated border-emerald-500/60 group-hover:border-emerald-400 group-hover:bg-emerald-500/20"
                      }`}
                    />
                  </div>
                </div>

                {/* Timeline Content Card */}
                <div className="rounded-2xl bg-surface-card border border-border-subtle hover:border-emerald-500/40 p-6 sm:p-7 space-y-5 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5">
                  {/* Top Role Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary group-hover:text-emerald-400 transition-colors">
                          {item.role}
                        </h3>
                        {isCurrent && (
                          <Badge variant="emerald" dot>
                            Current Role
                          </Badge>
                        )}
                        <span className="text-xs font-mono text-text-muted bg-surface-elevated px-2 py-0.5 rounded border border-border-subtle">
                          {item.type}
                        </span>
                      </div>

                      {/* Company & Location */}
                      <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary font-medium">
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <Briefcase className="w-3.5 h-3.5" />
                          <span>{item.company}</span>
                        </span>
                        <span className="text-border-subtle">•</span>
                        <span className="flex items-center gap-1 text-text-muted">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{item.location}</span>
                        </span>
                      </div>
                    </div>

                    {/* Date Period Badge */}
                    <div className="flex items-center gap-1.5 font-mono text-xs text-text-muted bg-surface-ground px-3 py-1.5 rounded-lg border border-border-subtle self-start">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  {/* Role summary */}
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    {item.description}
                  </p>

                  {/* Bullet points of measurable impact */}
                  <div className="space-y-2.5 pt-1">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span>Key Measurable Impact &amp; Deliverables</span>
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                      {item.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Associated Tech Stack Badges */}
                  <div className="pt-4 border-t border-border-subtle/60 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-text-muted">Stack:</span>
                    {item.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 text-xs font-mono text-text-secondary bg-surface-elevated rounded-md border border-border-subtle hover:border-emerald-500/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
