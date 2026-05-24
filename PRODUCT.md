# Product Context — AI Engineer Portfolio

**register: brand**
(design IS the product; the site itself is the marketing asset)

## Product purpose

A portfolio site that earns interviews from technically-fluent hiring managers at AI-native or AI-adjacent companies by demonstrating *what was built*, *how the candidate thinks*, and *how they communicate technical ideas*. The photographer-engineer identity is the differentiator; the site IS the proof that the differentiator is real, not narrative.

## Users

### Primary — the 7-second scanner
Engineering hiring managers / engineering leads scanning 20-30 portfolios in a sitting. F-pattern eye movement. Bounce decision in <5 seconds. They check: does the identity + at least one shipped artifact land before the bounce window closes? If yes, they click into the deepest-signal page.

### Secondary — the 5-minute deep reader
Senior engineers / IC interviewers / engineering panel members already on the candidate. They read case studies in full, especially the "What didn't work" section (highest callback-signal per market research). They open one external link (GitHub or Loom). They decide: is this person worth a screen?

### Tertiary — peers, future collaborators, weak-tie referrals
LinkedIn-driven inbound. They land via a build-log share, skim one project, leave with a name + identity stuck.

### Explicitly de-prioritized
Non-technical recruiters, ATS-keyword scrapers, FAANG-style CS-fundamentals signaling. Those audiences are served by LinkedIn + the résumé PDF. The site does not bend for them.

## Brand

**Identity:** AI/Data engineer who is also a photographer. The photography is real (composition discipline, lighting vocabulary, contact-sheet thinking) and informs how he reasons about engineering systems (signal vs noise, framing, what's in focus, what's deliberately blurred). The two are not metaphor-borrowed; they're the same eye applied to different subjects.

**Voice:**
- Substantive over clever. The site teaches the reader something on every surface.
- What-didn't-work matters more than what-worked. Failure stories carry more callback weight than win stories.
- Specific over general. Names of frameworks, dates, numeric outcomes. Avoid "leveraged," "scalable," "robust" filler vocabulary.
- First-person for decisions ("I picked Astro because…"), past-tense for outcomes ("Sprint 0 shipped at e6cb1af with 49 files…").

**Aesthetic commitment direction:** dark studio photography. Warm tungsten key + warm rim light separating subjects from a deep tinted cove. Grain, vignette, depth-of-field. Photographic atmosphere — never CSS-glow halos or generic-AI gradients.

## Anti-references (the AI-slop reflexes we are NOT)

These are the saturated aesthetics we deliberately steer away from. If the site reads like any of these, the differentiator failed.

### First-order reflexes (category-driven)
- **Monospaced terminal aesthetic** — neon green on black, JetBrains Mono everywhere, ASCII headers. The default "I'm an AI/infra engineer" tell.
- **Navy + electric blue SaaS dashboard** — generic "tech" palette.
- **Purple-to-blue gradients on white** — the canonical AI-product reflex.

### Second-order reflexes (anti-reference driven — these are the trap)
- **Editorial-dark-serif portfolios** — Fraunces + warm tone + grain + dark background. The current saturated "I'm-not-SaaS-cream" aesthetic. Substack-marketing-page, Linear-marketing-page, half of 2024-2025 YC Demo Day decks. **This is our biggest risk.** The photography-studio metaphor only escapes this trap if the photographer-engineer identity is *legible within 2 seconds* — not just inferred from typography.
- **Awwwards-style 3D playground** — Bruno Simon's car, Larose's spinning room, kinetic typography on hero. Skill flex without job-relevance.

### Tone anti-references
- LinkedIn-hustle voice ("leveraged 10x ROI through synergistic AI initiatives")
- Humblebrag minimalism ("just shipped this little thing")
- Tutorial-blog voice ("In this post, we'll explore…")

## Strategic principles

1. **Case studies are 70% of the callback signal** (market research). Treating them as Phase 4 buffer inverts priority. Schedule case-study writing in Week 3 (Phase 3), not end-of-build.
2. **Photographer-engineer differentiator must land in <2 seconds** or the site reads as "another tasteful AI engineer with a Fraunces fetish" (second-order AI-slop trap). The home page composition has to make this legible without a paragraph of copy.
3. **Slow polish beats fast launch with empty content.** Ship Criteria allow 2 of 3 V1 projects if any one isn't ready; do not relax case-study Zod schema to ship faster.
4. **What-didn't-work is the highest-signal section.** Pre-commit hooks block merges where this section reads as stub. Don't pad it; write a real failure.
5. **Color is committed, not restrained.** Warm tungsten carries 30-60% of the surface as identity color — declared explicitly per impeccable's color-strategy axis.
6. **Dark theme is forced by audience scene, not category reflex.** Physical scene: *hiring manager scanning 30 portfolios on a 14-inch laptop at 2pm in fluorescent office light, mind already full of identical white-on-white AI/SaaS sites; the dark studio frame is the contrast they didn't expect.*
7. **Three V1 surfaces, no more.** Podcast, doc-extractor, AI design team. Locked. job-search-pipeline is the substitution candidate if a slot fails, not an additional slot.

## Success metrics

- **Leading:** inbound interview requests citing the portfolio. Baseline 0/month. Target ≥1/month sustained 3 months post-launch.
- **Lagging:** % of hiring-manager conversations where they reference specific projects or videos from the site.
- **Anti-metric:** Awwwards / Site of the Day / design-twitter virality. Vanity; orthogonal to interview yield.

## Out of scope (hard locks)

CMS, dynamic backend, auth, multi-language, newsletter, server-side rendering, standalone /blog surface, real-time features, UGC, A/B testing infrastructure, feature flags, analytics dashboards beyond Cloudflare Web Analytics.

## Loaded by

`impeccable` skill's setup phase (`node scripts/load-context.mjs`). This file is required; without it, every `/impeccable` invocation redirects to `impeccable teach`.

## Related

- `DESIGN.md` — color, typography, motion tokens (Phase 1 finalization)
- `spec/design-brief.md` — original framing this file derives from
- `spec/architecture.md` §3 — design language full spec
- `.claude/rules/design-system.md` — enforceable design rules
