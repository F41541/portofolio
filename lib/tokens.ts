export const tokens = {
  colors: {
    bgSurfaceGround: "#0D0E11",
    bgSurfaceCard: "#16181D",
    bgSurfaceElevated: "#1F232B",
    borderSubtle: "#262B36",
    borderAccent: "#10B981",
    textPrimary: "#F3F4F6",
    textSecondary: "#9CA3AF",
    textMuted: "#6B7280",
    accentEmerald: "#10B981",
    accentCyan: "#06B6D4",
  },
  cssVars: {
    bgSurfaceGround: "var(--bg-surface-ground)",
    bgSurfaceCard: "var(--bg-surface-card)",
    bgSurfaceElevated: "var(--bg-surface-elevated)",
    borderSubtle: "var(--border-subtle)",
    borderAccent: "var(--border-accent)",
    textPrimary: "var(--text-primary)",
    textSecondary: "var(--text-secondary)",
    textMuted: "var(--text-muted)",
    accentEmerald: "var(--accent-emerald)",
    accentCyan: "var(--accent-cyan)",
  },
} as const;

export type Tokens = typeof tokens;
