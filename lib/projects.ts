import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { calculateReadingTime } from "./mdx";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export interface ProjectFrontmatter {
  title: string;
  subtitle?: string;
  category: "AI & ML" | "Distributed Systems" | "Full-Stack" | string;
  date: string;
  author: string;
  featured?: boolean;
  tags: string[];
  metrics: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  image?: string;
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
  readingTime: string;
  wordCount: number;
}

/**
 * Get all project case study slugs
 */
export function getProjectSlugs(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) {
    return [];
  }
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

/**
 * Get a single project case study by slug
 */
export function getProjectBySlug(slug: string): Project | null {
  try {
    const realSlug = slug.replace(/\.mdx?$/, "");
    let fullPath = path.join(PROJECTS_DIR, `${realSlug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(PROJECTS_DIR, `${realSlug}.md`);
    }

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const { text: readingTime, words: wordCount } = calculateReadingTime(content);

    const frontmatter: ProjectFrontmatter = {
      title: data.title || "Untitled Project",
      subtitle: data.subtitle || data.description || "",
      category: data.category || "Full-Stack",
      date: data.date || new Date().toISOString().split("T")[0],
      author: data.author || "Alex Vance",
      featured: Boolean(data.featured),
      tags: Array.isArray(data.tags) ? data.tags : [],
      metrics: Array.isArray(data.metrics) ? data.metrics : [],
      githubUrl: data.githubUrl || undefined,
      liveDemoUrl: data.liveDemoUrl || undefined,
      image: data.image || undefined,
    };

    return {
      slug: realSlug,
      frontmatter,
      content,
      readingTime,
      wordCount,
    };
  } catch (error) {
    console.error(`Error loading project ${slug}:`, error);
    return null;
  }
}

/**
 * Get all project case studies sorted by date (newest first)
 */
export function getAllProjects(): Project[] {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is Project => project !== null)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      return dateB - dateA;
    });

  return projects;
}

/**
 * Get all unique project categories across all projects with count
 */
export function getProjectCategories(): { category: string; count: number }[] {
  const projects = getAllProjects();
  const categoryCounts: Record<string, number> = {};

  projects.forEach((project) => {
    const cat = project.frontmatter.category || "Full-Stack";
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  return Object.entries(categoryCounts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category));
}
