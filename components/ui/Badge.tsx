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
        "bg-accent-emerald/10 text-emerald-700 dark:text-emerald-300 border border-accent-emerald/25 font-semibold",
      cyan: "bg-accent-cyan/10 text-cyan-700 dark:text-cyan-300 border border-accent-cyan/25 font-semibold",
      neutral:
        "bg-surface-elevated text-text-primary border border-border-subtle font-medium",
      outline: "border border-border-subtle text-text-secondary bg-transparent font-medium",
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
