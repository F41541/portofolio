import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/utils";

export const runtime = "nodejs";
export const alt = "Laxstudio | Web Development & Software Architecture";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
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
                LAXSTUDIO // PORTFOLIO
              </span>
            </div>
          </div>

          {/* Status Indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              padding: "8px 16px",
              borderRadius: "9999px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor: "#10B981",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                color: "#10B981",
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              AVAILABLE FOR PROJECTS
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "1050px",
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
                fontSize: "16px",
                fontWeight: 700,
                color: "#06B6D4",
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              FULL-STACK WEB &amp; FRONTEND SPECIALIST
            </span>
          </div>

          <h1
            style={{
              fontSize: "52px",
              fontWeight: 900,
              lineHeight: 1.15,
              margin: 0,
              color: "#FFFFFF",
              letterSpacing: "-1px",
            }}
          >
            Laxstudio — M. Faisal Fahri
          </h1>

          <p
            style={{
              fontSize: "24px",
              color: "#9CA3AF",
              lineHeight: 1.4,
              margin: 0,
              maxWidth: "920px",
            }}
          >
            Laravel, Vue.js, React, Next.js, and Modern Web Architectures
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
          {/* Tags */}
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
                gap: "8px",
                padding: "8px 16px",
                backgroundColor: "#16181D",
                border: "1px solid #262B36",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: 600,
                color: "#10B981",
              }}
            >
              <span>Laravel &amp; Inertia</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                backgroundColor: "#16181D",
                border: "1px solid #262B36",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: 600,
                color: "#06B6D4",
              }}
            >
              <span>Vue &amp; React / Next.js</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                backgroundColor: "#16181D",
                border: "1px solid #262B36",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: 600,
                color: "#F3F4F6",
              }}
            >
              <span>TypeScript</span>
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
            {SITE_URL.replace(/^https?:\/\//, "")}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
