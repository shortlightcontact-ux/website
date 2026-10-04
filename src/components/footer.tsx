import Link from "next/link";

import { business, nav } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-ivory">
      <div className="mx-auto max-w-[110rem] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-serif text-4xl tracking-[0.18em] uppercase sm:text-5xl">
              {business.name}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/60">
              {business.tagline} — {business.studios}.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow text-ivory/40">Explore</p>
            <ul className="mt-5 space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ivory/70 transition-colors hover:text-ivory"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-ivory/40">Studio</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  className="text-ivory/70 transition-colors hover:text-ivory"
                  href={`mailto:${business.email}`}
                >
                  {business.email}
                </a>
              </li>
              <li>
                <a
                  className="text-ivory/70 transition-colors hover:text-ivory"
                  href={`tel:${business.phone}`}
                >
                  {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  className="text-ivory/70 transition-colors hover:text-ivory"
                  href={business.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  @{business.instagram}
                </a>
              </li>
              <li className="text-ivory/50">{business.locality} · {business.region}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/40 sm:flex-row">
          <p>© {year} {business.fullName}. All rights reserved.</p>
          <p>{business.hours}</p>
        </div>
      </div>
    </footer>
  );
}
