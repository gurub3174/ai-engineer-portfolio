# AI Engineer Portfolio

Personal portfolio site for a junior AI/Data Engineer. Built with Astro + MDX + R3F.

**Live:** TBD (custom domain at launch)
**Status:** Scaffold complete; Phase -1 inventory check pending

## Quick start

```bash
pnpm install
pnpm dev   # local at http://localhost:4321
```

## CI gates (block merge if failing)

- `astro check` — type safety
- `biome check` — lint + format
- `lighthouse-ci` — performance budget (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1, page weight ≤200KB)
- `axe-core` — WCAG 2.2 AA compliance (zero violations per route)

Vitest + Playwright deferred per `spec/critical-review.md` finding L2; add if visual regression bites.

## Architecture

See `spec/architecture.md`. Headlines:
- Astro static-first + MDX content collections
- R3F island only on `/projects/ai-design-team`
- Product-photography design language (key light required, rim/fill optional)
- WCAG 2.2 AA with full 2D-accessible fallback for all R3F content
- Cloudflare Pages hosting (free tier, unlimited bandwidth)

## Building

The full design package lives in `spec/`. The Build Lead reads `spec/scope.md` at session start.

```bash
/consult-build-lead   # routine questions
/build                # sprint pipeline
```

## License

(TBD — likely MIT for code, content reserved)
