"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { media, type MediaKey } from "@/data/media";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

type ParallaxImageProps = {
  imageKey: MediaKey;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  strength?: number;
};

/**
 * Scroll-linked parallax image. The wrapper owns the aspect ratio (so layout
 * space is reserved) while an oversized inner layer drifts within it.
 * Transform-only, and fully disabled under `prefers-reduced-motion`.
 */
export function ParallaxImage({
  imageKey,
  className,
  imageClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  strength = 60,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);
  const item = media[imageKey];
  const hasPosition = /(^|\s)(absolute|fixed|relative|sticky)(\s|$)/.test(className ?? "");

  return (
    <div
      ref={containerRef}
      className={`${hasPosition ? "" : "relative"} overflow-hidden ${className ?? ""}`}
    >
      <motion.div
        className="absolute -inset-[12%] [backface-visibility:hidden] [will-change:transform]"
        style={reduced ? undefined : { y }}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imageClassName ?? ""}`}
        />
      </motion.div>
    </div>
  );
}
