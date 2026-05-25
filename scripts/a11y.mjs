#!/usr/bin/env node
/*
 * Accessibility CI gate.
 * Starts astro preview, waits for it, runs axe against every built route, kills preview.
 * Exit code 0 = zero AA violations across all routes; non-zero = blocker.
 *
 * Run: pnpm a11y
 *
 * Replaces the original `axe ./dist --exit` which did not work — axe-core CLI
 * expects URLs, not paths (-d flag is output dir, not input). See
 * docs/standup-log.md Day 2 entry for the discovery.
 */

import { spawn } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const PORT = process.env.AXE_PORT || '4323';
const HOST = `http://localhost:${PORT}`;
const DIST = resolve(process.cwd(), 'dist');

function discoverRoutes() {
  const routes = new Set(['/']);
  function walk(dir, prefix) {
    for (const entry of readdirSync(dir)) {
      const full = resolve(dir, entry);
      if (statSync(full).isDirectory()) {
        walk(full, `${prefix}${entry}/`);
      } else if (entry === 'index.html' && prefix !== '') {
        routes.add(`/${prefix.replace(/\/$/, '')}`);
      }
    }
  }
  walk(DIST, '');
  return [...routes];
}

async function waitFor(url, timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // not ready
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`preview never became ready at ${url}`);
}

function run(cmd, args, opts = {}) {
  return new Promise((resolveP, rejectP) => {
    const child = spawn(cmd, args, { stdio: 'inherit', shell: true, ...opts });
    child.on('exit', (code) => {
      if (code === 0) resolveP();
      else rejectP(new Error(`${cmd} ${args.join(' ')} exited with code ${code}`));
    });
    child.on('error', rejectP);
  });
}

async function main() {
  const routes = discoverRoutes();
  console.log(`Routes to audit: ${routes.join(' ')}`);

  const preview = spawn('pnpm', ['exec', 'astro', 'preview', '--port', PORT], {
    stdio: 'pipe',
    shell: true,
  });

  let exitCode = 0;
  try {
    await waitFor(`${HOST}/`);
    const urls = routes.map((r) => `${HOST}${r}`);
    await run('pnpm', ['exec', 'axe', ...urls, '--exit']);
  } catch (err) {
    console.error(err.message);
    exitCode = 1;
  } finally {
    preview.kill('SIGTERM');
    // Windows process tree cleanup
    if (process.platform === 'win32' && preview.pid) {
      try {
        spawn('taskkill', ['/pid', String(preview.pid), '/t', '/f'], { shell: true });
      } catch {
        // best effort
      }
    }
  }
  process.exit(exitCode);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
