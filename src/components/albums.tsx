"use client";

import Image from "next/image";

import { Reveal } from "@/components/primitives/reveal";
import { SectionHeader } from "@/components/primitives/section-header";
import { media } from "@/data/media";
import { albums } from "@/data/site";

export function Albums() {
  return (
    <section className="theme-dark px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[110rem]">
        <SectionHeader  label="Albums" title={albums.heading} />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/60">{albums.line}</p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:mt-14 lg:gap-6">
          {albums.imageKeys.map((key, index) => (
            <Reveal key={key} delay={index * 0.08} y={40}>
              <div className="group relative aspect-[3/4] overflow-hidden">
                <Image
                  src={media[key].src}
                  alt={media[key].alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
