import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Github,
  ExternalLink,
  Activity,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import { MarkdownContent } from "@/components/blog/MarkdownContent";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { SoftwareApplicationJsonLd, BreadcrumbListJsonLd } from "@/components/seo";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Alex Vance",
    };
  }

  const { frontmatter } = project;
  const url = `https://alexvance.dev/projects/${slug}`;

  return {
    title: `${frontmatter.title} | Systems Case Study`,
    description: frontmatter.subtitle || `Detailed architecture and production benchmarks for ${frontmatter.title}.`,
    keywords: [...frontmatter.tags, frontmatter.category, "Architecture Case Study"],
    authors: [{ name: frontmatter.author }],
    openGraph: {
      title: `${frontmatter.title} | Systems Case Study`,
      description: frontmatter.subtitle || `Detailed architecture and production benchmarks for ${frontmatter.title}.`,
      type: "article",
      publishedTime: frontmatter.date,
      authors: [frontmatter.author],
      tags: frontmatter.tags,
      url,
      images: frontmatter.image
        ? [
            {
              url: frontmatter.image,
              width: 1200,
              height: 630,
              alt: frontmatter.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${frontmatter.title} | Systems Case Study`,
      description: frontmatter.subtitle || `Detailed architecture and production benchmarks for ${frontmatter.title}.`,
      images: frontmatter.image ? [frontmatter.image] : undefined,
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { frontmatter, readingTime, content } = project;

  const formattedDate = new Date(frontmatter.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="py-10 md:py-16">
      {/* Structured Data */}
      <SoftwareApplicationJsonLd
        name={frontmatter.title}
        description={frontmatter.subtitle || frontmatter.title}
        authorName={frontmatter.author}
        authorUrl="https://alexvance.dev"
        datePublished={frontmatter.date}
        url={`https://alexvance.dev/projects/${slug}`}
        keywords={frontmatter.tags}
        image={frontmatter.image ? `https://alexvance.dev${frontmatter.image}` : undefined}
      />
      <BreadcrumbListJsonLd
        items={[
          { name: "Home", url: "https://alexvance.dev" },
          { name: "Projects", url: "https://alexvance.dev/projects" },
          { name: frontmatter.title, url: `https://alexvance.dev/projects/${slug}` },
        ]}
      />

      <Container>
        {/* Navigation & Breadcrumbs */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-emerald transition-colors font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to all projects</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-text-muted">
            <Link href="/" className="hover:text-text-primary">
              home
            </Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-text-primary">
              projects
            </Link>
            <span>/</span>
            <span className="text-accent-emerald line-clamp-1 max-w-[180px]">
              {slug}
            </span>
          </div>
        </div>

        {/* Hero Banner Section */}
        <header className="relative rounded-3xl border border-border-subtle bg-surface-card p-6 sm:p-10 md:p-12 overflow-hidden mb-10 shadow-2xl shadow-emerald-500/5">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 blur-[100px] pointer-events-none -z-10" />

          {/* Top badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <Badge variant="emerald" dot>
              {frontmatter.category}
            </Badge>
            <span className="text-xs font-mono text-text-muted bg-surface-elevated px-2.5 py-1 rounded-md border border-border-subtle">
              SYSTEM_CASE_STUDY
            </span>
            {frontmatter.featured && (
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                FLAGSHIP_PRODUCTION
              </span>
            )}
          </div>

          {/* Title & Subtitle */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary leading-[1.15] max-w-4xl">
            {frontmatter.title}
          </h1>

          {frontmatter.subtitle && (
            <p className="mt-4 text-lg sm:text-xl text-text-secondary leading-relaxed max-w-3xl">
              {frontmatter.subtitle}
            </p>
          )}

          {/* Key Metrics Callout Grid */}
          {frontmatter.metrics && frontmatter.metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-border-subtle/80">
              {frontmatter.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-surface-ground/80 border border-border-subtle flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-text-muted mb-1">
                    <span>METRIC_0{idx + 1}</span>
                    <Zap className="w-3.5 h-3.5 text-accent-emerald" />
                  </div>
                  <span className="text-lg sm:text-xl font-bold font-mono text-text-primary mt-1">
                    {metric}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Action Bar & Tech Pills */}
          <div className="mt-8 pt-6 border-t border-border-subtle/60 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-mono text-text-secondary bg-surface-elevated rounded-lg border border-border-subtle"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Live Demo & GitHub Buttons */}
            <div className="flex items-center gap-3">
              {frontmatter.githubUrl && (
                <a
                  href={frontmatter.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" size="md" className="gap-2">
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </Button>
                </a>
              )}
              {frontmatter.liveDemoUrl && (
                <a
                  href={frontmatter.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="md" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Interactive Demo</span>
                  </Button>
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Layout + Sticky Table of Contents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          {/* Main Markdown Body */}
          <article className="lg:col-span-8 max-w-none text-text-primary">
            <MarkdownContent content={content} />

            {/* Bottom Meta & Author Badge */}
            <div className="mt-16 pt-8 border-t border-border-subtle">
              <div className="p-6 rounded-2xl border border-border-subtle bg-surface-card/60 backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-accent-emerald shrink-0">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-text-primary">
                      Principal Engineer: {frontmatter.author}
                    </h4>
                    <p className="mt-0.5 text-xs sm:text-sm text-text-secondary">
                      Architecture Design, Kernel Benchmarking &amp; Systems Implementation.
                    </p>
                  </div>
                </div>

                <Link href="/projects">
                  <Button variant="secondary" size="sm" className="gap-1.5 shrink-0">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>More Projects</span>
                  </Button>
                </Link>
              </div>
            </div>
          </article>

          {/* Sticky Sidebar */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-2xl border border-border-subtle bg-surface-card/40 p-6 backdrop-blur-sm space-y-6">
                <TableOfContents />

                <div className="pt-6 border-t border-border-subtle/60 text-xs text-text-muted space-y-3">
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="text-text-primary font-mono">{frontmatter.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Est. Read Time:</span>
                    <span className="text-text-primary font-mono">{readingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Length:</span>
                    <span className="text-text-primary font-mono">{project.wordCount} words</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Case Study Date:</span>
                    <span className="text-text-primary font-mono">{formattedDate}</span>
                  </div>
                </div>
              </div>

              {/* Architecture Highlights Pill Box */}
              <div className="rounded-2xl border border-border-subtle bg-surface-card/30 p-6 font-mono text-xs space-y-3">
                <div className="flex items-center gap-2 text-accent-emerald font-semibold">
                  <Layers className="w-4 h-4" />
                  <span>KEY_SYSTEM_PILLARS</span>
                </div>
                <div className="space-y-2 pt-2 text-text-secondary">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald shrink-0" />
                    <span>Deterministic State Snapshots</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald shrink-0" />
                    <span>Sub-millisecond Tail Latencies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald shrink-0" />
                    <span>Zero-loss Exactly-Once Resumption</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
