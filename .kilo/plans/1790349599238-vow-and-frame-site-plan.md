# VOW & FRAME — Cinematic Wedding Portfolio (Implementation Plan)

## Goal
Build a premium, image-first editorial portfolio for the fictional studio **Vow & Frame** (Kochi, Kerala) using Next.js App Router + TypeScript + Tailwind v4 + Framer Motion + GSAP, exportable as a fully static site (`output: "export"` → `/out`), with no backend.

## Decisions (resolved with user)
1. **Assets:** remote, config-driven placeholders (Unsplash/Pexels URLs) centralized in one data module; swapping to local `/images/**` later is a single-file edit.
2. **Structure:** hybrid — a continuous-scroll cinematic **home** page plus a dedicated **`/work`** route for the full portfolio.
3. **Typography:** **Cormorant Garamond** (editorial serif) + **Inter** (sans metadata), self-hosted via `next/font/google`.
4. **Video:** remote poster + remote sample MP4 in the data file; play button opens a full-screen modal that lazily mounts a native `<video controls>`. Fully static, no iframe.

## Current State (verified)
- Fresh `create-next-app` scaffold: Next `16.3.6`, React `19.2.8`, Tailwind v4 (`@tailwindcss/postcss`), `app/` at root, default Geist boilerplate. Only `public/*.svg` exist — **no photography yet**.
- `next.config.ts` is empty; `output: "export"` not set.
- Next 16 facts confirmed from `node_modules/next/dist/docs/`:
  - Static export writes to `/out` (`static-exports.md`).
  - Default `next/image` optimization is **unsupported** with export; `images.unoptimized: true` bypasses the loader and makes remote URLs pass through (`get-img-props.js:277-292`).
  - Root layout uses the generated `LayoutProps<"/">` type; keep this convention.
  - `next lint` was removed in v16 — use `eslint`.
  - `src/app` is only honored if root `app/` is absent (`src-folder.md:31`).

## Target File Structure
Move to the `src/` convention (honors the brief's `src/data/site.ts`). `/public` and config stay at root.

```
next.config.ts                    # output: export, images.unoptimized, trailingSlash
tsconfig.json                     # paths: "@/": ["./src/*"], @/* -> src
src/
  app/
    layout.tsx                    # fonts, metadata, JSON-LD, Nav + Footer, skip link
    page.tsx                      # home (server component; composes client sections)
    globals.css                   # Tailwind v4 @theme tokens, base styles, dark sections
    work/page.tsx                 # full portfolio route (own metadata)
    sitemap.ts                    # static sitemap
    robots.ts                     # static robots
  components/
    nav.tsx                       # over-hero → fixed transform, mobile animated menu
    footer.tsx
    hero.tsx                      # load sequence + scroll parallax/scale
    selected-stories.tsx          # asymmetric editorial layout (home)
    featured-story.tsx            # sticky image + changing text, light/dark bg
    image-sequence.tsx            # GSAP pinned expand-to-fullscreen moment
    film-section.tsx              # poster + hover play + <dialog> video modal
    highlight-films.tsx           # 3 large film thumbnails
    philosophy.tsx
    services-list.tsx             # editorial list + cursor-follow image (desktop)
    albums.tsx
    about.tsx
    testimonials.tsx
    visual-journal.tsx            # 6–8 varied images + @vowandframe CTA
    contact-form.tsx              # mailto, no backend
    final-cta.tsx                 # full-screen parallax photo
    work-gallery.tsx              # /work grid
    primitives/                   # reveal.tsx, parallax-image.tsx, section-label.tsx,
                                  # video-modal.tsx (native <dialog>), gsap hook
  data/
    site.ts                       # all business/content config
    media.ts                      # image/video key -> { src, alt, ... } map
  lib/
    use-reduced-motion.ts         # wraps framer-motion + gsap.matchMedia guard
```

## Dependencies to Add
`pnpm add framer-motion gsap @gsap/react lucide-react`
(`@gsap/react` gives `useGSAP()` cleanup; `lucide-react` used sparingly — arrows/menu/play.)

## Config Changes
- `next.config.ts`:
  ```ts
  const nextConfig: NextConfig = {
    output: "export",
    images: { unoptimized: true },
    trailingSlash: true, // emits /work/index.html — safe on plain static hosts
  };
  ```
- `tsconfig.json`: change `paths` to `"@/*": ["./src/*"]`.
- Delete default `app/` boilerplate (after moving) and `public/*.svg`.

## Data Model
**`src/data/site.ts`** (typed, no JSX) — single source for editable content:
- `business`: name, fullName, tagline, address, phone, email, instagram, hours, studios.
- `nav`: `[{ label, href }]` (Work→`/work` or `/#selected-stories`, Services/About/Contact→anchors).
- `services`: 5 items `{ name, line, imageKey }` (Photography, Films, Pre-Wedding, Albums, Highlights).
- `stories`: `{ slug, couple, location, imageKey }` — Ananya & Arjun (feature), Meera & Adam, Nisha & Rohan, Diya & Akash.
- `featuredStory`: couple + 5 `{ imageKey, line }` beats + light/dark flags.
- `films`: `{ title, location, posterKey, videoUrl }` — Ananya+Arjun, Diya+Akash, Meera+Adam.
- `photographers`: Arjun Menon (Photographer & Creative Director), Maya Thomas (Photographer & Filmmaker) + one-line bios + `portraitKey`.
- `testimonials`: 2 oversized quotes with attributions.
- `philosophy`, `albums`, `about`, `journal` (image keys), `seo` (title/description), `contact.services` options.

**`src/data/media.ts`** — the swap point:
```ts
export type Media = { src: string; alt: string };
export const media: Record<MediaKey, Media> = {
  hero:          { src: "https://images.unsplash.com/...?w=1920&q=75&fm=webp&auto=format", alt: "..." },
  "wedding-01":  { ... }, // ... through wedding-06
  "couple-01":   { ... }, // couple-01..03
  "ceremony-01": { ... }, "ceremony-02": { ... },
  "details-01":  { ... }, // details-01..03
  "portrait-01": { ... }, "portrait-02": { ... },
  "team-01":     { ... }, "team-02":     { ... },
  "album-01":    { ... }, // album-01..03
  "film-poster": { ... }, "film-mp4": { src: "<remote sample mp4>", alt: "" },
};
```
- Every `alt` is descriptive (Indian/Kerala wedding context); decorative images use `alt: ""`.
- A header comment states: replace `src` with `/images/<folder>/<file>.jpg` to go local — no component changes.
- Media keys mirror the brief's requested filenames (`wedding-hero`, `wedding-01..06`, `couple-01..`, `ceremony-01..`, `details-01..`, `portrait-01..`, `album-01..`, `wedding-film-poster`).

## Visual System
**`globals.css` (Tailwind v4 `@theme`)**
- Colors: `--color-ivory #F5F1E8`, `--color-cream #EDE7DA`, `--color-charcoal #26241F`, `--color-ink #14120E`, `--color-olive #6B6B4E`, `--color-beige #D8CDB8`, `--color-taupe #9B9083`.
- Fonts: `--font-serif: var(--font-cormorant)`, `--font-sans: var(--font-inter)`.
- Remove the default `prefers-color-scheme` dark override and Geist wiring.
- Base: ivory background, charcoal text; a `.theme-dark` utility flips section palette to ink/ivory for cinematic contrast.
- Global `:focus-visible` ring; `::-webkit-scrollbar` restraint optional.

**Layout** (`src/app/layout.tsx`): Cormorant Garamond + Inter via `next/font/google` (variable, `subsets: ["latin"]`, CSS vars), `metadataBase`, title template, description, Open Graph/Twitter (OG image = absolute remote hero URL with width/height), `LocalBusiness` JSON-LD `<script type="application/ld+json">`, skip-to-content link, `<Nav/>`, `{children}`, `<Footer/>`. Keep `LayoutProps<"/">`.

No fabricated awards/publications/celebrity clients/certifications.

## Home Page Section Order & Motion
| # | Section | Content (short) | Motion / memorable moment |
|---|---|---|---|
| — | Nav | VOW & FRAME / Work Services About Contact / Inquire | Over-hero → fixed subtle bar on scroll; mobile animated menu. **Moment 1 (brand)** |
| 1 | Hero | name + "WEDDING PHOTOGRAPHY + FILMS" + "Kochi · Kerala · Worldwide" + "View Stories ↘" | Load: near-black → image reveal → logo fade → masked type → slow image scale → nav last. Scroll: image scale + type shift. |
| 2 | Selected Stories | "Selected Stories" + asymmetric layout; feature ANANYA & ARJUN (Kumarakom·Kerala·Wedding), MEERA & ADAM (Fort Kochi), NISHA & ROHAN (Bengaluru), DIYA & AKASH (Goa) | Full-bleed/varying sizes, some edge-to-edge, overlap type; image reveal masks + hover zoom. **Moment 2** |
| 3 | Featured Story | "ANANYA + ARJUN" + 3-line quote; 4–5 photos | Sticky image, text/metadata swap on scroll, light↔dark bg transition. **Moment 3** |
| 4 | Image Sequence | minimal/no copy | GSAP ScrollTrigger pinned: image expands box→fullscreen, type fades, next photo enters. **Moment 4** |
| 5 | Wedding Film | "Some moments are better remembered in motion." | Poster + minimal play button; hover expands button + poster scales; click → `<dialog>` video. **Moment 5** |
| 6 | Highlight Films | "Wedding Films" + 3 items (Ananya+Arjun/Kumarakom, Diya+Akash/Goa, Meera+Adam/Fort Kochi) | Large thumbnails, minimal metadata, no cards; open same modal. |
| 7 | Philosophy | "WE DON'T JUST PHOTOGRAPH WEDDINGS." / "WE PHOTOGRAPH HOW THEY FELT." + one line | Large type over/beside photo with parallax. **Moment 6** |
| 8 | Services | "What we create" editorial list (5 rows, one-line each) | Desktop cursor-follow preview image + type/background shift; mobile tap reveals. **Moment 7** |
| 9 | Albums | "The story doesn't end on a screen." + album-01..03 + one line | Dark section, editorial album photography. |
| 10 | About | "Two cameras. One obsession." + short copy + one team photo + "Based in Kerala / Available worldwide" | Parallax image; team portraits (Arjun/Maya) as editorial portraits. |
| 11 | Testimonials | 2 oversized quotes (Ananya & Arjun; Diya & Akash) | Fade + subtle image background. |
| 12 | Visual Journal | "From the frame" + 6–8 varied-proportion images + "@vowandframe ↗" | Variety of sizes, subtle hover, generous spacing. |
| 13 | Contact | "Let's make something worth remembering." + "Tell us a little about your day." + form | Form submit builds `mailto:hello@vowandframe.in` (subject/body); note: sending an enquiry does not confirm a booking. |
| 14 | Final CTA | "YOUR STORY STARTS HERE." + "Inquire ↗" | Full-screen photo with slow scroll parallax. |
| 15 | Footer | name, tagline, location, email, phone, links, Instagram, © | Minimal editorial. |

Target **6–8 memorable moments** total (labeled above).

**`/work` page:** short title ("Work" / "Stories"), full editorial gallery of all stories (larger set than home), CTA to contact, shared Nav/Footer. Own `metadata`.

## Motion Architecture
- **Framer Motion:** load/entrance sequence, masked/character text reveals, fades, hover, cursor-follow preview, modal transitions, nav transform.
- **GSAP + ScrollTrigger (`@gsap/react` `useGSAP`):** pinned image-expansion sequence, featured-story sticky steps, final-CTA parallax, horizontal movement where it clearly helps.
- Heavy GSAP sections loaded via `next/dynamic({ ssr: false })` so animation JS is not in the initial bundle.
- **Reduced motion:** `useReducedMotion()` + `gsap.matchMedia("(prefers-reduced-motion: reduce)")` disable pinning, parallax, scaling, marquees, and cursor effects; sections fall back to static stacked layouts.
- **Mobile:** simplify/gate complex cursor + pinned effects (touch/tap), keep large portrait imagery, retain strong type, keep videos performant.

## Accessibility
Semantic landmarks (`header/nav/main/section/footer`), single `<h1>` per page, skip link, keyboard-operable nav/menu/modal, visible focus states, descriptive `alt` (decorative `alt=""`), native `<dialog>` modal (Escape + focus management, `aria-modal`), labeled form fields, sufficient contrast, `prefers-reduced-motion` respected.

## Performance
- `images.unoptimized` → no responsive srcset; mitigate with pre-sized remote URLs (~1920 hero, ~1200 others) + `loading="lazy"` (hero `priority`) + `sizes` hints.
- Reserve aspect-ratio containers (`fill` inside sized boxes) to prevent CLS.
- Video: poster first; mount `<video preload="metadata" controls>` only when the modal opens.
- Animate transform/opacity only; keep the JS bundle lean (dynamic-import GSAP sections).

## SEO
- Home title: `Vow & Frame | Wedding Photography & Films in Kerala`; description: `Vow & Frame creates cinematic wedding photography, wedding films and handcrafted albums in Kerala and across India.`
- Per-route metadata for `/work`; Open Graph + Twitter; `metadataBase`; `LocalBusiness` JSON-LD with `address`, `telephone`, `email`, `sameAs`, `openingHours`; `sitemap.ts` + `robots.ts` (static-export safe).

## Ordered Task List
1. Add deps (`framer-motion gsap @gsap/react lucide-react`).
2. Migrate to `src/` (move `app/` → `src/app`, add `src/components`, `src/data`, `src/lib`); update `tsconfig` paths; remove default boilerplate/svgs.
3. Configure `next.config.ts` (export + unoptimized + trailingSlash).
4. Build `globals.css` tokens + base styles; wire fonts in `layout.tsx`.
5. Author `src/data/site.ts` + `src/data/media.ts` (all content + remote assets + alts).
6. Build primitives (reveal, parallax-image, section-label, video-modal, reduced-motion hook).
7. Build `Nav` + `Footer`.
8. Build `Hero` (load + scroll sequence).
9. Build home sections in table order, adding GSAP moments (sequence, featured story, CTA) and the services cursor-follow.
10. Build `/work` gallery + metadata.
11. Add SEO: metadata, JSON-LD, sitemap, robots.
12. Accessibility + reduced-motion + mobile pass.
13. Validate build.

## Validation
- `pnpm exec tsc --noEmit` — no type errors.
- `pnpm exec eslint` — clean.
- `pnpm build` — succeeds and emits `/out` with `out/index.html`, `out/work/index.html`, `out/404.html`.
- Serve `/out` statically (e.g. `npx serve out`) and verify: every anchor/nav/link works offline, form opens `mailto:`, video modal plays, no console errors.
- Manual: OS "reduce motion" simplifies all effects; mobile viewport preserves imagery/type and converts hover→tap; keyboard-only walkthrough (skip link, nav, modal, form); Lighthouse pass for LCP/CLS.

## Risks / Notes
- **Remote image dependency:** hotlinked URLs can change/rate-limit; `media.ts` is the single swap point to local assets. Use stable Unsplash/Pexels direct photo URLs (their licenses permit free use) — do not use the deprecated `source.unsplash.com`.
- **No responsive srcset** under `unoptimized`; mitigated via sized URLs. A custom image loader (e.g. Unsplash params) is a documented future optimization if a real CDN is adopted.
- **Pinned ScrollTrigger on mobile** can feel janky — gate behind matchMedia and simplify.
- **GSAP under Turbopack/build:** keep client-only (`ssr:false`), clean up via `useGSAP`, verify export build.
- Keep `AGENTS.md` block intact; re-read `node_modules/next/dist/docs/` before coding against Next 16 APIs.
