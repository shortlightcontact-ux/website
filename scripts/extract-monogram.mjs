/**
 * One-off: outlines the Cormorant Garamond "S" glyph to an SVG path so the
 * favicon reads identically everywhere (SVG favicons do not load web fonts).
 *
 * Run: node scripts/extract-monogram.mjs
 * It prints the path `d` plus a transform that fits the glyph, centred, into a
 * 64x64 box (cap height ~34, no spark offset applied here).
 */
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const fontkit = require("fontkit");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Prefer woff2; fall back to woff if woff2 decompression is unavailable.
const candidates = [
  "node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff2",
  "node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff",
];

let font;
let used;
for (const rel of candidates) {
  try {
    font = fontkit.openSync(path.join(root, rel));
    used = rel;
    break;
  } catch {
    // try the next candidate
  }
}
if (!font) {
  throw new Error("Could not open a Cormorant Garamond 600 font file.");
}

const codePoint = "S".codePointAt(0);
const glyph =
  (typeof font.glyphForCodePoint === "function" && font.glyphForCodePoint(codePoint)) ||
  (typeof font.glyphForCharacter === "function" && font.glyphForCharacter(codePoint)) ||
  (font.layout && font.layout("S").glyphs[0]);
if (!glyph || !glyph.path) {
  throw new Error("Could not read the 'S' glyph from the font.");
}

const LETTER = {
  moveTo: "M",
  lineTo: "L",
  quadraticCurveTo: "Q",
  bezierCurveTo: "C",
  closePath: "Z",
};

const commands = glyph.path.commands;
const d = commands
  .map(({ command, args }) => `${LETTER[command]}${args.map((n) => round(n)).join(" ")}`)
  .join(" ");

let minX = Infinity;
let minY = Infinity;
let maxX = -Infinity;
let maxY = -Infinity;
for (const { command, args } of commands) {
  if (command === "closePath") continue;
  for (let i = 0; i < args.length; i += 2) {
    minX = Math.min(minX, args[i]);
    maxX = Math.max(maxX, args[i]);
    minY = Math.min(minY, args[i + 1]);
    maxY = Math.max(maxY, args[i + 1]);
  }
}

// Fit into the 64 box: cap height H, optically centred at (cx, cy).
const cx = 30;
const cy = 34;
const H = 34;
const s = H / (maxY - minY);
const finalW = s * (maxX - minX);
const tx = cx - finalW / 2 - s * minX;
const ty = cy + (s * (maxY + minY)) / 2;

function round(n) {
  return Math.round(n * 1000) / 1000;
}

console.log("font:", used);
console.log("raw bbox:", { minX, minY, maxX, maxY });
console.log("transform:", `translate(${round(tx)} ${round(ty)}) scale(${round(s)} ${round(-s)})`);
console.log("d:", d);
