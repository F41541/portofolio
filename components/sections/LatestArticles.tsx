import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { getAllBlogPosts } from "@/lib/mdx";

export const LatestArticles: React.FC = () => {
  const posts = getAllBlogPosts().slice(0, 3);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 border-t border-border-subtle/50 relative overflow-hidden">
      {/* Background subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />

      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="emerald" dot>
                Tulisan &amp; Catatan Teknis
              </Badge>
              <span className="text-xs font-mono text-text-muted flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-accent-cyan" />
                Publikasi Terbaru
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary">
              Artikel &amp; Riset Rekayasa Web
            </h2>
            <p className="mt-2 text-text-secondary text-sm md:text-base max-w-xl">
              Ulasan mendalam tentang arsitektur sistem, optimasi performa web modern, database relasional, dan best practices pengembangan web.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-emerald hover:text-emerald-300 transition-colors group"
          >
            <span>Lihat semua artikel</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid of articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
};
