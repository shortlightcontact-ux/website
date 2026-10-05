"use client";

import { ParallaxImage } from "@/components/primitives/parallax-image";
import { MaskText, Reveal } from "@/components/primitives/reveal";
import { SectionLabel } from "@/components/primitives/section-label";
import { business, philosophy } from "@/data/site";

export function Philosophy() {
  return (
    <section className="relative overflow-hidden bg-ink text-ivory">
      <div className="absolute inset-0">
        <ParallaxImage
          imageKey={philosophy.imageKey}
          className="h-full w-full"
          imageClassName="object-cover"
          sizes="100vw"
          strength={80}
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-ink/25"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-[110rem] flex-col justify-between gap-14 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <SectionLabel>Philosophy</SectionLabel>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-ivory/65">{philosophy.line}</p>
          </Reveal>
        </div>

        <div>
          <MaskText
            as="h2"
            lines={philosophy.headline}
            className="max-w-5xl font-serif text-[clamp(2.4rem,6.5vw,5.5rem)] leading-[1.14]"
          />
          <Reveal delay={0.25} className="mt-8">
            <span className="eyebrow inline-flex items-center gap-3 text-ivory/60">
              <span className="h-px w-10 bg-current opacity-50" aria-hidden="true" />
              {business.name}
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
