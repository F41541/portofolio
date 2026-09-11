import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface BrandLogoProps {
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md";
  subtitle?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  onClick,
  className,
  size = "md",
  subtitle,
}) => {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-emerald rounded-lg",
        className
      )}
      aria-label="Laxstudio - Beranda"
    >
      <div
        className={cn(
          "font-bold tracking-wider text-emerald-800 dark:text-accent-emerald bg-emerald-500/10 dark:bg-surface-elevated rounded border border-border-subtle group-hover:border-accent-emerald/50 transition-colors shadow-sm",
          size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-2.5 py-1"
        )}
      >
        LS
      </div>
      {subtitle ? (
        <div className="flex flex-col">
          <span className="font-semibold text-text-primary text-sm leading-tight tracking-tight">
            Lax<span className="text-accent-emerald">studio</span>
          </span>
          <span className="text-[10px] text-text-muted leading-none hidden sm:inline-block">
            {subtitle}
          </span>
        </div>
      ) : (
        <span
          className={cn(
            "font-semibold text-text-primary tracking-tight",
            size === "sm" ? "text-sm" : "text-base"
          )}
        >
          Lax<span className="text-accent-emerald">studio</span>
        </span>
      )}
    </Link>
  );
};
