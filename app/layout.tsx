import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer, CommandPalette } from "@/components/layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://faisalfahri.dev"),
  title: {
    default: "M. Faisal Fahri | Full-Stack Web Developer",
    template: "%s | M. Faisal Fahri",
  },
  description:
    "Portofolio pribadi & studi kasus teknis M. Faisal Fahri — Full-Stack Web Developer yang berfokus pada Laravel, Vue.js, React, Next.js, dan arsitektur aplikasi web modern yang cepat & skalabel.",
  keywords: [
    "M. Faisal Fahri",
    "Faisal Fahri",
    "Full-Stack Developer",
    "Web Developer Indonesia",
    "Frontend Developer",
    "Laravel",
    "Vue.js",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Inertia.js",
    "RESTful API",
    "PostgreSQL",
    "MySQL",
  ],
  authors: [{ name: "M. Faisal Fahri", url: "https://faisalfahri.dev" }],
  creator: "M. Faisal Fahri",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://faisalfahri.dev",
    title: "M. Faisal Fahri | Full-Stack Web Developer",
    description:
      "Full-Stack Web Developer dengan spesialisasi Laravel, Vue.js, React, Next.js, dan arsitektur modern.",
    siteName: "M. Faisal Fahri Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "M. Faisal Fahri | Full-Stack Web Developer",
    description:
      "Full-Stack Web Developer dengan spesialisasi Laravel, Vue.js, React, Next.js, dan arsitektur modern.",
    creator: "@faisalfahri",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col antialiased bg-surface-ground text-text-primary font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
        <Navbar />
        <CommandPalette />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
