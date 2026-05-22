---
project: ai-engineer-portfolio
type: implementation-plan
format: sprint-plan
version: v1
created: 2026-05-22
launch_target: 2026-06-21
---

# Implementation Plan — AI Engineer Portfolio

## Overview

5-week build with explicit Phase -1 inventory check, hardened Phase 0 scaffolding, skill-aided design refinement in Phase 1, and content-first scheduling thereafter. Writeups are Phase 3 (Week 3), NOT end-buffer (per Critic C1).

**Launch target:** 2026-06-21 (one calendar month from spec freeze 2026-05-22). Slip rule: ship strongest 2 of 3 projects if any one isn't ready (per §11.5 Ship Criteria).

**Daily heartbeat:** 30-min standup with self (notes in `docs/standup-log.md`) — what shipped, what's blocked, what's next.

## Phase -1 — Inventory Check (Day 0, ~2 hours)

**Goal:** verify V1 surfaces are actually buildable before scaffold.

**Deliverables:**
- `docs/inventory-check.md` — confirms each of 3 V1 projects has the source material to support a ≥500-word case study
  - Podcast: list of ≥2 podcast appearance URLs
  - Doc Extractor: link to GitHub repo + at least one build log
  - AI Design Team: link to design-team workspace + at least one shipped design output (the team itself, which this very session uses)
- Decision: proceed with 3-project V1 OR substitute `job-search-pipeline` for a failing slot

**Exit criteria:**
- All 3 surfaces pass the inventory check OR substitution decided
- No phase 0 work begins until exit criteria met

## Phase 0 — Scaffold + Skill Install (Day 1-2)

**Goal:** running Astro site at `C:\projects\ai-engineer-portfolio\` with CI gates green and skills installed.

**Deliverables:**
- Astro 5.x project scaffolded from ai-build-team template
- `.claude/skills/frontend-design/` installed (from anthropics/claude-code repo)
- `.claude/skills/impeccable/` installed (from pbakaus/impeccable, v3.1.1+)
- (Optional) `.claude/skills/superpowers/` installed
- Skills star-counts verified manually (per Market Scout caveat)
- `.claude/rules/` populated: code-style, testing, design-system, accessibility, performance, content-conventions
- Cloudflare Pages connection (GitHub → CF auto-deploy on `main`)
- CI workflow: Astro Check + Biome + Lighthouse-CI + axe-core (Vitest + Playwright deferred per L2)
- `lighthouse-budget.json` enforcing §6.1 budgets
- Placeholder home page deploys green on Cloudflare
- `spec/` directory populated with all 10 design package files

**Exit criteria:**
- `pnpm dev` works locally
- Push to `main` triggers CI green and deploys to a Cloudflare preview URL
- Skills callable via `/impeccable` and `/frontend-design`

## Phase 1 — Design System Finalization (Week 1, Days 3-7)

**Goal:** lock the design language before any content surface is built.

**Workflow:**
1. `/impeccable shape` — articulate the conceptual aesthetic direction (product-photography studio with photographer-engineer identity) into a working brief
2. `/impeccable typeset` — finalize typography pairing from candidates (Fraunces + IBM Plex Sans + JetBrains Mono — or variants per impeccable critique)
3. `/impeccable colorize` — finalize color role tokens (exact hex values for --bg-stage, --key-light, --rim-light, etc.); WCAG validation
4. `/impeccable animate` — define ≤3 motion curves (focus-pull, navigation, R3F bulb idle/illumination)
5. `/impeccable critique` — full design review on a single reference page that shows: hero composition with three subjects, all 4 case-study sections, typography hierarchy, color in context, motion samples
6. `/impeccable audit` — a11y + perf audit on the reference page
7. Lighting decision: key-only vs key+rim vs key+fill vs all-three — locked here

**Deliverables:**
- `src/styles/tokens.css` — locked CSS custom properties for color, lighting, type scale, motion curves
- `/design-reference` route (gitignored from production, used during build only) — proves the system works end-to-end
- `docs/design-decisions.md` — records skill outputs and the chosen settings

**Exit criteria — ALL §3.8 Coherence Gates pass:**
- Single typography pairing locked, ≤4 weights total
- ≤3 motion curves total
- ≥80% of styled components use color tokens (no one-off hex)
- Lighting decision locked
- Grain magnitude + DoF radius + vignette opacity locked
- WCAG AA contrast verified
- `/impeccable critique` + `/audit` pass with zero blockers

## Phase 2 — About + Studio Home (Week 2, Days 8-14)

**Goal:** prove the design system on real surfaces.

**Order:** About first (smallest surface, lowest risk), then Home (most visible).

**Deliverables:**
- `/about` page complete:
  - Identity statement (~80 words)
  - 3-5 visual photography-to-engineering decoder pairs (composition→IA, key light→primary signal, contact sheet→training runs, etc.)
  - Contact CTA
- `/contact` page complete (email, LinkedIn, GitHub)
- `/404` page in character
- `/` Home with `StudioTable` component:
  - Three placeholder subjects (gray boxes acceptable at this phase — real assets in Phase 3)
  - DoF on hover working
  - Identity tagline above the studio area
  - Footer with small links
- Mobile responsive at ≤768px per §6.5 acceptance criteria
- `/impeccable polish` pass on all pages built so far

**Exit criteria:**
- All pages pass Lighthouse Performance ≥95 + Accessibility = 100
- Mobile acceptance gates green
- Home renders studio composite with placeholder objects + identity tagline within first viewport on real Android 4G test

## Phase 3 — Case Studies + Asset Acquisition (Week 3, Days 15-21)

**Goal:** write the 3 case studies AND source the 3 hero objects in parallel. This is the load-bearing week.

**Deliverables:**
- Asset sourcing per §3.7 (decision deadline = Day 15):
  - Microphone: Unsplash/Pexels candidates curated and license-validated, OR Blender render path chosen
  - Printer/Fax: same
  - Light bulb (static composite use): same; R3F-modeled version begins parallel
  - `docs/asset-licenses.md` populated with proof for every asset
- Case studies (per Critic C1 Zod-enforced):
  - `/projects/podcast` — Problem (why podcasting matters as a junior engineer's communication signal) / Approach (which appearances to feature and why) / What-didn't-work (pitches that fell flat, episodes that didn't land) / Outcomes (what these signal)
  - `/projects/doc-extractor` — full CC/Distribution Parser case study (Sprint 0+1 narrative, hybrid rules+LLM extraction approach, what's not working yet, current state)
  - `/projects/ai-design-team` — case study of THIS team and its evolution (the v2 architecture, the wiki maintenance pattern, the team blueprint)
- `/now` page populated with current learning focus + date stamp
- All Zod schemas validate (no stub content blocks merge)
- `/impeccable critique` pass on each case study for clarity + hierarchy

**Exit criteria:**
- All 3 case studies pass `.min(200)` validation across all 4 required fields
- All required assets license-validated and in repo
- Case studies pass cold-reader test (someone unfamiliar with the projects can extract value)

## Phase 4 — R3F Spotlight + Final Polish (Week 4, Days 22-28)

**Goal:** ship the design-team R3F bulb (or its static fallback) and run the final polish + perf + a11y gate pass.

**Deliverables:**
- `LightbulbTeam.tsx` R3F island:
  - Default unlit + subtle filament idle glow (with `prefers-reduced-motion` killswitch)
  - Hover/scroll-into-view brightens filament
  - Click illuminates + reveals 4 team members
  - Adjacent framing copy ("The bulb is the AI Design Team — click to light up the team.")
  - Cold-reader test with someone unfamiliar — drop the metaphor if <3-second decode fails
  - Static AVIF fallback ready if budget exceeded
- Mobile R3F: touch controls + graceful degrade
- `/impeccable polish` + `/impeccable adapt` + `/impeccable optimize` final pass on all routes
- Custom domain attached (if user wants — not gating per architecture §5.2)
- Final Lighthouse-CI + axe-core green across all routes
- Real-device test on mid-tier Android 4G (per §6.5)

**Exit criteria — all Ship Criteria from §11.5 met:**
- All content gates green
- All quality gates green
- All anti-criteria absent (no empty sections, no broken links, no console errors, no "coming soon")
- Cold-reader test passed

## Phase 5 — Post-launch (ongoing)

**Goal:** keep `/now` alive, add build logs to the load-bearing project, write postmortem.

**Cadence:**
- `/now` updated monthly (calendar reminder; if not, the stale date IS the signal)
- New build logs added to relevant project as work continues
- V2 candidates evaluated quarterly (job-search-pipeline, RAG/data project, standalone /blog)
- Postmortem (`postmortem-template.md`) filled out at the 3-month mark (2026-09-21) using inbound-interview metric data

## Risk Register

| Risk | Mitigation | Severity if hit |
|---|---|---|
| Case studies don't get written under deadline | Zod schema enforcement + Phase 3 scheduling + Ship Criteria slip rule | Critical → ship 2 of 3 |
| R3F budget exceeded | Static AVIF fallback already specified | Major → degrade gracefully |
| Asset licenses fall through | Blender render fallback path | Major → 2-3 day timeline slip |
| Bulb metaphor reads "too clever" | Cold-reader test in Phase 4; drop metaphor if fails | Major → swap hero object |
| Mobile experience collapses to plain stack | §6.5 acceptance gates + real-device CI test | Critical → block launch until fixed |
| Perfectionism rot delays launch indefinitely | Ship Criteria date anchor + slip rule | Critical → enforce ship-with-2 |
| Skills produce inconsistent visuals across phases | §3.8 Coherence Gates in Phase 1 | Major → blocks Phase 2 |

## Dependencies

- **Cloudflare Pages account** — assumed user has or will create (free)
- **Custom domain** — optional, not gating
- **GitHub repo** — created at scaffold time (`C:\projects\ai-engineer-portfolio\` initialized as git repo)
- **Skills installed** — Phase 0 gates this; star counts verified per Market Scout caveat
- **Asset license validation** — Phase 3 cannot start without §3.7 plan
