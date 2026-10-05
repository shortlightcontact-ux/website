"use client";

import Image from "next/image";
import Link from "next/link";

import { Masonry, type MasonryItem } from "@/components/primitives/masonry";
import { Reveal } from "@/components/primitives/reveal";
import { SectionHeader } from "@/components/primitives/section-header";
import { SectionLabel } from "@/components/primitives/section-label";
import { media, type MediaKey } from "@/data/media";
import { stories } from "@/data/site";

const MORE_FRAMES: MediaKey[] = [
  "frame-01",
  "frame-02",
  "frame-03",
  "frame-04",
  "frame-05",
  "frame-06",
  "frame-07",
  "frame-08",
  "frame-09",
  "frame-10",
  "frame-11",
  "frame-12",
];

export function WorkGallery() {
  const frameItems: MasonryItem[] = MORE_FRAMES.map((imageKey, index) => ({
    id: `${imageKey}-${index}`,
    imageKey,
  }));

  return (
    <div className="bg-ivory">
      <header className="px-5 pb-12 pt-28 sm:px-8 lg:px-12 lg:pb-16 lg:pt-36">
        <div className="mx-auto max-w-[110rem]">
          <SectionHeader as="h1" label="Portfolio" title="Work" />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base text-charcoal/70">
              A selection of weddings — ceremonies, coastlines, and the quiet hours in
              between. Every media below was photographed and filmed by Shortlight Weddings.
            </p>
          </Reveal>
        </div>
      </header>

      <div className="mx-auto max-w-[110rem] px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
          {stories.map((story, index) => {
            const image = media[story.imageKey1];
            return (
              <Reveal key={story.slug} delay={index * 0.06} y={30}>
                <article className="group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-beige/40">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent p-5 sm:p-6">
                      <p className="eyebrow text-ivory/70">
                        {String(index + 1).padStart(2, "0")} · {story.detail}
                      </p>
                      <h2 className="mt-2 font-serif text-xl text-ivory sm:text-2xl">
                        {story.couple}
                      </h2>
                      <p className="mt-1 text-[0.6875rem] uppercase tracking-[0.22em] text-ivory/70">
                        {story.location}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-14 lg:mt-20">
          <SectionLabel>More frames</SectionLabel>
          <Masonry items={frameItems} columns="3" className="mt-10" />
        </div>

        <Reveal className="mt-14 flex flex-col items-center gap-6 text-center lg:mt-20" y={30}>
          <p className="max-w-xl font-serif text-[clamp(1.8rem,4vw,3rem)] leading-tight">
            Your story could be next on this page.
          </p>
          <Link
            href="/#contact"
            className="eyebrow inline-flex items-center gap-3 border border-charcoal px-8 py-4 transition-colors hover:bg-charcoal hover:text-ivory"
          >
            Inquire <span aria-hidden="true">↗</span>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
