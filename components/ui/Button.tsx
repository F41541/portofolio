"use client";

import * as React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function getButtonStyles({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleOptions = {}): string {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-fast ease-spring-snappy focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-surface-ground disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none select-none active:scale-[0.97]";

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-accent-emerald text-white font-semibold shadow-md shadow-accent-emerald/20 hover:bg-emerald-600 hover:shadow-lg hover:shadow-accent-emerald/25 active:shadow-sm border border-emerald-500/30",
    secondary:
      "bg-surface-card text-text-primary hover:bg-surface-elevated hover:border-accent-emerald/50 border border-border-subtle shadow-sm active:bg-surface-ground",
    outline:
      "border border-border-subtle hover:border-accent-emerald/70 text-text-primary bg-transparent hover:bg-surface-elevated/50",
    ghost:
      "text-text-secondary hover:text-text-primary hover:bg-surface-elevated/80 active:bg-surface-elevated bg-transparent",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "min-h-[38px] sm:min-h-[40px] px-3.5 text-xs gap-1.5",
    md: "min-h-[44px] px-4 text-sm gap-2",
    lg: "min-h-[48px] px-6 text-base gap-2.5",
  };

  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

function sanitizeHref(url?: string): string | undefined {
  if (!url) return undefined;
  const trimmed = url.trim();
  const lower = trimmed.toLowerCase();
  if (
    (lower.startsWith("/") && !lower.startsWith("//")) ||
    lower.startsWith("#") ||
    lower.startsWith("http://") ||
    lower.startsWith("https://") ||
    lower.startsWith("mailto:") ||
    lower.startsWith("tel:")
  ) {
    return trimmed;
  }
  return "#";
}

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const isInactive = Boolean(disabled || isLoading);
    const classes = cn(
      getButtonStyles({ variant, size, className }),
      isInactive && "pointer-events-none opacity-60 cursor-not-allowed"
    );
    const safeHref = sanitizeHref(href);

    if (safeHref) {
      const isHttp = /^https?:\/\//i.test(safeHref);
      const isDirectExternal = isHttp || /^(mailto:|tel:)/i.test(safeHref);

      const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isInactive) {
          e.preventDefault();
          return;
        }
        (props as React.AnchorHTMLAttributes<HTMLAnchorElement>).onClick?.(e);
      };

      if (isDirectExternal) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={isInactive ? undefined : safeHref}
            target={target ?? (isHttp ? "_blank" : undefined)}
            rel={
              rel ??
              (isHttp ? "noopener noreferrer" : undefined)
            }
            aria-disabled={isInactive}
            tabIndex={isInactive ? -1 : undefined}
            className={classes}
            {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
            onClick={handleAnchorClick}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-current" />
                <span>{children}</span>
              </>
            ) : (
              children
            )}
          </a>
        );
      }

      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={isInactive ? "#" : safeHref}
          aria-disabled={isInactive}
          tabIndex={isInactive ? -1 : undefined}
          className={classes}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          onClick={handleAnchorClick}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-current" />
              <span>{children}</span>
            </>
          ) : (
            children
          )}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={disabled || isLoading}
        className={classes}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-current" />
            <span>{children}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
