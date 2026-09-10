"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ArrowRight, Send } from "lucide-react";
import { NAV_ROUTES, SOCIAL_LINKS } from "@/lib/navigation";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
}) => {
  const pathname = usePathname();
  const prevPathname = React.useRef(pathname);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const triggerElementRef = React.useRef<HTMLElement | null>(null);

  // Prevent background scroll when mobile navigation is open & manage focus restore
  React.useEffect(() => {
    if (isOpen) {
      triggerElementRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      if (triggerElementRef.current) {
        triggerElementRef.current.focus();
        triggerElementRef.current = null;
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close only when route actually changes
  React.useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      if (isOpen) {
        onClose();
      }
    }
  }, [pathname, isOpen, onClose]);

  // Focus trap & keyboard navigation (Escape, Tab)
  React.useEffect(() => {
    if (!isOpen) return;

    const container = containerRef.current;
    if (!container) return;

    const getFocusableElements = (): HTMLElement[] => {
      return Array.from(
        container.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true");
    };

    const focusables = getFocusableElements();
    const closeBtn = container.querySelector<HTMLElement>('button[aria-label="Close navigation menu"]');
    if (closeBtn) {
      closeBtn.focus();
    } else if (focusables.length > 0) {
      focusables[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const elements = getFocusableElements();
        if (elements.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = elements[0];
        const lastElement = elements[elements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement || !container.contains(document.activeElement)) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement || !container.contains(document.activeElement)) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 md:hidden flex flex-col bg-surface-ground/95 backdrop-blur-xl animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 h-16 border-b border-border-subtle shrink-0">
        <BrandLogo onClick={onClose} />

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 text-text-secondary hover:text-text-primary rounded-lg bg-surface-elevated/50 border border-border-subtle transition-colors focus:outline-none focus:ring-2 focus:ring-accent-emerald"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main content scrollable area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Navigation list */}
        <div className="space-y-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-text-muted px-2 pb-1">
            Menu Navigasi
          </div>
          {NAV_ROUTES.map((route) => {
            const isActive = pathname === route.href;
            return (
              <Link
                key={route.href}
                href={route.href}
                onClick={onClose}
                className={cn(
                  "flex items-center justify-between px-3 py-3 rounded-lg text-base font-medium transition-all",
                  isActive
                    ? "bg-surface-elevated text-accent-emerald border border-accent-emerald/20"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-card/60 border border-transparent"
                )}
              >
                <div>
                  <div className="text-text-primary font-medium">{route.name}</div>
                  <div className="text-xs text-text-muted font-normal mt-0.5">
                    {route.description}
                  </div>
                </div>
                <ArrowRight
                  className={cn(
                    "w-4 h-4 transition-transform",
                    isActive
                      ? "text-accent-emerald translate-x-0.5"
                      : "text-text-muted"
                  )}
                />
              </Link>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="pt-2">
          <Button href="/contact" onClick={onClose} variant="primary" size="lg" className="w-full gap-2">
            <Send className="w-4 h-4" />
            Kontak Saya
          </Button>
        </div>

        {/* Social Links */}
        <div className="pt-4 border-t border-border-subtle">
          <div className="text-[11px] font-mono uppercase tracking-wider text-text-muted px-2 pb-2">
            Media Sosial &amp; Kontak
          </div>
          <div className="grid grid-cols-2 gap-2">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-card/40 border border-border-subtle text-xs text-text-secondary hover:text-text-primary hover:border-accent-emerald/30 transition-colors"
              >
                <span>{social.name}</span>
                <span className="text-[10px] font-mono text-text-muted">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
