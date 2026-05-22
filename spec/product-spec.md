---
project: ai-engineer-portfolio
type: product-spec
format: PRD
version: v1
created: 2026-05-22
status: ready-for-build
launch_target: 2026-06-21
---

# Product Requirements Document — AI Engineer Portfolio

## 1. Executive Summary

A personal portfolio site that earns interviews from technically-fluent hiring managers at AI-native and AI-adjacent companies, by demonstrating shipped projects, intellectual curiosity, and communication ability. The design language is a product-photography studio — three featured projects appear as lit objects on a stage (microphone, printer, light bulb). The light bulb represents the AI Design/Build team and doubles as the literal key light of the scene.

This document is the consolidated product spec for build handoff. Architecture details live in `architecture.md`; engineering rationale in `design-rationale.md`.

## 2. Problem Statement

The user (junior AI/Data Engineer transitioning into AI engineering) needs a portfolio that:
1. Communicates capability and curiosity to technical hiring managers in <30s of scan + supports 5+ minutes of deep-read
2. Aggregates content currently scattered across LinkedIn (build logs), various podcast feeds (appearances), and personal video channels (educational reels)
3. Carries an identity signal distinctive enough to be memorable, without taking on the genre risk of a creative-developer portfolio

No portfolio exists today. Current discoverability is via LinkedIn DM only — high friction, low signal density per impression.

## 3. Goals

### Primary
- **Earn interview callbacks** from technically-fluent hiring managers via the portfolio link in DMs, applications, or referrals
- **Demonstrate three competencies on first read:** what was built (shipped artifacts), how the candidate thinks (case-study depth), how they communicate (writing + embedded video)

### Secondary
- Express the user's photographer-engineer identity through the visual language (NOT through their own photographic work)
- Provide a single canonical home for podcast appearances and educational media currently scattered
- Build a reusable platform — V2 expansions (job-search-pipeline, RAG/data project, blog) drop in as additional surfaces without redesign

### Non-goals
- Ranking on Awwwards / Site of the Day
- Maximizing organic traffic / SEO
- Serving non-technical recruiters or ATS-style processes
- Acting as a public blog (writing is project-attached)

## 4. Success Metrics

| Metric | Type | Target |
|---|---|---|
| Inbound interview requests citing the portfolio | Leading | ≥1/month sustained, 3 months post-launch |
| % of HM conversations referencing specific projects/videos | Lagging | ≥40% by month 3 |
| Lighthouse Performance score (median across 5 routes) | Quality gate | ≥95 |
| Lighthouse Accessibility score | Quality gate | 100 |
| LCP on mid-tier Android 4G | Quality gate | ≤2.5s @ p75 |
| INP under interaction | Quality gate | ≤200ms @ p75 |

**Anti-metric (do NOT optimize for):** pretty-design accolades, generic traffic volume, design-blog features.

## 5. Personas

### Primary — "Technical Hiring Manager" (Tier 1 audience)

- Engineering Lead / Staff Eng / Senior Tech HM at AI-native or AI-adjacent company
- Scans portfolio for 7-30 seconds initially (Ladders 2018; Nielsen F-pattern)
- Will go deep on 1-2 projects if hooked
- Values: shipped artifacts, evidence of intellectual curiosity, communication clarity
- Reads "what didn't work" sections more carefully than "outcomes" (Profy.dev 2022)
- ~25-40% will view first on mobile (inferred from LinkedIn data)

### Secondary — "The user himself"

- Wants a personal-brand artifact reflecting photographer + engineer identity
- Wants a platform that compounds — add projects over time without rework
- Wants writeups attached to projects (build logs, blogs) so writing has a permanent home

### De-prioritized — "Non-technical recruiters" and "FAANG IC interviewers"
Served by LinkedIn + résumé PDF instead. Not a portfolio audience.

## 6. User Journeys

### J1 — The 7-second scan
HM lands on `/` from a DM link. Sees identity tagline + three lit subjects + focus changes on hover. Reads one one-line pitch. Decides to click into a project OR bounces.

**Acceptance:** LCP ≤2.5s; identity legible without scroll; one project pitch readable within first 5 seconds.

### J2 — The 5-minute deep read
HM clicks into `/projects/doc-extractor` (most likely entry). Reads Problem → Approach → What-Didn't-Work → Outcomes. Skims build logs. Opens one LinkedIn link in a new tab. Returns to `/` or clicks contact.

**Acceptance:** project page loads ≤1s on broadband; build logs visible without leaving page; contact CTA persistent.

### J3 — The R3F discovery
HM clicks into `/projects/ai-design-team`. Sees adjacent framing copy + unlit bulb with subtle filament glow. Either hovers (filament brightens) or clicks (bulb illuminates, team members fade in). Hovers a team member → role tooltip.

**Acceptance:** R3F island lazy-loaded; INP ≤200ms during interaction; reduced-motion fallback renders identical content.

### J4 — Mobile discovery
HM scrolls on phone during a commute. Sees one focused subject + small picker for the other two. Identity tagline above fold. At least one photographic effect (grain or vignette) preserved.

**Acceptance:** §6.5 mobile acceptance criteria met.

### J5 — Photographer-curiosity moment
HM lands on `/about`. Sees 3-5 visual pairs (composition → IA, key light → primary signal, etc.). Decodes the metaphor explicitly. Now everything on the site reads as intentional.

**Acceptance:** decoder pairs render; mapping is visual not prose.

## 7. Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| F1 | Home page renders studio composite with 3 subjects on first paint, no R3F | Must |
| F2 | Focus-pull on hover (desktop) / tap (mobile) — DoF transition between subjects | Must |
| F3 | Click subject → navigate to `/projects/<slug>` with same object as page hero | Must |
| F4 | Project pages render Problem / Approach / What-Didn't-Work / Outcomes from Zod-validated MDX | Must |
| F5 | Build logs and blogs nest inline within each project page; no standalone `/blog` | Must |
| F6 | `/projects/ai-design-team` ships R3F bulb (or static fallback) with framing copy | Must |
| F7 | `/now` page renders current markdown + visible date stamp | Must |
| F8 | `/about` page renders 3-5 visual photography-to-engineering decoder pairs | Must |
| F9 | Embedded media uses facade pattern (lite-youtube-embed, lazy Spotify iframe) | Must |
| F10 | `prefers-reduced-motion` honored; full 2D-accessible path for all R3F content | Must |
| F11 | Custom 404 page in character | Should |
| F12 | RSS feed for project updates | Won't (V2) |
| F13 | Comments / community features | Won't |
| F14 | Multi-language i18n | Won't |
| F15 | CMS / admin UI | Won't (MDX only) |

## 8. Non-Functional Requirements

### Performance (hard gates per architecture §6.1)
- LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 at 75th percentile
- Home page total weight ≤ 200KB; mobile ≤ 150KB; JS ≤ 20KB hydrated
- Lighthouse Performance ≥ 95 on all routes
- TTFB ≤ 600ms (Cloudflare edge)

### Accessibility (per architecture §6.2)
- WCAG 2.2 AA conformance via axe-core CI gate
- `prefers-reduced-motion` respected globally
- AAA contrast for body text; AA Large for accents
- Touch targets ≥ 44×44 px

### Reliability
- Site is static; uptime = Cloudflare Pages SLA (effectively 100%)
- No backend dependencies = no incident surface
- Build failures block deploy (CI gate)

### Maintainability
- Adding a new project = creating one MDX file + one asset; no code changes required
- Schema enforcement prevents drift (Zod content validation)
- Skills (`/impeccable critique`, `/impeccable audit`) available during refinement

## 9. Out of Scope (V1)

- User-authored blog as a separate surface (writing is project-attached)
- CMS / admin UI
- Multi-language i18n
- Comments, community, social features
- Newsletter / email capture
- Analytics dashboard (basic Cloudflare Web Analytics is enough)
- A standalone `/talks` or `/media` surface (folded into Projects)
- User's own photography as on-site assets

## 10. Open Questions

None for V1 launch. All Critic findings resolved.

V2 candidate questions (deferred):
- Does educational-video volume justify a dedicated `/talks` surface eventually?
- Does the inbound-interview rate post-launch validate the studio metaphor, or do we need to revisit?
- Does a standalone `/blog` make sense after the 3rd or 4th project, or does inline-with-project still win?

## 11. References

- `design-brief.md` — problem framing
- `market-research.md` — competitive landscape + adoption tiers
- `research-brief.md` — empirical evidence base
- `architecture.md` — system design, IA, design system, tech stack
- `critical-review.md` — 13 findings, all accepted
- `design-rationale.md` — per-decision rationale + interview prep
- `implementation-plan.md` — sprint breakdown
- `test-plan.md` — acceptance → validation mapping
- `spec/scope.md` — build-team handoff (Tier + skills + agent roster)
