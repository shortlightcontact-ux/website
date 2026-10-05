"use client";

import Image from "next/image";
import { useRef } from "react";

import { media } from "@/data/media";
import { useLazyGsap } from "@/lib/use-lazy-gsap";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const FIRST = "sequence-01" as const;
const SECOND = "sequence-02" as const;

export function ImageSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useLazyGsap(!reduced, (gsap) => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        frameRef.current,
        { scale: 1.16, opacity: 0.45 },
        { scale: 1, opacity: 1, ease: "none", duration: 1 },
      )
        .to(captionRef.current, { opacity: 0, y: -36, ease: "none", duration: 0.28 }, 0.06)
        .to(secondRef.current, { opacity: 1, ease: "none", duration: 0.35 }, 0.72);
    });

    return () => mm.revert();
  });

  return (
    <section ref={sectionRef} className="relative h-[100svh] overflow-hidden bg-ink">
      <div
        ref={frameRef}
        className="absolute inset-0 [backface-visibility:hidden] [will-change:transform,opacity]"
        style={
          reduced
            ? undefined
            : { transform: "scale(1.16)", opacity: 0.45 }
        }
      >
        <Image
          src={media[FIRST].src}
          alt={media[FIRST].alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          ref={secondRef}
          className="absolute inset-0"
          style={{ opacity: reduced ? 1 : 0 }}
        >
          <Image
            src={media[SECOND].src}
            alt={media[SECOND].alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink/45" />
        </div>
      </div>

      <div
        ref={captionRef}
        className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-6 pb-10 text-center text-ivory sm:pb-16"
      >
        <p className="max-w-full font-serif text-[clamp(1.3rem,3vw,2.6rem)] leading-tight">
          The moment the world falls away.
        </p>
        <p className="eyebrow mt-4 text-ivory/60">And only the two of you remain</p>
      </div>
    </section>
  );
}
