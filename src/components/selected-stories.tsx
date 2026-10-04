"use client";

import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/primitives/reveal";
import { SectionHeader } from "@/components/primitives/section-header";
import { media, type MediaKey } from "@/data/media";
import { stories } from "@/data/site";

const IMAGE_KEYS: MediaKey[] = ["selected-01", "selected-02", "selected-03", "selected-04"];

export function SelectedStories() {
  return (
    <section
      id="selected-stories"
      className="scroll-mt-24 bg-ivory px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[110rem]">
        <SectionHeader
          // index="01"
          label="Portfolio"
          title="Selected Stories"
          action={{ label: "View all work", href: "/work/" }}
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:gap-6">
          {stories.map((story, index) => {
            const image = media[IMAGE_KEYS[index % IMAGE_KEYS.length]];
            return (
              <Reveal key={story.slug} delay={index * 0.08} y={30}>
                <Link href="/work/" className="group block">
                  <div className="relative aspect-9/13 overflow-hidden bg-beige/40">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent p-5 sm:p-6">
                      <p className="font-serif text-xl text-ivory sm:text-2xl">{story.couple}</p>
                      <p className="mt-1 text-[0.6875rem] uppercase tracking-[0.22em] text-ivory/70">
                        {story.location} · {story.detail}
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
