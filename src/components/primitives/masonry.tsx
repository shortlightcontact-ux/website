"use client";

import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/primitives/reveal";
import { media, type MediaKey } from "@/data/media";

export type MasonryItem = {
  id: string;
  imageKey: MediaKey;
  href?: string;
  caption?: { title: string; meta: string };
  aspectClass?: string;
};

type MasonryProps = {
  items: MasonryItem[];
  columns?: "2" | "3";
  sizes?: string;
  priorityFirst?: boolean;
  className?: string;
};

const ASPECTS = [
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-square",
];

/**
 * CSS multi-column waterfall. Using `columns` (rather than a JS masonry
 * library) keeps the bundle lean and the export fully static. Note that CSS
 * columns flow top-to-bottom per column, so visual order is column-major while
 * DOM/reading order is preserved.
 */
export function Masonry({
  items,
  columns = "3",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priorityFirst = false,
  className,
}: MasonryProps) {
  return (
    <div
      className={`[column-gap:1rem] lg:[column-gap:1.5rem] ${
        columns === "3" ? "columns-1 sm:columns-2 lg:columns-3" : "columns-1 sm:columns-2"
      } ${className ?? ""}`}
    >
      {items.map((item, index) => {
        const image = media[item.imageKey];
        // Prefer the source image's true proportions so nothing is cropped;
        // fall back to the cycling decorative ratios for remote/unknown media.
        const naturalRatio =
          image.width && image.height ? `${image.width} / ${image.height}` : null;
        return (
          <div key={item.id} className="mb-4 break-inside-avoid lg:mb-6">
            <Reveal fadeOnly>
              <MasonryTile
                item={item}
                ratio={item.aspectClass ? null : naturalRatio}
                aspectClass={item.aspectClass ?? ASPECTS[index % ASPECTS.length]}
                sizes={sizes}
                priority={priorityFirst && index === 0}
              />
            </Reveal>
          </div>
        );
      })}
    </div>
  );
}

function MasonryTile({
  item,
  ratio,
  aspectClass,
  sizes,
  priority,
}: {
  item: MasonryItem;
  ratio: string | null;
  aspectClass: string;
  sizes: string;
  priority: boolean;
}) {
  const image = media[item.imageKey];

  const tile = (
    <div className="relative block">
      <div
        className={`relative overflow-hidden bg-beige/40 ${ratio ? "" : aspectClass}`}
        style={ratio ? { aspectRatio: ratio } : undefined}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
      </div>
      {item.caption ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent p-5 sm:p-6">
          <div className="translate-y-0 opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100">
            <p className="font-serif text-xl text-ivory sm:text-2xl">{item.caption.title}</p>
            <p className="mt-1 text-[0.6875rem] uppercase tracking-[0.22em] text-ivory/70">
              {item.caption.meta}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );

  if (item.href) {
    return (
      <Link href={item.href} className="group block">
        {tile}
      </Link>
    );
  }

  return <div className="group block">{tile}</div>;
}
