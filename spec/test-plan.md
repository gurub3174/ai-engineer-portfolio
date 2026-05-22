---
project: ai-engineer-portfolio
type: test-plan
version: v1
created: 2026-05-22
---

# Test Plan — AI Engineer Portfolio

Acceptance criteria mapped from product-spec.md / architecture.md to validation tests.

## 1. Functional Tests

### 1.1 Content schema validation (load-bearing per Critic C1)

| Test | Method | Acceptance | Gate |
|---|---|---|---|
| All MDX projects parse | `pnpm astro check` | Zero errors | CI blocks merge |
| Required fields non-empty | Zod `.min(200)` | All 4 case-study fields ≥200 chars | Build fails |
| No stub content | Pre-commit regex hook | No "TODO", "Lorem ipsum", "Coming soon" strings | Commit blocked |
| Frontmatter complete | Zod parse | All required keys present | Build fails |

### 1.2 Routes render

| Route | Test | Acceptance |
|---|---|---|
| `/` | Manual + Lighthouse | StudioTable renders with 3 subjects, identity tagline visible |
| `/projects/podcast` | Manual | All 4 case-study sections render, embedded media facade works |
| `/projects/doc-extractor` | Manual | All sections render, GitHub link live, build logs inline |
| `/projects/ai-design-team` | Manual + interaction | R3F bulb default unlit, click illuminates, fallback works |
| `/now` | Manual | Markdown renders, date stamp visible |
| `/about` | Manual | 3-5 decoder pairs render, no user photos |
| `/contact` | Manual | Email + LinkedIn + GitHub links live |
| `/404` | Manual | In-character page renders on any bad URL |

### 1.3 Interaction tests

| Interaction | Acceptance |
|---|---|
| Hover subject on `/` | DoF transitions, other subjects blur, one-line pitch fades in |
| Click subject | Navigates to project page; same object as page hero |
| R3F bulb idle | Subtle filament flicker every ~6s on desktop; absent under `prefers-reduced-motion` |
| R3F bulb hover/scroll-into-view | Filament brightens, faint shadow forms on surface |
| R3F bulb click | Fully illuminates; team members fade in; tooltips on hover |
| Embed media facade | Click loads real iframe; no third-party JS until click |

## 2. Performance Tests (per architecture §6.1)

### 2.1 Lighthouse-CI assertions (CI gate per route)

| Metric | Target | Gate threshold |
|---|---|---|
| Performance score | ≥95 | <90 fails build |
| Accessibility score | 100 | <100 fails build |
| Best Practices | ≥95 | <90 fails build |
| LCP @ p75 | ≤2.5s | >4.0s fails build |
| INP @ p75 | ≤200ms | >500ms fails build |
| CLS @ p75 | ≤0.1 | >0.25 fails build |
| Total page weight (home) | ≤200KB compressed | >500KB fails |
| Total page weight (mobile home) | ≤150KB compressed | >300KB fails |
| Hydrated JS (home) | ≤20KB | >50KB fails |

### 2.2 Real-device performance test (manual, pre-launch)

| Test | Device | Network | Pass criteria |
|---|---|---|---|
| Home cold load | Pixel 6a (or equivalent mid-tier Android) | Throttled 4G | LCP visible ≤2.5s |
| Project page navigation | Same device | Same network | INP ≤200ms during focus-pull |
| R3F bulb interaction | Same device | Same network | No frame drops; bulb illuminates ≤500ms after click |

## 3. Accessibility Tests (per architecture §6.2)

### 3.1 Axe-core CI assertions (per route)

| Test | Acceptance |
|---|---|
| WCAG 2.2 AA violations | Zero per route |
| WCAG 2.2 AAA violations | Logged, not blocking |
| Color contrast ratio (body text) | ≥7:1 (AAA) |
| Color contrast ratio (accent text) | ≥4.5:1 (AA) or ≥3:1 (AA Large) |
| Touch target size | ≥44×44 px |
| Semantic landmarks | header / main / nav / footer present per page |
| Alt text on images | Zod-enforced; CI fails if missing |

### 3.2 Manual a11y checks

| Test | Method |
|---|---|
| Keyboard nav across entire site | Tab through every interactive element; focus rings visible |
| `prefers-reduced-motion` honored | DevTools emulate → reload → confirm no DoF / no grain / no idle motion |
| Screen reader on R3F page | NVDA or VoiceOver — all R3F content reachable via parallel DOM |
| `prefers-color-scheme: light` | Site is dark-first; light fallback gracefully degrades OR is explicitly N/A |

## 4. Coherence Gate (Phase 1 exit — per architecture §3.8)

Single design-language reference page must demonstrate ALL:

| Gate | Validation |
|---|---|
| ≤1 typography pairing | Visual audit of reference page |
| ≤4 font weights total | CSS introspection |
| ≤3 motion curves | CSS introspection (count `cubic-bezier` and named easing) |
| ≥80% components use color tokens | Grep audit: count `var(--*)` usage vs one-off hex |
| Lighting decision locked | Reference page documents it explicitly |
| Grain/DoF/vignette params locked | CSS custom properties present and used |
| WCAG AA contrast verified | axe-core clean on reference page |
| `/impeccable critique` passes | Zero blockers |
| `/impeccable audit` passes | Zero blockers |

## 5. Mobile Acceptance (per architecture §6.5)

| Test | Acceptance |
|---|---|
| ≤768px viewport: home composition | ONE focused subject + 2 in picker strip (NOT 3 stacked) |
| Identity tagline above the fold | Visible without scroll |
| At least one photographic effect | Vignette OR static grain present on mobile |
| Mobile page weight | ≤150KB compressed |
| F-pattern identity legibility | Name + title + tagline readable in first viewport |
| Real-device 4G test (Pixel 6a) | All metrics from §2.2 pass |
| Touch focus-pull | Tap-to-focus works; camera-curve transition |

## 6. Cold-reader test (per Critic M1)

**Pre-launch only — once.** Find someone unfamiliar with the project. Show them `/projects/ai-design-team` with the bulb. Ask:
- "What do you think this page is about?"
- "What do you think the bulb represents?"
- "What do you think will happen if you click it?"

**Pass criteria:** within 3 seconds of looking, the cold reader either correctly identifies the bulb-as-team metaphor OR identifies it as "interactive / clickable / a thing to explore." If they say "I don't know" or describe something off-target, **drop the metaphor** and replace with a different hero on this page only (e.g., simple grid of team-member icons).

## 7. Asset License Audit

All external assets must have license proof in `docs/asset-licenses.md`:

| Asset | License | Proof URL |
|---|---|---|
| Microphone | (Unsplash / Pexels / Blender-rendered) | Captured at use |
| Printer/Fax | Same | Same |
| Light bulb static | Same | Same |
| Light bulb 3D model | Original render OR CC0 / commercial OK | Same |
| Fonts (display, body, mono) | OFL / Apache | Same |

Build fails if any in-use asset is missing license proof.

## 8. Cross-browser smoke

| Browser | Version | Pass criteria |
|---|---|---|
| Chrome | Latest stable | All routes render, R3F works, DoF works |
| Safari | Latest stable (macOS + iOS) | All routes render, R3F works, backdrop-filter works |
| Firefox | Latest stable | All routes render, R3F works, DoF may degrade gracefully |
| Edge | Latest stable | All routes render (Chromium-based, basically Chrome) |
| iOS Safari | Latest | Mobile acceptance §5 |
| Android Chrome | Latest | Mobile acceptance §5 |

## 9. Ship Criteria validation (per architecture §11.5)

Pre-launch checklist. ALL must be ☑ before deploying to custom domain:

**Content gates:**
- [ ] `/projects/podcast` — ≥500 words across required sections, embedded media works, applicable links live
- [ ] `/projects/doc-extractor` — ≥500 words, GitHub link, ≥1 build log
- [ ] `/projects/ai-design-team` — ≥500 words, GitHub link, R3F bulb or static fallback shipped
- [ ] `/now` — populated, date stamp visible
- [ ] `/about` — 3-5 decoder pairs shipped
- [ ] `/contact` — all links live

**Quality gates:**
- [ ] All Zod schemas validate
- [ ] Lighthouse Performance ≥95, Accessibility = 100 on every route
- [ ] Axe-core zero AA violations on every route
- [ ] Real-device 4G Android: LCP/INP/CLS pass
- [ ] §3.8 Coherence Gates pass
- [ ] Cold-reader test passed
- [ ] §6.5 Mobile Acceptance pass
- [ ] Asset license audit clean

**Anti-criteria (must be FALSE):**
- [ ] Empty case-study sections
- [ ] Broken external links
- [ ] Console errors in browser devtools
- [ ] "Coming soon" placeholder pages

**Slip rule:** if launch date arrives with 2 of 3 projects ready, SHIP — add the third post-launch as a hotfix. Do not delay for "one more polish pass."
