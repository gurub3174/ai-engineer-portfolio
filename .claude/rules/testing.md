# Testing Rules

Loaded when writing or modifying tests. Derived from `spec/architecture.md` + `spec/test-plan.md`.

## What's tested in V1

| Test type | Tool | Status | Notes |
|---|---|---|---|
| Type safety | `astro check` | ✅ CI gate | TypeScript strict mode |
| Lint + format | `biome` | ✅ CI gate | Single tool, replaces ESLint + Prettier |
| Performance | Lighthouse CI | ✅ CI gate | `lighthouserc.json` asserts CWV budgets |
| Accessibility | `@axe-core/cli` | ✅ CI gate | Zero AA violations per route |
| Unit tests | Vitest | ⏸ Deferred (Critic L2) | Add only when visual regression bites |
| E2E tests | Playwright | ⏸ Deferred (Critic L2) | Add only when needed |
| Visual regression | Manual | ⏸ Manual only | Cold-reader test pre-launch |
| Cross-browser smoke | Manual | ⏸ Manual only | Pre-launch + quarterly |

**Deferral rationale (per `spec/critical-review.md` L2):** for a 5-route static content site with no functional state, Playwright + Vitest are overengineering. Re-add reactively when:
- A visual bug ships and we want to prevent regression
- A component grows enough state to warrant unit tests
- E2E flows emerge (form submission, contact, etc.)

## CI workflow (`.github/workflows/ci.yml`)

Every PR runs:
1. `pnpm install` (frozen-lockfile)
2. `pnpm check` (Astro Check)
3. `pnpm lint` (Biome)
4. `pnpm build`
5. `pnpm a11y` (axe-core on built `dist/`)
6. `pnpm lh` (Lighthouse CI)

All steps must pass. Failure blocks merge.

## Manual tests (pre-launch checklist)

Per `spec/test-plan.md`:

- [ ] Cold-reader test on the R3F bulb metaphor (Critic M1)
- [ ] Real-device performance test on mid-tier Android 4G (Pixel 6a or equivalent)
- [ ] Cross-browser smoke (Chrome, Safari, Firefox, Edge, iOS Safari, Android Chrome)
- [ ] Manual keyboard nav across all routes
- [ ] Manual screen reader test on R3F page
- [ ] `prefers-reduced-motion` emulation per major release
- [ ] §3.8 Coherence Gates passed (Phase 1 reference page)
- [ ] §6.5 Mobile Acceptance Criteria passed

## Writing unit tests (when added)

When Vitest gets reintroduced:
- One test file per component (`*.test.ts` adjacent to source)
- Test the **contract**, not the implementation
- Mock external services at the network boundary, not deep inside
- Snapshot tests only for stable outputs (not for layout)
- Coverage is not a target; behavior is

## Writing E2E tests (when added)

When Playwright gets reintroduced:
- One `.spec.ts` per critical user journey (J1-J5 in `spec/product-spec.md`)
- Real browser, real navigation, no mocking
- Test on the built `dist/` output, not dev server
- Test critical path only — don't try to cover every route

## Anti-patterns

- Test coverage as a target metric → goodharted; behaviors matter, not lines
- Snapshot tests for layout → noisy and ignored after first churn
- Mocking everything → false confidence; integration > unit for this codebase
- "I'll add tests later" → no, you won't. If the test is worth writing, write it now.
