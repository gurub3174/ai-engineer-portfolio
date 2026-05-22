# Performance Rules

Loaded when writing code, choosing assets, or making architecture decisions. Derived from `spec/architecture.md` §6.1.

## Core Web Vitals — hard floor (75th percentile, mid-tier Android, throttled 4G)

| Metric | Target | CI Gate |
|---|---|---|
| LCP | ≤ 2.5s | >4.0s fails build |
| INP | ≤ 200ms | >500ms fails build |
| CLS | ≤ 0.1 | >0.25 fails build |
| TTFB | ≤ 600ms | (Cloudflare edge) |

## Page weight (compressed)

| Surface | Target | Gate |
|---|---|---|
| Home (desktop) | ≤ 200KB | >500KB fails |
| Home (mobile) | ≤ 150KB | >300KB fails |
| Hydrated JS (home) | ≤ 20KB | >50KB fails |
| R3F bundle (design-team page only) | ≤ 200KB | >300KB fails; degrade to static AVIF if exceeded |
| Font weight (total site) | ≤ 60KB | hard cap |

## Lighthouse score (required)

- Performance ≥ 95 median across routes
- Best Practices ≥ 95
- Accessibility = 100 (no exceptions)
- SEO ≥ 90 (warn-only)

CI runs `lighthouserc.json` on every PR; failures block merge.

## Image strategy

- AVIF preferred with WebP fallback, JPEG as last fallback
- Responsive `srcset` with `sizes` derived from layout
- **LCP hero image: eager-loaded with `fetchpriority="high"`** (NEVER lazy-load LCP)
- Below-fold images: native `loading="lazy"`
- Studio composite (home): single optimized AVIF (~80KB) rather than 3 separate object loads

## Font strategy

- Self-host all fonts at `/public/fonts/`
- `font-display: swap` for body fonts (prevent FOIT)
- `<link rel="preload">` for the LCP-critical font
- Variable fonts preferred (one file, multiple weights)
- No Google Fonts CDN (LCP killer + privacy concern)

## Third-party media (facade pattern — mandatory)

Naïve embeds cost 500KB-1.5MB per third-party JS load. Facade pattern is non-negotiable:

| Platform | Approach |
|---|---|
| YouTube | `lite-youtube-embed` (~5KB facade) |
| Vimeo | `vimeo-lazyload` or hand-rolled facade |
| Loom | Hand-rolled poster + click-to-load |
| Spotify | `<iframe loading="lazy">` + intersection observer |

## R3F island discipline

- Code-split via dynamic `import()` — never in the home bundle
- Lazy-load on route entry, not on hover
- Texture atlas + draco compression for glTF
- `Suspense` boundary with static AVIF fallback
- INP ≤ 200ms during interaction (test on real Android)
- Disable on `prefers-reduced-motion`
- Disable on `navigator.deviceMemory < 4` (mobile low-end)

## Effect-cutting priority (if budgets fail)

Pre-committed order from `spec/architecture.md` §3.6:
1. Grain magnitude → grain entirely
2. DoF blur radius → DoF entirely
3. Italic font weight
4. Vignette opacity → vignette entirely
5. R3F texture quality

Halt at first level that brings gates green. Record decision in `docs/perf-decisions.md`.

## CSS

- `lightningcss` minification (Vite config)
- Inline critical CSS via Astro's auto-inlining
- No `@import` chains (use bundling)
- Prefer CSS Grid + Flexbox; no layout libraries
- `backdrop-filter` allowed but profile on mid-tier Android

## CI / monitoring

- `lighthouserc.json` runs on every PR via GitHub Actions
- Bundle analyzer (`pnpm build` + `astro check`) reviewed manually per major change
- Real-device test (Pixel 6a or equivalent) before launch and quarterly thereafter
