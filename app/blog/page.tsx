import { Metadata } from "next";
import { getAllBlogPosts, getAllBlogTags } from "@/lib/mdx";
import { BlogIndexClient } from "@/components/blog/BlogIndexClient";
import { BreadcrumbListJsonLd } from "@/components/seo";

export const metadata: Metadata = {
  title: "Artikel & Riset Rekayasa Web | M. Faisal Fahri",
  description:
    "Jurnal rekayasa perangkat lunak, optimasi performa web, artikel arsitektur Laravel, Vue, React, Next.js, dan best practices pengembangan web.",
  openGraph: {
    title: "Artikel & Riset Rekayasa Web | M. Faisal Fahri",
    description:
      "Jurnal rekayasa perangkat lunak, optimasi performa web, artikel arsitektur Laravel, Vue, React, Next.js, dan best practices pengembangan web.",
    url: "https://faisalfahri.dev/blog",
    siteName: "Portofolio M. Faisal Fahri",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artikel & Riset Rekayasa Web | M. Faisal Fahri",
    description:
      "Jurnal rekayasa perangkat lunak, optimasi performa web, artikel arsitektur Laravel, Vue, React, Next.js, dan best practices pengembangan web.",
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const tags = getAllBlogTags();

  return (
    <div className="flex-1 flex flex-col">
      <BreadcrumbListJsonLd
        items={[
          { name: "Beranda", url: "https://faisalfahri.dev" },
          { name: "Artikel", url: "https://faisalfahri.dev/blog" },
        ]}
      />
      <BlogIndexClient posts={posts} tags={tags} />
    </div>
  );
}
