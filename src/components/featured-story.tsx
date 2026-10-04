"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { SectionHeader } from "@/components/primitives/section-header";
import { media } from "@/data/media";
import { featuredStory } from "@/data/site";
import { useLazyGsap } from "@/lib/use-lazy-gsap";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

export function FeaturedStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [tone, setTone] = useState<"light" | "dark">(featuredStory.beats[0].tone);

  // GSAP is pulled in on the client only, after paint, so it never enters the
  // initial bundle. Content above stays server-rendered for SEO and no-JS.
  useLazyGsap(!reduced, (gsap, ScrollTrigger) => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const beats = gsap.utils.toArray<HTMLElement>("[data-beat]");
      beats.forEach((beat, index) => {
        ScrollTrigger.create({
          trigger: beat,
          start: "top 60%",
          end: "bottom 40%",
          onToggle: (self) => {
            if (!self.isActive) return;
            setActive(index);
            setTone(featuredStory.beats[index].tone);
          },
        });
      });
    });

    return () => mm.revert();
  });

  const isDark = tone === "dark";

  return (
    <section
      ref={sectionRef}
      className={`transition-colors duration-700 ${
        isDark ? "theme-dark" : "bg-cream text-charcoal"
      }`}
    >
      <div className="mx-auto max-w-[110rem] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <SectionHeader  label="Featured Story" title={featuredStory.couple} />
        <p className="mt-3 text-xs uppercase tracking-[0.24em] opacity-60">
          {featuredStory.location}
        </p>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            {featuredStory.beats.map((beat, index) => (
              <article
                key={beat.line}
                data-beat
                className="flex min-h-[60vh] flex-col justify-center border-t [border-color:color-mix(in_srgb,currentColor_14%,transparent)] py-14 first:border-t-0 lg:min-h-[72vh]"
              >
                <span className="eyebrow opacity-50">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(featuredStory.beats.length).padStart(2, "0")}
                </span>
                <p className="mt-6 font-serif text-[clamp(1.8rem,3.4vw,3rem)] leading-[1.12]">
                  {beat.line}
                </p>
                <div className="relative mt-8 aspect-[4/3] overflow-hidden lg:hidden">
                  <Image
                    src={media[beat.imageKey].src}
                    alt={media[beat.imageKey].alt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </article>
            ))}
          </div>

          <div className="order-1 hidden lg:order-2 lg:block">
            <div className="sticky top-24 h-[74vh] overflow-hidden">
              {featuredStory.beats.map((beat, index) => (
                <div
                  key={beat.imageKey}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === active ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden={index !== active}
                >
                  <Image
                    src={media[beat.imageKey].src}
                    alt={media[beat.imageKey].alt}
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
