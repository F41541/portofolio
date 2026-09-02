"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ArrowRight, Sparkles, Send } from "lucide-react";
import { NAV_ROUTES, SOCIAL_LINKS } from "@/lib/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCommandPalette?: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  onOpenCommandPalette,
}) => {
  const pathname = usePathname();

  // Prevent background scroll when mobile navigation is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close when route changes
  React.useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden flex flex-col bg-surface-ground/95 backdrop-blur-xl animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 h-16 border-b border-border-subtle shrink-0">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-2 group"
          aria-label="Home"
        >
          <div className="font-mono font-bold text-lg tracking-wider text-emerald-400 bg-surface-elevated px-2 py-0.5 rounded border border-border-subtle group-hover:border-emerald-500/50 transition-colors">
            &lt;AX/&gt;
          </div>
          <span className="font-semibold text-text-primary text-sm tracking-tight">
            Engineer<span className="text-emerald-400">.ai</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={onClose}
          className="p-2 -mr-2 text-text-secondary hover:text-text-primary rounded-lg bg-surface-elevated/50 border border-border-subtle transition-colors focus:outline-none focus:ring-2 focus:ring-accent-emerald"
          aria-label="Close navigation menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main content scrollable area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Status indicator */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-surface-card border border-border-subtle">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-text-primary font-mono">
              Status: Available for work
            </span>
          </div>
          <Badge variant="emerald" className="text-[11px]">
            Q1/Q2 2026
          </Badge>
        </div>

        {/* Quick search shortcut trigger */}
        {onOpenCommandPalette && (
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenCommandPalette();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-surface-card/60 border border-border-subtle text-left text-sm text-text-secondary hover:text-text-primary hover:border-emerald-500/30 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Search or jump to...
            </span>
            <kbd className="px-2 py-0.5 text-xs font-mono bg-surface-elevated border border-border-subtle rounded text-text-muted">
              ⌘K
            </kbd>
          </button>
        )}

        {/* Navigation list */}
        <div className="space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-text-muted px-2 pb-1">
            Menu Navigation
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
                    ? "bg-surface-elevated text-emerald-400 border border-emerald-500/20"
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
                      ? "text-emerald-400 translate-x-0.5"
                      : "text-text-muted"
                  )}
                />
              </Link>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="pt-2">
          <Link href="/contact" onClick={onClose} className="w-full block">
            <Button variant="primary" size="lg" className="w-full gap-2">
              <Send className="w-4 h-4" />
              Get in Touch
            </Button>
          </Link>
        </div>

        {/* Social Links */}
        <div className="pt-4 border-t border-border-subtle">
          <div className="text-[11px] font-mono uppercase tracking-wider text-text-muted px-2 pb-2">
            Social Connect
          </div>
          <div className="grid grid-cols-2 gap-2">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-card/40 border border-border-subtle text-xs text-text-secondary hover:text-text-primary hover:border-emerald-500/30 transition-colors"
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
