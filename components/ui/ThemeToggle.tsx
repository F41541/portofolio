"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className,
  showLabel = false,
}) => {
  const { theme, toggleTheme, mounted } = useTheme();

  // Before mounting, theme defaults to light
  const isDark = mounted ? theme === "dark" : false;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      suppressHydrationWarning
      className={cn(
        "flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-surface-elevated/60 hover:bg-surface-elevated border border-border-subtle hover:border-accent-emerald/40 text-text-muted hover:text-text-primary transition-all duration-fast ease-spring-snappy focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-emerald active:scale-95 select-none cursor-pointer",
        className
      )}
      aria-label={isDark ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
      title={isDark ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 transition-transform duration-normal ease-spring-bouncy rotate-0 hover:rotate-90" />
        ) : (
          <Moon className="w-4 h-4 text-accent-cyan transition-transform duration-normal ease-spring-bouncy -rotate-12 hover:rotate-12" />
        )}
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-text-secondary">
          {isDark ? "Mode Terang" : "Mode Gelap"}
        </span>
      )}
    </button>
  );
};
