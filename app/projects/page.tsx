import { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import { ProjectsIndexClient } from "@/components/projects/ProjectsIndexClient";
import { ContactCta } from "@/components/sections";
import { BreadcrumbListJsonLd } from "@/components/seo";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Proyek & Sistem Aplikasi Web | Laxstudio",
  description:
    "Eksplorasi aplikasi web full-stack, sistem ERP/CRM Laravel, dashboard modern Next.js 16 / Vue 3, dan arsitektur database performa tinggi oleh Laxstudio (M. Faisal Fahri).",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Proyek & Sistem Aplikasi Web | Laxstudio",
    description:
      "Aplikasi web full-stack produksi, arsitektur data multi-tenant, dan implementasi frontend modern.",
    url: `${SITE_URL}/projects`,
    siteName: "Laxstudio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proyek & Sistem Aplikasi Web | Laxstudio",
    description:
      "Aplikasi web full-stack produksi, arsitektur data multi-tenant, dan implementasi frontend modern.",
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="relative flex-1 flex flex-col overflow-hidden">
      <BreadcrumbListJsonLd
        items={[
          { name: "Beranda", url: SITE_URL },
          { name: "Proyek", url: `${SITE_URL}/projects` },
        ]}
      />
      <ProjectsIndexClient projects={projects} />
      <ContactCta />
    </div>
  );
}
