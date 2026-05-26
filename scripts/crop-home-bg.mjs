#!/usr/bin/env node
/*
 * Crop N pixels off the bottom of docs/background wide.png and write the
 * result to src/assets/home-bg-wide.png.
 *
 * Iterate by re-running with different values until the framing feels right
 * in the browser. The script prints the new aspect-ratio CSS value to paste
 * into src/pages/index.astro .scene { aspect-ratio: W / H; }.
 *
 * Usage:
 *   node scripts/crop-home-bg.mjs                 # default crop: 80px off bottom
 *   node scripts/crop-home-bg.mjs 120             # crop 120px off bottom
 *   node scripts/crop-home-bg.mjs 80 60           # crop 80 bottom + 60 top
 *   node scripts/crop-home-bg.mjs --reset         # restore from source, no crop
 */

import sharp from 'sharp';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

const SRC = resolve(projectRoot, 'docs', 'background wide.png');
const OUT = resolve(projectRoot, 'src', 'assets', 'home-bg-wide.png');

const args = process.argv.slice(2);
const reset = args.includes('--reset');
const cropBottom = reset ? 0 : Number(args[0] ?? 80);
const cropTop = reset ? 0 : Number(args[1] ?? 0);

if (Number.isNaN(cropBottom) || Number.isNaN(cropTop) || cropBottom < 0 || cropTop < 0) {
  console.error('Usage: node scripts/crop-home-bg.mjs [bottomPx] [topPx]');
  console.error('       node scripts/crop-home-bg.mjs --reset');
  process.exit(1);
}

const meta = await sharp(SRC).metadata();
const newHeight = meta.height - cropBottom - cropTop;

if (newHeight <= 0 || newHeight > meta.height) {
  console.error(`Invalid crop: source is ${meta.width}x${meta.height}, requested height ${newHeight}.`);
  process.exit(1);
}

await sharp(SRC)
  .extract({ left: 0, top: cropTop, width: meta.width, height: newHeight })
  .toFile(OUT);

const ratio = (meta.width / newHeight).toFixed(3);
console.log(`Source:  ${meta.width}x${meta.height} (${SRC})`);
console.log(`Cropped: -${cropBottom}px bottom${cropTop ? `, -${cropTop}px top` : ''}`);
console.log(`Output:  ${meta.width}x${newHeight} (ratio ${ratio})`);
console.log(`Wrote:   ${OUT}`);
console.log('');
console.log(`Paste into src/pages/index.astro .scene { ... }:`);
console.log(`  aspect-ratio: ${meta.width} / ${newHeight};`);
