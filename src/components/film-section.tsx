"use client";

import Image from "next/image";

import { SectionHeader } from "@/components/primitives/section-header";
import { media } from "@/data/media";

export function FilmSection() {
  const poster = media["film-thumb"];

  return (
    <section className="theme-dark px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[110rem]">
        <SectionHeader
          // index="04"
          label="Wedding Film"
          title="Some moments are better remembered in motion."
        />
        <p className="mt-6 max-w-md text-sm text-ivory/55">
          Live sound, honest speech, and the parts of the day a photograph cannot hold.
        </p>

        <div className="mt-10 lg:mt-14">
          <div className="group relative block aspect-video lg:aspect-16/8 w-full overflow-hidden">
            <Image
              src={poster.src}
              alt={poster.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 90vw"
              className="object-cover transition-transform duration-1400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-ink/35 transition-colors duration-700 group-hover:bg-ink/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
