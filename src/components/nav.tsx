"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { business, nav } from "@/data/site";

export function Nav() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 48);
  });

  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const root = document.documentElement;
    const previousBody = document.body.style.overflow;
    const previousRoot = root.style.overflow;
    document.body.style.overflow = open ? "hidden" : "";
    root.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = previousBody;
      root.style.overflow = previousRoot;
    };
  }, [open]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        overHero
          ? "border-b border-transparent text-ivory"
          : "border-b border-charcoal/10 bg-ivory/90 text-charcoal backdrop-blur-md"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[110rem] items-center justify-between px-5 sm:px-8 lg:h-20 lg:px-12"
      >
        <Link
          href="/"
          className="font-serif text-base tracking-[0.12em] md:text-lg md:tracking-[0.18em] uppercase lg:text-xl lg:tracking-[0.24em]"
          onClick={() => setOpen(false)}
        >
          {business.name}
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="eyebrow opacity-80 transition-opacity hover:opacity-100"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="eyebrow border px-5 py-2.5 transition-colors hover:bg-charcoal hover:text-ivory"
            style={{
              borderColor: overHero
                ? "rgba(245,241,232,0.45)"
                : "color-mix(in srgb, currentColor 30%, transparent)",
            }}
          >
            Inquire
          </Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>
    </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 top-16 z-40 overflow-y-auto overscroll-contain bg-ink pb-10 text-ivory lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="flex flex-col gap-2 px-6 pt-10">
              {nav.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * index + 0.05, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    className="block border-b border-ivory/10 py-5 font-serif text-4xl"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="px-6 pt-10">
              <Link
                href="/#contact"
                className="eyebrow inline-block border border-ivory/40 px-6 py-3"
                onClick={() => setOpen(false)}
              >
                Inquire
              </Link>
              <p className="mt-8 text-sm text-ivory/60">{business.studios}</p>
              <a className="mt-1 block text-sm text-ivory/60" href={`mailto:${business.email}`}>
                {business.email}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
