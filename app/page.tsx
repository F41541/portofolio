import * as React from "react";
import {
  HeroSection,
  AiTerminal,
  BentoGrid,
  TechStackSection,
  ExperienceTimeline,
  LatestArticles,
  ContactCta,
} from "@/components/sections";
import { ProfilePageJsonLd } from "@/components/seo";

export default function HomePage() {
  return (
    <div className="relative flex-1 flex flex-col overflow-hidden">
      {/* Structured Data (JSON-LD) for SEO */}
      <ProfilePageJsonLd />

      {/* Global Landing Ambient Glow & Grid Accents */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.08),rgba(255,255,255,0))]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.015] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:4rem_4rem]"
        aria-hidden="true"
      />

      {/* Hero Section with main headline, live stats, CTAs */}
      <HeroSection />

      {/* Interactive AI & Systems CLI Terminal */}
      <AiTerminal />

      {/* Bento Grid: Flagship systems, live telemetry, architecture topologies */}
      <BentoGrid />

      {/* Tech Stack: Filterable skill matrix with contextual tooltips */}
      <TechStackSection />

      {/* Experience Timeline: Career milestones & impact */}
      <ExperienceTimeline />

      {/* Latest Articles: Top MDX engineering journals */}
      <LatestArticles />

      {/* Contact & Collaboration High-Converting CTA */}
      <ContactCta />
    </div>
  );
}


