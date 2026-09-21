import * as React from "react";
import {
  HeroSection,
  BentoGrid,
  TechStackSection,
  ContactCta,
} from "@/components/sections";
import { ProfilePageJsonLd, LocalBusinessJsonLd } from "@/components/seo";

export default function HomePage() {
  return (
    <div className="relative flex-1 flex flex-col overflow-hidden">
      {/* Structured Data (JSON-LD) for SEO */}
      <ProfilePageJsonLd />
      <LocalBusinessJsonLd />

      {/* Hero Section with main headline, value proposition, CTAs */}
      <HeroSection />

      {/* Bento Grid: Featured Real Projects from GitHub */}
      <BentoGrid />

      {/* Tech Stack: Filterable skill matrix */}
      <TechStackSection />

      {/* Contact & Collaboration CTA */}
      <ContactCta />
    </div>
  );
}


