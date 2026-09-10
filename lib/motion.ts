/**
 * Kinematic Motion & Spring Physics — Agentway v1.7.0
 * Harmonic Oscillator Physics for Framer Motion & CSS
 */

export const SPRING_PRESETS = {
  snappy: {
    type: "spring" as const,
    mass: 0.8,
    stiffness: 280,
    damping: 18,
    bezier: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  bouncy: {
    type: "spring" as const,
    mass: 1.0,
    stiffness: 180,
    damping: 12,
    bezier: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },
  natural: {
    type: "spring" as const,
    mass: 1.0,
    stiffness: 220,
    damping: 25,
    bezier: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
  smooth: {
    type: "spring" as const,
    mass: 1.2,
    stiffness: 140,
    damping: 26,
    bezier: "cubic-bezier(0.16, 1, 0.3, 1)",
  },
  subtle: {
    type: "spring" as const,
    mass: 1.5,
    stiffness: 100,
    damping: 28,
    bezier: "cubic-bezier(0.25, 1, 0.5, 1)",
  },
} as const;

/**
 * Calculates cascading stagger delay for list elements:
 * t_delay(n) = min(n * stepMs, maxCapMs)
 */
export function getStaggerDelay(index: number, stepMs = 35, maxCapMs = 350): number {
  return Math.min(index * stepMs, maxCapMs) / 1000;
}

/**
 * Asymmetric entrance / exit animation variants
 */
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: getStaggerDelay(custom),
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1], // Asymmetric deceleration on enter
    },
  }),
};
