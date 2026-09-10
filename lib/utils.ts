import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculates reading time in minutes based on ~200 words per minute
 */
export function calculateReadingTime(text: string): { text: string; minutes: number; words: number } {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return {
    text: `${minutes} min read`,
    minutes,
    words,
  };
}
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://laxstudio.vercel.app";
