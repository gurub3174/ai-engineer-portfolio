---
project: ai-engineer-portfolio
type: design-decisions-log
created: 2026-05-23
phase: 1 (entering)
status: in-progress — Phase 1 will fill TBD sections
---

# Design Decisions Log

The artifact Phase 1 reads and writes as it locks the design language. Skill outputs (`/impeccable shape`, `/typeset`, `/colorize`, `/animate`, `/critique`) get recorded here so the trail is auditable.

Pre-Phase-1 decisions are locked already (sections 1-5 below). Phase 1's job is to fill sections 6-10 via the skills, then run `/impeccable critique` against the reference page to validate the whole stack.

---

## 1. Register (LOCKED — pre-Phase-1)

**Decision:** `brand` register.

**Why:** This site IS the marketing asset. Design serves identity and differentiation, not a product workflow. Per impeccable's register taxonomy: "marketing, landing, campaign, long-form content, portfolio" = brand register. Loads `reference/brand.md` from the impeccable skill on every invocation.

---

## 2. Theme (LOCKED — pre-Phase-1)

**Decision:** dark.

**Physical-scene sentence (the forcing function, per impeccable):**

> *Hiring manager scanning 30 portfolios on a 14-inch laptop at 2pm in fluorescent office light, mind already full of identical white-on-white AI/SaaS sites; the dark studio frame is the contrast they didn't expect.*

The sentence forces dark by audience+context, not category reflex. If the audience were data engineers scanning Linear-style tooling docs at home, the answer would be different.

**Why not light:** light is the saturated default for AI/SaaS portfolios — Vercel-cream, Linear-light, Substack-cream. Light would put the site in the first-order category reflex (PRODUCT.md anti-references). Dark is differentiation that holds *only* because the photographer-engineer identity earns the studio metaphor.

---

## 3. Color strategy (LOCKED — pre-Phase-1)

**Decision:** **Committed** (impeccable's 4-step axis: Restrained / **Committed** / Full palette / Drenched).

**What carries the 30-60% identity surface:** warm tungsten key-light hue. Present on lit-subject highlights, hover states, accent text, and one or two surface tints. Not omnipresent — restrained-by-comparison still applies on case-study body surfaces where reading dominates.

**Why not Restrained:** "tinted neutrals + one accent ≤10%" would make the photography-studio metaphor invisible. The whole point is that the warm light IS the brand — it can't be a 10% garnish.

**Why not Full palette or Drenched:** more colors would dilute the single-light-source story. The photographer-engineer identity rests on disciplined exposure, not paint-by-numbers.

---

## 4. Lighting (LOCKED — pre-Phase-1)

| Light | Status | Hue direction |
|---|---|---|
| **Key** | Required | Warm tungsten (~3000K hue equivalent in OKLCH) |
| **Rim** | **Used in V1** | Warm, slightly cooler than key (~3200K hue equivalent) |
| **Fill** | NOT used in V1 | Add only if `/impeccable critique` flags key+rim as too contrasty |

**Why warm rim instead of the conventional cool-blue rim:** the cool-blue rim is the default photographer move and lands squarely in the second-order AI-slop "editorial dark portfolio" reflex (PRODUCT.md anti-references). Two warm sources at different angles is the unusual choice the photographer-engineer identity earns. Cooler-than-key (but still warm) provides subject/cove separation without the cliche.

**Why no fill in V1:** fill would lift shadow detail and soften the high-contrast feel. Keep the dramatic photographic identity; revisit only if critique flags flatness.

---

## 5. Typography direction (LOCKED — pre-Phase-1; pairing finalized in Phase 1 §6)

- **Display / headlines:** characterful serif — candidates: Fraunces / EB Garamond / Recoleta
- **Body:** humanist sans — candidates: IBM Plex Sans / Geist Sans / General Sans. **NEVER Inter.**
- **Mono:** JetBrains Mono / Geist Mono / IBM Plex Mono
- Constraints: open-source, self-hosted at `/public/fonts/`, ≤60KB total payload, ≤4 weights, hierarchy ratio ≥1.25, body line length 65-75ch

Exact pairing locked in §6 below by `/impeccable typeset`.

---

## 6. Typography pairing (TBD — Phase 1 via `/impeccable typeset`)

To be filled. Expected output:
- Final display font + weight(s) chosen
- Final body font + weight(s) chosen
- Final mono font + weight(s) chosen
- Scale ramp (e.g., 12 / 15 / 18 / 22 / 27 / 34 / 42 px with 1.25 ratio)
- Rationale: why these three together, what was rejected from the candidates, how it serves the brand register

---

## 7. Exact OKLCH color values (TBD — Phase 1 via `/impeccable colorize`)

To be filled in both this file and `src/styles/tokens.css`. Expected output:
- Final OKLCH values for: `--bg-stage`, `--surface`, `--key-light`, `--rim-light`, `--ink`, `--ink-muted`, `--vignette`
- WCAG AAA contrast verification matrix (ink × surface, ink-muted × surface, key-light × bg-stage)
- Rationale on chroma choice (impeccable: chroma ≥0.005 on neutrals, target 0.005-0.01 toward warm hue)

---

## 8. Motion curves (TBD — Phase 1 via `/impeccable animate`)

To be filled. Expected output:
- ≤3 cubic-bezier curves total: one for focus-pull, one for navigation, one optional for R3F bulb illumination
- Duration table per interaction
- Reduced-motion fallback specification
- Rationale: why ease-out exponential family (impeccable law), what bouncy/elastic options were rejected

---

## 9. Spacing & rhythm scale (TBD — Phase 1)

To be filled. Expected output:
- Spacing scale (varying intervals — not uniform, per impeccable "same padding everywhere is monotony")
- Container constraints (body column 65-75ch; full-bleed exceptions named)
- Vertical rhythm baseline
- Rationale on where to break the scale deliberately

---

## 10. Reference page critique (TBD — Phase 1 close)

To be filled when the reference page exists. Expected entries:
- `/impeccable critique` output (full)
- `/impeccable audit` output (a11y + perf checks)
- **Second-order AI-slop test** explicitly named in the critique prompt: *"Does this read as an editorial-dark-serif portfolio (second-order reflex per PRODUCT.md anti-references) or does the photographer-engineer differentiator land in <2 seconds?"*
- All §3.8 coherence gates checked off
- Any decisions revised based on critique findings (decision log: what changed, what evidence, who decided)

---

## Decision log pattern (use for every Phase 1 lock)

When Phase 1 closes a TBD section above, append an entry below:

```
### [YYYY-MM-DD] — <decision title>

**Triggered by:** <skill invocation or critique finding>
**Decision:** <what was chosen>
**Alternatives considered + rejected:** <what else was on the table + why not>
**Evidence anchor:** <skill output filename, /critique transcript line, etc.>
**Coherence gate impact:** <which §3.8 gate this satisfies>
```

---

## Coherence gates (per architecture §3.8 — Phase 1 must pass ALL before Phase 2)

- [ ] Single typography pairing locked (§6)
- [ ] ≤4 font weights total (§6)
- [ ] ≤3 motion easing curves total (§8)
- [ ] ≥80% styled components use color tokens (§7 plus build review)
- [ ] Lighting decision locked (§4 ✅ already locked pre-Phase-1)
- [ ] Grain magnitude + DoF radius + vignette opacity locked (Phase 1 reference page tunes these)
- [ ] WCAG AA contrast verified (§7 colorize output)
- [ ] `/impeccable critique` + `/impeccable audit` pass with zero blockers (§10)
- [ ] Second-order AI-slop test passes — photographer-engineer differentiator legible <2s (§10)

---

## Related

- `PRODUCT.md` — brand context this design serves
- `DESIGN.md` — tokens (Phase 1 sharpens)
- `.claude/rules/design-system.md` — enforceable design rules
- `.claude/rules/content-conventions.md` — voice + copy laws
- `spec/architecture.md` §3 — original design-language spec (mildly stale on color format; this file + DESIGN.md authoritative for build)
