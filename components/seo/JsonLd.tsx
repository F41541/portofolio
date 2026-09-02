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

export interface BlogPostingJsonLdProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  authorUrl?: string;
  url: string;
  image?: string;
  tags?: string[];
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

const DEFAULT_SITE_URL = "https://alexvance.dev";
const DEFAULT_NAME = "Alex Vance";

/**
 * Generic JsonLd script wrapper
 */
export function JsonLd({ schema }: { schema: Record<string, unknown> | Array<Record<string, unknown>> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
    alternateName: props?.alternateName || ["Alex Rivers"],
    jobTitle: props?.jobTitle || "AI & Full-Stack Systems Engineer",
    description:
      props?.description ||
      "AI & Full-Stack Systems Engineer specializing in low-latency distributed systems, LLM agent architectures, and high-scale modern web applications.",
    url,
    sameAs: props?.sameAs || [
      "https://github.com",
      "https://linkedin.com",
      "https://x.com",
    ],
    knowsAbout: props?.knowsAbout || [
      "Distributed Systems",
      "Artificial Intelligence",
      "Autonomous Agent Architectures",
      "High-Throughput Microservices",
      "Vector Search & RAG",
      "Next.js & React 19",
      "TypeScript",
      "Rust",
      "Go",
      "Python",
      "eBPF & Kernel Telemetry",
      "Cloud-Native Kubernetes",
    ],
    ...(props?.alumniOf
      ? {
          alumniOf: {
            "@type": "EducationalOrganization",
            name: props.alumniOf,
          },
        }
      : {
          alumniOf: {
            "@type": "EducationalOrganization",
            name: "University of California, Berkeley",
          },
        }),
    ...(props?.image ? { image: props.image } : {}),
  };
}

/**
 * Helper component for Person JSON-LD
 */
export function PersonJsonLd(props: PersonJsonLdProps) {
  return <JsonLd schema={generatePersonSchema(props)} />;
}

/**
 * Helper to generate ProfilePage schema
 */
export function generateProfilePageSchema(props?: ProfilePageJsonLdProps) {
  const url = props?.url || DEFAULT_SITE_URL;
  const personSchema = generatePersonSchema(props?.person);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}/#profile`,
        url,
        name: props?.name || `${personSchema.name} | ${personSchema.jobTitle}`,
        description:
          props?.description ||
          "Personal portfolio and technical case studies of Alex Vance — AI & Full-Stack Systems Engineer specializing in low-latency distributed systems and autonomous agent pipelines.",
        mainEntity: {
          "@id": `${url}/#person`,
        },
      },
      personSchema,
    ],
  };
}

/**
 * Helper component for ProfilePage JSON-LD
 */
export function ProfilePageJsonLd(props?: ProfilePageJsonLdProps) {
  return <JsonLd schema={generateProfilePageSchema(props)} />;
}

/**
 * Helper to generate BlogPosting schema
 */
export function generateBlogPostingSchema(props: BlogPostingJsonLdProps) {
  const authorUrl = props.authorUrl || DEFAULT_SITE_URL;
  const authorName = props.authorName || DEFAULT_NAME;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: props.title,
    description: props.description,
    author: {
      "@type": "Person",
      name: authorName,
      url: authorUrl,
    },
    datePublished: props.datePublished,
    dateModified: props.dateModified || props.datePublished,
    ...(props.tags && props.tags.length > 0 ? { keywords: props.tags.join(", ") } : {}),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": props.url,
    },
    ...(props.image ? { image: props.image } : {}),
  };
}

/**
 * Helper component for BlogPosting JSON-LD
 */
export function BlogPostingJsonLd(props: BlogPostingJsonLdProps) {
  return <JsonLd schema={generateBlogPostingSchema(props)} />;
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
