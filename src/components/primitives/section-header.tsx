"use client";

import Link from "next/link";

import { Reveal } from "@/components/primitives/reveal";
import { SectionLabel } from "@/components/primitives/section-label";

type SectionHeaderProps = {
  index?: string;
  label: string;
  title: string;
  action?: { label: string; href: string };
  as?: "h1" | "h2";
  size?: "lg" | "md";
  className?: string;
};

const TITLE_SIZE = {
  lg: "text-[clamp(2.4rem,6vw,5rem)]",
  md: "text-[clamp(2rem,4.6vw,3.6rem)]",
};

/**
 * Shared eyebrow + display title + optional action link, so every section
 * shares one rhythm. Tone-agnostic (uses currentColor) so it works on both
 * ivory and ink/charcoal sections.
 */
export function SectionHeader({
  index,
  label,
  title,
  action,
  as = "h2",
  size = "lg",
  className,
}: SectionHeaderProps) {
  const Heading = as;

  return (
    <Reveal
      className={`flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between ${className ?? ""}`}
    >
      <div>
        <SectionLabel index={index}>{label}</SectionLabel>
        <Heading className={`mt-5 font-serif leading-[0.97] ${TITLE_SIZE[size]}`}>
          {title}
        </Heading>
      </div>
      {action ? (
        <Link
          href={action.href}
          className="eyebrow inline-flex items-center gap-3 self-start border-b pb-1 transition-colors [border-color:color-mix(in_srgb,currentColor_30%,transparent)] hover:[border-color:currentColor] sm:self-auto"
        >
          {action.label} <span aria-hidden="true">↗</span>
        </Link>
      ) : null}
    </Reveal>
  );
}
