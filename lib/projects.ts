import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { calculateReadingTime } from "./utils";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export interface ProjectFrontmatter {
  title: string;
  subtitle?: string;
  category: "Full-Stack" | "Frontend & SPA" | "Backend & API" | string;
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
  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => !file.startsWith(".") && (file.endsWith(".mdx") || file.endsWith(".md")))
    .map((file) => file.replace(/\.mdx?$/, ""))
    .filter((slug) => slug.length > 0);
  return Array.from(new Set(files));
}

/**
 * Get a single project case study by slug
 */
export function getProjectBySlug(slug: string): Project | null {
  try {
    const cleanSlug = path.basename(slug).replace(/\.mdx?$/, "");
    if (!cleanSlug || cleanSlug.startsWith(".")) {
      return null;
    }

    const resolvedDir = path.resolve(PROJECTS_DIR);
    let fullPath = path.resolve(resolvedDir, `${cleanSlug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      fullPath = path.resolve(resolvedDir, `${cleanSlug}.md`);
    }

    if (!fullPath.startsWith(resolvedDir + path.sep) || !fs.existsSync(fullPath)) {
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
      author: data.author || "M. Faisal Fahri",
      featured: Boolean(data.featured),
      tags: Array.isArray(data.tags) ? data.tags : [],
      metrics: Array.isArray(data.metrics) ? data.metrics : [],
      githubUrl: data.githubUrl || undefined,
      liveDemoUrl: data.liveDemoUrl || undefined,
      image: data.image || undefined,
    };

    return {
      slug: cleanSlug,
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
      const timeA = new Date(a.frontmatter.date).getTime();
      const timeB = new Date(b.frontmatter.date).getTime();
      const validA = isNaN(timeA) ? 0 : timeA;
      const validB = isNaN(timeB) ? 0 : timeB;
      return validB - validA;
    });

  return projects;
}
