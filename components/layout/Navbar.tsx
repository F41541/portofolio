"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Send } from "lucide-react";
import { NAV_ROUTES } from "@/lib/navigation";
import { MobileNav } from "./MobileNav";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { cn } from "@/lib/utils";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  const handleCloseMobileNav = React.useCallback(() => {
    setMobileNavOpen(false);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-surface-ground/85 border-b border-border-subtle transition-all duration-200">
        <Container className="h-16 flex items-center justify-between gap-4">
          {/* Brand Logo & Monogram */}
          <div className="flex items-center gap-4">
            <BrandLogo subtitle="Full-Stack Web Developer" />
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
                      ? "text-accent-emerald bg-surface-elevated shadow-sm font-semibold border border-accent-emerald/20"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated/50"
                  )}
                >
                  {route.name}
                </Link>
              );
            })}
          </nav>

          {/* Right actions: Theme Toggle + CTA + Mobile hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Desktop CTA */}
            <div className="hidden sm:block">
              <Button href="/contact" variant="primary" size="sm" className="gap-1.5 shadow-sm">
                <Send className="w-3 h-3" />
                <span>Kontak Saya</span>
              </Button>
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
        onClose={handleCloseMobileNav}
      />
    </>
  );
};
