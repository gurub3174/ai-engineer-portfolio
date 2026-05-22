---
project: ai-engineer-portfolio
type: architecture
version: v3-final
created: 2026-05-22
updated: 2026-05-22
status: critic-resolved
critic_resolutions: all-13-findings-accepted
skill_principles_applied: [anthropics-frontend-design, pbakaus-impeccable]
tags: [ia, design-system, tech-stack, perf, accessibility]
---

# Architecture Design — AI Engineer Portfolio

**Status:** DRAFT v1 — pending user review before Design Critic dispatch.

## 0. Architecture Summary (the decisions, one line each)

| Decision | Choice | Adoption tier | Evidence anchor |
|---|---|---|---|
| Site framework | Astro (App content collections) | Mainstream (~50k) | Market Scout §2.4; best-in-class MDX, zero-JS default |
| 3D library | React Three Fiber + Drei | Mainstream (~30k, 700k wk npm) | Market Scout §2.5 |
| Hosting | Cloudflare Pages | Mainstream | Market Scout §2.6 (unlimited bandwidth, no commercial restriction) |
| Design metaphor | Product photography studio (lit subject on table) | — | User-specified; Höffler-Leutner d=0.40 representational vs ≈0 decorative |
| Navigation structure | 3 iconic objects = 3 featured surfaces (mic / printer / light bulb) | — | User-specified V1 scope |
| Home page render | Static stock-photo composite + CSS depth/lighting; NO R3F on first paint | — | Research §4.1-4.2 (CWV, bounce-rate); §9.2 (50ms credibility) |
| Spotlight 3D location | AI Design Team project page only — interactive light bulb in R3F | — | Höffler-Leutner; Path γ from synthesis; serves as frontend-competence proof |
| Content model | MDX in Astro content collections, per-project schema with build_logs[] and blogs[] nested | — | Brief IA decision (writing attached to projects, not standalone section) |
| Perf budget | LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 (75th-percentile, mid-tier Android on 4G) | Strong | Research §4.2 |
| Accessibility | WCAG 2.2 AA, `prefers-reduced-motion` honored, full 2D-equivalent path | Strong | Research §5.1-5.3 |
| Design skills install | anthropics/frontend-design + pbakaus/impeccable; superpowers optional; SKIP ui-ux-pro-max | Mainstream | Market Scout §2.3 |
| Embeds | Facade pattern (lite-youtube-embed, lazy Spotify iframe) | Mainstream Lighthouse-blessed | Market Scout §2.7 |
| Design language scope | Principle-level in spec; exact colors/typography/animation curves finalized in build using `frontend-design` + `impeccable` | — | User-directed; skill-aided refinement |
| Lighting | Key light required; rim and/or fill optional (build-phase designer call) | — | User-specified |

---

## 1. Information Architecture

### 1.1 Routes

```
/                           Home — studio table with 3 subjects
/projects/podcast           Podcast appearances (embedded media)
/projects/doc-extractor     CC/Distribution Parser (case study)
/projects/ai-design-team    AI Design/Build Team (R3F spotlight)
/now                        Currently learning / building (Karpathy-style thought-stream) [Critic M5 — V1]
/about                      Identity + photographer-engineer bridge
/contact                    Email, LinkedIn, GitHub
/404                        Custom (in-character with studio metaphor)
```

**`/now` requirement (per Critic M5):** single markdown file, ~100 words, manually updated monthly. The DATE on it is itself a signal — fresh = alive; stale = stale-and-honest. Costs ~3 build-hours; closes the "alive vs brochure" gap engineering HMs explicitly check for.

**V2 candidates (NOT in V1):**
- `/projects/job-search-pipeline` (additional object)
- `/projects/rag-data-experiment` (additional object)
- `/blog` (only if writing volume justifies a standalone surface)
- `/now` (Karpathy-style "currently learning" thought-stream)

### 1.2 Content Model — Astro Content Collections

```typescript
// src/content/config.ts
const projects = defineCollection({
  type: 'content', // MDX
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    hero_object: z.enum(['microphone', 'printer', 'lightbulb']),
    asset_strategy: z.enum(['stock-photo', 'r3f-model']),
    asset_url: z.string(), // path to image or .glb/.gltf
    one_line_pitch: z.string().max(120), // for hero card
    status: z.enum(['shipped', 'in-progress', 'exploration']),
    github_url: z.string().url().optional(),
    demo_url: z.string().url().optional(),
    tech_stack: z.array(z.string()),
    role: z.string(), // "Solo build" or "Designed by..."
    timeline: z.string(), // "2026-04-21 → ongoing"
    // Case-study discipline (Critic C1 + M8) — these are LOAD-BEARING and gate-enforced
    problem: z.string().min(200, "Case-study Problem section must be ≥200 chars"),
    approach: z.string().min(200, "Case-study Approach section must be ≥200 chars"),
    what_didnt_work: z.string().min(200, "Case-study What-Didn't-Work section must be ≥200 chars (highest-signal section per market research)"),
    outcomes: z.string().min(200, "Case-study Outcomes section must be ≥200 chars"),
    build_logs: z.array(z.object({
      title: z.string(),
      url: z.string().url(),
      date: z.string(),
      summary: z.string().max(200),
    })).default([]),
    blogs: z.array(z.object({
      title: z.string(),
      url: z.string().url(),
      date: z.string(),
    })).default([]),
    embedded_media: z.array(z.object({
      type: z.enum(['youtube', 'vimeo', 'loom', 'spotify']),
      url: z.string().url(),
      caption: z.string().optional(),
    })).default([]),
  }),
});
```

**Why this schema:** Build logs and blogs are *nested under each project* per the IA decision in the Brief — they are NOT a separate global collection. A standalone `/blog` surface is intentionally absent in V1.

**Project page sections (MDX body — fed from Zod-validated frontmatter, not free-form):**
1. Hero object render + one-line pitch
2. **Problem** — context, why this mattered (≥200 chars, schema-required)
3. **Approach** — decisions and trade-offs (≥200 chars, schema-required)
4. **What didn't work** — failure modes, dead ends (≥200 chars, schema-required) — HIGHEST-SIGNAL section per Profy.dev; pre-commit lint blocks merge if empty or stub
5. **Outcomes** — measurable results, lessons (≥200 chars, schema-required)
6. **Build logs** — chronological inline list (LinkedIn-linked)
7. **Blogs** — longer-form pieces (linked or inline)
8. **Embedded media** — Loom walkthroughs / podcast clips / video reels relevant to the project

### 1.4 Case-Study Discipline (per Critic C1)

The case studies are 70% of the callback signal per market research. Treating them as Phase 4 "buffer" inverts priority. Discipline mechanisms:

| Mechanism | Enforcement |
|---|---|
| Required Zod fields (problem / approach / what_didnt_work / outcomes) | `astro check` fails on missing fields |
| ≥200-char minimum per section | Zod `.min(200)` errors at build |
| Pre-commit hook on `*.mdx` | Blocks commit if any required section reads as stub (regex match on placeholder strings) |
| MDX skeleton template | `pnpm run new-project <slug>` generates the file with section headings + word-count guidance |
| Ship Criteria gate (§11.5) | All 3 V1 projects must have ≥500-word total case-study body OR site doesn't ship |

The writeups are scheduled in Phase 3 (Week 3), NOT as buffer. The hero objects (assets) are scheduled around them, not before them.

### 1.3 Tier discipline (recap from Brief)

- **Tier 1 (Projects)** = the 3 V1 surfaces above
- **Tier 2 (Talks/Media)** = absorbed into Tier 1 (podcast appearances are themselves a "project" surface; educational reels embed inline within whichever project they walk through)
- **Tier 3 (About/Contact)** = thin identity layer, photography-influenced

---

## 2. User Journey — the two paths that matter

### 2.1 The 7-second scanner (technical HM, F-pattern)

```
0.0s     LCP — studio composite loads. Three objects visible. Identity tagline above:
         "Guru — AI/Data Engineer · Photographer · NYC"
0.5s     Eye scans top bar: name, title, tagline, contact dot
1.5s     Eye drops to the lit subjects: microphone, printer, light bulb
3.0s     Hover: object expands focus, one-line pitch fades in
         ("CC/Distribution Parser — extracts structured data from PE fund docs")
5.0s     Click decision OR bounce
```

**Acceptance criteria for this path:**
- LCP ≤2.5s on mid-tier Android 4G
- Identity legible without scrolling
- At least one project pitch readable within 5 seconds
- No 3D loading screen, no shader compile blocking first paint

### 2.2 The 5-minute deep-reader (engaged technical HM)

```
0.0s     Same first paint
~10s     Click into a project (most likely Doc Extractor or AI Design Team)
~30s     Read Problem → Approach
~2min    Skim "What didn't work" — highest signal section
~3min    Skim build logs / open one LinkedIn link
~4min    Watch one embedded Loom (if present)
~5min    Click contact OR back to studio for another project
```

**Acceptance criteria for this path:**
- Project page loads instantly (Astro static, ~50kb HTML)
- Build logs visible without leaving the page
- One-click external link to GitHub
- One-click contact CTA persistent in header

---

## 3. Design Language (Photography Studio Vocabulary)

**Scope of this section:** product-level direction and hard constraints. Exact colors, typography sizing, animation curves, and component-level visual specifics are intentionally **deferred to the build phase** where `frontend-design` + `impeccable` skills produce the final design system. The build phase must honor the principles and constraints below; everything else is open.

### 3.1 Lighting model (required vocabulary)

| Light | Status | Role |
|---|---|---|
| **Key** | **Required** | Primary illumination of the focused subject. Defines the warm tungsten tonal direction of the site. Site accent color derives from key-light hue. |
| **Rim** | **Optional — designer's call during build** | Hard edge behind the subject. Adds dimension; choose if it strengthens the photographic frame. |
| **Fill** | **Optional — designer's call during build** | Cool, lower-opposite. Lifts shadow detail. Choose if rim alone leaves the subject too contrasty. |

**Designer constraint:** at least one of rim/fill must be present if the bare-key-light look feels flat under impeccable `/critique`. If both work, both can ship — but not at the expense of perf or accessibility budget.

**Background:** dark studio-cove. Exact value tuned during build but in the deep-black-with-room-for-grain regime (not pure `#000`).

**Surface:** suggestion of a reflective desk under the subjects. Implementation decided during build.

### 3.2 Photographic effects (CSS-based, not WebGL on home)

Principle-level. Build phase tunes parameters:

- **Depth of field** — focused subject sharp, non-focused subjects blurred (`backdrop-filter: blur()` or equivalent). Magnitude tuned during build.
- **Focus pull on hover** — smooth transition between blurred and sharp states. Curve and duration tuned during build (mandate: feels like a camera, not a slide).
- **Exposure shift on selection** — brief brightness lift on click before navigation.
- **Film grain** — global subtle grain overlay. Magnitude and opacity tuned during build; must reduce or disable under `prefers-reduced-motion`.
- **Vignette** — gentle attention focus on home view.

### 3.3 Typography direction

| Use | Direction | Why |
|---|---|---|
| Display / headlines | Photography-coupled characterful serif (candidates: **Fraunces, EB Garamond, Recoleta**) | Photography-magazine reference; frontend-design mandates *distinctive* typography |
| Body | High-readability humanist sans (candidates: **IBM Plex Sans, Geist Sans, General Sans**) | Case-study reading path |
| Mono / code | Engineering-credible mono (candidates: **JetBrains Mono, Geist Mono, IBM Plex Mono**) | Project READMEs |

**HARD ANTI-PATTERN (per frontend-design + impeccable):** Inter, Roboto, Arial, system-ui defaults — these are flagged as "AI slop" / overused generic aesthetics and are **banned** from this site. Same for purple-to-blue gradients and rounded-square icon tiles above headings.

**Hard constraint:** all fonts open-source / free-for-commercial-use, self-hosted (`/public/fonts/`) for LCP control. Total font weight ≤ 60KB across the site. Use variable fonts where available (one file covers weight + optical size).

Exact pairings, weights, and sizing scale finalized in Phase 1 via `/impeccable typeset` + `/impeccable critique`. Single typography pairing per §3.8 coherence gate.

### 3.4 Color palette — role tokens (values tuned during build)

```
--bg-stage          /* dark studio infinity background */
--surface           /* warm-tinted dark desk plane */
--key-light         /* warm tungsten primary accent */
--rim-light         /* hard highlight (if rim used) */
--fill-light        /* cool secondary lift (if fill used) */
--ink               /* primary body text on dark */
--ink-muted         /* secondary text, captions */
--vignette          /* corner darkening overlay */
```

**Hard constraint:** all final hex values must pass WCAG 2.2 AA contrast (≥4.5:1 normal text, ≥3:1 large) on the surfaces they're used. AAA preferred for body text.

### 3.5 Motion principles (hard constraints)

- All non-essential motion gated by `prefers-reduced-motion: reduce`
- Reduced-motion fallback: instant transitions, no DoF shifts, no grain animation, no parallax
- NO parallax on scroll (vestibular safety per Research §5.2)
- **NO bounce / elastic easing** (impeccable flags as dated AI-slop). Use real camera-curve easing: ease-out, cubic-bezier matched to photographic focus-pull motion
- **NO "dark glow" decorative effects** (impeccable AI-slop). Hover/selection lighting must be photographically credible (cast light + cast shadow on adjacent surfaces, not generic CSS box-shadow halos)
- The R3F bulb default state revised per Critic M2 — see §4.3
- All animations must respect INP ≤ 200ms during interaction
- Motion concentrated on high-impact moments only (selection, navigation, the R3F bulb illumination) — no scattered hover micro-interactions across the page (per frontend-design)

### 3.6 Effect-Cutting Priority Order (per Critic C3)

If perf budget gates fail during build, effects are cut in this order until gates pass green. Decision is pre-committed here, not deferred to build pressure.

| Cut order | Effect | Why first/last |
|---|---|---|
| 1 (first) | Film grain magnitude → grain entirely | Cheapest signal, biggest weight saved; can be reintroduced via static AVIF if grain is critical |
| 2 | DoF magnitude (reduce blur radius before disabling) | Backdrop-filter is moderately expensive; reducing magnitude saves INP |
| 3 | Italic font weight (drop, keep roman + bold only) | -15KB typically; impacts pull-quotes |
| 4 | Vignette opacity → vignette entirely | Visual only; identity remains intact |
| 5 (last) | R3F texture quality on the design-team page (mipmap reduction, lower-res normals) | Last cut — preserving the spotlight is load-bearing |

Cuts halt at the first level that brings all CWV gates green. Build phase records which level was needed in `docs/perf-decisions.md` (postmortem input).

### 3.7 Asset Sourcing Plan (per Critic M4)

| Object | Source path | Fallback |
|---|---|---|
| Microphone (Podcast) | Unsplash commercial license OR Pexels — Studio-lit shotgun/condenser microphone shots, curated 3-5 candidates | Blender render if license restrictive |
| Printer/Fax (Doc Extractor) | Unsplash/Pexels — vintage fax or modern document printer with paper output visible | Blender render |
| Light bulb (AI Design/Build Team) | Unsplash/Pexels for ambient lit-bulb photography; **R3F-modeled** version for the spotlight interactive on `/projects/ai-design-team` (low-poly Edison/incandescent shape, ≤30KB glTF) | Static AVIF of the same bulb if R3F is cut |

**License validation:** Each asset URL + license proof committed to `docs/asset-licenses.md` before Phase 4 ships. No asset is used until its license is verified Creative Commons / royalty-free / commercial-OK.

**Decision deadline:** end of Phase 2 (Week 2). Phase 3 cannot start without asset paths chosen.

### 3.8 Design-Language Coherence Gates (per Critic M6)

Phase 1's design-language reference page IS the coherence gate. Before Phase 2 begins, the reference page must demonstrate ALL of:

- [ ] Single typography pairing finalized (one display serif + one body sans + one mono); no more than 4 weights total
- [ ] ≤ 3 motion easing curves total across the site (one for focus-pull, one for navigation, one optional for the R3F bulb)
- [ ] ≥ 80% of styled components use color role tokens (no one-off hex values; CSS variables only)
- [ ] Lighting decision locked (key only / key+rim / key+fill / key+rim+fill) and visible on the reference page
- [ ] Grain magnitude + DoF radius + vignette opacity locked as CSS custom properties
- [ ] WCAG AA contrast verified on every text-on-surface combination shown
- [ ] Reference page passes `impeccable /critique` + `/audit` cleanly with zero blockers

If any gate fails, Phase 2 is blocked until the reference page is revised.

---

## 4. Navigation & Interaction Model

### 4.1 Home — the studio table

```
[ top bar: name · title · tagline · contact dot ]

[                  S T U D I O                  ]
   .                                          .
       [mic]         [printer]      [bulb*]
   .                                          .
            "I build AI/data systems
              and photograph them."

[ footer: small links · social · year ]
```

- **Three objects equal-weight**, composited via stock photography or layered PNG/WebP assets
- Each object has a tight bounding hover target
- Hover state: focus pull (others blur ~4px), one-line pitch fades in below the active object
- Click: smooth transition to `/projects/<slug>` — the same object remains as the page hero (cinematic continuity)
- Mobile (≤768px): objects stack vertically as cards, no DoF effect, identical content reachable

**Live-pulse on the bulb: CUT per Critic M3.** Manually-maintained "live" indicators rot. The /now page (§1.1) and the date stamps on build logs carry the aliveness signal instead — they're durable because users naturally update them. If automated "last activity" is desired later (V1.1), a CI job parses `build_logs[]` frontmatter at build time and emits a static JSON the site consumes. NOT in V1.

### 4.2 Project page

```
[ top bar persistent: home · contact ]

[ hero object (large, lit, centered) ]
[ project title — one-line pitch ]
[ status pill · timeline · GitHub · live demo ]

[ Problem ]
[ Approach ]
[ What didn't work ]   ← highest-signal section, emphasized
[ Outcomes ]

[ Build logs (chronological) ]
[ Blogs (linked or inline) ]
[ Embedded media (facade pattern) ]

[ Next/Prev project navigation ]
```

### 4.3 The R3F spotlight — AI Design Team page (revised per Critic M2)

On this page only, the light bulb is interactive R3F. Default state revised to ensure HMs actually see the interaction:

**Default state:** UNLIT bulb with a subtle, idle filament-warm glow (the bulb-is-interactive affordance). Idle micro-animation: filament flickers very subtly every ~6 seconds — signals "this is alive, click me," respects `prefers-reduced-motion` (no idle motion under reduced).

**Hover (or scroll-into-view, whichever first):** filament brightens, faint shadow forms on the underlying surface (real photographic illumination, not a CSS box-shadow glow).

**Click/tap:** bulb fully illuminates → casts key light onto the surrounding scene → 4 "team member" subjects fade in around the bulb (Design Lead, Market Scout, Research Analyst, Design Critic — representational mapping per Höffler-Leutner). Each subject is a small lit object on the same studio surface; hover surfaces a one-line role tooltip.

**Adjacent framing copy (per Critic M1):** "The bulb is the AI Design Team — click to light up the team." Persistent, ~14-16px, above the bulb. Cold-reader test pre-launch: if a non-context viewer doesn't understand within 3 seconds, drop the metaphor and use a different hero.

**Reduced-motion fallback:** static lit illustration showing the same 4-member layout. No idle flicker.

**Implementation budget:** ≤200KB total for the R3F island (glTF model + textures), code-split from main bundle, lazy-loaded on route. INP must remain <200ms during interaction. If budget can't be hit, fall back to a high-quality static AVIF illustration of the same scene (still passes WCAG via alt-text).

### 4.4 About page (revised per Critic C2 — zero user photos)

- Short identity statement (photographer + engineer bridge)
- **No user-shot photographs anywhere on the site.** Photography identity is carried entirely by the visual language (scene, lighting vocabulary, framing) and the explicit decoder mapping below
- **The decoder is the artifact:** photography-to-engineering vocabulary mapping rendered as a visual side-by-side, not prose. E.g.:
  - "Composition → Information Architecture" — shown as a rule-of-thirds grid overlaid on a wireframe diagram
  - "Key light → Primary signal" — shown as a lit object beside an annotated UI hierarchy diagram
  - "Iteration in the darkroom → Iteration on training runs" — shown as a contact sheet beside a training-loss curve
  - "Frame, focus, exposure → Constraint, attention, signal-to-noise"
- Three to five such visual pairs. Each pair IS the metaphor decode — proof the photographer signal is intentional, not coincidental.
- Single CTA: contact

### 4.5 Contact page

- Email (mailto), LinkedIn, GitHub
- A short note on what kinds of opportunities are interesting (sets HM expectations)
- Optional: form (NOT required for V1)

---

## 5. Tech Stack

### 5.1 Frameworks

| Layer | Choice | Why | Rejected |
|---|---|---|---|
| Site framework | Astro 5.x | Zero-JS default, content collections, MDX, island architecture. Lighthouse 100 realistic. | Next.js (heavier baseline, more config for content sites); SvelteKit (smaller community); Hugo (awkward MDX) |
| 3D | R3F (`@react-three/fiber` + `@react-three/drei`) | Astro-island compatible, declarative, large ecosystem | Vanilla Three.js (more code); Threlte (Svelte-only); Spline runtime (heavy) |
| Animation | CSS + Web Animations API + (optionally) Motion One | Native, lightweight, no Framer Motion overhead | Framer Motion (heavier, React-coupled); GSAP (license, runtime weight) |
| Smooth scroll | None (V1) | Native scroll respects accessibility; Lenis is optional V2 | Lenis (adds JS, vestibular risk) |
| Content | MDX via `@astrojs/mdx` + content collections | Type-safe, build-time, no CMS | Sanity/Contentful (overkill for solo); Markdown-only (no React components inline) |
| Image | Astro `<Image />` (sharp under the hood) | AVIF/WebP automatic, responsive srcset | Manual `<picture>` (more code); ImageKit (third-party dependency) |

### 5.2 Hosting & infra

- **Cloudflare Pages** (Mainstream, unlimited bandwidth, free tier covers ~unlimited static portfolio traffic)
- **Cloudflare Web Analytics** (free, privacy-respecting, no cookie banner needed)
- **Custom domain** (recommended — Senior signal per Market Scout §2.1)
- **CI/CD:** GitHub → Cloudflare Pages auto-deploy on push to `main`
- **Preview branches:** Pages auto-creates per-branch URLs for review

### 5.3 Design skill stack (Claude Code skills to install during build)

| Skill | Order | Purpose |
|---|---|---|
| `anthropics/frontend-design` | 1 (base) | Design-thinking + implementation discipline + anti-patterns. First-party. |
| `pbakaus/impeccable` | 2 (primary driver) | 23 commands (`/audit`, `/polish`, `/critique`, `/animate`), deterministic lint, 27 anti-pattern rules. Verified 28.6k stars, v3.1.1. |
| `obra/superpowers` | 3 (optional) | TDD + workflow discipline. Use if the build benefits from structured methodology. |
| `nextlevelbuilder/ui-ux-pro-max-skill` | — | **SKIP**. Overlaps impeccable; star count unverifiable. |

**Install path:** Per Claude Code plugin/skill convention, install into the project's `.claude/skills/` or via the plugin marketplace already configured in this user's environment.

**Spot-check requirement (per Market Scout caveat):** Verify star counts manually before install — Scout flagged WebFetch hallucinating Superpowers' star count.

### 5.4 Tooling

| Tool | Use | Phase |
|---|---|---|
| TypeScript 5.x | Type safety on content schema + components | Phase 0 |
| Astro Check | Type-check build | Phase 0 |
| Lighthouse CI | Perf gate in CI | Phase 0 |
| `@axe-core/cli` | Accessibility gate in CI | Phase 0 |
| pnpm | Package manager | Phase 0 |
| Biome | Lint/format (single tool, replaces ESLint + Prettier) | Phase 0 |
| Vitest | Component tests | **Deferred from Phase 0 per Critic L2** — add only when first visual regression bites |
| Playwright | E2E + visual regression | **Deferred from Phase 0 per Critic L2** — add only when needed |

**L2 rationale:** for a 5-route static content site with no functional state, Playwright + Vitest are overengineering. Lighthouse-CI + axe-core are load-bearing and stay. Re-add the rest reactively, not proactively.

---

## 6. Performance & Accessibility Budget (hard constraints)

### 6.1 Core Web Vitals (per Research §4.2)

| Metric | Target (75th percentile) | Anti-target |
|---|---|---|
| LCP | ≤ 2.5s on mid-tier Android, 4G | > 4.0s = build fails CI |
| INP | ≤ 200ms during all interactions | > 500ms = build fails |
| CLS | ≤ 0.1 | > 0.25 = build fails |
| TTFB | ≤ 600ms | Cloudflare edge should make this trivial |
| Total page weight (home) | ≤ 200KB compressed | > 500KB = build fails |
| JS payload (home, post-hydration) | ≤ 20KB | > 50KB = build fails |

Lighthouse CI gates these on every PR. Failure blocks merge.

### 6.2 Accessibility floor (per Research §5)

- WCAG 2.2 AA compliance via `axe-core` CI gate (no AA violations on any page)
- `prefers-reduced-motion: reduce` honored everywhere
- All R3F content has a parallel DOM-accessible representation (Research §5.3 — WebGL is opaque to screen readers)
- Keyboard navigation across all interactive elements; visible focus rings (do not remove default focus outlines)
- Color contrast: AAA for body text, AA Large for accent text
- Alt text mandatory on all images (enforced via Zod schema + lint rule)
- Semantic HTML5 landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`, `<article>`)

### 6.3 Image strategy

- All images served as AVIF with WebP fallback, JPEG as final fallback
- Responsive `srcset` with `sizes` derived from layout
- Hero LCP image: eager-loaded, `fetchpriority="high"`, NO lazy-loading (Research §4 + Market Scout §2.7 gotcha)
- Below-fold images: native `loading="lazy"`
- Studio composite for home: pre-rendered as one optimized AVIF (~80KB) rather than 3 separate object loads

### 6.4 Mobile strategy

- Mobile-first CSS; desktop is the enhancement
- No R3F on home page mobile breakpoint (it stays absent there anyway)
- `/projects/ai-design-team` R3F: works on mobile via touch controls but degrades gracefully to static illustration on devices reporting `prefers-reduced-motion` OR low device-memory (`navigator.deviceMemory < 4`)
- Touch targets ≥ 44×44 px per Apple HIG / WCAG 2.5.5

### 6.5 Mobile Acceptance Criteria (per Critic M7)

The mobile experience must preserve the photographic identity, not collapse to a generic stacked list. Acceptance gates:

- [ ] At ≤ 768px: home shows ONE focused subject (e.g., the bulb) at top with the other two as a small picker strip beneath — NOT all three stacked vertically with no DoF
- [ ] Identity tagline ("AI/Data Engineer · Photographer · NYC" or similar) above the fold
- [ ] At least ONE photographic effect preserved on mobile: vignette OR static grain overlay (DoF can be reduced/disabled because backdrop-filter is expensive on mid-tier Android)
- [ ] Studio composite total mobile page weight ≤ 150KB (tighter than desktop ≤200KB because mobile budgets are stricter)
- [ ] Identity readable in the F-pattern top bar within first viewport (no scrolling required to know who this is)
- [ ] Tested on real mid-tier Android (Pixel 6a or equivalent) on throttled 4G pre-launch, not just emulator
- [ ] Touch focus-pull works (tap-to-focus is the mobile-equivalent of hover-to-focus); transitions feel like a camera, not a slide

---

## 7. Project Structure (Claude Code template — mandatory per `wiki/user/conventions.md`)

```
ai-engineer-portfolio/
├── CLAUDE.md                   # project overview + slash commands, <200 lines
├── CLAUDE.local.md             # personal overrides, gitignored
├── mcp.json                    # external tool integrations (GitHub, Cloudflare)
├── .claude/
│   ├── settings.json
│   ├── rules/
│   │   ├── code-style.md       # Karpathy 4 principles + Astro/TS style
│   │   ├── testing.md          # Vitest + Playwright patterns
│   │   ├── design-system.md    # photography vocabulary, lighting tokens
│   │   ├── accessibility.md    # WCAG 2.2 AA rules + axe gate
│   │   ├── performance.md      # CWV budget + Lighthouse CI rules
│   │   └── content-conventions.md  # MDX frontmatter, project writeup template
│   ├── commands/               # custom slash commands (e.g., /new-project)
│   ├── skills/                 # auto-triggered skills (frontend-design, impeccable)
│   ├── agents/                 # subagent definitions if needed
│   └── hooks/                  # pre/post tool-use scripts
├── spec/
│   ├── scope.md                # tier + skills + agent roster (load-bearing for Build Lead)
│   ├── design-brief.md
│   ├── market-research.md
│   ├── research-brief.md
│   ├── architecture.md
│   ├── critical-review.md
│   ├── implementation-plan.md
│   ├── product-spec.md
│   ├── test-plan.md
│   ├── design-rationale.md
│   └── postmortem-template.md
├── src/
│   ├── content/
│   │   ├── config.ts           # Zod schemas
│   │   ├── projects/
│   │   │   ├── podcast.mdx
│   │   │   ├── doc-extractor.mdx
│   │   │   └── ai-design-team.mdx
│   │   └── about.mdx
│   ├── pages/
│   │   ├── index.astro
│   │   ├── projects/[slug].astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   └── 404.astro
│   ├── components/
│   │   ├── StudioTable.astro
│   │   ├── ObjectSubject.astro
│   │   ├── ProjectHero.astro
│   │   ├── BuildLogList.astro
│   │   ├── EmbeddedMedia.astro
│   │   └── r3f/
│   │       └── LightbulbTeam.tsx   # R3F island for design-team page
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── styles/
│   │   ├── tokens.css          # color, type, spacing, lighting
│   │   ├── grain.css           # film grain overlay
│   │   └── global.css
│   └── assets/
│       ├── objects/            # studio composite images, glTF models
│       └── fonts/
├── public/
├── tests/
│   ├── unit/
│   ├── a11y/                   # axe-core suites per page
│   └── e2e/                    # Playwright smoke
├── docs/
├── scripts/
└── wiki/                       # project-local LLM wiki (raw → topics, optional)
```

Rules live modularly in `.claude/rules/` per `wiki/user/conventions.md` — `CLAUDE.md` stays under 200 lines.

---

## 8. Build & Deploy Pipeline

```
local → git push origin main
        ↓
GitHub Actions:
        ├─ pnpm install
        ├─ astro check (type safety)
        ├─ biome check (lint/format)
        ├─ vitest run (unit)
        ├─ astro build
        ├─ lighthouse-ci --budgetPath=./lighthouse-budget.json (perf gate)
        ├─ axe-core CI on built pages (a11y gate)
        └─ deploy to Cloudflare Pages (main) or preview branch (PRs)
```

**Quality gates that must pass before merge:**
1. Type-check clean
2. Lint clean
3. Unit tests pass
4. Lighthouse Performance ≥ 95, Accessibility = 100
5. Axe-core: 0 AA violations on every route
6. Page weight ≤ budget per §6.1

---

## 9. Spec Tier (for Build Lead handoff)

**Tier: Internal**

**Tier rationale:** This is a public-facing site with a hiring-outcome stake — the bar is higher than "Prototype" because failure directly costs interview opportunities. But it's not "Production" because: no end-users beyond viewer-readers, no SLA, no data persistence, no incident-disclosure obligation. Internal is the right floor: hardened performance and accessibility gates, real CI, eval-style perf budgets, but no model-card / NIST AI RMF burden (there's no AI in the runtime).

This sets up specific Build Team engagement (see `spec/scope.md` for the full agent-roster table to be written in Phase 7).

---

## 10. Open Questions / Risks (for the Design Critic to pressure-test)

1. **Three-objects-only V1 sparseness.** Will three featured subjects feel thin to a technical HM? Mitigation: each project page is deep, and the "what didn't work" sections compensate for surface count. Critic should pressure-test.
2. **R3F-spotlight-on-one-page risk.** Is the design-team page a strong-enough spotlight to demonstrate frontend skill? Or do we need a second R3F surface? (My read: one is enough, but Critic should challenge.)
3. **Light bulb as design-team object — over-clever?** The meta-photography pun (the team IS the key light) is strong but risks reading "too clever by half" if the metaphor isn't immediately legible. Test with cold reading.
4. **Performance budget aggressiveness.** ≤200KB home, ≤20KB JS is tight. Achievable but pinches design (e.g., custom fonts add weight, R3F island budget). Critic should confirm budget is realistic given the design language.
5. **Photographer identity carried by scene + interactions, not actual photos** — user-confirmed. Critic should pressure-test whether the photography signal *actually lands* with a technical HM who has never met the user, or whether it reads as generic "dark + serif" website.
6. **Educational videos/reels gap.** V1 has no dedicated surface for educational content beyond what embeds within project pages. If the user produces standalone educational reels not tied to a project, where do they live? Defer to V2?
7. **The "Now / Currently learning" thought-stream gap.** Engineering HMs respond to learn-in-public signals. V1 has no surface for this beyond build logs. Defer to V2?
8. **Spec-to-build hand-off risk.** Design Language §3 is intentionally principle-level — exact colors, typography, animation curves deferred to build phase using `frontend-design` + `impeccable` skills. Is the spec under-specified to the point where the build phase loses cohesion, or is the looseness load-balanced by the skills' guidance? Critic should pressure-test the line between "principle" and "missing requirement."

---

## 11. Implementation Phases (preview — full plan in Phase 7)

**Phase -1 — Pre-build inventory check (Day 0, per Critic L1)**
- Gut-check the V1 project inventory before scaffolding:
  - Podcast appearances: confirm ≥2 episodes exist (else replace with V2 candidate)
  - Doc extractor (CC/Distribution Parser): confirm a demoable artifact or compelling case study exists
  - AI Design/Build team: confirm artifact (this very session is one) is presentable as a case study
- If any V1 surface fails the inventory check, promote `job-search-pipeline` early as the replacement. Better one fewer than one weak.

**Phase 0 — Scaffold + skill install (Day 1-2)**
- Astro project init from build-team template (auto-scaffold at session end)
- Install `anthropics/frontend-design` + `pbakaus/impeccable` into `.claude/skills/` (+ optional `obra/superpowers`)
- Wire CI gates (Lighthouse-CI, axe-core, Astro Check, Biome) — Playwright + Vitest deferred per L2
- Verify CWV budget enforcement on a placeholder page
- **Hand the spec to the skills** before writing component code — design finalization (color values, typography pairing, animation curves, lighting choice) is the skills' job

**Phase 1 — Design system finalization (Week 1)**
- Using `frontend-design` + `impeccable /critique` + `impeccable /audit`, finalize:
  - Exact color tokens from role palette
  - Typography pairing + scale
  - Animation curves and durations
  - Lighting decision (rim, fill, or both)
- Produce a single static design-language reference page that proves the system before applying it to content surfaces

**Phase 2 — About page + Studio Home (Week 2)**
- `/about` first (smallest, lowest-risk surface to validate the design language end-to-end)
- `StudioTable` component on `/` with 3 placeholder objects (gray boxes acceptable — assets later)
- Iterate visual polish via `impeccable /polish`

**Phase 3 — Project template + asset acquisition (Week 3)**
- Project page MDX template + content collection schema
- Acquire / generate hero assets for mic, printer, light bulb (stock photos or 3D-rendered stills)
- All three project pages with text content drafted (R3F still deferred)

**Phase 4 — R3F spotlight + final polish (Week 4)**
- `LightbulbTeam` R3F component with progressive enhancement and static fallback
- Final visual polish pass using `impeccable /polish` and `/audit`
- Cold-reading test with someone unfamiliar with the project
- Final perf + a11y gate pass; custom domain + deploy

**NO end-of-phase buffer for writeups.** Per Critic C1: writeups are Phase 3 (Week 3), not buffer. The Zod schema gates them. The scaffold scheduling reflects their actual priority.

### 11.5 Ship Criteria / Definition-of-Done (per Critic L3)

V1 ships when ALL of these are true. Date-anchored: **launch target = 2026-06-21** (one calendar month from spec freeze).

**Content gates (all required):**
- [ ] `/projects/podcast` — case study ≥500 words across required sections + at least 1 embedded media + GitHub-or-equivalent link if applicable
- [ ] `/projects/doc-extractor` — case study ≥500 words across required sections + GitHub link + 1 build-log entry minimum
- [ ] `/projects/ai-design-team` — case study ≥500 words + GitHub link + R3F bulb interactive (or static-illustration fallback) shipped
- [ ] `/now` — populated with current date and ~100 words
- [ ] `/about` — decoder mapping (3-5 visual pairs) shipped
- [ ] `/contact` — at least email + LinkedIn + GitHub links live

**Quality gates (all required):**
- [ ] All Zod schemas validate (no stub content)
- [ ] Lighthouse Performance ≥ 95, Accessibility = 100 on all routes
- [ ] Axe-core: zero AA violations on every route
- [ ] LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 verified on real mid-tier Android (4G throttled)
- [ ] All §3.8 coherence gates passed (Phase 1 reference page)
- [ ] Cold-reader test on the bulb metaphor (M1)
- [ ] All §6.5 mobile acceptance criteria met
- [ ] License validation for every external asset committed to `docs/asset-licenses.md`

**Slip rule:** if the launch-target date arrives and 1 of the 3 projects isn't ready, **ship with the strongest 2** and add the third post-launch as a hotfix. Do NOT delay launch for "one more polish pass" — perfectionism rot is the named failure mode.

**Anti-criteria (must NOT be true at launch):**
- [ ] No empty case-study sections
- [ ] No broken external links
- [ ] No console errors in browser devtools
- [ ] No "Coming soon" placeholder pages

---

## 12. What I'm Deliberately NOT Doing (alternatives rejected)

| Rejected | Why |
|---|---|
| User's own photography assets across the site | User-confirmed: the photographer identity rides on *scene + graphics + UI interactions* (visual language), not on the user's own photographic work. Assets sourced from stock or 3D-rendered stills. |
| Pure 3D / Bruno-Simon-style site | Höffler-Leutner: decorative 3D = penalty. Genre-signal mismatch (creative-dev not eng IC). |
| Standalone /blog surface | Brief decision: writing is project-attached. Reduces nav cognitive load (CLT). |
| Multi-language i18n | Out of scope per Brief. |
| CMS / dynamic backend | Out of scope; MDX is enough. |
| Framer Motion / GSAP | Weight, license cost; CSS + Web Animations handles the motion budget. |
| Custom domain at launch | Acceptable but not required for V1. Recommended but not gating. |
| Comments / community | Out of scope per Brief. |
| Locking pixel-level visual design in spec | User-directed: visual finalization (exact colors, fonts, animation curves, component layouts) happens in build phase using `frontend-design` + `impeccable` skills. Spec stays at principle + constraint level. |

## 13. Design Decisions Deferred to Build Phase (skill-aided refinement)

The following are **intentionally NOT specified** in this architecture document. They are produced during Phase 0-1 of the build using the installed design skills:

| Decision | Decided in build via |
|---|---|
| Exact hex values for color role tokens | `impeccable /critique` + WCAG validators |
| Typography pairing (display + body + mono) and weight/size scale | `frontend-design` typography guidance + impeccable lint |
| Whether rim and/or fill lights ship alongside the required key | Designer judgment using impeccable `/critique` on the static design-language reference page |
| Exact transition curves and durations | `impeccable /animate` |
| Vignette opacity, grain magnitude, DoF blur radius | Iterated during design-language reference page |
| Specific component layouts (StudioTable composition, ProjectHero arrangement) | `frontend-design` patterns + impeccable `/audit` |
| Exact mobile breakpoint behavior beyond the principle of "no R3F on home, vertical stack" | Build-time A/B between candidate layouts |
| 404 page humor / in-character copy | Last-mile polish |

**What the build phase is NOT free to change:** anything in §1 (IA), §5 (tech stack), §6 (perf + a11y budget), §7 (project structure), §8 (CI gates), §9 (tier). Those are spec-locked.

**The line:** if a decision affects *what the site is*, it's locked here. If it affects *what the site looks like*, it's deferred to skill-aided iteration in build.
