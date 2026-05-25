/*
 * scripts/clean-cutouts.mjs
 *
 * One-time asset preprocessing. The home page cutouts arrived as RGB PNGs
 * with white backgrounds (no alpha channel). This script replaces near-white
 * pixels with transparency so the cutouts can composite cleanly over the
 * dark cove background.
 *
 * Algorithm: threshold by perceptual brightness.
 *   - brightness > 245  -> fully transparent
 *   - brightness 215-245 -> linearly interpolated alpha (soft edge)
 *   - brightness < 215  -> fully opaque
 *
 * Why this works: ChatGPT-style cutouts on white produce a hard white BG
 * with a slight anti-aliased fringe. The soft edge band catches the fringe
 * and matters it to alpha so the product silhouette stays clean.
 *
 * Originals are preserved at src/assets/home-{name}-raw.png the first time
 * this runs (so we don't lose the source on re-runs).
 *
 * Usage: node scripts/clean-cutouts.mjs
 */

import sharp from 'sharp';
import { readFile, writeFile, access, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.resolve(__dirname, '..', 'src', 'assets');
const FILES = ['home-binder', 'home-mic', 'home-bulb'];

// v2: thresholds lowered after v1 left visible white halos on dark cove.
// Need to catch lighter-gray fringe pixels too.
const BRIGHTNESS_FULLY_TRANSPARENT = 232;
const BRIGHTNESS_FULLY_OPAQUE = 188;

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function clean(name) {
  const src = path.join(ASSETS, `${name}.png`);
  const backup = path.join(ASSETS, `${name}-raw.png`);

  // Preserve the original on first run only
  if (!(await fileExists(backup))) {
    await copyFile(src, backup);
    console.log(`  backed up ${name}.png -> ${name}-raw.png`);
  }

  // Read raw RGB and process pixel-by-pixel
  const { data, info } = await sharp(backup)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  if (channels !== 3) {
    throw new Error(`Expected 3 channels (RGB), got ${channels} for ${name}`);
  }

  const out = Buffer.alloc(width * height * 4);
  const span = BRIGHTNESS_FULLY_TRANSPARENT - BRIGHTNESS_FULLY_OPAQUE;

  for (let i = 0; i < width * height; i++) {
    const srcIdx = i * 3;
    const dstIdx = i * 4;
    const r = data[srcIdx];
    const g = data[srcIdx + 1];
    const b = data[srcIdx + 2];

    out[dstIdx] = r;
    out[dstIdx + 1] = g;
    out[dstIdx + 2] = b;

    const brightness = (r + g + b) / 3;
    let alpha;
    if (brightness >= BRIGHTNESS_FULLY_TRANSPARENT) {
      alpha = 0;
    } else if (brightness <= BRIGHTNESS_FULLY_OPAQUE) {
      alpha = 255;
    } else {
      // Soft edge band — linearly fade alpha
      alpha = Math.round(255 * (1 - (brightness - BRIGHTNESS_FULLY_OPAQUE) / span));
    }
    out[dstIdx + 3] = alpha;
  }

  await sharp(out, {
    raw: { width, height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(src);

  console.log(`  ${name}: ${width}x${height} -> alpha extracted`);
}

async function main() {
  console.log('Cleaning cutouts in', ASSETS);
  for (const name of FILES) {
    await clean(name);
  }
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
