import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "emerald" | "cyan" | "neutral" | "outline";
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "neutral", dot = false, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors select-none";

    const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
      emerald:
        "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      cyan: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
      neutral:
        "bg-surface-elevated text-text-secondary border border-border-subtle",
      outline: "border border-border-subtle text-text-muted bg-transparent",
    };

    const dotColorMap: Record<NonNullable<BadgeProps["variant"]>, string> = {
      emerald: "bg-emerald-400",
      cyan: "bg-cyan-400",
      neutral: "bg-text-secondary",
      outline: "bg-text-muted",
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...props}
      >
        {dot && (
          <span className="relative flex h-1.5 w-1.5">
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                dotColorMap[variant]
              )}
            />
            <span
              className={cn(
                "relative inline-flex rounded-full h-1.5 w-1.5",
                dotColorMap[variant]
              )}
            />
          </span>
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
