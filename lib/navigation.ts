import { FEATURED_PROJECTS } from "@/data/featured-projects";

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  tags: string[];
}

export interface RouteItem {
  name: string;
  href: string;
  description: string;
}

export interface SocialLinkItem {
  name: string;
  href: string;
  handle: string;
  external: true;
}

export const NAV_ROUTES: RouteItem[] = [
  { name: "Beranda", href: "/", description: "Ringkasan & Sorotan Utama" },
  { name: "Proyek", href: "/projects", description: "Sistem produksi, web app & open source" },
  { name: "Tentang", href: "/about", description: "Latar belakang, pendidikan & keahlian" },
  { name: "Layanan", href: "/store", description: "Katalog jasa pengembangan web & sistem" },
  { name: "Cek Invoice", href: "/invoices", description: "Lacak status transaksi & tagihan Duitku" },
  { name: "Kontak", href: "/contact", description: "Hubungi untuk diskusi & kolaborasi proyek" },
];

export const PROJECTS_DATA: ProjectItem[] = FEATURED_PROJECTS.map((p) => ({
  id: p.id,
  title: p.title,
  description: p.description,
  category: p.category,
  href: p.caseStudyUrl,
  tags: p.techStack,
}));

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    name: "GitHub",
    href: "https://github.com/F41541",
    handle: "@F41541",
    external: true,
  },
  {
    name: "Email",
    href: "mailto:mfaisalfahri02@gmail.com",
    handle: "mfaisalfahri02@gmail.com",
    external: true,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/6282129620269",
    handle: "+62 821-2962-0269",
    external: true,
  },
];
