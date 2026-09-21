import React from "react";

export interface PersonJsonLdProps {
  name?: string;
  alternateName?: string[];
  jobTitle?: string;
  description?: string;
  url?: string;
  sameAs?: string[];
  knowsAbout?: string[];
  alumniOf?: string;
  image?: string;
}

export interface ProfilePageJsonLdProps {
  name?: string;
  description?: string;
  url?: string;
  person?: PersonJsonLdProps;
}


export interface SoftwareApplicationJsonLdProps {
  name: string;
  description: string;
  applicationCategory?: string;
  operatingSystem?: string;
  authorName?: string;
  authorUrl?: string;
  datePublished?: string;
  url: string;
  keywords?: string[];
  image?: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface BreadcrumbListJsonLdProps {
  items: BreadcrumbItem[];
}

import { SITE_URL } from "@/lib/utils";

const DEFAULT_SITE_URL = SITE_URL;
const DEFAULT_NAME = "M. Faisal Fahri";

/**
 * Generic JsonLd script wrapper
 */
export function JsonLd({ schema }: { schema: Record<string, unknown> | Array<Record<string, unknown>> }) {
  const jsonString = JSON.stringify(schema).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}

/**
 * Helper to generate Person schema
 */
export function generatePersonSchema(props?: PersonJsonLdProps) {
  const url = props?.url || DEFAULT_SITE_URL;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${url}/#person`,
    name: props?.name || DEFAULT_NAME,
    alternateName: props?.alternateName || ["Faisal Fahri", "F41541"],
    jobTitle: props?.jobTitle || "Full-Stack Web Developer",
    description:
      props?.description ||
      "Full-Stack Web Developer specializing in Laravel, Vue.js, React, Next.js, and modern high-performance web architecture.",
    url,
    sameAs: props?.sameAs || [
      "https://github.com/F41541",
    ],
    knowsAbout: props?.knowsAbout || [
      "Laravel & PHP",
      "Vue.js & Inertia.js",
      "React & Next.js",
      "TypeScript",
      "RESTful API & Webhooks",
      "MySQL & PostgreSQL",
      "Tailwind CSS",
      "Docker",
      "Multi-Tenancy Architecture",
      "Payment Gateway Integration",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: props?.alumniOf || "Universitas Catur Insan Cendekia (UCIC) Cirebon",
    },
    ...(props?.image ? { image: props.image } : {}),
  };
}

/**
 * Helper to generate ProfilePage schema
 */
export function generateProfilePageSchema(props?: ProfilePageJsonLdProps) {
  const url = props?.url || DEFAULT_SITE_URL;
  const person = generatePersonSchema(props?.person);
  // Remove @context when embedding Person inside ProfilePage mainEntity
  const { "@context": _ctx, ...embeddedPerson } = person;

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}/#profile`,
    url,
    name: props?.name || `Laxstudio | ${person.name}`,
    description:
      props?.description ||
      "Portfolio and technical case studies of Laxstudio by M. Faisal Fahri — Full-Stack Web Developer specializing in Laravel, Vue.js, React, and Next.js modern web applications.",
    mainEntity: {
      ...embeddedPerson,
      "@id": `${DEFAULT_SITE_URL}/#person`,
    },
  };
}

/**
 * Helper component for ProfilePage JSON-LD
 */
export function ProfilePageJsonLd(props?: ProfilePageJsonLdProps) {
  return <JsonLd schema={generateProfilePageSchema(props)} />;
}


/**
 * Helper to generate SoftwareApplication schema (for case studies/projects)
 */
export function generateSoftwareApplicationSchema(props: SoftwareApplicationJsonLdProps) {
  const authorUrl = props.authorUrl || DEFAULT_SITE_URL;
  const authorName = props.authorName || DEFAULT_NAME;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: props.name,
    description: props.description,
    applicationCategory: props.applicationCategory || "DeveloperApplication",
    operatingSystem: props.operatingSystem || "Cloud / Linux / Web",
    author: {
      "@type": "Person",
      name: authorName,
      url: authorUrl,
    },
    ...(props.datePublished ? { datePublished: props.datePublished } : {}),
    ...(props.keywords && props.keywords.length > 0 ? { keywords: props.keywords.join(", ") } : {}),
    url: props.url,
    ...(props.image ? { image: props.image } : {}),
  };
}

/**
 * Helper component for SoftwareApplication JSON-LD
 */
export function SoftwareApplicationJsonLd(props: SoftwareApplicationJsonLdProps) {
  return <JsonLd schema={generateSoftwareApplicationSchema(props)} />;
}

/**
 * Helper to generate BreadcrumbList schema
 */
export function generateBreadcrumbListSchema(props: BreadcrumbListJsonLdProps) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: props.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Helper component for BreadcrumbList JSON-LD
 */
export function BreadcrumbListJsonLd(props: BreadcrumbListJsonLdProps) {
  return <JsonLd schema={generateBreadcrumbListSchema(props)} />;
}
