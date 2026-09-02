import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { BlogPost } from "@/lib/mdx";

export interface ArticleCardProps {
  post: BlogPost;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ post, featured = false }) => {
  const formattedDate = new Date(post.frontmatter.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article
      className={`group relative flex flex-col justify-between rounded-xl border border-border-subtle bg-surface-card p-6 md:p-8 transition-all duration-300 hover:border-accent-emerald/40 hover:bg-surface-elevated/40 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 ${
        featured ? "md:col-span-2 border-accent-emerald/20 bg-emerald-950/5" : ""
      }`}
    >
      <div>
        {/* Badges & Meta */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {post.frontmatter.featured && (
            <Badge variant="emerald" dot>
              Artikel Pilihan
            </Badge>
          )}
          {post.frontmatter.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="neutral">
              {tag}
            </Badge>
          ))}
          {post.frontmatter.tags.length > 3 && (
            <Badge variant="outline">+{post.frontmatter.tags.length - 3}</Badge>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-text-primary group-hover:text-accent-emerald transition-colors duration-200">
          <Link href={`/blog/${post.slug}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {post.frontmatter.title}
          </Link>
        </h3>

        {/* Summary Snippet */}
        <p className="mt-3 text-sm md:text-base text-text-secondary line-clamp-3 leading-relaxed">
          {post.frontmatter.description}
        </p>
      </div>

      {/* Footer Info */}
      <div className="mt-6 pt-4 border-t border-border-subtle/60 flex items-center justify-between text-xs text-text-muted">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-accent-emerald/70" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-accent-cyan/70" />
            {post.readingTime}
          </span>
        </div>

        <div className="flex items-center gap-1 font-medium text-text-primary group-hover:text-accent-emerald group-hover:translate-x-1 transition-all duration-200">
          <span>Baca artikel</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </article>
  );
};
