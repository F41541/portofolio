"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const CursorGlow: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Only enable on pointer-capable desktop devices
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const el = ref.current;
    if (!el) return;

    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let animId: number;

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      el.style.opacity = "1";
    };

    const onMouseLeave = () => {
      el.style.opacity = "0";
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      el.style.transform = `translate3d(calc(${currentX}px - 50%), calc(${currentY}px - 50%), 0)`;
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transform: "translate3d(-1000px, -1000px, 0)",
        opacity: 0,
        willChange: "transform",
      }}
      className={cn(
        "pointer-events-none fixed top-0 left-0 w-[550px] h-[550px] rounded-full z-0",
        "bg-[radial-gradient(circle_at_center,rgba(5,150,105,0.06),rgba(8,145,178,0.02)_40%,transparent_70%)]",
        "dark:bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12),rgba(6,182,212,0.04)_40%,transparent_70%)]",
        "blur-2xl transition-opacity duration-300"
      )}
      aria-hidden="true"
    />
  );
};
