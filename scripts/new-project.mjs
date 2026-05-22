#!/usr/bin/env node
// Generate a new project MDX skeleton with required-section placeholders.
// Placeholders are deliberately too short to pass Zod .min(200) — you cannot
// ship without filling them in.

import { writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const slug = process.argv[2];

if (!slug) {
  console.error('Usage: pnpm new-project <slug>');
  console.error('  slug must be kebab-case (e.g., "rag-experiment")');
  process.exit(1);
}

if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error(`Invalid slug "${slug}" — must be kebab-case (a-z, 0-9, -)`);
  process.exit(1);
}

const target = join(__dirname, '..', 'src', 'content', 'projects', `${slug}.mdx`);

if (existsSync(target)) {
  console.error(`Project already exists: ${target}`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);

const template = `---
title: "TODO — title"
slug: ${slug}
hero_object: lightbulb # microphone | printer | lightbulb
asset_strategy: stock-photo # stock-photo | r3f-model
asset_url: /assets/objects/TODO.avif
one_line_pitch: "TODO — one-line pitch (max 120 chars)"
status: in-progress
github_url: https://github.com/USERNAME/REPO
tech_stack: [TODO]
role: "Solo build"
timeline: "${today} → ongoing"
problem: |
  TODO — replace this placeholder. What was the actual context? Why did this matter?
  Who was the user / stakeholder? What was the constraint that made it hard?
  Must be at least 200 characters to pass the schema. This placeholder is intentionally
  too short to pass. The schema will fail until you write real content here.
approach: |
  TODO — replace this placeholder. What decisions did you make? What tradeoffs did you
  accept? What did you reject and why? Show the thinking, not just the result.
  Must be at least 200 characters.
what_didnt_work: |
  TODO — HIGHEST-SIGNAL section per market research. Dead ends, false starts, things
  that broke. This is the differentiator — hiring managers read this section more
  carefully than Outcomes. Be specific and honest. Must be at least 200 characters.
outcomes: |
  TODO — replace this placeholder. Measurable result. What changed because of this?
  What did you learn? What would you do differently next time? Use numbers where you
  can. Must be at least 200 characters.
build_logs: []
blogs: []
embedded_media: []
tags: []
---

import EmbeddedMedia from '@components/EmbeddedMedia.astro';

{/* MDX body below — narrative supplementing the frontmatter sections. Embed media,
    include diagrams, etc. The frontmatter sections render via the page template; this
    body is for everything that doesn't fit a discrete section. */}
`;

writeFileSync(target, template, 'utf-8');
console.log(`Created: ${target}`);
console.log('');
console.log('Next steps:');
console.log('  1. Replace TODO placeholders in frontmatter');
console.log('  2. Run `pnpm check` to validate schema (will fail until placeholders replaced)');
console.log('  3. Add build_logs[] and blogs[] entries as you write them');
console.log('  4. Run `pnpm dev` to preview locally');
