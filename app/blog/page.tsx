import { Metadata } from "next";
import { getAllBlogPosts, getAllBlogTags } from "@/lib/mdx";
import { BlogIndexClient } from "@/components/blog/BlogIndexClient";
import { BreadcrumbListJsonLd } from "@/components/seo";

export const metadata: Metadata = {
  title: "Articles & Research | Alex Vance",
  description:
    "Engineering journals, distributed systems architecture, kernel telemetry, Next.js optimization, and production AI agent patterns.",
  openGraph: {
    title: "Articles & Research | Alex Vance",
    description:
      "Deep dive articles on low-latency systems, AI agents, edge inference, and Next.js performance.",
    type: "website",
    url: "https://alexvance.dev/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Articles & Research | Alex Vance",
    description:
      "Deep dive articles on low-latency systems, AI agents, edge inference, and Next.js performance.",
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const tags = getAllBlogTags();

  return (
    <>
      <BreadcrumbListJsonLd
        items={[
          { name: "Home", url: "https://alexvance.dev" },
          { name: "Blog", url: "https://alexvance.dev/blog" },
        ]}
      />
      <BlogIndexClient posts={posts} tags={tags} />
    </>
  );
}
