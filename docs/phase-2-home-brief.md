---
project: ai-engineer-portfolio
type: design-brief
phase: 2
target: src/pages/index.astro
created: 2026-05-24
status: approved
approved_by: user (2026-05-24, Build Lead session)
---

# `/frontend-design` brief — Home page (Phase 2)

## Context (load first)

Internal-tier portfolio site for a junior AI/Data Engineer. The home page IS the differentiator — if a hiring manager doesn't recognize "photographer-engineer studio" within 2 seconds, the site fails. Phase 0 placeholder currently lives at `src/pages/index.astro` and will be replaced wholesale.

**Files to load before generating anything (in order):**
1. `PRODUCT.md` (project root) — brand voice, anti-references, audience
2. `DESIGN.md` (project root) — token philosophy
3. `src/styles/tokens.css` — locked color / type / motion / spacing tokens (do NOT introduce new tokens or raw hex)
4. `src/styles/fonts.css` — `@font-face` declarations for Source Serif 4, Geist Sans, Geist Mono
5. `src/pages/design-reference.astro` — reference for HOW tokens compose; **NOT** a layout template for home
6. `spec/architecture.md` §4.1 (lines ~290-312) — StudioTable composition spec
7. `docs/design-decisions.md` §1-10 — locked Phase 1 decisions; do not re-litigate
8. `.claude/rules/design-system.md`, `.claude/rules/accessibility.md`, `.claude/rules/performance.md`, `.claude/rules/content-conventions.md` — hard rules

## Deliverable

Single Astro page replacing `src/pages/index.astro`. Single-route, server-rendered, zero hydrated JS (DoF + focus-pull are CSS-only at this phase). Uses `BaseLayout` from `src/layouts/`.

## What this page must do

The visitor lands and within ~2 seconds reads: *"a small photography studio, three subjects being shot on a desk under a warm key light, made by someone who builds AI/data systems."* This is a literal scene, not vibes. The reference page proved the design language; this page proves the studio metaphor visually.

## The six load-bearing studio moves (NEW — sharpens architecture §4.1)

1. **Visible key light source.** Either (a) a softbox / fixture shape implied in the upper-left or upper-right of the composition that reads as the lamp, or (b) a diagonal cone of warm light (CSS conic/radial gradient at very low chroma) falling onto the subjects from off-frame. The eye must be able to locate the light, not just feel warmth.
2. **A stage / desk plane with depth.** A horizontal surface plane (lighter than `--bg-stage`, e.g. `--surface`) sweeping from a foreground edge up to a back-wall fade. Use a soft gradient to imply the floor-to-cyc curve of a photo studio sweep. Subjects sit ON this plane, not float over a flat background.
3. **Cast shadows on the surface.** Each of the three subjects casts a soft, directional shadow on the desk plane — pure CSS (filter: drop-shadow or a positioned blurred ellipse under each object). Shadow direction must be consistent with the key-light direction in move 1. **No `box-shadow` glow halos on the objects themselves** (impeccable absolute ban).
4. **Visible rim light on subject silhouettes.** The `--rim-light` token should appear as a thin edge highlight along one side of each subject (opposite the key) — not as a separator border. Implement via `filter: drop-shadow()` in the rim hue at low blur, or via a layered pseudo-element. The rim is what photographically separates subject from cove.
5. **Atmospheric depth.** Vignette token applied via radial gradient overlay; subtle haze toward the back wall so the scene has implied depth rather than infinite black. Mid-tones in the back third slightly lifted; foreground edge darker.
6. **Subjects with form.** Even as placeholder geometry (real photo composites arrive Phase 3 per implementation-plan), the three objects must read as 3D forms with light/shade — rounded shapes with a lit side and a shadow side, not flat colored boxes. Acceptable Phase-2 placeholders: simple SVG/CSS forms with gradient shading matched to the key-light direction. The reference-page flat blocks are NOT acceptable as the home composition.

## Composition (per architecture §4.1, refined)

```
[ top: tiny identity stamp · GEORGE [LAST] · AI/DATA ENGINEER ]

[ identity tagline, display-size, 1-2 lines max:
  "I build AI/data systems
   and photograph them." ]

[ studio scene — full width, ~60-70vh: ]
  - back wall (top third) with vignette + slight haze
  - desk plane (bottom two-thirds) with cast shadows + rim cove
  - three subjects on the plane, equal weight, slight horizontal offset:
      [ Microphone ] [ Printer ] [ Lightbulb ]
  - one subject in focus by default (the leftmost, Microphone),
    other two blurred via backdrop-filter (--dof-blur token)
  - key light source visibly implied upper-left/right

[ caption row under the studio:
  one-line pitch fades in when a subject is hovered/focused ]

[ footer: small links · social · year · build-state stamp ]
```

## Hard constraints (CI-enforced)

- **No new tokens, no raw hex.** Everything via `var(--*)` from `tokens.css`.
- **Hydrated JS budget: 0 KB on this page.** DoF, focus pull, hover transitions are CSS-only.
- **LCP image (if used): `fetchpriority="high"`, no lazy-load.**
- **WCAG 2.2 AA on every element.** Axe runs against `/` on every PR; zero violations.
- **Mobile spec (≤768px) per architecture §6.5:** subjects stack vertically; one focused + 2 in a picker strip (not 3 stacked); identity tagline above the fold; vignette OR static grain preserved; DoF may be disabled (backdrop-filter cost).
- **`prefers-reduced-motion: reduce`:** no DoF transition, no grain animation, no focus-pull transition (instant); static grain OK.
- **One `<h1>` per page**, semantic landmarks (`<header>`, `<main>`, `<footer>`), skip-link.

## Absolute bans (impeccable)

Reject any output that includes: side-stripe borders, gradient text, glassmorphism cards, hero-metric template (big number + stats), identical card grids, modal-as-first-thought, card nesting, bounce/elastic easing, pure `#000` or `#fff`, Inter / IBM Plex Sans / Fraunces / Recoleta / Newsreader fonts, em dashes in user-facing copy, purple-to-blue gradients, rounded-square icon tiles above headings, dark CSS glow halos, raw hex anywhere.

## Anti-aesthetic — avoid the second-order trap

The cliche this project's anti-reference list calls out is "editorial dark serif portfolio for AI engineers." Symptoms to dodge: tracked-uppercase grammar repeated as section labels (one stamp per page max), magazine-cover serif at display, cool-blue rim light, fashion-shoot framing. The studio metaphor we want is **utilitarian product photography on a small desk** — closer to a watch-collector's macro shoot than a Vogue editorial.

## Voice (per content-conventions)

- Identity tagline: ≤12 words, present tense, first person.
- Subject pitches (revealed on hover): ≤80 chars each, no em dashes, no filler ("leveraged," "scalable," "robust," "seamless").
- Microcopy (footer stamps, frame numbers): one mono-stamp on the page, not repeated section grammar.

## Acceptance gates

Before this page ships:
1. The "studio scene" reading is unambiguous in ≤2 seconds to a cold viewer who has never seen the project.
2. All §3.8 coherence gates from Phase 1 still pass.
3. Lighthouse Performance ≥95 mobile, Accessibility = 100, zero axe violations.
4. `/impeccable critique` returns zero P0/P1 issues; ≤2 P2 polish items acceptable.
5. Mobile composition (≤768px) renders correctly without horizontal scroll; identity tagline above the fold on iPhone SE viewport.

## Out of scope for this generation

- Real photo composites of the three subjects (Phase 3).
- R3F bulb interactivity (Phase 2 of the AI Design Team route, not home).
- Live activity stamps / "last shipped" indicators (cut per Critic M3).
- Any route beyond `/` (this is one file).

## Output format expected from the skill

1. Updated `src/pages/index.astro` (full file).
2. Inline rationale section in the response explaining how each of the six studio moves was implemented + which CSS techniques were chosen + tradeoffs accepted.
3. List of any P2/P3 polish items intentionally deferred.

## Sign-off

- Brief approved by user 2026-05-24 in Build Lead consult session.
- Default focused subject: leftmost (Microphone).
- Next step: invoke `/frontend-design` with this brief, then side-by-side `/impeccable critique`, then iterate to acceptance.
