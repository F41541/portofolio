"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export const CursorGlowMotion: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  // Raw cursor coordinates
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Harmonic spring oscillator (zeta ≈ 0.85 smooth physics)
  const springConfig = { damping: 28, stiffness: 220, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  React.useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <motion.div
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className={cn(
        "pointer-events-none fixed top-0 left-0 w-[550px] h-[550px] rounded-full z-0",
        "bg-[radial-gradient(circle_at_center,rgba(5,150,105,0.06),rgba(8,145,178,0.02)_40%,transparent_70%)]",
        "dark:bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12),rgba(6,182,212,0.04)_40%,transparent_70%)]",
        "blur-2xl transition-opacity duration-normal ease-spring-natural",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      aria-hidden="true"
    />
  );
};
