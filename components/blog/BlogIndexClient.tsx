"use client";

import React, { useState, useMemo } from "react";
import { Search, Tag, BookOpen, Sparkles, FilterX } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { BlogPost } from "@/lib/mdx";

export interface BlogIndexClientProps {
  posts: BlogPost[];
  tags: { tag: string; count: number }[];
}

export const BlogIndexClient: React.FC<BlogIndexClientProps> = ({
  posts,
  tags,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.frontmatter.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.frontmatter.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesTag =
        !selectedTag || post.frontmatter.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <div className="py-12 md:py-20">
      <Container>
        {/* Hero Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="emerald" dot>
              Engineering Journals
            </Badge>
            <span className="text-xs font-mono text-text-muted flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-accent-cyan" />
              {posts.length} Publications
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary">
            Articles & Research
          </h1>
          <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed">
            In-depth architectural breakdowns, systems performance investigations, distributed state patterns, and production engineering insights.
          </p>
        </div>

        {/* Search & Tag Filter Bar */}
        <div className="mb-10 p-6 rounded-2xl border border-border-subtle bg-surface-card/60 backdrop-blur-md space-y-5">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input
              type="text"
              placeholder="Search articles by title, description, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-surface-elevated/80 border-border-subtle focus:border-accent-emerald text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-text-muted hover:text-text-primary px-1.5 py-0.5 rounded bg-surface-ground"
              >
                Clear
              </button>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border-subtle/50">
            <span className="text-xs font-mono text-text-muted flex items-center gap-1 mr-1">
              <Tag className="w-3 h-3 text-accent-emerald" />
              Topics:
            </span>

            <button
              onClick={() => setSelectedTag(null)}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                selectedTag === null
                  ? "bg-accent-emerald text-surface-ground font-semibold"
                  : "bg-surface-elevated text-text-secondary hover:text-text-primary border border-border-subtle"
              }`}
            >
              All ({posts.length})
            </button>

            {tags.map(({ tag, count }) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isSelected ? null : tag)}
                  className={`text-xs px-3 py-1 rounded-full transition-colors flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-accent-emerald text-surface-ground font-semibold"
                      : "bg-surface-elevated text-text-secondary hover:text-text-primary border border-border-subtle"
                  }`}
                >
                  <span>{tag}</span>
                  <span
                    className={`text-[10px] px-1 rounded-full ${
                      isSelected
                        ? "bg-emerald-950 text-emerald-300"
                        : "bg-surface-ground text-text-muted"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}

            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="ml-auto text-xs text-accent-emerald hover:underline flex items-center gap-1"
              >
                <FilterX className="w-3 h-3" />
                Reset filter
              </button>
            )}
          </div>
        </div>

        {/* Results Stats */}
        <div className="flex items-center justify-between mb-6 text-xs text-text-muted">
          <span>
            Showing <strong className="text-text-primary">{filteredPosts.length}</strong> of {posts.length} articles
            {selectedTag && (
              <> tagged with <span className="text-accent-emerald font-mono">#{selectedTag}</span></>
            )}
            {searchQuery && (
              <> matching &ldquo;<span className="text-accent-cyan">{searchQuery}</span>&rdquo;</>
            )}
          </span>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center rounded-2xl border border-dashed border-border-subtle bg-surface-card/30">
            <Sparkles className="w-8 h-8 text-accent-emerald mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-semibold text-text-primary">No articles found</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Try adjusting your search keywords or removing active topic filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTag(null);
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-accent-emerald bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-colors"
            >
              Reset all filters
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};
