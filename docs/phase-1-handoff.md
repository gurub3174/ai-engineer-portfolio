---
project: ai-engineer-portfolio
type: phase-1-handoff
created: 2026-05-23
phase: 1 (entry)
tier: Internal
launch_target: 2026-06-21
---

# Phase 1 Handoff — Design System Finalization

**Purpose:** self-contained handoff for a fresh Claude Code session to pick up Phase 1. The prior session shipped Phase 0; this doc is what the next session reads at start to continue Phase 1 without re-deriving anything.

## TL;DR for the receiving session

Phase 0 is fully exited. You are entering Phase 1 (Days 3-7 in `spec/implementation-plan.md` — "Design System Finalization"). Your job: lock typography, OKLCH color values, motion curves, and spacing scale by running `/impeccable shape` → `typeset` → `colorize` → `animate` → build a reference page → `/impeccable critique` + `audit` against §3.8 coherence gates.

The pre-Phase-1 decisions (register, theme, color strategy, lighting, typography direction) are LOCKED. Do not re-litigate them. Sections 6-10 of `docs/design-decisions.md` are the TBD slots you fill.

## Files to load at session start (hard cap: 5)

1. `spec/scope.md` — tier=Internal, agent roster, eval targets
2. `docs/design-decisions.md` — §1-5 locked, §6-10 TBD (THIS IS YOUR PRIMARY ARTIFACT)
3. `PRODUCT.md` — brand context, anti-references, second-order AI-slop callout
4. `DESIGN.md` — token slot definitions, lighting locked, perf cut-priority
5. `.claude/rules/design-system.md` — enforceable rules (OKLCH, impeccable bans, hierarchy ratio, line length)

**Cross-team peek (if budget allows beyond 5):** none required — design-decisions.md consolidates everything Phase 1 needs.

## Phase 0 deliverables (confirmation — do not redo)

- Astro 5.18 scaffold green at http://localhost:4321 + Cloudflare `*.pages.dev` preview
- CI gates wired: `astro check`, `biome lint`, `astro build`, `@axe-core/cli`, Lighthouse CI desktop + mobile
- Skills installed: `.claude/skills/frontend-design/`, `.claude/skills/impeccable/`
- PRODUCT.md, DESIGN.md seeded (impeccable loader requirements satisfied)
- Placeholder home at `src/pages/index.astro` (DO NOT extend this — Phase 2 builds the real home)
- Repo: https://github.com/gurub3174/ai-engineer-portfolio (main branch)

## What's LOCKED pre-Phase-1 (do not re-litigate)

| Decision | Value | Source |
|---|---|---|
| Tier | Internal | `spec/scope.md` |
| Register | `brand` (impeccable axis) | `docs/design-decisions.md` §1 |
| Theme | Dark, forced by physical-scene sentence | `docs/design-decisions.md` §2 |
| Color strategy | **Committed** (warm tungsten carries 30-60% of identity surface) | `docs/design-decisions.md` §3 |
| Lighting | Key + warm rim (~3200K cooler than ~3000K key), NO fill in V1 | `docs/design-decisions.md` §4 |
| Typography direction | Characterful serif display + humanist sans body + mono code; NEVER Inter | `docs/design-decisions.md` §5 |
| AI Engineer engagement | DISENGAGED (no AI runtime) | `spec/scope.md` override |
| Color format | OKLCH only, never hex; chroma ≥0.005 on neutrals | `DESIGN.md`, `design-system.md` |

## What's TBD in Phase 1 (your job)

| Section | Skill invocation | Output |
|---|---|---|
| §6 Typography pairing | `/impeccable typeset` | Final display + body + mono fonts, scale ramp, weights |
| §7 OKLCH values | `/impeccable colorize` | Exact OKLCH for every token; WCAG AAA matrix |
| §8 Motion curves | `/impeccable animate` | ≤3 cubic-beziers; duration table; reduced-motion fallback |
| §9 Spacing/rhythm | (skill or manual) | Vary-by-context scale; container constraints |
| §10 Reference page critique | `/impeccable critique` + `/audit` | All §3.8 coherence gates checked; second-order AI-slop test passed |

## Phase 1 workflow (per `spec/implementation-plan.md` §Phase 1)

1. **`/impeccable shape <feature>`** — first invocation. Articulates aesthetic direction against PRODUCT.md + design-decisions.md §1-5. Confirm the shape output aligns with the locked decisions before proceeding.
2. **`/impeccable typeset`** — finalize fonts. Fills §6.
3. **`/impeccable colorize`** — OKLCH values + contrast matrix. Fills §7. Writes `src/styles/tokens.css`.
4. **`/impeccable animate`** — motion curves. Fills §8.
5. **Build the reference page at `src/pages/design-reference.astro`** — single page showing: hero composition with three subjects (placeholder geometry OK), all 4 case-study sections, typography hierarchy, color in context, motion samples. This page IS the §3.8 coherence gate artifact.
6. **`/impeccable critique`** — review the reference page. **CRITICAL:** name the second-order AI-slop test in the prompt verbatim: *"Does this read as an editorial-dark-serif portfolio (second-order reflex per PRODUCT.md anti-references) or does the photographer-engineer differentiator land in <2 seconds?"* This is the catch that PRODUCT.md anti-references demand. Do not skip.
7. **`/impeccable audit`** — a11y + perf checks on the reference page.
8. **Lock**: when both pass with zero blockers, all §3.8 coherence gates are satisfied → Phase 1 exits → Phase 2 unblocks.

## §3.8 Coherence gates (Phase 1 exit checklist)

- [ ] Single typography pairing locked (§6)
- [ ] ≤4 font weights total (§6)
- [ ] ≤3 motion easing curves total (§8)
- [ ] ≥80% styled components use color tokens (verified during reference-page build)
- [x] Lighting decision locked (§4 — already done pre-Phase-1)
- [ ] Grain magnitude + DoF radius + vignette opacity locked (during reference-page tune)
- [ ] WCAG AA contrast verified (AAA preferred for body) (§7)
- [ ] `/impeccable critique` + `/audit` pass with zero blockers (§10)
- [ ] Second-order AI-slop test passes — photographer-engineer differentiator legible <2s (§10)

## Carry-forward concerns (flag if they bite)

- **Spec drift:** `spec/architecture.md §3.4` still shows hex color tokens. Authoritative tokens are in `DESIGN.md` + `.claude/rules/design-system.md` (OKLCH). Do not regress to hex from the spec. The amended rules + DESIGN.md are the source of truth at build time.
- **`/design-reference` route gitignore:** the reference page is internal-only and should not deploy to production. Astro doesn't gitignore routes natively. Options: (a) prefix with `_design-reference` (underscore prevents Astro from generating a route in some versions — verify), (b) add a `prerender = false` + env-gated 404 redirect, (c) delete the route before merging to main once Phase 1 closes. **Recommended: (c)** — the reference page is throwaway scaffold for the design lock, not a permanent surface.
- **`src/layouts/` is empty.** Phase 1 will need a shared layout. Build one when the reference page calls for it; don't create speculatively.
- **`src/styles/` is empty.** `tokens.css` is the first file to land there, written by `/impeccable colorize`.
- **Pin staleness lesson (2026-05-03):** dependencies resolved on first install but Astro 5.18, R3F 9.6, Drei 10.7 are fast-moving. If `/impeccable` skill outputs reference a Drei helper that doesn't yet exist in 10.7, check the actual version installed (`pnpm list @react-three/drei`) and adapt — don't assume the skill's training data is current.

## Tier engagement reminder (Internal)

- **Build Lead:** full session orchestrator
- **Code Reviewer:** full (passes 1-3, including security-smell scan)
- **AI Engineer:** DISENGAGED by `spec/scope.md` override (no AI runtime)
- **Pattern Scout:** engaged ad-hoc (e.g., "any prior art for Astro reference-page patterns" — only if a real micro-decision blocks)

For Phase 1, specialist delegation is minimal — this is primarily a Build Lead + skill-driven phase. Code Reviewer engages when the reference page diff lands. Pattern Scout only if a structural pattern question blocks.

## Recommended `/build` invocation to start Phase 1

```
/build "Phase 1 — Design System Finalization. Read docs/phase-1-handoff.md for full context. Sections 1-5 of docs/design-decisions.md are LOCKED. Begin with /impeccable shape against PRODUCT.md and the locked decisions. Then typeset → colorize → animate → build reference page at src/pages/design-reference.astro → critique (with second-order AI-slop test named in prompt) → audit. Exit when all §3.8 coherence gates pass."
```

## After Phase 1 exits

Phase 2 begins (Week 2, Days 8-14): About + Studio Home pages built using locked tokens. See `spec/implementation-plan.md` §Phase 2 for deliverables.

## Related

- `spec/implementation-plan.md` — full phase breakdown
- `spec/architecture.md` §3, §3.8 — design language + coherence gates
- `docs/design-decisions.md` — primary Phase 1 artifact (§6-10 to fill)
- `docs/standup-log.md` — daily heartbeat (continue this in Phase 1)
- `PRODUCT.md`, `DESIGN.md` — impeccable-loaded context
- `.claude/rules/design-system.md`, `content-conventions.md` — enforceable rules
