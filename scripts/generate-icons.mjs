/**
 * Generates the favicon raster set from the master SVG.
 *
 * Source of truth: src/app/icon.svg (rounded ink tile, ivory "S", beige spark).
 * Derived here: a full-bleed square variant (apple + PWA) and a maskable
 * variant (mark scaled into the safe zone), then every raster asset.
 *
 * Run: node scripts/generate-icons.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const { default: pngToIco } = await import("png-to-ico");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const abs = (p) => path.join(root, p);

const rounded = await readFile(abs("src/app/icon.svg"), "utf8");

// Full-bleed square: same art, no rounded corners.
const square = rounded.replace('rx="14"', 'rx="0"');

// Maskable: full-bleed background with the mark scaled to ~72% about the centre
// so Android's mask never crops it.
const rectEnd = square.indexOf("/>", square.indexOf("<rect")) + 2;
const maskable =
  square.slice(0, rectEnd) +
  '\n  <g transform="translate(32 32) scale(0.72) translate(-32 -32)">' +
  square.slice(rectEnd, square.lastIndexOf("</svg>")) +
  "</g>\n</svg>\n";

const render = (svg, size) =>
  sharp(Buffer.from(svg), { density: 384 })
    .resize(size, size, { fit: "cover" })
    .png()
    .toBuffer();

const target = async (svg, size, out) => {
  const buffer = await render(svg, size);
  await writeFile(abs(out), buffer);
  console.log(`  ${out}  ${size}x${size}`);
};

console.log("Generating icons…");

// Multi-resolution favicon.ico (16/24/32/48).
const icoSizes = [16, 24, 32, 48];
const icoPngs = await Promise.all(icoSizes.map((s) => render(rounded, s)));
await writeFile(abs("src/app/favicon.ico"), await pngToIco(icoPngs));
console.log(`  src/app/favicon.ico  ${icoSizes.join("/")}`);

// Apple touch icon — must be full-bleed and opaque.
await target(square, 180, "src/app/apple-icon.png");

// PWA / manifest icons.
await target(square, 192, "public/icon-192.png");
await target(square, 512, "public/icon-512.png");
await target(maskable, 512, "public/icon-512-maskable.png");

console.log("Done.");
