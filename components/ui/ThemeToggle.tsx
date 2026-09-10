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
        "flex items-center justify-center gap-2 p-2 rounded-lg bg-surface-elevated/60 hover:bg-surface-elevated border border-border-subtle hover:border-accent-emerald/40 text-text-muted hover:text-text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-emerald select-none cursor-pointer",
        className
      )}
      aria-label={isDark ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
      title={isDark ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 transition-transform duration-200 rotate-0 hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-text-secondary hover:text-text-primary transition-transform duration-200 -rotate-12 hover:rotate-0" />
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
