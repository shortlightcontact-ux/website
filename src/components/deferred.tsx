"use client";

import dynamic from "next/dynamic";

/**
 * Both GSAP-driven sections are deferred with `ssr: false` so GSAP never enters
 * the initial HTML/bundle — it arrives only once these sections hydrate.
 * Matching-height fallbacks prevent layout shift while the chunks load.
 */
export const DeferredImageSequence = dynamic(
  () => import("@/components/image-sequence").then((module) => module.ImageSequence),
  {
    ssr: false,
    loading: () => <section className="h-[100svh] bg-ink" aria-hidden="true" />,
  },
);

export const DeferredFeaturedStory = dynamic(
  () => import("@/components/featured-story").then((module) => module.FeaturedStory),
  {
    ssr: false,
    loading: () => (
      <section className="min-h-[120vh] bg-cream" aria-hidden="true" />
    ),
  },
);
