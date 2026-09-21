"use client";

import * as React from "react";
import dynamic from "next/dynamic";

const CursorGlowMotion = dynamic(
  () => import("./CursorGlowMotion").then((mod) => mod.CursorGlowMotion),
  { ssr: false }
);

export const CursorGlow: React.FC = () => {
  const [shouldRender, setShouldRender] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches && !prefersReducedMotion.matches) {
      setShouldRender(true);
    }
  }, []);

  if (!shouldRender) {
    return null;
  }

  return <CursorGlowMotion />;
};
