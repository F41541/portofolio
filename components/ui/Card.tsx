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
          "bg-surface-card border border-border-subtle rounded-2xl transition-all duration-normal ease-spring-natural shadow-sm",
          hoverGlow &&
            "hover:border-accent-emerald/40 hover:shadow-2xl hover:shadow-accent-emerald/10 hover:-translate-y-1.5",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

