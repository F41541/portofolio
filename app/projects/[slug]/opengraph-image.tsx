import { ImageResponse } from "next/og";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import { SITE_URL } from "@/lib/utils";

export const alt = "Case Study | Laxstudio Web Architecture";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const title = project ? project.frontmatter.title : "Systems Case Study";
  const subtitle = project
    ? project.frontmatter.subtitle || "Production architecture design & benchmarks"
    : "Detailed architecture and production benchmarks.";
  const category = project?.frontmatter.category || "Full-Stack";
  const metrics = project?.frontmatter.metrics || ["Sub-10ms Latency", "High Throughput"];

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
              LS
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
                CASE STUDY // SYSTEMS ARCHITECTURE
              </span>
            </div>
          </div>

          {/* Category Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              padding: "6px 16px",
              borderRadius: "9999px",
              fontSize: "14px",
              color: "#10B981",
              fontWeight: 600,
            }}
          >
            {category}
          </div>
        </div>

        {/* Main Content Area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            maxWidth: "1060px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#06B6D4",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              FLAGSHIP PRODUCTION SYSTEM
            </span>
          </div>

          <h1
            style={{
              fontSize: title.length > 40 ? "46px" : "54px",
              fontWeight: 900,
              lineHeight: 1.15,
              margin: 0,
              color: "#FFFFFF",
              letterSpacing: "-1px",
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: "22px",
              color: "#9CA3AF",
              lineHeight: 1.4,
              margin: 0,
              maxWidth: "960px",
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Footer Metrics Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid #262B36",
            width: "100%",
          }}
        >
          {/* Metrics */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {metrics.slice(0, 3).map((metric, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 14px",
                  backgroundColor: "#16181D",
                  border: "1px solid #262B36",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: idx === 0 ? "#10B981" : idx === 1 ? "#06B6D4" : "#F3F4F6",
                }}
              >
                <span>{metric}</span>
              </div>
            ))}
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
            {SITE_URL.replace(/^https?:\/\//, "")}/projects
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
