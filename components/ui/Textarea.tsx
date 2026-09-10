import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const isInvalid = props["aria-invalid"] === true || props["aria-invalid"] === "true";
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[80px] w-full bg-surface-ground border border-border-subtle focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald text-text-primary placeholder:text-text-muted rounded-lg px-4 py-2.5 outline-none transition-colors text-sm disabled:cursor-not-allowed disabled:opacity-50 resize-y",
          isInvalid && "border-red-500/80 focus:border-red-500 focus:ring-red-500/30",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
