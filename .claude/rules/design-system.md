# Design System Rules

Loaded when writing UI components, CSS, or motion code. Derived from `spec/architecture.md` §3.

## Lighting vocabulary (required)

- **Key light:** REQUIRED. Warm tungsten direction. The site's primary accent color derives from key-light hue.
- **Rim light:** OPTIONAL. Hard edge behind subject. Adds dimension.
- **Fill light:** OPTIONAL. Cool, lower-opposite. Lifts shadow detail.

Lighting decision (key only / key+rim / key+fill / key+rim+fill) locked during Phase 1 design-language reference page. Once locked, do not re-litigate.

## Photographic effects (CSS-based)

- **Depth of field** — focused subject sharp, others blurred via `backdrop-filter: blur(N px)`
- **Focus pull on hover** — smooth transition between blurred and sharp states; camera-curve easing (NO bounce/elastic)
- **Exposure shift on selection** — brief brightness lift; photographically credible illumination, not generic CSS glow
- **Film grain** — global SVG overlay with `mix-blend-mode: overlay`, magnitude tuned in Phase 1; reduced under `prefers-reduced-motion`
- **Vignette** — radial corner darkening, gentle attention focus

## HARD anti-patterns (banned — flagged by `/impeccable critique` or frontend-design)

- **Inter, Roboto, Arial, system-ui** body fonts — overused AI-slop. Use IBM Plex Sans, Geist Sans, General Sans, or equivalent characterful humanist sans.
- **Purple-to-blue gradients on white** — generic AI aesthetic
- **Rounded-square icon tiles above headings** — AI slop tell
- **Dark glow / CSS box-shadow halos** — AI slop. Use real photographic illumination (cast light + cast shadow on adjacent surfaces).
- **Bounce / elastic easing** — dated. Use ease-out / camera-curve cubic-beziers.
- **Card-nesting (cards inside cards)** — flat composition with photographic framing instead.
- **Pure black backgrounds** — use tinted dark (`#0a0a0a` or warmer) for grain texture
- **Cramped padding** — generous whitespace; design as composition

## Motion principles

- All non-essential motion gated by `prefers-reduced-motion: reduce`
- Reduced-motion fallback: instant transitions, no DoF, no grain animation, no parallax
- NO parallax on scroll (vestibular safety)
- Motion concentrated on **high-impact moments** (focus-pull, navigation, bulb illumination) — not scattered hover micro-interactions
- ≤3 motion easing curves total across the site (Phase 1 lock)
- INP ≤200ms during all interactions

## Color tokens (role-based, exact values locked Phase 1)

Use role tokens, never one-off hex values:

```
--bg-stage      /* dark studio infinity background */
--surface       /* warm-tinted dark desk plane */
--key-light     /* warm tungsten primary accent */
--rim-light     /* hard highlight (if rim used) */
--fill-light    /* cool secondary lift (if fill used) */
--ink           /* primary body text */
--ink-muted     /* secondary text, captions */
--vignette      /* corner darkening overlay */
```

**Hard constraint:** ≥80% of styled components use these tokens (not one-off hex). Enforced via design audit in Phase 1 §3.8 coherence gates.

**WCAG floor:** AAA contrast for body text, AA Large for accent text.

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
