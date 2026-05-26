---
project: ai-engineer-portfolio
type: standup-log
created: 2026-05-23
cadence: 30-min daily (per implementation-plan.md "Daily heartbeat")
---

# Standup Log

## Day 0 — 2026-05-23

**Shipped:**
- Phase -1 inventory check filed at `docs/inventory-check.md` (provisional: 3/3 slots greenlit pending user-supplied URLs; substitution path to `job-search-pipeline` named if any slot fails by Day 15)
- Build Lead session opened; tier confirmed **Internal** with explicit AI Engineer disengagement per `spec/scope.md` override (no AI runtime)
- Skill cross-check run against `frontend-design` + `impeccable` SKILL.md against existing `.claude/rules/design-system.md` — findings logged below

**Sequencing note:**
Phase 0 scaffold (`043b1ce`) ran *before* Phase -1 inventory check. This deviates from `implementation-plan.md` order. Treated as "Phase 0a — pre-inventory plumbing only" since scaffold does not presuppose any V1 surface existing. Remaining Phase 0 work (`.claude/rules/` population, PRODUCT.md/DESIGN.md seed for impeccable, design-reference route stub) gates on inventory-check exit criterion (no `TODO(user)` markers).

**Blocked / pending:**
- Real podcast URLs, repo links, and product/blog/website URLs from user (placeholders in place)
- PRODUCT.md + DESIGN.md need creation at project root before Phase 1 — required by impeccable's loader script

**Next:**
- User decision on the skill cross-check findings (4 design-system.md amendments + PRODUCT.md seed)
- After alignment: finish Phase 0 (rules, PRODUCT.md, DESIGN.md) → enter Phase 1 design lock with reference page

---

## Day 0 — 2026-05-23 (continued)

**Shipped (cross-check follow-through):**
- PRODUCT.md, DESIGN.md seeded at project root (impeccable loader requirements satisfied)
- `.claude/rules/design-system.md` amended: lighting locked to key+warm-rim (no fill V1), OKLCH discipline + Committed color strategy, 6 impeccable absolute bans added, hierarchy ratio + line length added
- `.claude/rules/content-conventions.md` amended: impeccable copy laws + voice from PRODUCT.md + forbidden phrases list

**Shipped (A — Phase 0 verification):**
- `lighthouserc.json` patched: added `resource-summary:script:size` ≤20480 byte gate (closes the THE-rule-that-forced-Astro-over-Next.js loophole — scope.md "≤20KB hydrated JS" was previously a stated CI block with no enforcement)
- `package.json`, `astro.config.mjs`, `.github/workflows/ci.yml`, `lighthouserc.json` audited against architecture §5, §6.1, §6.4-6.5

**Shipped (B — Phase 1 entry):**
- `docs/design-decisions.md` created with sections 1-5 LOCKED (register=brand, theme=dark+physical-scene-sentence, color-strategy=Committed, lighting=key+warm-rim-no-fill-V1, typography direction)
- Sections 6-10 framed as TBD slots Phase 1's skill invocations fill (typography pairing, OKLCH values, motion curves, spacing scale, critique findings)
- Decision-log pattern documented; coherence gates listed as a checklist

**Carry-forward (Phase 0 gaps that don't block Phase 1 but should land before Phase 2):**
- LH CI runs `preset: "desktop"` but architecture §6.1 / scope.md eval targets are anchored to mid-tier Android 4G (mobile). Either switch preset to mobile (binding constraint) or add a second LH config for mobile coverage.
- Mobile total page weight ≤150KB gate (§6.4) not enforced — depends on the mobile preset decision above.
- Cloudflare Pages connection: needs user action (GitHub → CF webhook). Will block Phase 0 exit criterion "push to main deploys to CF preview URL."
- `astro.config.mjs` site URL is placeholder `https://ai-engineer-portfolio.pages.dev`; update at launch with custom domain decision.
- `pnpm install` may not have been run yet — user should verify `pnpm dev` runs locally before Phase 1 reference page work begins.

---

## Day 0 — 2026-05-23 (Path 1 closeout)

**User decision:** Path 1 (close Phase 0 gaps before Phase 1) + run BOTH desktop and mobile LH CI presets.

**Shipped:**
- `lighthouserc.mobile.json` created: mobile preset, simulate throttling, **150KB total-byte-weight gate** (§6.4 mobile budget), 20KB script-size gate, all CWV gates mirror desktop config
- `lighthouserc.json` retained as desktop config (200KB total weight, desktop preset)
- `package.json` scripts split: `lh:desktop`, `lh:mobile`, `lh` runs both. Existing `ci.yml` `pnpm lh` step now exercises both presets without modification.

**Found during install state check:**
- **No `pnpm-lock.yaml` and no `node_modules` exist in the scaffold.** CI's `pnpm install --frozen-lockfile` will fail on first push. The scaffold commit at `043b1ce` did not run `pnpm install`. **Blocking Phase 0 exit.**

**User action items remaining for Phase 0 exit:**
1. Generate lockfile + verify dependencies resolve: `pnpm install` in `C:\projects\ai-engineer-portfolio\`. This may hit resolution failures on bleeding-edge pins (Astro 5, React 19, R3F 9, Drei 10) — per Build Lead lesson 2026-05-03 on dependency pinning. Resolve any conflicts, commit the lockfile.
2. Verify scaffold boots: `pnpm dev`, confirm `http://localhost:4321` serves a placeholder home.
3. Set up Cloudflare Pages: Cloudflare dashboard → Pages → Create project → Connect to GitHub → select `ai-engineer-portfolio` → build config: command `pnpm build`, output dir `dist`, root `/`, env `NODE_VERSION=20`, install command `pnpm install --frozen-lockfile`. Deploy main branch.
4. Push to main to trigger CI; confirm CI green + CF preview URL deploys.

**Next (after user closes the 4 items above):**
- Phase 0 exits, Phase 1 begins
- Open new session OR continue this one and invoke `/impeccable shape` against the locked design-decisions.md sections 1-5
- Phase 1 outputs flow into `docs/design-decisions.md` §6-10 plus `src/styles/tokens.css`

---

## Day 0 — 2026-05-23 (Phase 0 EXIT)

**Phase 0 exit criteria — all met:**

- ✅ `pnpm dev` works locally (placeholder home renders at http://localhost:4321)
- ✅ `pnpm check` + `pnpm build` pass clean (Astro 5.18, dist/index.html built in 3.7s)
- ✅ Push to `main` triggers CI green
- ✅ Cloudflare deploys to `*.pages.dev` URL
- ✅ Skills installed at `.claude/skills/` (frontend-design, impeccable)
- ✅ All design rules amended per skill cross-check (OKLCH, Committed strategy, key+warm-rim, impeccable copy laws + 6 absolute bans)
- ✅ PRODUCT.md, DESIGN.md seeded for impeccable loader
- ✅ docs/design-decisions.md §1-5 locked (register, theme + physical-scene sentence, color strategy, lighting, typography direction)

**Cloudflare deployment hiccup resolved:**
First create-attempt accidentally produced a Cloudflare Worker (with `npx wrangler deploy`) instead of a Pages project. Recreated as Pages; auto-publishes `dist/`. Spec-aligned per architecture §5.2.

**Repo:** https://github.com/gurub3174/ai-engineer-portfolio (public, main branch tracks origin)

**Commits (post-scaffold):**
- `d778bea` — close Phase 0: lockfile, build config, placeholder home, LH gates
- `7413026` — feat(design): seed PRODUCT.md/DESIGN.md, amend rules, decisions log
- `85fab0f` — docs(phase-0): content-conventions amendments + docs/

**Phase 1 handoff:** see `docs/phase-1-handoff.md`. Fresh `/build` session recommended over continuing this consult session.

**Next:**
- Phase 1 skill invocations: `/impeccable shape` → `/typeset` → `/colorize` → `/animate` → build reference page → `/critique` + `/audit`
- Section 10 critique prompt must explicitly name the second-order AI-slop test (per design-decisions.md §10)
- All Phase 1 outputs land in `docs/design-decisions.md` decision-log entries + `src/styles/tokens.css`

---

## Day 1 — 2026-05-23 (Phase 1 substantive lock)

**Shipped:**
- `/impeccable shape` — compact brief asserted against PRODUCT.md + locked §1-5; visual lane confirmed (studio, not editorial-typographic-magazine)
- `/impeccable typeset` — §6 locked: Source Serif 4 (display, 600) + Geist Sans (body, 400/600) + Geist Mono (mono, 400). Total 4 weights. Original §5 candidates Fraunces/Recoleta/Newsreader rejected against impeccable's reflex-reject list — those were second-order-trap fonts; substitutes documented.
- `/impeccable colorize` — §7 locked: 16 OKLCH tokens, hue anchor 65deg warm tungsten + 78deg rim. Contrast verified AAA on body, AA Large on accent (manual calculation; automated re-verify pending P1 axe repair).
- `/impeccable animate` — §8 locked: 3 ease-out exponential curves (quint/expo/quart), 4 duration tokens, global reduced-motion override.
- §9 spacing scale locked: Fibonacci-adjacent 8-step scale with intentional offsets from canonical 4/8/16/32 (10/26/42/68/110 instead of 8/24/40/64/96).
- `src/styles/{tokens,fonts,base}.css` created. Zero raw hex anywhere; OKLCH only.
- `src/layouts/BaseLayout.astro` + `src/pages/design-reference.astro` shipped. Reference page is the §3.8 coherence-gate artifact. Internal (noindex), throwaway scaffold; deleted before Phase 2 close.
- `public/fonts/README.md` + `scripts/install-fonts.mjs` (run `pnpm install-fonts` to fetch the three OFL families from upstream GitHub releases). Total payload budget enforced ≤60 KB.
- `/impeccable critique` — verbatim second-order test prompt used. **PASS.** Health score 24/32 applicable.
- `/impeccable audit` — health score 18/20. **One P1 blocker:** `pnpm a11y` non-functional due to Chrome 148 / ChromeDriver 149 drift. Pre-existing Phase 0 infra issue, surfaced by this audit attempt.

**Phase 1 §3.8 coherence gates:** 7/9 fully green · 1 partial (WCAG manual ✓, automated pending P1 fix) · 1 open (P1 axe repair).

**Build verification:** `pnpm check` 0 errors; `pnpm build` clean (2 pages); design-reference page ships 13.4 KB HTML / 3.6 KB gzip + 12.9 KB CSS + zero JS hydration. All perf budgets met with massive headroom.

**Carry-forward / known issues:**
- **P1:** axe-core CI gate broken (`npx browser-driver-manager install chrome` is the fix). Phase 1 closes the moment this runs green on `dist/design-reference/`.
- **P2:** Committed color strategy under-applied (~20% surface coverage outside studio composition vs 30-60% target). Address in Phase 2 with hover-tint on dividers or warm wash on grid backgrounds.
- **P2:** Source Serif 4 display weight could push further from editorial — micro-pass on `--ls-display` to -0.025em on display sizes after fonts install.
- **P3:** add skip-link to BaseLayout; drop two kicker numbers; run `pnpm install-fonts`.
- **Detector unavailable:** impeccable's `detect-antipatterns.mjs` engine missing from skill install — manual ban-list scan substituted. File upstream to skill maintainer; not blocking.
- Wider repo biome lint: 182 errors / 60 warnings across 41 files (mostly impeccable skill scripts in `.claude/skills/`). New Phase 1 files contribute 0 errors / 4 style-suggestion warnings — biome-clean for our additions.

**Next:**
- User runs `npx browser-driver-manager install chrome && pnpm a11y` to close the final coherence gate, then declares Phase 1 exit.
- Optional: `pnpm install-fonts` to validate the lock against the real Source Serif 4 / Geist faces (system fallbacks render correctly meanwhile).
- Then Phase 2 begins: About + Studio Home pages built using locked tokens. See `spec/implementation-plan.md` §Phase 2.

---

## Day 2 — 2026-05-24 (Phase 1 EXITED)

**User action:** ran `npx browser-driver-manager install chrome` (Chrome 149 + matching driver installed).

**Shipped (axe gate repair + Phase 1 close):**
- **Discovered the `pnpm a11y` script was wrong from Phase 0.** `axe ./dist --exit` tries to resolve `./dist` as a URL (DNS lookup → `net::ERR_NAME_NOT_RESOLVED`). axe-core CLI takes URLs, not paths; the `-d` flag is the OUTPUT directory, not input scan target. The original chromedriver-version failure was masking this script-form error.
- **`scripts/a11y.mjs`** written: self-orchestrating a11y CI gate. Spawns astro preview on port 4323, polls `/` until ready, walks `dist/` to discover every built route, passes URLs to axe, terminates preview (with Windows process-tree cleanup). Zero new dependencies. CI's existing `pnpm a11y` step unchanged.
- **First run surfaced 24 real violations** (23 contrast + 1 missing landmark on design-reference; 1 contrast on placeholder home). All fixed:
  - `--ink-faint` lifted from `oklch(0.55 0.012 65)` → `oklch(0.68 0.014 65)`. Original OKLCH-as-luminance estimate (~4.7:1) overstated real contrast (~4.3-4.7:1 on small text). New value passes ~6.9:1 on bg-stage / ~5.9:1 on surface.
  - Opacity multipliers (`opacity: 0.7` / `0.8`) removed from `.swatch span` and `.motion-meta`. Compounded on top of muted ink, dropped effective contrast below AA. Replaced with `--ink-muted` token where secondary emphasis was needed.
  - `<main>` landmark added to `design-reference.astro` (WCAG 1.3.1).
  - Skip-link added to `design-reference.astro` (was a P2 from yesterday's critique).
  - Phase 0 placeholder home (`src/pages/index.astro`) `.meta` opacity removed (same root cause as muted-ink-plus-opacity issue above).
- **Final `pnpm a11y` run:** "Testing complete of 2 pages, 0 violations" on `/` and `/design-reference`.
- `docs/design-decisions.md` revised: header marked CLOSED, gate list flipped (all 9 green), §7 contrast matrix updated, Day 2 decision-log entry written.

**Phase 1 §3.8 coherence gates: 9 of 9 green. Phase 1 EXITED 2026-05-24.**

**Lessons captured (worth keeping in mind for Phase 2 and beyond):**
- **OKLCH lightness is not relative luminance.** WCAG contrast math uses sRGB relative luminance. OKLCH L is perceptual lightness — close enough for design intuition, NOT close enough for "this passes AAA by my math." Always run automated axe to verify.
- **Opacity as secondary-emphasis is unsafe on muted ink.** Use dedicated `--ink-*` tokens instead. Opacity compounds with background-bleed-through in ways that AA math doesn't predict.
- **Broken CI gates hide future violations.** The original `axe ./dist` form returned exit 1 due to script error, which CI would have reported as "a11y failed" indistinguishably from "a11y found violations." Worth a CI lint that confirms gates produce expected output shape, not just exit codes.

**Next:**
- Phase 2 begins. About + Studio Home built on locked tokens. See `spec/implementation-plan.md` §Phase 2.
- Optional out-of-band: `pnpm install-fonts` to render the real Source Serif 4 / Geist faces (system fallbacks currently in play).
- Carry-forward P2 from yesterday's critique: Committed-strategy dosage micro-pass (more warm tungsten on non-studio surfaces). Address during Phase 2 home-page build.

---

## Day 3 — 2026-05-24 (Phase 2 home build, in progress)

**Shipped (this session):**
- Phase 2 home page v1 built (rectangular composition, 3 products in a row with cast shadows + rim + DoF + entrance animation). axe gate green, build clean, zero hydrated JS.
- Phase 2 home page v2 iteration (softbox visible left + table right + light cone) per user feedback "I want a real studio scene." axe gate green.
- `docs/phase-2-home-brief.md` authored + user-approved as the source-of-truth brief for `/frontend-design` invocation.
- User generated AI reference image (Midjourney-style, 16:9, warm tungsten studio scene with round wooden tabletop) saved at `docs/reference-home-scene.png`.
- `/consult-build-lead` pre-engineer validation pass run against impeccable + PRODUCT.md anti-references + locked Phase 1 decisions. Reference clears the 27 absolute bans and the second-order editorial-dark-serif trap. Five tweaks surfaced before engineering (see `docs/design-decisions.md` §11).
- User decisions logged: printer-as-hero (not mic), bulb-on-side, subtle rim per Phase 2 amendment.
- `docs/design-decisions.md` §11 written: Phase 2 reference-driven composition lock + flagged architecture amendments.

**Architecture amendments flagged (need explicit user sign-off; NOT silently applied):**
- `spec/architecture.md` §4.1 "equal-weight" → "asymmetric hero composition; navigation weight equal, visual weight asymmetric"
- `spec/architecture.md` §4.3 R3F bulb default: "upright with idle flicker" → "starts on-side (matches home), animates to upright + illuminates on click"

Documented in `docs/design-decisions.md` §11 with full rationale. To be applied to `spec/architecture.md` after user signs off post-build.

**Blocked / pending:**
- None on the critical path.

**Next:**
- Rebuild `src/pages/index.astro` to match reference composition (round table, 3/4 view, printer-hero, bulb-on-side, mic-standing, asymmetric scatter, subtle rim).
- Verify build + a11y after rebuild.
- Side-by-side eye-check vs. `docs/reference-home-scene.png`.
- `/impeccable critique` pass once user is satisfied with composition.
- User sign-off on flagged architecture amendments.

---

## Day 3 — 2026-05-24 (continued, late session)

**Shipped (this build run):**
- Phase 2 home v3 CSS-built composition shipped, user identified realism ceiling (fake-looking pedestal table, cartoonish softbox face, products misaligned to table geometry).
- Strategic fork surfaced: CSS-rendered vs raster vs 3D-modeled vs hybrid. Build Lead recommendation: hybrid (raster background + CSS interactive layer). User approved.
- User regenerated home scene image via ChatGPT image-gen (2026-05-24 04:08). New asset substitutes binder for printer (intentional). Hero remains doc-extractor; visual hero moves to foreground-right (asymmetric rule-of-thirds), user explicit approval: "even though it's on the right it still looks like the hero."
- Asset moved: `docs/ChatGPT Image May 24, 2026, 04_08_17 AM.png` → `src/assets/home-scene.png` (Astro Image processing requires `src/`).
- `docs/asset-licenses.md` created. ChatGPT image-gen confirmed commercially usable per OpenAI Terms of Use.
- `docs/design-decisions.md` §11 expanded with Phase 2 rebuild amendment: raster-hero + CSS interactive layer + spotlight (replaces DoF blur) + binder-for-printer substitution + asymmetric hero-on-right.
- **`src/pages/index.astro` v4 rewritten** as raster + CSS interactive layer:
  - Astro `<Picture>` component generates AVIF + WebP variants at build time
  - Three hotspots positioned over products via percentage coordinates (44×44 min touch targets enforced)
  - **Spotlight hover effect** via `@property`-registered custom properties (`--spot-x`, `--spot-y`, `--spot-darken`, `--spot-radius`) animated via CSS `transition`. `:has()` selector updates spotlight to focused hotspot's position.
  - Placards row below studio, aligned to product X coordinates
  - Pitch swap area below placards (binder default, swaps via `:has()`)
  - Entrance animation: spotlight sweeps scene on load (binder → bulb → mic → settles on hero), gated by `prefers-reduced-motion`
  - Mobile responsive: aspect-ratio adjusts, placards stack vertically on narrow viewports
- `/build` pipeline invoked formally for this rebuild. Tier engagement matrix applied: Build Lead full, Code Reviewer (pending self-pass), AI Engineer disengaged per scope override, Pattern Scout resolved inline (Apple product pages + Stripe hero diagrams + Linear feature graphics — synthesis: raster + percentage hotspots + spotlight pseudo-element).

**Pattern Scout Top-3 prior art (this session):**
1. Apple product pages (AirPods/iPhone) — cursor-tracked spot mask on full-bleed product photography. Closest analog.
2. Stripe homepage hero diagrams — percentage-positioned absolute `<a>` overlays. Confirms hotspot positioning pattern.
3. Linear "Method"/"What's new" feature graphics — static photography with dot-marker callouts. Confirms placard system.

**Architecture amendments still flagged** (need user sign-off before applying to `spec/architecture.md`):
- §4.1 equal-weight → asymmetric hero composition
- §4.3 R3F bulb default state: upright + flicker → on-side, animates to upright + illuminate on click

**Pending (this session, before close):**
- `pnpm build` clean run
- `pnpm a11y` 0 violations on both routes
- Code Reviewer self-pass on the diff (Build Lead acts as Reviewer for Internal-tier passes 1-3)
- Manual visual check by user

**Next:**
- User eye-checks the v4 build against `src/assets/home-scene.png` reference
- Tune hotspot coordinates / spotlight radii / placard positions if user reports misalignment
- `/impeccable critique` pass once composition is locked
- User sign-off on flagged architecture amendments → apply to `spec/architecture.md`

---

## Day 3 — 2026-05-24 (continued, v5 layered build)

**User feedback on v4:**
- Spotlight + hotspot bbox is "a debug rectangle, not a designed affordance"
- Names below image are disconnected from products
- Wanted real highlight-with-lighting

**Decision:** move from single-raster to layered cutouts (Path B from the consult). User extracted 4 transparent PNGs via ChatGPT: empty background + binder + mic + bulb (saved in `docs/`).

**Important: bulb is now upright (not on side).** Retracts the queued §4.3 architecture amendment. Original spec stands.

**Custom highlight recipe locked (per user):** halo (Recipe A) + camera focus pull (Recipe B) + bulb filament ignition + binder default-focused.

**Shipped this session:**
- 4 cutout assets moved into `src/assets/` with consistent `home-*.png` naming
- `src/pages/index.astro` v5 written — layered Picture components, per-product highlight via :has(), captions inline beside cutouts, pitch swap below
- Highlight: focused product gets warm key-light halo (drop-shadow in key-light hue, not box-shadow glow) + brightness 1.12 + saturate 1.06 + scale 1.025
- Non-focused: blur 2.5px + brightness 0.86 + saturate 0.92 (real DoF feel)
- Bulb-specific: brightness 1.32 + saturate 1.22 + double-stacked halo (key + rim) + slower transition (cinematic ignition reads gradual)
- Cast shadow per cutout via drop-shadow, directional to lower-right (matches softbox upper-left key)
- Binder default-focused on page load
- Captions inline under each cutout (Plate + Name)
- Pitch row below studio swaps to focused subject
- Entrance: staggered fade-in (binder 380ms, mic 520ms, bulb 660ms)
- Responsive: scene rotates to 4:3 at ≤900px, 3:4 at ≤640px with repositioned products
- `docs/asset-licenses.md` updated with 4 new entries
- `docs/design-decisions.md` §11 amended with v5 details + §4.3 retraction

**Verification:**
- `pnpm build` clean
- `pnpm a11y` 0 violations on both routes (/ and /design-reference)
- Asset weights: AVIF variants total ~140KB across all 4 images at desktop (browser picks smaller variants per viewport)
- **Home page total at desktop (AVIF): ~190 KB** — at the 200KB target, well inside 500KB hard fail
- Zero hydrated JS

**Architecture amendments status:**
- §4.1 equal-weight → asymmetric hero: **still queued** for user sign-off
- §4.3 bulb on-side → upright: **RETRACTED** (cutout is upright; original spec stands)

**Next:**
- User eye-checks v5 in browser (`pnpm dev` → http://localhost:4321/)
- Tune product positions / sizes / highlight intensity per user feedback
- `/impeccable critique` once composition feels locked
- User sign-off on the remaining §4.1 amendment

---

## Day 4 — 2026-05-25 (v11 home: wide bg + 4-up risks)

**User direction (reference image supplied):**
- New full-bleed background `docs/background wide.png` (wide composition: softbox left-of-center, round table on the right)
- Identity top-left (uppercase mono wordmark), nav top-right, both overlaid on the scene
- Hero copy block (title + subhead + CTAs) on the left dark cove
- Existing product cutouts (binder/mic/bulb) re-anchored to the right-side table
- Risks grid: 2x2 → 4-up row of editorial plates

**Shipped:**
- `src/assets/home-bg-wide.png` copied from `docs/`; Astro `<Picture>` pipeline emits 4 AVIF widths (largest 36 KB compressed from 1408 KB source)
- `src/pages/index.astro` v11 — full-bleed studio scene (escapes `--container-wide`), nav overlaid on top, hero overlay locked to left third, products re-positioned (bulb 60%, binder 76% hero, mic 92%), 4-up risk grid with "Failure pattern / Design response" mono labels, primary CTA promoted to solid warm-tungsten button to match reference
- Identity switched from serif → uppercase Geist Mono with key-light separator (matches reference; consistent with locked typography meta role)
- Site nav z-index 4 over scene; scene-tint gradient retuned (78%→0 left-to-right) to guarantee AA on overlaid title

**Impeccable critique pass (manual — detect.mjs bundle missing):**
- 0 hard blockers from the 27-rule anti-pattern list (no hex / side-stripes / gradient text / glassmorphism / hero-metric / nested cards / banned fonts / bounce-easing / backdrop-filter abuse)
- P1: em dash in `aria-label` — FIXED (`"Guru Balamurugan, home"`)
- P1: risks-section heading hierarchy was inverted vs. reference — FIXED (now H2 = "Where AI initiatives break.", deck = "Most projects fail in predictable ways. I focus on the layers that make AI systems reliable.")
- P2: hairline divider above "Design response" label restored on each plate (impeccable spacing law — vary for rhythm)
- P2: per-plate numeral accent rotation across locked tokens (key / key-soft / rim / key) so each plate has distinct identity without introducing new colors
- P2 declined: top-nav contrast guard (defensive only; current bg dark enough at top)

**Verification:**
- `pnpm check` clean (0 errors / 0 warnings / 0 hints across 9 files)
- `pnpm build` clean (3 pages built, 4.12s)
- New bg AVIF 36 KB largest variant — home weight envelope still inside ≤200 KB target

**Out of scope this session (deferred):**
- Real-device responsive eye-check on Android mid-tier (next session)
- `pnpm a11y` re-run on built `dist/` (next session — type/build gates passed, axe gate not re-validated)
- Lighthouse CWV re-baseline against new hero bg

**Next:**
- User eye-check in browser (`pnpm dev` → localhost:4321), particularly product position alignment on the new table geometry
- Re-run `pnpm a11y` and `pnpm lh` once positions are locked
- Then commit v11
