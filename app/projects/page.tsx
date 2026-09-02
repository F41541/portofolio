import { Metadata } from "next";
import { getAllProjects, getProjectCategories } from "@/lib/projects";
import { ProjectsIndexClient } from "@/components/projects/ProjectsIndexClient";
import { BreadcrumbListJsonLd } from "@/components/seo";

export const metadata: Metadata = {
  title: "Engineering Projects & Systems | Alex Vance",
  description:
    "Production-grade distributed systems, vector search pipelines, autonomous agent architectures, and high-performance WebAssembly runtimes.",
  openGraph: {
    title: "Engineering Projects & Systems | Alex Vance",
    description:
      "Production-grade distributed systems, vector search pipelines, autonomous agent architectures, and high-performance WebAssembly runtimes.",
    type: "website",
    url: "https://alexvance.dev/projects",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Projects & Systems | Alex Vance",
    description:
      "Production-grade distributed systems, vector search pipelines, autonomous agent architectures, and high-performance WebAssembly runtimes.",
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const categories = getProjectCategories();

  return (
    <>
      <BreadcrumbListJsonLd
        items={[
          { name: "Home", url: "https://alexvance.dev" },
          { name: "Projects", url: "https://alexvance.dev/projects" },
        ]}
      />
      <ProjectsIndexClient projects={projects} categories={categories} />
    </>
  );
}
