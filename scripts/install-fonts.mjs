#!/usr/bin/env node
/*
 * Install OFL fonts into public/fonts/.
 * Idempotent: skips files already present unless --force is passed.
 *
 * Run: pnpm install-fonts  (also: node scripts/install-fonts.mjs)
 *
 * Provenance and rationale: public/fonts/README.md + docs/design-decisions.md §6.
 */

import { mkdir, stat, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FONT_DIR = resolve(__dirname, '..', 'public', 'fonts');

const FORCE = process.argv.includes('--force');
const BUDGET_BYTES = 60 * 1024;

// Stable woff2 from the jsDelivr-hosted Fontsource packages (OFL).
const fonts = [
  {
    name: 'Source Serif 4 Semibold (latin)',
    file: 'SourceSerif4-Subhead-Semibold.woff2',
    url: 'https://cdn.jsdelivr.net/npm/@fontsource/source-serif-4@5/files/source-serif-4-latin-600-normal.woff2',
  },
  {
    name: 'Geist Sans Variable (latin)',
    file: 'GeistVariableVF.woff2',
    url: 'https://cdn.jsdelivr.net/npm/@fontsource-variable/geist@5/files/geist-latin-wght-normal.woff2',
  },
  {
    name: 'Geist Mono Variable (latin)',
    file: 'GeistMonoVariableVF.woff2',
    url: 'https://cdn.jsdelivr.net/npm/@fontsource-variable/geist-mono@5/files/geist-mono-latin-wght-normal.woff2',
  },
];

async function fetchToFile(url, dest) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  return buf.byteLength;
}

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await mkdir(FONT_DIR, { recursive: true });
  let total = 0;
  for (const f of fonts) {
    const dest = resolve(FONT_DIR, f.file);
    if (!FORCE && (await exists(dest))) {
      const s = await stat(dest);
      total += s.size;
      console.log(`  ✓ ${f.name} present (${s.size} B)`);
      continue;
    }
    process.stdout.write(`  ↓ ${f.name} ... `);
    let size;
    try {
      size = await fetchToFile(f.url, dest);
    } catch (err) {
      if (f.fallback) {
        size = await fetchToFile(f.fallback, dest);
      } else {
        console.log(`FAILED (${err.message})`);
        process.exitCode = 1;
        continue;
      }
    }
    total += size;
    console.log(`${size} B`);
  }
  console.log(`Total font payload: ${total} B (budget ${BUDGET_BYTES} B)`);
  if (total > BUDGET_BYTES) {
    console.error(
      `Over budget by ${total - BUDGET_BYTES} B — see docs/perf-decisions.md effect-cutting priority.`,
    );
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
