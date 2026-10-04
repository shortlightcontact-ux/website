"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { media } from "@/data/media";
import { business } from "@/data/site";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100svh] min-h-[38rem] flex-col justify-end overflow-hidden bg-ink text-ivory"
    >
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { scale: imageScale, y: imageY }}
      >
        <motion.div
          data-reveal
          className="absolute inset-0"
          initial={reduced ? false : { scale: 1.18, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease }}
        >
          <Image
            src={media.hero.src}
            alt={media.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/50"
        aria-hidden="true"
      />

      <motion.div
        data-hero-veil
        className="absolute inset-0 bg-ink"
        aria-hidden="true"
        initial={reduced ? false : { opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.4, ease, delay: 0.15 }}
      />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-[110rem] px-5 pb-16 sm:px-8 lg:px-12 lg:pb-24"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          data-reveal
          className="eyebrow text-ivory/70"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.9 }}
        >
          {business.studios}
        </motion.p>

        <h1 className="mt-6 font-serif leading-[0.88]">
          {["Shortlight", "Weddings"].map((line, index) => (
            <span key={line} className="block overflow-hidden pb-[1.9em] -mb-[1.9em]">
              <motion.span
                data-reveal
                className="block text-[clamp(3.6rem,15vw,12rem)]"
                initial={reduced ? false : { y: "160%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.2, ease, delay: 1 + index * 0.12 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          data-reveal
          className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 1.35 }}
        >
          <p className="max-w-md text-sm tracking-[0.22em] uppercase text-ivory/75">
            {business.tagline}
          </p>
          <Link
            href="/#selected-stories"
            className="eyebrow group inline-flex items-center gap-3 self-start border-b border-ivory/40 pb-1 transition-colors hover:border-ivory sm:self-auto"
          >
            View Stories
            <span
              aria-hidden="true"
              className="transition-transform duration-500 group-hover:translate-y-1"
            >
              ↘
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
