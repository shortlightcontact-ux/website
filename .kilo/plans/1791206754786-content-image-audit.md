# Content & Image Audit — Shortlight Weddings

Goal: make every section's tagline/description/alt text match the image actually shown, and ensure all album copy states albums are **laser printed** (never handcrafted/bound/foil). Also remove all "Vow & Frame" remnants.

Scope note: this is a content/data audit. No source edits are included here; an implementation-capable agent must apply them. Remote Unsplash images cannot be opened locally, so their alt text is validated only by URL-duplication and copy review — flag, don't silently rewrite, unless noted.

## Decisions baked in
- Albums = laser-printed. Ban words: handcrafted, hand-bound, linen-bound, cloth-bound, gold foil, "made to be held".
- Canonical brand = Shortlight Weddings. Website host = `https://shortlightweddings.com`.
- The home **Albums section is removed for now** (unmounted like the disabled journal) until real album product photography exists. Its copy is still corrected so re-enabling is safe.
- The **"Albums" service row and contact-form option stay**, with laser-printed wording.
- Reused/placeholder photos: **correct the alt text now to match the photo, and replace the asset later.** Do not silently assert content the photo does not show.
- Couple-name/location conflicts (C5/C7/C8): **use neutral, non-naming copy** ("the couple", "a clifftop in Kerala") and remove unverified names/locations. Do not invent facts.

## Ordered task list (execute top to bottom)
1. Remove the Albums section: comment import + `<Albums />` in `src/app/page.tsx` (C1).
2. Brand remnants: `work/page.tsx:8`, `media.ts:367`, `site.ts:217`, `robots.ts:11` (A).
3. Laser-print wording: `site.ts:90,211,240`; album alts `media.ts:170,174,178` (B).
4. Alt/copy fixes for the images still displayed: selected (C3), film poster (C4), featured (C5), portfolio (C6), highlight films (C7).
5. Resolve naming/location consistency: "Halwin & Agnes" conflicts (C8) and poster couple names (C7).
6. Finish `frame-01..12` verification (D). Runs `npm run lint` + `npm run build` after.

## A. Brand remnants (must fix)
- [ ] `src/app/work/page.tsx:8` — "…by Vow & Frame…" → "…by Shortlight Weddings…".
- [ ] `src/data/media.ts:367` — `og-image` alt "Vow & Frame — …" → "Shortlight Weddings — wedding photography and films in Kerala".
- [ ] `src/data/site.ts:217` — `journal.handle "@vowandframe"` → remove or set to the real handle (`@shortlight_weddings`, matching `business.instagram`). Journal is currently disabled on home; still fix.
- [ ] `src/app/robots.ts:11` — sitemap `https://vowandframe.in/sitemap.xml` → `https://shortlightweddings.com/sitemap.xml`.

## B. Laser-print copy corrections (must fix)
- [ ] `src/data/site.ts:90` — Albums service line "Handcrafted, linen-bound books designed to be held, not streamed." → e.g. "Laser-printed albums, designed to be held, not streamed."
- [ ] `src/data/site.ts:211` — `albums.line` "Each wedding is designed into a handcrafted album — printed, bound, and made to be passed around a table." → e.g. "Each wedding is designed into a laser-printed album made to be passed around a table."
- [ ] `src/data/site.ts:240` — `seo.description` "…wedding films and handcrafted albums in Kerala…" → "…wedding films and laser-printed albums in Kerala…". (Also surfaces via `final-cta.tsx`.)
- [ ] `src/data/media.ts:170` — `album-01` alt "A linen-bound wedding album…" → laser-printed wording (and see C1: image isn't an album).
- [ ] `src/data/media.ts:174` — `album-02` alt "…handcrafted wedding album" → laser-printed wording.
- [ ] `src/data/media.ts:178` — `album-03` alt "stack of cloth-bound albums with gold foil lettering" → laser-printed wording.

## C. Text ↔ image mismatches
### C1. Albums section shows wedding photos, not albums — REMOVE SECTION (decided)
`albums.imageKeys = album-shot-01/02/03` resolve to wedding photos, not album/product shots:
- `album-shot-01` `/album/DSC05509.webp` = bride w/ white rose bouquet by window.
- `album-shot-02` `/album/IMG_8132.JPG.webp` = couple spinning on clifftop.
- `album-shot-03` `/album/IMG_7976.jpg` = bride on staircase.
- [ ] Unmount the section: comment out the import (`src/app/page.tsx:1`) and `<Albums />` (`src/app/page.tsx:25`), mirroring the disabled `<VisualJournal />` at line 27. Leave `src/components/albums.tsx` in place.
- [ ] Correct the deferred copy anyway so re-enabling later is safe: `site.ts:211` `albums.line` → laser-printed wording (see B).
- [ ] `album-shot-01/02/03` become unused media keys (harmless); leave them, or remove once the section is confirmed gone.
- Service preview key `album-01` (`media.ts:168`) is a separate surface (Services list + contact form) and currently reuses the hero Unsplash URL — not an album. See open question 1.

### C2. Duplicated Unsplash placeholders make alts false
- `album-01.src` == `hero.src` == `details-02.src` == `og-image` (`photo-1519741497674`). One image cannot be an album, a wedding bands still-life, a hero, and an og-image. Alts for `details-02` (`media.ts:146`) and `album-01` (`media.ts:170`) contradict the hero.
- `album-02.src` == `couple-01.src` (`photo-1522673607200`); `album-03.src` == `couple-03.src` (`photo-1537633552985`).
- `wedding-01.src` == `details-03.src` (`photo-1511285560929`): "exchange garlands" vs "bridal bouquet".
- [ ] Replace the reused keys with distinct imagery, or accept the photo and correct alt text. Recommended: correct alt text now, log asset replacement.

### C3. Selected stories (home)
`selected-01..04` alts describe different scenes than the photos:
- `selected-01` (`media.ts:222`) claims garland exchange; actual = black-tux couple by window.
- `selected-02` (`media.ts:226`) claims beach at dusk; actual = terracotta couple on paved promenade.
- `selected-03` (`media.ts:230`) claims red saree + jasmine; actual = white couple on beach.
- `selected-04` (`media.ts:234`) claims groom lifts bride at sunset; actual = floral bride + maroon groom with lace parasol.
- [ ] Rewrite each alt to match the actual photo. Component: `src/components/selected-stories.tsx` (captions currently commented out).

### C4. Film poster alt
- `media.ts:182` `film-poster` alt claims "silhouetted against a golden backwater sunset"; actual `/cta/IMG_8131.jpg` = bright, high-key couple in white. Component: `src/components/film-section.tsx`.
- [ ] Rewrite alt to match.

### C5. Featured story: couple name + beats vs images
- Data couple is "Halwin & Agnes" (`site.ts:136`) but `featured-01..05` and `sequence-01/02` alts name "Ananya and Arjun" (`media.ts:238–262`).
- Beat lines vs images (`site.ts:138–164`): "houseboat" beat vs beach image; "pandal" beat vs beach; "last light" beat vs flat overcast.
- `sequence` caption "The moment the room disappears" (`image-sequence.tsx`) vs outdoor clifftop images.
- [ ] Use neutral, non-naming copy: replace `featuredStory.couple`/`location` (or drop the explicit name), rewrite `featured-01..05`/`sequence-01/02` alts to describe the actual photos, and rewrite beats + sequence caption to match (beach, overcast, clifftop — no houseboat/pandal if not shown). Components: `featured-story.tsx`, `image-sequence.tsx`, data `site.ts:135–165`.

### C6. Work gallery captions vs images
Story `detail`/`location` vs `imageKey1` photo must be reconciled:
- Ashwin & Nancy "Classic Wedding" (`portfolio-01`/`portfolio-05`): `portfolio-03`, `portfolio-05`, `portfolio-06`, `portfolio-07` alts are copy-pasted identical ("bride in an embroidered floral gown leaning on a white stair railing…") — only valid for `IMG_7962`; `portfolio-07` points at the same `IMG_7962`.
- `portfolio-01` alt (`media.ts:266`) and `portfolio-05` alt are wrong for their files.
- Halwin & Agnes "Vows by the Sea" → image = resort steps; Jijo & Jinu "A City Wedding" → indoor stairway.
- [ ] Fix `portfolio-*` alts individually; reconcile story captions with images. Component: `src/components/work-gallery.tsx`, data `site.ts:100–133`.

### C7. Highlight films vs titles, and playback broken
- Poster alts (`media.ts:194,198,202`) name couples (Ananya&Arjun, Diya&Akash, Meera&Adam) that don't match displayed film titles (Halwin&Agnes, Akshay&Merin, Ashwin&Nancy) at `site.ts:167–186`.
- All three films use `videoKey "film-mp4"` = Cloudinary demo `dog.mp4`; play buttons not wired. Components: `highlight-films.tsx`, `film-section.tsx`.
- [ ] Use neutral, non-naming copy: rewrite poster alts to describe the actual frames (no invented names), align `films[].title`/`location` to the displayed films or go to neutral titles. Replace placeholder `dog.mp4` and wire play, or remove the play affordance. Do not ship a demo video.

### C8. Couple "Halwin & Agnes" location conflicts
FeaturedStory = Kumarakom (`site.ts:137`), stories = Bengaluru (`site.ts:120`), films = Varkala (`site.ts:170`).
- [ ] Remove unverified locations; use neutral descriptions, or make explicit these are different events if the user confirms.

## D. "More frames" spot-check (incomplete)
`public/work/frames/` alts partially validated (`DSC00079`, `DSC05298`, `DSC06766`, `DSC08571`). Remaining `frame-*` alts in `media.ts` still unverified against their files.
- [ ] Finish verifying `frame-01..12` alts against images; fix mismatches.

## Resolved decisions
1. Albums section removed for now (unmount `<Albums />`), copy still corrected.
2. Keep the "Albums" service row (`site.ts:89–92`) and contact-form option (`site.ts:233`); fix wording to laser-printed and correct the `album-01` alt. Swap `album-01` to a real laser-printed album photo later.
3. Reused/placeholder Unsplash keys: correct alt text now to match the actual photo; replace with distinct assets later.
4. Unknown couple names/locations: use neutral, non-naming copy and remove unverified facts.

## Deferred (asset tasks, not blocking)
- Real laser-printed album/product photography (for `album-01`, and to re-enable the Albums section with `album-shot-01/02/03`).
- Distinct replacement images for the reused Unsplash placeholders (`photo-1519741497674`, `photo-1522673607200`, `photo-1537633552985`, `photo-1511285560929`).
- Real highlight-film videos (replace `dog.mp4`) and verified `frame-01..12` alt review against local files.

## Round 2 — section copy vs actual images (2026-10-05)
Verified after the first implementation pass. New fixes:

### R1. featured-story beats don't match (site.ts `featuredStory.beats`)
Images: `featured-01` bride walking on sand (groom seated behind); `featured-02` close-up of clasped hands, ring + bangles, sea behind; `featured-03` couple embracing on the sand, overcast; `featured-04` couple on a paved clifftop terrace, arm raised, ocean; `featured-05` couple seated on sand, soft overcast light.
- [ ] `beat 2` "Jasmine, gold, and borrowed calm." → match the hands/ring frame, e.g. "Two hands held, a ring catching the light."
- [ ] `beat 3` "Family gathered close as the vows were spoken." → match the embrace, e.g. "They held each other as the sea kept time."
- [ ] `beat 4` "After the rituals, a walk to the water — no one else." → match the clifftop terrace, e.g. "Alone on the terrace, the ocean at their backs."
- [ ] Tone: all five photos are bright/airy; beats 3 and 4 are `tone: "dark"`, flipping the section to a dark background behind bright images. Set all beats to `tone: "light"` unless a genuinely dark image is used.

### R2. featured-* alts wrong vs images (media.ts)
- [ ] `featured-02` alt "Jasmine, gold and morning calm…" → "Two hands clasped, a ring and bangles against the sea".
- [ ] `featured-03` alt "Family gathered close during the wedding rituals" → "A couple holding each other on the sand beneath an overcast sky".
- [ ] `featured-04` alt "A couple walking alone together after the rituals" → "A couple on a clifftop terrace, hands raised, above the ocean".
- [ ] `featured-05` alt "A couple together in soft, even light" → "A couple seated together on the sand beneath a red cliff".

### R3. highlight-films subtitle (highlight-films.tsx)
- [ ] "Three stories, three coastlines, one obsession with the way a day actually sounded." → locations are now all Kerala; "three coastlines" is false. E.g. "Three stories, three celebrations, and the moments that made each one."
- [ ] Play affordances were removed (no real videos); the section shows stills only. Either supply real films/wire playback, or accept posters and ensure wording doesn't promise playback.

### R4. philosophy line (site.ts `philosophy.line`)
- [ ] Image is a bride with her mother in a bright hall; the line ("the glance before the garland / the uncle crying into his coffee / before the doors open") doesn't depict it. Rewrite toward the pre-ceremony intimacy, e.g. "The look a mother gives her daughter before the doors open — and the quiet just after." Headline is fine.

### R5. film-section — matches
- No change. Poster (`film-16x9.jpg`) is a bride in lace + groom in black tie by an arched window; title/subtitle fit. (Poster is a still; no playback.)

## Validation
- After edits: `npm run lint` and `npm run build` (the only scripts in `package.json`; build runs Next's type check). Confirm the static export still succeeds.
- Grep for banned terms returns zero: `handcrafted|hand-bound|linen-bound|cloth-bound|gold foil|Vow & Frame|vowandframe`.
- Confirm `robots.ts` sitemap host and `og-image` alt use shortlightweddings.com / "Shortlight Weddings".
- Spot-render home and /work/ and check each section heading/alt against the visible image.

## Favicon — Shortlight Weddings
Current state: only `src/app/favicon.ico` exists; no `icon.svg`, apple-touch-icon, manifest, or `icons` metadata. Static export, so icon files in `src/app/` are emitted at build time and file conventions auto-inject the `<link>` tags.

### Decisions
- Mark: an **"S" monogram with a 4-point light spark** (nod to "short-light").
- Colors: solid **ink** tile `#14120e`, **ivory** `#f5f1e8` letter, **beige** `#d8cdb8` spark.
- Glyph: the real **Cormorant Garamond** "S" (weight **600**) outlined to an SVG path — SVG favicons don't load page fonts, so text elements won't render reliably. Extract via a one-off script, then embed the path.
- Scope: standard set **including manifest** (not full PWA/service worker).
- Generation: a committed Node script using **sharp** + **png-to-ico**.

### Deliverables / file layout
- `src/app/icon.svg` — master mark, `viewBox="0 0 64 64"`, rounded tile (`rx=14`). Used as the modern SVG favicon.
- `src/app/favicon.ico` — **replace** the existing file; multi-res 16/24/32/48 built from `icon.svg`.
- `src/app/apple-icon.png` — 180×180, **full-bleed square, no transparency** (iOS composits black otherwise). Built from a square master.
- `public/icon-192.png`, `public/icon-512.png` — standard PWA icons (full-bleed square).
- `public/icon-512-maskable.png` — full-bleed square with the mark scaled to ~70 % (central safe zone, per Android maskable rules).
- `src/app/manifest.ts` — `MetadataRoute.Manifest` (Next auto-links `/manifest.webmanifest`).
- `scripts/icons/icon-square.svg`, `scripts/icons/icon-maskable.svg` — square/maskable masters (same `d` path, full-bleed `rect`).
- `scripts/extract-monogram.mjs` — one-off: loads Cormorant 600, prints the "S" path.
- `scripts/generate-icons.mjs` — renders all raster assets from the SVGs.

### Geometry / SVG spec (`src/app/icon.svg`)
```
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Shortlight Weddings">
  <rect width="64" height="64" rx="14" fill="#14120e"/>
  <path d="{S_PATH}" fill="#f5f1e8" transform="translate(...) scale(...)"/>
  <!-- 4-point light spark, centred approx (46,18), radius ~7 -->
  <path d="M0,-8 L1.8,-1.8 L8,0 L1.8,1.8 L0,8 L-1.8,1.8 L-8,0 L-1.8,-1.8 Z"
        fill="#d8cdb8" transform="translate(46 18) scale(0.7)"/>
</svg>
```
- `{S_PATH}` and its `translate/scale` come from `extract-monogram.mjs`; target the cap height so the S occupies roughly 32×34 within the 64 box, optically centred.
- Square/maskable masters: same `path`/spark, but `rect` fills the whole viewBox with no `rx`; the maskable master additionally scales the whole mark to ~70 %.

### Ordered task list
1. Add devDependencies: `sharp`, `png-to-ico`, `fontkit`, `@fontsource/cormorant-garamond`.
2. Write `scripts/extract-monogram.mjs`: open `node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff2` with `fontkit`, take the "S" glyph (`glyphForCharacter`), get `path.toSVG()`, and print it plus the scale/translate to fit the 64-box. (Fallback if woff2 parsing is problematic: download the static Cormorant Garamond 600 TTF from the google/fonts repo and use it.)
3. Author the three SVGs (`src/app/icon.svg`, `scripts/icons/icon-square.svg`, `scripts/icons/icon-maskable.svg`) with the extracted path/spark per the spec.
4. Write `scripts/generate-icons.mjs`:
   - 16/24/32/48 PNGs from `icon.svg` → `png-to-ico([...])` → `src/app/favicon.ico`.
   - 180 PNG from `icon-square.svg` → `src/app/apple-icon.png`.
   - 192 + 512 PNGs from `icon-square.svg` → `public/`.
   - 512 PNG from `icon-maskable.svg` → `public/icon-512-maskable.png`.
   - Use `sharp(buffer).resize(size).png()`; log each output.
5. Add `src/app/manifest.ts`:
   - `name` "Shortlight Weddings", `short_name` "Shortlight", `start_url` "/", `display` "standalone", `background_color` "#f5f1e8", `theme_color` "#14120e", and `icons` → `/icon-192.png` (192), `/icon-512.png` (512), `/icon-512-maskable.png` (512, `purpose: "maskable"`). Add `export const dynamic = "force-static"`.
6. Run `node scripts/generate-icons.mjs` once; commit the generated binaries so builds don't need the script.
7. Keep the script + SVGs for reproducibility (or move devDeps to optional). `src/app/favicon.ico` is overwritten in place.

### Validation
- `npm run build`; confirm `/favicon.ico`, `/icon.svg`, `/apple-icon.png`, `/manifest.webmanifest`, `/icon-192.png`, `/icon-512.png`, `/icon-512-maskable.png` are emitted.
- Inspect built HTML `<head>` for the auto-injected `icon`/`apple-touch-icon`/`manifest` links.
- Visual: legible at 16 px and 32 px in a browser tab; intact on iOS "Add to Home Screen" and Android install (maskable not cropped).

### Risks / notes
- SVG favicons ignore external fonts → the path outline is mandatory (already decided).
- Multi-res ICO: `png-to-ico` takes PNG buffers for each frame (16,24,32,48).
- Variable-font instancing: if the only available Cormorant source is a variable TTF, extracting a fixed 600 weight needs instancing — prefer the static `@fontsource` weight file.
- The spark can blur at 16 px; if it muddies, generate the 16/32 ICO frames from a no-spark variant while keeping the spark in the SVG/apple/192/512.

### Out of scope
- PWA service worker / installability, and any photography-based (raster) logo generation.
