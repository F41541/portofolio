import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOption[];
  hasError?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, children, hasError, ...props }, ref) => {
    const isInvalid = Boolean(hasError || props["aria-invalid"] === true || props["aria-invalid"] === "true");
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "w-full min-h-[44px] appearance-none bg-surface-ground border border-border-subtle focus:border-accent-emerald focus:ring-2 focus:ring-accent-emerald/30 text-text-primary rounded-xl px-4 py-2.5 outline-none transition-all duration-fast ease-spring-natural text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
            isInvalid && "border-red-500/80 focus:border-red-500 focus:ring-red-500/30",
            className
          )}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                  className={cn(
                    "bg-surface-elevated text-text-primary",
                    opt.disabled && "text-text-muted opacity-50 bg-surface-ground"
                  )}
                >
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";
