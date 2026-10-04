"use client";

import { useEffect, useRef } from "react";

type Gsap = typeof import("gsap").gsap;
type ScrollTriggerPlugin = typeof import("gsap/ScrollTrigger").ScrollTrigger;

type Setup = (gsap: Gsap, ScrollTrigger: ScrollTriggerPlugin) => void | (() => void);

/**
 * Loads GSAP + ScrollTrigger only on the client, after paint, so the animation
 * library never enters the initial bundle. The setup callback may return a
 * cleanup function (e.g. `() => mm.revert()`).
 */
export function useLazyGsap(enabled: boolean, setup: Setup) {
  // Captured once: the setup closure only touches stable setters and refs.
  const setupRef = useRef(setup);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let cleanup: void | (() => void);

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      cleanup = setupRef.current(gsap, ScrollTrigger);
    })();

    return () => {
      cancelled = true;
      if (typeof cleanup === "function") cleanup();
    };
  }, [enabled]);
}
