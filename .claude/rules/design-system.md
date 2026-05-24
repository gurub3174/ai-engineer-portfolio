# Design System Rules

Loaded when writing UI components, CSS, or motion code. Derived from `spec/architecture.md` §3, `PRODUCT.md`, `DESIGN.md`, and the `impeccable` + `frontend-design` skill principles.

## Lighting vocabulary (LOCKED — do not re-litigate)

- **Key light:** REQUIRED. Warm tungsten direction (~3000K hue equivalent). The site's primary accent color derives from key-light hue.
- **Rim light:** **USED in V1.** Warm, slightly cooler than key (~3200K hue equivalent). Solves subject/dark-cove separation while avoiding the cool-blue-rim AI-slop reflex.
- **Fill light:** NOT used in V1. Add only if Phase 1 `/impeccable critique` flags the key+rim look as too contrasty.

Decision rationale: two warm sources at different angles is the unusual choice the photographer-engineer identity earns; cool-blue rim is the default photographer move and lands in second-order AI-slop "editorial dark portfolio" reflex (see PRODUCT.md anti-references).

## Photographic effects (CSS-based)

- **Depth of field** — focused subject sharp, others blurred via `backdrop-filter: blur(N px)`
- **Focus pull on hover** — smooth transition between blurred and sharp states; camera-curve easing (NO bounce/elastic)
- **Exposure shift on selection** — brief brightness lift; photographically credible illumination, not generic CSS glow
- **Film grain** — global SVG overlay with `mix-blend-mode: overlay`, magnitude tuned in Phase 1; reduced under `prefers-reduced-motion`
- **Vignette** — radial corner darkening, gentle attention focus

## HARD anti-patterns (banned — flagged by `/impeccable critique` or frontend-design)

### Project-specific bans
- **Inter, Roboto, Arial, system-ui** body fonts — overused AI-slop. Use IBM Plex Sans, Geist Sans, General Sans, or equivalent characterful humanist sans.
- **Purple-to-blue gradients on white** — generic AI aesthetic
- **Rounded-square icon tiles above headings** — AI slop tell
- **Dark glow / CSS box-shadow halos** — AI slop. Use real photographic illumination (cast light + cast shadow on adjacent surfaces).
- **Bounce / elastic easing** — dated. Use ease-out / camera-curve cubic-beziers.
- **Pure black backgrounds (`#000`)** — use tinted dark in OKLCH with chroma ≥0.005 toward warm hue. `#fff` also banned.
- **Cramped padding** — generous whitespace; design as composition
- **Raw hex tokens** — use OKLCH for all role tokens in `tokens.css`. Hex is the AI-slop tell for color systems (impeccable law).

### Impeccable absolute bans (apply to every component)
- **Side-stripe borders** — `border-left` or `border-right` >1px as a colored accent on cards, list items, callouts, alerts. Never intentional. Use full borders, background tints, leading numbers/icons, or nothing.
- **Gradient text** — `background-clip: text` combined with gradient background. Decorative, never meaningful. Use single solid color; emphasize via weight or size.
- **Glassmorphism as default** — blurs and glass cards used decoratively. Rare and purposeful, or nothing.
- **Hero-metric template** — big number, small label, supporting stats, gradient accent. SaaS cliche.
- **Identical card grids** — same-sized cards with icon + heading + text repeated endlessly. Use the StudioTable composition instead for projects.
- **Modal as first thought** — modals are usually laziness. Exhaust inline / progressive alternatives first.
- **Card nesting (cards inside cards)** — flat composition with photographic framing instead. Nested cards always wrong (impeccable).
- **Wrapping everything in a container** — most things don't need one (impeccable).

## Motion principles

- All non-essential motion gated by `prefers-reduced-motion: reduce`
- Reduced-motion fallback: instant transitions, no DoF, no grain animation, no parallax
- NO parallax on scroll (vestibular safety)
- Motion concentrated on **high-impact moments** (focus-pull, navigation, bulb illumination) — not scattered hover micro-interactions
- ≤3 motion easing curves total across the site (Phase 1 lock)
- INP ≤200ms during all interactions

## Color tokens (role-based, OKLCH, values locked Phase 1)

**Color strategy: Committed** (impeccable axis — one saturated color carries 30-60% of identity surface; warm tungsten is that color).

**Format: OKLCH only.** Never raw hex in tokens. Every neutral tinted toward warm-tungsten brand hue, chroma ≥0.005.

```
--bg-stage     /* deep tinted studio cove — OKLCH, chroma ≥0.005 warm */
--surface      /* warm-tinted dark desk plane under subjects */
--key-light    /* warm tungsten primary accent (~3000K hue) */
--rim-light    /* warm-cooler-than-key rim (~3200K hue) — V1 uses rim */
--ink          /* primary body text */
--ink-muted    /* secondary text, captions */
--vignette     /* corner darkening overlay */
```

No `--fill-light` in V1 (fill deferred per lighting decision above).

**Hard constraint:** ≥80% of styled components use these tokens (not one-off color values). Enforced via design audit in Phase 1 §3.8 coherence gates.

**WCAG floor:** AAA contrast for body text, AA Large for accent text. `/impeccable colorize` validates at Phase 1 lock.

## Typography

| Use | Direction (Phase 1 lock) |
|---|---|
| Display / headlines | Characterful serif: Fraunces / EB Garamond / Recoleta |
| Body | Humanist sans: IBM Plex Sans / Geist Sans / General Sans (**NEVER Inter**) |
| Mono | JetBrains Mono / Geist Mono / IBM Plex Mono |

- Open-source / free-for-commercial-use only
- Self-hosted at `/public/fonts/` for LCP control
- Total font weight ≤ 60KB
- ≤4 font weights across the site
- Variable fonts preferred (one file = multiple weights/optical sizes)
- **Hierarchy ratio ≥ 1.25 between scale steps** (impeccable law — avoid flat scales)
- **Body line length 65–75ch** (impeccable law — readability ceiling)
- Hierarchy expressed through scale + weight contrast, not color

## Effect-cutting priority order (if perf budgets bite)

Pre-committed order. Cuts halt at first level that brings CWV gates green:

1. Film grain magnitude → grain entirely
2. DoF blur radius reduction → DoF entirely
3. Italic font weight (keep roman + bold only)
4. Vignette opacity → vignette entirely
5. R3F texture quality (last cut — preserves the spotlight)

## Photographic effects on mobile (§6.5 acceptance)

- Vignette OR static grain MUST be preserved on mobile
- DoF can be reduced/disabled (backdrop-filter cost)
- One focused subject + 2 in picker strip (NOT 3 stacked)
- Identity tagline above the fold

## Coherence gates (§3.8) — Phase 1 must pass ALL

- [ ] Single typography pairing locked
- [ ] ≤4 font weights total
- [ ] ≤3 motion easing curves total
- [ ] ≥80% styled components use color tokens
- [ ] Lighting decision locked
- [ ] Grain/DoF/vignette parameters locked
- [ ] WCAG AA contrast verified
- [ ] `/impeccable critique` + `/impeccable audit` pass with zero blockers
