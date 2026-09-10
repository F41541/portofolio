import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverGlow?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverGlow = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-surface-card border border-border-subtle rounded-xl transition-all duration-200",
          hoverGlow &&
            "hover:border-accent-emerald/40 hover:shadow-xl hover:shadow-accent-emerald/5 hover:-translate-y-1",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

