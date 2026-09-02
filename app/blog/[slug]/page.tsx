import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Share2, Tag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/mdx";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { MarkdownContent } from "@/components/blog/MarkdownContent";
import { BlogPostingJsonLd, BreadcrumbListJsonLd } from "@/components/seo";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Alex Vance",
    };
  }

  const { frontmatter } = post;
  const url = `https://alexvance.dev/blog/${slug}`;

  return {
    title: `${frontmatter.title} | Alex Vance`,
    description: frontmatter.description,
    keywords: frontmatter.tags,
    authors: [{ name: frontmatter.author }],
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
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
      title: frontmatter.title,
      description: frontmatter.description,
      images: frontmatter.image ? [frontmatter.image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, readingTime, content } = post;

  const formattedDate = new Date(frontmatter.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="py-10 md:py-16">
      {/* Structured Data */}
      <BlogPostingJsonLd
        title={frontmatter.title}
        description={frontmatter.description}
        datePublished={frontmatter.date}
        authorName={frontmatter.author}
        authorUrl="https://alexvance.dev"
        url={`https://alexvance.dev/blog/${slug}`}
        tags={frontmatter.tags}
        image={frontmatter.image ? `https://alexvance.dev${frontmatter.image}` : undefined}
      />
      <BreadcrumbListJsonLd
        items={[
          { name: "Home", url: "https://alexvance.dev" },
          { name: "Blog", url: "https://alexvance.dev/blog" },
          { name: frontmatter.title, url: `https://alexvance.dev/blog/${slug}` },
        ]}
      />

      <Container>
        {/* Back Link & Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-emerald transition-colors font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to all articles</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-text-muted">
            <Link href="/" className="hover:text-text-primary">
              home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-text-primary">
              blog
            </Link>
            <span>/</span>
            <span className="text-accent-emerald line-clamp-1 max-w-[150px]">
              {slug}
            </span>
          </div>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl pb-10 border-b border-border-subtle">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {frontmatter.tags.map((tag) => (
              <Badge key={tag} variant="neutral">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
            {frontmatter.title}
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-text-secondary leading-relaxed">
            {frontmatter.description}
          </p>

          {/* Author & Meta Row */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border-subtle/50 text-xs sm:text-sm text-text-muted">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-text-primary font-medium">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-accent-emerald">
                  <User className="w-4 h-4" />
                </div>
                <span>{frontmatter.author}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-accent-emerald/80" />
                <span>{formattedDate}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-accent-cyan/80" />
                <span>{readingTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={undefined}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-card border border-border-subtle hover:border-accent-emerald/40 text-text-secondary hover:text-text-primary text-xs transition-colors"
                title="Share article"
              >
                <Share2 className="w-3.5 h-3.5 text-accent-emerald" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Body + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10">
          {/* Main Article Content */}
          <article className="lg:col-span-8 max-w-none text-text-primary">
            <MarkdownContent content={content} />

            {/* Bottom Footer / Tags */}
            <div className="mt-16 pt-8 border-t border-border-subtle">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-text-muted flex items-center gap-1 mr-2">
                  <Tag className="w-3.5 h-3.5 text-accent-emerald" />
                  Filed under:
                </span>
                {frontmatter.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Author Box */}
              <div className="mt-8 p-6 rounded-2xl border border-border-subtle bg-surface-card/60 backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-accent-emerald shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-text-primary">
                    Written by {frontmatter.author}
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Staff Systems & AI Engineer specializing in distributed state engines, low-latency microservices, and AI edge runtimes.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Sticky Sidebar (Table of Contents & Meta) */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28 space-y-8 rounded-2xl border border-border-subtle bg-surface-card/40 p-6 backdrop-blur-sm">
              <TableOfContents />

              <div className="pt-6 border-t border-border-subtle/60 text-xs text-text-muted space-y-3">
                <div className="flex justify-between">
                  <span>Reading time:</span>
                  <span className="text-text-primary font-mono">{readingTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Word count:</span>
                  <span className="text-text-primary font-mono">{post.wordCount} words</span>
                </div>
                <div className="flex justify-between">
                  <span>Published:</span>
                  <span className="text-text-primary font-mono">{formattedDate}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
