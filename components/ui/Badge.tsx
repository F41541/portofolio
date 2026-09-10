import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "emerald" | "cyan" | "neutral" | "outline";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "neutral", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors select-none";

    const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
      emerald:
        "bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20",
      cyan: "bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20",
      neutral:
        "bg-surface-elevated text-text-secondary border border-border-subtle",
      outline: "border border-border-subtle text-text-muted bg-transparent",
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
