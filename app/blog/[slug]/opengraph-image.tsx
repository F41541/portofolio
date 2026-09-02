import { ImageResponse } from "next/og";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/mdx";

export const alt = "Article | M. Faisal Fahri Engineering Journals";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  const title = post ? post.frontmatter.title : "Technical Article";
  const description = post
    ? post.frontmatter.description
    : "Deep dives on distributed systems, AI agent architectures, and performance engineering.";
  const tags = post?.frontmatter.tags || ["Distributed Systems", "AI Agents"];
  const readingTime = post?.readingTime || "5 min read";
  const date = post?.frontmatter.date || new Date().toISOString().split("T")[0];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          backgroundColor: "#0D0E11",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(16, 185, 129, 0.15) 0%, transparent 40%), radial-gradient(circle at 85% 85%, rgba(6, 182, 212, 0.12) 0%, transparent 40%)",
          color: "#F3F4F6",
          fontFamily: "sans-serif",
          position: "relative",
          border: "1px solid #262B36",
          boxSizing: "border-box",
        }}
      >
        {/* Subtle grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />

        {/* Header Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            zIndex: 10,
          }}
        >
          {/* Brand Monogram */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 18px",
                backgroundColor: "#16181D",
                border: "1px solid #10B981",
                borderRadius: "10px",
                color: "#10B981",
                fontWeight: 800,
                fontSize: "24px",
                letterSpacing: "1px",
              }}
            >
              &lt;AX/&gt;
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  color: "#9CA3AF",
                  letterSpacing: "2px",
                  fontWeight: 600,
                }}
              >
                ENGINEERING JOURNAL // ARTICLE
              </span>
            </div>
          </div>

          {/* Reading Time & Date */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                padding: "6px 14px",
                borderRadius: "9999px",
                fontSize: "14px",
                color: "#10B981",
                fontWeight: 600,
              }}
            >
              {readingTime}
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "#6B7280",
                fontWeight: 600,
              }}
            >
              {date}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            maxWidth: "1060px",
            zIndex: 10,
          }}
        >
          {/* Tags */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#06B6D4",
                  backgroundColor: "rgba(6, 182, 212, 0.1)",
                  border: "1px solid rgba(6, 182, 212, 0.25)",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1
            style={{
              fontSize: title.length > 50 ? "44px" : "50px",
              fontWeight: 900,
              lineHeight: 1.2,
              margin: 0,
              color: "#FFFFFF",
              letterSpacing: "-1px",
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: "20px",
              color: "#9CA3AF",
              lineHeight: 1.45,
              margin: 0,
              maxWidth: "960px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {description}
          </p>
        </div>

        {/* Footer Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid #262B36",
            width: "100%",
            zIndex: 10,
          }}
        >
          {/* Author */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "9999px",
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                border: "1px solid #10B981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#10B981",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              AV
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                M. Faisal Fahri
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "#6B7280",
                }}
              >
                AI &amp; Full-Stack Systems Engineer
              </span>
            </div>
          </div>

          {/* URL text */}
          <span
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#6B7280",
              letterSpacing: "1px",
            }}
          >
            alexvance.dev/blog
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
