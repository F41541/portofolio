import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/layout";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SITE_URL } from "@/lib/utils";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Laxstudio | Full-Stack Web Development & Solutions",
    template: "%s | Laxstudio",
  },
  description:
    "Laxstudio — Studio rekayasa web dan pengembangan sistem aplikasi full-stack modern oleh M. Faisal Fahri (S.Kom). Spesialisasi dalam ekosistem Laravel, Vue.js, Inertia.js, React, dan Next.js.",
  keywords: [
    "Laxstudio",
    "M. Faisal Fahri",
    "Faisal Fahri",
    "Full-Stack Developer",
    "Web Developer Indonesia",
    "Web Developer Cirebon",
    "Laravel",
    "Vue.js",
    "Inertia.js",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "PostgreSQL",
    "MySQL",
  ],
  authors: [{ name: "M. Faisal Fahri", url: "https://github.com/F41541" }],
  creator: "M. Faisal Fahri",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    title: "Laxstudio | Full-Stack Web Development & Solutions",
    description:
      "Studio rekayasa web modern oleh M. Faisal Fahri dengan spesialisasi Laravel, Vue.js, Inertia.js, React, dan arsitektur aplikasi web performa tinggi.",
    siteName: "Laxstudio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laxstudio | Full-Stack Web Development & Solutions",
    description:
      "Studio rekayasa web modern oleh M. Faisal Fahri dengan spesialisasi Laravel, Vue.js, Inertia.js, React, dan arsitektur aplikasi web performa tinggi.",
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
    <html
      lang="id"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-surface-ground text-text-primary font-sans selection:bg-emerald-500/20 selection:text-emerald-900 dark:selection:text-emerald-300 relative">
        <ThemeProvider>
          {/* Global Ambient Glow & Grid Accents */}
          <div
            className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.08),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.08),transparent)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] dark:opacity-[0.015] [background-image:linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:4rem_4rem]"
            aria-hidden="true"
          />
          <Navbar />
          <main className="flex-1 flex flex-col relative z-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
