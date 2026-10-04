# Vow & Frame — Section Redesign (Masonry + Whitespace Rebalance)

## Goal
Redesign every home-page section **except the hero** to be more visually cohesive and appealing, convert the randomly-offset image sections to true masonry/waterfall layouts, and reduce excessive whitespace to a consistent rhythm — without changing the hero, the content model, or the palette.

## Resolved decisions
1. **Masonry scope:** Selected Stories, Visual Journal, and `/work` "More frames" become true CSS multi-column masonry. Albums, About portraits, and testimonial backgrounds stay visually as they are (see Out of scope).
2. **Whitespace:** "Balanced trim" — standardize section padding, header gaps, grid gaps, and remove extreme offsets.
3. **Visual treatments included:** unified `SectionHeader` primitive + masonry tile captions/hover. Other proposed treatments (testimonial split, albums varied strip, services list polish, grain texture/dividers) are **out of scope**.

## Hard constraints
- **Hero (`src/components/hero.tsx`) must not change** — byte-identical.
- Do not add new dependencies. Masonry uses CSS multi-column, not a JS library.
- Do not invent content. Captions only where metadata already exists (`stories[].couple/location/detail`). Journal / "More frames" tiles get hover treatment only, no fabricated captions.
- Keep the motion architecture: GSAP sections remain `next/dynamic({ ssr: false })` via `src/components/deferred.tsx`; verify GSAP stays out of the initial chunks after the redesign.
- Preserve reduced-motion handling (`usePrefersReducedMotion`, `gsap.matchMedia("(prefers-reduced-motion: reduce)")`), a11y (single `h1` per page, focus states, descriptive/empty `alt`), and static export.

## Whitespace rhythm (apply consistently)
| Token | New value | Replaces |
|---|---|---|
| Section padding | `px-5 sm:px-8 lg:px-12 py-20 lg:py-28` | `py-24 lg:py-32`, `py-24 lg:py-36` |
| Header → content | `mt-10 lg:mt-14` | `mt-14`, `mt-16` |
| Grid gap | `gap-4 lg:gap-6` | `gap-5 lg:gap-8`, `gap-5 lg:gap-6` |
| Large block separator | `mt-14 lg:mt-20` | `mt-24`, `mt-28 lg:mt-40` |
| Work story rows | `space-y-16 lg:space-y-24` | `space-y-24 lg:space-y-36` |
| Featured beats | `lg:min-h-[72vh]` | `lg:min-h-[80vh]` |

Hero and the `final-cta` full-screen section keep their intentional full-height spacing.

## New primitive 1 — SectionHeader
Create `src/components/primitives/section-header.tsx` (client, uses `Reveal` internally so every section animates identically).

API:
```ts
type SectionHeaderProps = {
  index?: string;                 // "01".."13", "—"
  label: string;                  // eyebrow text
  title: string;                  // serif display line
  action?: { label: string; href: string }; // right-aligned underline link
  as?: "h1" | "h2";               // default "h2"; /work uses "h1"
  size?: "lg" | "md";             // display clamp; default "lg"
  className?: string;
};
```
Markup: `flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between`; left = `SectionLabel` + heading (`font-serif leading-[0.95~0.98]`, clamp per `size`); right = optional link (`eyebrow` + `↗`, underline-on-hover, `self-start sm:self-auto`). No new copy.

Migrate these sections to use it (each keeps its existing label/index/title):
- `selected-stories.tsx` (`01`, Portfolio, "Selected Stories", action → `/work/`)
- `featured-story.tsx` (`02`, Featured Story, `featuredStory.couple`)
- `film-section.tsx` (`04`, Wedding Film, "Some moments are better remembered in motion.")
- `highlight-films.tsx` (`05`, Wedding Films, "Highlight Films")
- `philosophy.tsx` (`06`, Philosophy, headline stays as `MaskText` — use header for label + action area only, keep the two-line masked headline)
- `services-list.tsx` (`07`, Services, "What we create")
- `albums.tsx` (`08`, Albums, `albums.heading`)
- `about.tsx` (`09`, About, `about.heading`)
- `visual-journal.tsx` (`10`, Journal, `journal.heading`, action → Instagram)
- `contact-form.tsx` (`11`, Contact, `contact.heading`)
- `work-gallery.tsx` (`as="h1"`, Portfolio, "Work", no action)

`image-sequence.tsx` and `testimonials.tsx` get no header (pure visual / quotes are the content).

## New primitive 2 — Masonry
Create `src/components/primitives/masonry.tsx`.

```ts
type MasonryItem = {
  id: string;
  imageKey: MediaKey;
  href?: string;                       // wraps tile in next/link when set
  caption?: { title: string; meta: string }; // only when content exists
  aspectClass?: string;                // optional override
};
type MasonryProps = {
  items: MasonryItem[];
  columns?: "2" | "3";                 // default "3"
  sizes?: string;
  priorityFirst?: boolean;
  className?: string;
};
```
Implementation rules:
- Container: `columns-1 sm:columns-2` plus `lg:columns-3` when `columns === "3"`; `gap-4 lg:gap-6`. (CSS multi-column, `column-gap` via `gap-*` is not reliable — use `[column-gap:1rem] lg:[column-gap:1.5rem]` or inline `columnGap`.) **Use explicit `column-gap`**, not `gap`.
- Each item: `<div className="mb-4 lg:mb-6 break-inside-avoid">` wrapping `Reveal`.
- Aspect rhythm (repeating, index-based): `["aspect-[4/5]", "aspect-[3/4]", "aspect-[4/3]", "aspect-square"]`; allow per-item override.
- Tile: `group relative overflow-hidden bg-beige/40 block` + `next/image fill sizes={sizes}` + slow zoom `transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105`.
- Caption (only if `caption`): bottom gradient `from-ink/70` overlay with real text; desktop reveal pattern `opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0`, but **always visible on touch/small screens and via `group-focus-within`** for keyboard. Text is real DOM (not decorative) for a11y.
- Keyboard: when `href` is set, tile is a `Link`; focus ring from global `:focus-visible`; `group-focus-within` shows caption.
- Reduced motion: rely on the global reduced-motion CSS (transitions neutralized) and `Reveal`'s `usePrefersReducedMotion`; no JS needed.

## Per-section changes

### `selected-stories.tsx` (masonry + captions)
- Replace the 12-col offset grid with `Masonry columns="2"` using the 4 `stories`.
  - Map each story to `{ id: slug, imageKey, href: "/work/", caption: { title: couple, meta: `${location} · ${detail}` } }`.
  - Aspect rhythm biased to portrait: `["aspect-[4/5]","aspect-[3/4]","aspect-[3/4]","aspect-square"]`.
  - Keep first tile `priority` (it is the visual anchor); `sizes="(max-width: 640px) 100vw, 50vw"`.
- Header via `SectionHeader` (index `01`, action "View all work").
- Remove the removed `StoryImage`/`StoryMeta` helpers if no longer used, or keep `StoryMeta` inside the caption map. No change to `stories` data.

### `visual-journal.tsx` (masonry)
- Delete the `LAYOUT` array. Replace grid with `Masonry columns="3"` over `journal.imageKeys`.
  - Items: `{ id: `${key}-${i}`, imageKey: key }` — **no caption** (no metadata in data model).
  - `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`.
- Header via `SectionHeader` (index `10`, action `journal.handle` → `business.instagramUrl`).
- Section padding → new rhythm.

### `work-gallery.tsx` (header + More frames masonry)
- Page header: `SectionHeader as="h1"` (Portfolio / "Work"), keep intro paragraph; trim `pt-32 lg:pt-44` → `pt-28 lg:pt-36`, `pb-16 lg:pb-24` → `pb-12 lg:pb-16`.
- Story rows: keep the alternating editorial layout (deliberate, not random); only trim `space-y-24 lg:space-y-36` → `space-y-16 lg:space-y-24` and `mt-28 lg:mt-40` → `mt-14 lg:mt-20`.
- "More frames": replace the 12-col grid with `Masonry columns="3"` over `MORE_FRAMES` (`{ id, imageKey }`, no captions). `SectionLabel "—"` stays as the block label (not the page header).
- Bottom CTA: `mt-24` → `mt-14 lg:mt-20`.

### `featured-story.tsx`
- No layout change (sticky steps + GSAP preserved). Apply header via `SectionHeader` (index `02`, `featuredStory.couple`, location as small line below — keep existing location markup), section padding → new rhythm, header→content `mt-10 lg:mt-14`, beat `lg:min-h-[72vh]`.
- Do not alter the `data-beat` hooks, tone switching, or the lazy-GSAP effect.

### `film-section.tsx`, `highlight-films.tsx`, `philosophy.tsx`, `services-list.tsx`, `albums.tsx`, `about.tsx`, `contact-form.tsx`
- Swap hand-rolled headers for `SectionHeader` (keep indices/labels/titles).
- Apply the whitespace rhythm (padding, header gap, grid gaps). No other visual treatment (declined).
- `philosophy.tsx`: keep `MaskText` two-line headline; place `SectionLabel`/header block above it; trim `py-24 lg:py-36` → `py-20 lg:py-28`.
- `about.tsx`: trim `py-24 lg:py-36` → `py-20 lg:py-28`; `mesh` gaps `gap-14 lg:gap-16` → `gap-10 lg:gap-14`.
- `services-list.tsx`: only header + spacing (`py-8` rows, `mt-14` → `mt-10 lg:mt-14`).

### `testimonials.tsx`
- Whitespace only: section padding → `py-20 lg:py-28`; between-quote spacing `mt-24 lg:mt-32` → `mt-14 lg:mt-24`; figure padding unchanged. (Split redesign declined.)

### `footer.tsx`
- Trim vertical padding only: `py-20 lg:py-28` → `py-16 lg:py-20`; `mt-16` → `mt-12`. No structural change.

### `image-sequence.tsx`, `final-cta.tsx`
- No structural change. Do not touch `image-sequence` (full-bleed pinned moment). `final-cta` keeps full height.

## Out of scope (explicitly declined)
- Testimonials image+quote split redesign.
- Albums varied-height strip / caption frame.
- Services list polish beyond whitespace + header.
- Film-grain texture and hairline section dividers.
- Hero (any change).
- Content/data changes (`src/data/*` untouched except no changes needed).
- New dependencies.

## Risks / notes
- **CSS columns reading order** is column-major; DOM/reading order is preserved but visual order differs. Accepted for a gallery. Mention in a short code comment.
- **`gap` does not set column gap in CSS multi-column** — must use `column-gap` explicitly, else columns touch.
- **`break-inside-avoid`** must be on the direct column child (the `Reveal` wrapper or an outer div); applying inside the tile is not enough.
- **`next/image fill`** requires a positioned parent; the aspect-ratio wrapper provides it. Keep aspect classes so CLS stays zero under `images.unoptimized`.
- **Reveal inside columns**: transform-only, no layout effect. Keep `data-reveal` (noscript override still applies).
- **Deferred GSAP sections** are edited but must remain deferred; re-run the initial-chunk check after build.

## Ordered task list
1. Create `src/components/primitives/section-header.tsx`.
2. Create `src/components/primitives/masonry.tsx`.
3. Convert `selected-stories.tsx` to masonry + `SectionHeader` + whitespace.
4. Convert `visual-journal.tsx` to masonry (`LAYOUT` removed) + `SectionHeader` + whitespace.
5. Update `work-gallery.tsx`: `SectionHeader as="h1"`, More-frames masonry, whitespace.
6. Migrate remaining headers to `SectionHeader` and apply whitespace: `featured-story`, `film-section`, `highlight-films`, `philosophy`, `services-list`, `albums`, `about`, `contact-form`.
7. Whitespace-only pass: `testimonials.tsx`, `footer.tsx`; leave `image-sequence.tsx`, `final-cta.tsx`, `hero.tsx` untouched.
8. Verify no `stories`/`services`/`journal` data changes are required; leave `src/data/*` as-is.

## Validation
- `pnpm exec eslint .` → clean.
- `pnpm exec tsc --noEmit` → clean.
- `pnpm build` → succeeds; `/out` has `index.html`, `work/index.html`, `404.html`, `sitemap.xml`, `robots.txt`.
- Serve `/out`; confirm:
  - Selected Stories, Journal, and More frames render as true waterfalls at 360 / 768 / 1280 widths (no overlapping, no column gap, no CLS).
  - Captions appear on hover and on keyboard focus; always visible on touch.
  - Hero renders identically to before.
  - Reduced-motion OS setting leaves content visible/static.
  - Re-check that no chunk referenced by `out/index.html` contains `ScrollTrigger` (GSAP still deferred).
- `git diff --stat` confirms `src/components/hero.tsx` is unchanged.
