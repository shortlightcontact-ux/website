"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";

import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
}: RevealProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      data-reveal
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

type MaskTextProps = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "p";
};

/** Overflow-masked line reveal used for the oversized editorial headlines. */
export function MaskText({
  lines,
  className,
  lineClassName,
  delay = 0,
  as = "h2",
}: MaskTextProps) {
  const reduced = usePrefersReducedMotion();
  const Tag = as === "h1" ? motion.h1 : as === "p" ? motion.p : motion.h2;

  // The observer lives on the outer tag, not the translated line: a line that
  // sits at y:110% is clipped by its overflow-hidden mask, so an
  // IntersectionObserver on the line itself never reports an intersection and
  // would never animate in. Variants propagate from the visible tag downward.
  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { delayChildren: delay, staggerChildren: 0.08 } },
  };

  const lineVariants: Variants = {
    hidden: { y: "110%" },
    show: { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <Tag
      className={className}
      variants={containerVariants}
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className="block overflow-hidden">
          <motion.span data-reveal variants={lineVariants} className={lineClassName ?? "block"}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
