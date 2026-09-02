import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  image?: string;
  featured?: boolean;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
  readingTime: string;
  wordCount: number;
}

/**
 * Calculates reading time in minutes based on ~200 words per minute
 */
export function calculateReadingTime(text: string): { text: string; minutes: number; words: number } {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return {
    text: `${minutes} min read`,
    minutes,
    words,
  };
}

/**
 * Get all blog post slugs
 */
export function getBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

/**
 * Get a single blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const realSlug = slug.replace(/\.mdx?$/, "");
    let fullPath = path.join(BLOG_DIR, `${realSlug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(BLOG_DIR, `${realSlug}.md`);
    }

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const { text: readingTime, words: wordCount } = calculateReadingTime(content);

    const frontmatter: BlogPostFrontmatter = {
      title: data.title || "Untitled Post",
      description: data.description || "",
      date: data.date || new Date().toISOString().split("T")[0],
      tags: Array.isArray(data.tags) ? data.tags : [],
      author: data.author || "M. Faisal Fahri",
      image: data.image || undefined,
      featured: Boolean(data.featured),
    };

    return {
      slug: realSlug,
      frontmatter,
      content,
      readingTime,
      wordCount,
    };
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all blog posts sorted by date (newest first)
 */
export function getAllBlogPosts(): BlogPost[] {
  const slugs = getBlogSlugs();
  const posts = slugs
    .map((slug) => getBlogPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      return dateB - dateA;
    });

  return posts;
}

/**
 * Get all unique blog tags across all posts with count
 */
export function getAllBlogTags(): { tag: string; count: number }[] {
  const posts = getAllBlogPosts();
  const tagCounts: Record<string, number> = {};

  posts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

    return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

