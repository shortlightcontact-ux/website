"use client";

import Image from "next/image";

import { SectionHeader } from "@/components/primitives/section-header";
import { media } from "@/data/media";
import { films } from "@/data/site";

export function HighlightFilms() {
  return (
    <section className="bg-ink px-5 py-20 text-ivory sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[110rem]">
        <SectionHeader  label="Highlights" title="Highlight Films" />
        <p className="mt-6 max-w-md text-sm text-ivory/55">
          Three stories, three celebrations, and the moments that made each one.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-3 lg:mt-14">
          {films.map((film) => {
            const poster = media[film.posterKey];
            return (
              <div key={film.title} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={poster.src}
                    alt={poster.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-ink/30 transition-colors duration-700 group-hover:bg-ink/10" />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <p className="font-serif text-2xl">{film.title}</p>
                  <p className="text-[0.6875rem] uppercase tracking-[0.22em] text-ivory/50">
                    {film.location}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
