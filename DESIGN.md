# Design Tokens — AI Engineer Portfolio

**status: provisional — finalized during Phase 1 (Days 3-7) via `/impeccable shape` + `/impeccable typeset` + `/impeccable colorize` + `/impeccable animate` + `/impeccable critique`.**

Phase 1 lock writes exact OKLCH values, type ramp values, motion curve cubic-beziers, and spacing scale into this file and `src/styles/tokens.css`. Until Phase 1 closes, every `TBD-Phase-1` below is a placeholder waiting on a skill output.

## Color

**Strategy:** **Committed** (per impeccable's color-strategy axis). One saturated color carries 30-60% of the identity surface. Not Restrained (one accent ≤10%), not Full palette (3-4 deliberate roles), not Drenched (surface IS the color).

**Format:** OKLCH only. Never raw hex, never `#000`, never `#fff`. Every neutral tinted toward the warm-tungsten brand hue (chroma ≥ 0.005, target 0.005–0.01).

**Theme:** dark. Forced by audience scene, not category reflex (see PRODUCT.md §strategic-principles for the physical-scene sentence).

### Role tokens (Phase 1 will fill values)

```
--bg-stage         /* deep tinted studio cove — chroma ≥ 0.005 toward warm hue, NOT #000 */
--surface          /* warm-tinted dark desk plane under subjects */
--key-light        /* warm tungsten primary accent — carries the Committed strategy */
--rim-light        /* warm-cooler-than-key rim (locked Phase -1: rim IS used in V1) */
--ink              /* primary body text — WCAG AAA against --bg-stage */
--ink-muted        /* secondary text, captions — WCAG AA Large floor */
--vignette         /* corner darkening overlay */
```

**No `--fill-light` token in V1.** Fill is deferred until/unless `/impeccable critique` flags the key+rim look as too contrasty in Phase 1.

### Phase 1 OKLCH target ranges (skill will sharpen)

```
--key-light:   oklch(0.72 0.16 ~65deg)   /* warm tungsten — finalized Phase 1 */
--rim-light:   oklch(0.78 0.10 ~75deg)   /* warm, cooler than key — finalized Phase 1 */
--bg-stage:    oklch(0.12 0.008 ~65deg)  /* deep cove, slight warm tint */
```

These are *anchors*, not locked. `/impeccable colorize` will validate WCAG AAA contrast and tune.

## Lighting (LOCKED Phase -1)

| Light | Status | Color direction |
|---|---|---|
| **Key** | Required | Warm tungsten (~3000K hue equivalent in OKLCH) |
| **Rim** | **Used in V1** | Warm, slightly cooler than key (~3200K hue equivalent) — solves subject/dark-cove separation while staying on-brand vs the cool-blue rim cliche |
| **Fill** | NOT used in V1 | Add only if Phase 1 `/impeccable critique` flags flatness |

Why warm rim instead of cool: the cool-blue rim is the default photographer move and exactly what lands in the second-order AI-slop "editorial dark portfolio" reflex. Two warm sources at different angles is the unusual choice the photographer-engineer identity earns.

## Typography

**Direction (Phase 1 lock):**
- **Display / headlines:** characterful serif — candidates: Fraunces, EB Garamond, Recoleta. Final via `/impeccable typeset`.
- **Body:** humanist sans — candidates: IBM Plex Sans, Geist Sans, General Sans. **Never Inter.**
- **Mono:** JetBrains Mono / Geist Mono / IBM Plex Mono

**Constraints:**
- Open-source / free for commercial use
- Self-hosted at `/public/fonts/` (LCP control)
- Total font weight payload ≤ 60KB
- ≤ 4 weights across the site
- Variable fonts preferred (one file = multiple weights)
- Hierarchy ratio ≥ 1.25 between scale steps (impeccable law)
- Body line length 65-75ch (impeccable law)

## Motion

- ≤ 3 easing curves total across the site
- Ease-out exponential only (ease-out-quart / quint / expo). No bounce, no elastic.
- Concentrated on high-impact moments: focus-pull, navigation, bulb illumination
- All non-essential motion gated by `prefers-reduced-motion: reduce`
- Never animate CSS layout properties (impeccable law)
- INP ≤ 200ms during any interaction
- NO parallax on scroll (vestibular safety)

## Spacing & rhythm

**Phase 1 lock.** Skill output will populate a vary-by-context scale (impeccable: "vary spacing for rhythm; same padding everywhere is monotony"). Anchors:

- Generous whitespace as default — design as photographic composition
- Container width ≤ 1200px for body; case-study text column 65-75ch
- No "wrap everything in a container" reflex (impeccable law)

## Components

**Phase 1 + Phase 2 will populate.** Anti-patterns enforced at design-system rule level (`.claude/rules/design-system.md`). Highlights:

- No card nesting. Ever.
- Cards used only when truly the best affordance (impeccable: cards are usually lazy).
- No hero-metric template (big number + small label + supporting stats + gradient).
- No identical-card-grid project listings — the StudioTable composition replaces this.
- No modal as first thought.

## Effect-cutting priority (if perf budget bites)

Pre-committed order. Cuts halt at first level that brings CWV gates green:
1. Film grain magnitude → grain entirely
2. DoF blur radius reduction → DoF entirely
3. Italic font weight (keep roman + bold only)
4. Vignette opacity → vignette entirely
5. R3F texture quality (last cut — preserves the spotlight)

## Loaded by

`impeccable` skill's setup phase. Optional but strongly recommended (impeccable nudges if missing). Phase 1 outputs flow into this file.

## Related

- `PRODUCT.md` — user/brand/tone/anti-references this design serves
- `.claude/rules/design-system.md` — enforceable rules (bans, gates)
- `src/styles/tokens.css` — Phase 1 will write final OKLCH values here
- `spec/architecture.md` §3 — design language full spec
