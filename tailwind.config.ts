import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          ground: "rgb(var(--bg-surface-ground) / <alpha-value>)",
          card: "rgb(var(--bg-surface-card) / <alpha-value>)",
          elevated: "rgb(var(--bg-surface-elevated) / <alpha-value>)",
        },
        surface: {
          ground: "rgb(var(--bg-surface-ground) / <alpha-value>)",
          card: "rgb(var(--bg-surface-card) / <alpha-value>)",
          elevated: "rgb(var(--bg-surface-elevated) / <alpha-value>)",
        },
        border: {
          subtle: "rgb(var(--border-subtle) / <alpha-value>)",
          accent: "rgb(var(--border-accent) / <alpha-value>)",
        },
        text: {
          primary: "rgb(var(--text-primary) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary) / <alpha-value>)",
          muted: "rgb(var(--text-muted) / <alpha-value>)",
        },
        accent: {
          emerald: "rgb(var(--accent-emerald) / <alpha-value>)",
          cyan: "rgb(var(--accent-cyan) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  plugins: [],
};

export default config;
