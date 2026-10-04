"use client";

import Link from "next/link";

import { ParallaxImage } from "@/components/primitives/parallax-image";
import { MaskText } from "@/components/primitives/reveal";
import { business, seo } from "@/data/site";

export function FinalCta() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink text-ivory">
      <div className="absolute inset-0">
        <ParallaxImage
          imageKey="film-poster"
          className="h-full w-full"
          imageClassName="object-cover object-top"
          sizes="100vw"
          strength={90}
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/40 to-ink/85"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-4 border border-ivory/15 lg:inset-8"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[110rem] flex-col items-center px-8 py-24 text-center">
        <p className="eyebrow text-ivory/60">{business.studios}</p>
        <MaskText
          as="h2"
          lines={["Your story", "starts here."]}
          className="mt-6 font-serif text-[clamp(2.8rem,9vw,8rem)] leading-[0.92]"
        />
        <p className="mt-6 max-w-md text-sm leading-relaxed text-ivory/70">{seo.description}</p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/#contact"
            className="eyebrow inline-flex items-center justify-center gap-3 bg-ivory px-8 py-4 text-ink transition-colors hover:bg-cream"
          >
            Inquire <span aria-hidden="true">↗</span>
          </Link>
          <Link
            href="/work/"
            className="eyebrow inline-flex items-center justify-center gap-3 border px-8 py-4 transition-colors [border-color:color-mix(in_srgb,currentColor_40%,transparent)] hover:bg-ivory/10"
          >
            View work
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 lg:bottom-12 z-10 flex flex-col items-center justify-between gap-2 px-8 text-[0.625rem] uppercase tracking-[0.24em] text-ivory/50 sm:flex-row lg:px-12">
        <span>
          {business.locality} · {business.region}
        </span>
        <a
          href={`mailto:${business.email}`}
          className="link-underline transition-colors hover:text-ivory"
        >
          {business.email}
        </a>
      </div>
    </section>
  );
}
