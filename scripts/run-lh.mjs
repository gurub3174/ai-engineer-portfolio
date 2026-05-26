#!/usr/bin/env node
/*
 * Lighthouse CI wrapper.
 *
 * chrome-launcher's destroyTmp() hits EPERM on this user's Windows profile
 * because the username contains an apostrophe ("Guru's Epic CustomPC"). The
 * 8.3 short-name (GURU'S~1) breaks fs.rmSync's path normalization, so the
 * temp dir cleanup fails AFTER all audits have already completed.
 *
 * Fix: redirect Chrome's temp dir to a project-local path that has no
 * special characters, by overriding TEMP/TMP before lhci spawns chrome.
 *
 * Usage:
 *   node scripts/run-lh.mjs desktop
 *   node scripts/run-lh.mjs mobile
 */

import { spawn } from 'node:child_process';
import { mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

const target = process.argv[2] ?? 'desktop';
const configFile = target === 'mobile' ? 'lighthouserc.mobile.json' : 'lighthouserc.json';
const config = resolve(projectRoot, configFile);

const tmpDir = resolve(projectRoot, '.lh-tmp');
if (!existsSync(tmpDir)) mkdirSync(tmpDir, { recursive: true });

const preload = resolve(__dirname, 'lh-preload.cjs');

const env = {
  ...process.env,
  TEMP: tmpDir,
  TMP: tmpDir,
  TMPDIR: tmpDir,
  NODE_OPTIONS: `${process.env.NODE_OPTIONS ?? ''} --require=${JSON.stringify(preload)}`.trim(),
};

const lhci = process.platform === 'win32' ? 'lhci.cmd' : 'lhci';
const args = ['autorun', `--config=${config}`];

console.log(`[run-lh] target=${target} config=${configFile}`);
console.log(`[run-lh] TEMP=${tmpDir}`);
console.log(`[run-lh] preload=${preload}`);

const child = spawn(lhci, args, {
  cwd: projectRoot,
  env,
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => process.exit(code ?? 1));
child.on('error', (err) => {
  console.error('[run-lh] failed to spawn lhci:', err.message);
  process.exit(1);
});
