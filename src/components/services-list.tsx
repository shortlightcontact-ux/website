"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

import { SectionHeader } from "@/components/primitives/section-header";
import { media } from "@/data/media";
import { services } from "@/data/site";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

export function ServicesList() {
  const [active, setActive] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const reduced = usePrefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.35 });
  const positioned = useRef(false);

  const showPreview = !reduced && active !== null;

  return (
    <section
      id="services"
      className="scroll-mt-24 bg-cream px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[110rem]">
        <SectionHeader  label="Services" title="What we create" />

        <div
          className="relative mt-10 lg:mt-14"
          onMouseMove={(event) => {
            if (reduced) return;
            const rect = event.currentTarget.getBoundingClientRect();
            const nextX = event.clientX - rect.left;
            const nextY = event.clientY - rect.top;
            // Snap on (re-)entry so the preview never flies in from its last spot.
            if (!positioned.current) {
              springX.jump(nextX);
              springY.jump(nextY);
              positioned.current = true;
            }
            x.set(nextX);
            y.set(nextY);
          }}
          onMouseLeave={() => {
            positioned.current = false;
            setActive(null);
          }}
        >
          <ul className="border-t [border-color:color-mix(in_srgb,currentColor_16%,transparent)]">
            {services.map((service, index) => (
              <li
                key={service.name}
                className="border-b transition-colors [border-color:color-mix(in_srgb,currentColor_16%,transparent)] hover:bg-charcoal/[0.035]"
                onMouseEnter={() => setActive(index)}
              >
                <button
                  type="button"
                  className="group flex w-full items-baseline gap-5 px-2 py-8 text-left lg:gap-10 lg:px-4"
                  aria-expanded={expanded === index}
                  onClick={() =>
                    setExpanded((current) => (current === index ? null : index))
                  }
                >
                  <span className="eyebrow w-10 shrink-0 text-taupe">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex flex-1 flex-col gap-2 lg:flex-row lg:items-baseline lg:justify-between lg:gap-10">
                    <span className="font-serif text-[clamp(1.9rem,4.4vw,3.6rem)] leading-none transition-transform duration-500 lg:group-hover:translate-x-2">
                      {service.name}
                    </span>
                    <span className="max-w-md text-sm text-charcoal/60">{service.line}</span>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {expanded === index ? (
                    <motion.div
                      key="image"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden lg:hidden"
                    >
                      <div className="relative mx-2 mb-8 aspect-[4/3] overflow-hidden lg:mx-4">
                        <Image
                          src={media[service.imageKey].src}
                          alt={media[service.imageKey].alt}
                          fill
                          sizes="100vw"
                          className="object-cover"
                        />
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          {!reduced ? (
            <motion.div
              aria-hidden="true"
              style={{ x: springX, y: springY }}
              animate={{ opacity: showPreview ? 1 : 0 }}
              transition={{ duration: showPreview ? 0.35 : 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block"
            >
              {/* Static wrapper: negative margins centre the preview without
                  competing with Framer's inline transform. */}
              <div className="relative -ml-40 -mt-[12.5rem] h-[25rem] w-[20rem]">
                {services.map((service, index) => (
                  <div
                    key={service.imageKey}
                    className={`absolute inset-0 overflow-hidden transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      active === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={media[service.imageKey].src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 20rem, 0px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
