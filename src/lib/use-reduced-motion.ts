"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Single source of truth for motion preferences.
 * Combines Framer Motion's media-query hook with a stable `false` fallback
 * so GSAP sections can gate pinning/parallax the same way
 * (GSAP ignores the CSS `prefers-reduced-motion` query on its own).
 */
export function usePrefersReducedMotion(): boolean {
  return useReducedMotion() ?? false;
}
