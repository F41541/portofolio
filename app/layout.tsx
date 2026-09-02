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
  metadataBase: new URL("https://alexvance.dev"),
  title: {
    default: "Alex Vance | AI & Full-Stack Systems Engineer",
    template: "%s | Alex Vance",
  },
  description:
    "Personal portfolio and technical case studies of Alex Vance — AI & Full-Stack Systems Engineer specializing in low-latency distributed systems, LLM agent architectures, and high-scale modern web applications.",
  keywords: [
    "Alex Vance",
    "Systems Engineer",
    "Full-Stack Engineer",
    "Distributed Systems",
    "AI Agent Architectures",
    "LLM Systems",
    "eBPF",
    "Rust",
    "Go",
    "TypeScript",
    "Next.js",
    "Performance Optimization",
    "Edge AI",
  ],
  authors: [{ name: "Alex Vance", url: "https://alexvance.dev" }],
  creator: "Alex Vance",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alexvance.dev",
    title: "Alex Vance | AI & Full-Stack Systems Engineer",
    description:
      "High-scale distributed systems, LLM agent architectures, and low-latency modern web applications.",
    siteName: "Alex Vance Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Vance | AI & Full-Stack Systems Engineer",
    description:
      "High-scale distributed systems, LLM agent architectures, and low-latency modern web applications.",
    creator: "@alexvance_dev",
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
