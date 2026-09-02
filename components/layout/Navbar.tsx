"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, Send, Sparkles } from "lucide-react";
import { NAV_ROUTES } from "@/lib/navigation";
import { MobileNav } from "./MobileNav";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [isMac, setIsMac] = React.useState(true);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform));
    }
  }, []);

  const triggerCommandPalette = () => {
    if (onOpenCommandPalette) {
      onOpenCommandPalette();
    } else {
      window.dispatchEvent(new CustomEvent("open-command-palette"));
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-surface-ground/85 border-b border-border-subtle transition-all duration-200">
        <Container className="h-16 flex items-center justify-between gap-4">
          {/* Brand Logo & Monogram */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-emerald rounded-lg"
              aria-label="Home"
            >
              <div className="font-mono font-bold text-sm tracking-wider text-emerald-400 bg-surface-elevated px-2 py-1 rounded border border-border-subtle group-hover:border-emerald-500/50 transition-colors shadow-sm">
                &lt;MFF/&gt;
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-text-primary text-sm leading-tight tracking-tight">
                  Faisal<span className="text-emerald-400">.dev</span>
                </span>
                <span className="text-[10px] text-text-muted font-mono leading-none hidden sm:inline-block">
                  Full-Stack Web Developer
                </span>
              </div>
            </Link>

            {/* Glowing Availability Indicator */}
            <div className="hidden xl:flex items-center ml-2">
              <Badge variant="emerald" dot className="py-0.5 px-2 text-[11px] font-mono">
                Tersedia untuk proyek
              </Badge>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav
            className="hidden md:flex items-center gap-1 bg-surface-elevated/40 p-1 rounded-full border border-border-subtle/80 shadow-inner"
            aria-label="Navigasi Utama"
          >
            {NAV_ROUTES.map((route) => {
              const isActive =
                route.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(route.href);

              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 relative",
                    isActive
                      ? "text-emerald-400 bg-surface-elevated shadow-sm font-semibold border border-emerald-500/20"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated/50"
                  )}
                >
                  {route.name}
                </Link>
              );
            })}
          </nav>

          {/* Right actions: Search + Get in Touch + Mobile hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Command Palette Trigger */}
            <button
              type="button"
              onClick={triggerCommandPalette}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-surface-elevated/60 hover:bg-surface-elevated border border-border-subtle hover:border-emerald-500/40 text-text-muted hover:text-text-primary text-xs transition-all focus:outline-none focus:ring-2 focus:ring-accent-emerald"
              aria-label="Buka pencarian command palette"
            >
              <Search className="w-3.5 h-3.5 text-text-secondary" />
              <span className="hidden sm:inline-block text-text-secondary">
                Cari...
              </span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-text-muted bg-surface-ground border border-border-subtle rounded">
                {isMac ? "⌘K" : "Ctrl+K"}
              </kbd>
            </button>

            {/* Desktop CTA */}
            <div className="hidden sm:block">
              <Link href="/contact">
                <Button variant="primary" size="sm" className="gap-1.5 shadow-sm">
                  <Send className="w-3 h-3" />
                  <span>Kontak Saya</span>
                </Button>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="md:hidden p-2 text-text-secondary hover:text-text-primary rounded-lg bg-surface-elevated border border-border-subtle transition-colors focus:outline-none focus:ring-2 focus:ring-accent-emerald"
              aria-label="Open mobile menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        onOpenCommandPalette={triggerCommandPalette}
      />
    </>
  );
};
