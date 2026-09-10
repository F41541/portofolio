import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: "default" | "circular" | "rounded";
}

export function Skeleton({
  className,
  variant = "default",
  ...props
}: SkeletonProps) {
  const variantStyles = {
    default: "rounded-md",
    circular: "rounded-full",
    rounded: "rounded-xl",
  };

  return (
    <div
      role="status"
      aria-label="Memuat konten..."
      aria-busy="true"
      className={cn(
        "animate-shimmer bg-surface-elevated/70 border border-border-subtle/50",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <span className="sr-only">Memuat...</span>
    </div>
  );
}
