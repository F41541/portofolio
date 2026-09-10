"use client";

import * as React from "react";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  mounted: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default to light mode as required
  const [theme, setThemeState] = React.useState<Theme>("light");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored === "dark") {
        setThemeState("dark");
        document.documentElement.classList.add("dark");
      } else {
        setThemeState("light");
        document.documentElement.classList.remove("dark");
      }
    } catch {
      // localStorage may fail in restricted environments
      setThemeState("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const setTheme = React.useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // Ignore localStorage errors
    }

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = React.useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Ignore localStorage errors
      }

      if (next === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  }, []);

  // Support global custom events and multi-tab synchronization
  React.useEffect(() => {
    const handleToggle = () => toggleTheme();
    const handleSet = (e: Event) => {
      const customEvent = e as CustomEvent<Theme>;
      if (customEvent.detail === "dark" || customEvent.detail === "light") {
        setTheme(customEvent.detail);
      }
    };
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && (e.newValue === "dark" || e.newValue === "light")) {
        setTheme(e.newValue);
      }
    };

    window.addEventListener("toggle-theme", handleToggle);
    window.addEventListener("set-theme", handleSet);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("toggle-theme", handleToggle);
      window.removeEventListener("set-theme", handleSet);
      window.removeEventListener("storage", handleStorage);
    };
  }, [toggleTheme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, mounted, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
