# Apple Mobile (iOS / iPadOS) Compatibility Plan

## Goal

Make the Shortlight Weddings static export behave correctly on Apple mobile
devices. Target baseline: **iOS/iPadOS 17 and newer**, **Safari and any iOS
browser** (all iOS browsers use WebKit, so only WebKit matters).

## Scope

- In scope: only issues that affect iPhone/iPad rendering or touch interaction.
- Out of scope: desktop-only bugs and any broken-but-cross-platform features.
  Noted for awareness but **not** to be fixed here:
  - Highlight-film / film-section `<button>`s have no click handler (dead).
  - `VideoModal` is never rendered by any component (dead code).
  - `media["film-mp4"]` points at a remote Cloudinary demo video.
  - `robots.ts` sitemap host (`vowandframe.in`) does not match `business.website`.

## Why most "legacy" concerns do not apply

With a 17+ baseline, `100svh`, `color-mix()`, `dialog`, `:focus-visible`,
`backdrop-filter` in Tailwind utilities, and viewport-fit-free Safari insets are
already supported. The Next.js default `<meta name="viewport"
content="width=device-width, initial-scale=1" />` is present, so responsive
layout is active. Fixes below are the real remaining WebKit/touch issues.

---

## Ordered task list

### 1. Force light color-scheme (fixes dark-mode form controls) — HIGH
On an iPhone in system Dark Mode, Safari renders native form controls
(`input`, `textarea`) and `color-scheme`-dependent UI dark unless the page
declares a scheme. The site is light-only, so declare it explicitly.

- Edit `src/app/layout.tsx`: add a `Viewport` export.
  ```ts
  import type { Metadata, Viewport } from "next";

  export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    colorScheme: "light",
    themeColor: "#f5f1e8",
  };
  ```
- Keep `viewportFit` **unset** (see Open questions) so Safari keeps content
  inside the safe areas automatically.

### 2. Make the highlight-film play affordance visible on touch — HIGH
`src/components/highlight-films.tsx:38` uses
`opacity-0 ... group-hover:opacity-100`. iOS has no hover, so the play icon
never appears on iPhone/iPad.

- Change the span class to be visible by default and hover-revealed only on
  pointer devices:
  `opacity-100 transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100`.
- Apply the same base-visible / `lg:`-hover-reveal pattern to any other
  `opacity-0` + `group-hover` affordance. (Masonry captions in
  `src/components/primitives/masonry.tsx:107` already use base-visible with
  `lg:` hover — correct; leave as is.)

### 3. Harden the mobile menu for iOS — HIGH
`src/components/nav.tsx`:
- The menu (`nav.tsx:95`) is `fixed inset-0 top-16` with no internal scroll; on
  a short viewport (landscape iPhone) the links can clip with no way to reach
  them. Add `overflow-y-auto overscroll-contain` and a bottom pad
  (`pb-10`).
- Background scroll lock (`nav.tsx:23-28`) only sets `document.body.style`.
  On WebKit the page can still rubber-band behind the opaque overlay. Also set
  the same `overflow` on `document.documentElement`, and add `touch-action: none`
  to the open overlay so touch-drag cannot scroll the body.

### 4. Remove iOS double-tap zoom / tap flash on controls — MEDIUM
In `src/app/globals.css` `@layer base`:
- Add `a, button, [role="button"], input, select, textarea { touch-action: manipulation; }`
  to remove the double-tap-zoom delay on tappable controls.
- Verify Tailwind v4 preflight already sets `-webkit-tap-highlight-color:
  transparent`; if the grey tap flash still occurs on device, add it explicitly
  to the same rule.

### 5. Make the date picker popover viewport-safe — MEDIUM
`src/components/primitives/form-controls.tsx:246` opens a `w-[19rem]` (304px)
popover with `absolute left-0 top-full`. It fits current iPhones but overflows
very narrow viewports and can open below the fold.

- Change width to `w-[min(19rem,calc(100vw-2.5rem))]`.
- If, on device, the popover opens off the bottom of the screen, add a
  viewport-aware position (open upward when `space-below < popover height`) or
  cap with `max-h-[70svh] overflow-auto`. Confirm with the validation step.

### 6. Add iOS AutoFill hints to the enquiry form — LOW
`src/components/contact-form.tsx` — add `autoComplete`/`inputMode` so iOS
AutoFill and the correct keyboards appear:
- `name` input: `autoComplete="name"`
- `email` input: `autoComplete="email"`, `inputMode="email"`
- `location` input: `autoComplete="address-level2"`
- keep all controls at `text-base` (16px) — already true, so no focus zoom.

### 7. Prefix the hand-written dialog backdrop blur — LOW
`src/app/globals.css:98-101` uses unprefixed `backdrop-filter`; Safari only
supports it unprefixed from iOS 18. Add `-webkit-backdrop-filter: blur(6px);`
alongside it. (The modal is currently unused, so this is robustness only.)

### 8. Verify and, only if needed, fix these WebKit layout risks — VALIDATE
Do not change pre-emptively; run the validation steps first.

- **Masonry + transforms** (`src/components/primitives/masonry.tsx:47-49`,
  used by `work-gallery.tsx`/`visual-journal.tsx`): CSS multi-column with
  Framer `transform` children is a known WebKit source of clipping/misalignment.
  If tiles clip or overlap on iPhone/iPad, disable the `y` transform for Masonry
  tiles on small screens (render `MasonryTile` without `Reveal`'s translate) or
  switch the grid to CSS grid rows.
- **GSAP pin + `100svh` on iPad** (`src/components/image-sequence.tsx:48`,
  `featured-story.tsx`): pinning runs at `min-width: 768px`. Confirm no jump when
  the Safari toolbar collapses or the device rotates; if it jumps, add
  `ScrollTrigger.addEventListener("refreshInit", ...)` handling / call
  `ScrollTrigger.refresh()` on `orientationchange`.
- **Filename with space/parentheses** `src/data/media.ts:277`
  (`/work/frames/DSC00079.JPG_resized (1).webp`): confirm the image loads on
  iOS; if it 404s, rename to a URL-safe filename and update the `src`.

---

## Validation

Must be run after changes (implementation-capable agent):

1. `pnpm build` — the site is `output: "export"`, so verify the export succeeds
   and `out/` contains `/`, `/work/`, `sitemap.xml`, `robots.txt`.
2. Serve the export and test in Safari Responsive Design Mode at iPhone SE,
   iPhone 15 Pro, iPhone 15 Pro Max, and iPad (portrait + landscape), plus
   **iOS Simulator / real device with system Dark Mode enabled** (task 1).
3. On-device checks:
   - Open the mobile menu in portrait and landscape; confirm all links are
     reachable and the page behind does not scroll.
   - Confirm highlight-film play icons are visible without hovering.
   - Focus each form field; confirm no auto-zoom and correct keyboards/AutoFill.
   - Open the date picker near the bottom of the form; confirm it stays within
     the viewport and is fully reachable.
   - Toggle iOS Settings → Accessibility → Reduce Motion; confirm animations
     stop and content remains visible (existing `usePrefersReducedMotion`
     handling).
   - Scroll the iPad through the pinned image sequence; confirm no jump or blank
     frame.
   - Confirm the masonry tiles render without clipping in Work/Journal.
4. `pnpm lint` — must pass.

## Risks

- Dark-mode fix changes rendered form control colors site-wide; verify no
  contrast regression in light mode.
- `touch-action: manipulation` can change scroll/zoom behavior on tappable
  elements; keep it scoped to interactive controls, not the page.
- Any Masonry fallback alters scroll animation; keep it conditional on actual
  WebKit breakage.

## Open questions

- **Edge-to-edge hero (`viewport-fit=cover`)** is deliberately left out. Adding
  it would require `env(safe-area-inset-*)` padding on the fixed nav, mobile
  menu, and `final-cta` bottom row. Recommended only if the immersive look is
  wanted; not required for correctness.
