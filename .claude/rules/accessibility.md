# Accessibility Rules

Loaded when writing UI, content, or making interaction decisions. Derived from `spec/architecture.md` §6.2.

## Hard floor: WCAG 2.2 AA on every route

Enforced by `axe-core` CI gate — zero AA violations across all routes. CI blocks merge on violation.

## Mandatory practices

1. **Semantic HTML5 landmarks** — `<header>`, `<main>`, `<nav>`, `<footer>`, `<article>` per page
2. **Alt text on every image** — Zod-enforced; missing alt = build fails
3. **Visible focus rings** — never remove the default outline without a strictly better replacement
4. **Keyboard navigation** — Tab through every interactive element; no keyboard traps
5. **Touch targets ≥ 44×44 px** (Apple HIG / WCAG 2.5.5)
6. **`prefers-reduced-motion: reduce`** — honored globally; reduced-motion variant of every animated component must exist
7. **Color contrast** — AAA for body text (≥7:1), AA Large for accent (≥3:1)
8. **Heading hierarchy** — no skipping levels; one `<h1>` per page

## WebGL accessibility (R3F bulb)

R3F canvas is opaque to screen readers. Therefore:
- Every piece of content reachable via 3D navigation MUST also be reachable via semantic HTML with no 3D
- The bulb scene has a static-illustration fallback under `prefers-reduced-motion`
- Team-member labels readable as plain text adjacent to (not only inside) the canvas
- Tab order through team-member affordances works without WebGL
- Adjacent framing copy ("The bulb is the AI Design Team...") is part of the semantic DOM, not WebGL text

## Reduced-motion specifics

Under `prefers-reduced-motion: reduce`:
- NO DoF transitions
- NO grain animation (static grain OK)
- NO idle filament flicker
- NO parallax (parallax is banned anyway)
- NO auto-orbit / camera moves
- Instant transitions instead of timed ones

## Vestibular safety (~35% of US adults affected per NIH NIDCD)

- No parallax on scroll
- No auto-orbit cameras
- No fast camera moves in 3D
- Reduced motion is the DEFAULT for newly added effects until proven safe

## Testing

- `axe-core` CI gate per route (zero AA violations)
- Manual keyboard nav before launch
- Manual screen reader test (NVDA / VoiceOver) on `/projects/ai-design-team` page (R3F + parallel DOM)
- Manual `prefers-reduced-motion` emulation in DevTools per major release
