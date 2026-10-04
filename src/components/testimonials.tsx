"use client";

import Image from "next/image";

import { Reveal } from "@/components/primitives/reveal";
import { SectionLabel } from "@/components/primitives/section-label";
import { media } from "@/data/media";
import { testimonials } from "@/data/site";

export function Testimonials() {
  return (
    <section className="bg-cream px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[110rem]">
        <Reveal>
          <SectionLabel >Testimonials</SectionLabel>
        </Reveal>

        <div className="mt-10 space-y-14 lg:mt-14 lg:space-y-24">
          {testimonials.map((testimonial, index) => {
            const image = media[testimonial.imageKey];
            const flip = index % 2 === 1;
            return (
              <Reveal key={testimonial.attribution} y={40}>
                <figure className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                  <div
                    className={`group relative aspect-[4/5] overflow-hidden lg:col-span-5 ${
                      flip ? "lg:order-2 lg:col-start-8" : ""
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                  </div>
                  <blockquote className={`lg:col-span-6 ${flip ? "lg:order-1" : "lg:col-start-7"}`}>
                    <p className="font-serif text-[clamp(1.8rem,3.6vw,3.2rem)] leading-[1.14]">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <figcaption className="mt-8 flex items-center gap-4 text-[0.6875rem] uppercase tracking-[0.24em] text-taupe">
                      <span className="h-px w-10 bg-current opacity-40" aria-hidden="true" />
                      {testimonial.attribution}
                    </figcaption>
                  </blockquote>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
