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
      transitionTimingFunction: {
        "spring-snappy": "var(--spring-snappy, cubic-bezier(0.34, 1.56, 0.64, 1))",
        "spring-smooth": "var(--spring-smooth, cubic-bezier(0.16, 1, 0.3, 1))",
        "spring-natural": "var(--spring-natural, cubic-bezier(0.22, 1, 0.36, 1))",
        "ease-in-kinetic": "var(--ease-in-kinetic, cubic-bezier(0.7, 0, 0.84, 0))",
        "ease-out-kinetic": "var(--ease-out-kinetic, cubic-bezier(0.16, 1, 0.3, 1))",
      },
      transitionDuration: {
        fast: "var(--motion-fast, 150ms)",
        normal: "var(--motion-normal, 240ms)",
        deliberate: "var(--motion-deliberate, 360ms)",
      },
    },
  },
  plugins: [],
};

export default config;
