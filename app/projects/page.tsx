import { Metadata } from "next";
import { getAllProjects, getProjectCategories } from "@/lib/projects";
import { ProjectsIndexClient } from "@/components/projects/ProjectsIndexClient";
import { BreadcrumbListJsonLd } from "@/components/seo";

export const metadata: Metadata = {
  title: "Proyek & Sistem Aplikasi Web | M. Faisal Fahri",
  description:
    "Eksplorasi aplikasi web full-stack, sistem ERP/CRM Laravel, dashboard modern Next.js 16 / Vue 3, dan arsitektur database performa tinggi oleh M. Faisal Fahri.",
  openGraph: {
    title: "Proyek & Sistem Aplikasi Web | M. Faisal Fahri",
    description:
      "Aplikasi web full-stack produksi, microservices, dan implementasi frontend modern.",
    url: "https://faisalfahri.dev/projects",
    siteName: "Portofolio M. Faisal Fahri",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proyek & Sistem Aplikasi Web | M. Faisal Fahri",
    description:
      "Aplikasi web full-stack produksi, microservices, dan implementasi frontend modern.",
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const categories = getProjectCategories();

  return (
    <div className="flex-1 flex flex-col">
      <BreadcrumbListJsonLd
        items={[
          { name: "Beranda", url: "https://faisalfahri.dev" },
          { name: "Proyek", url: "https://faisalfahri.dev/projects" },
        ]}
      />
      <ProjectsIndexClient projects={projects} categories={categories} />
    </div>
  );
}
