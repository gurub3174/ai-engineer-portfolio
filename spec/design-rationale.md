---
project: ai-engineer-portfolio
type: design-rationale
purpose: teaching-and-interview-prep
version: v1
created: 2026-05-22
---

# Design Rationale — AI Engineer Portfolio

The teaching + interview-prep layer for this design. Every load-bearing decision is captured with What / Why / Trade-off / Alternative / Revisit trigger / **Interview Angle**.

---

## PART 1 — Architectural Decisions

### D1. Astro over Next.js for the framework

**What:** Astro 5.x with content collections + MDX + island architecture, hosted on Cloudflare Pages.

**Why:** Content-heavy static site. Astro's zero-JS-by-default ships less to the browser than Next.js's React baseline. Lighthouse 100 is realistic. MDX content collections give type-safe content with no CMS. R3F can still hydrate as an island on one specific route. Market Scout §2.4 confirms Astro is mainstream (~50k stars) with first-class MDX. Cloudflare Pages offers unlimited bandwidth + commercial-OK on the free tier — Vercel Hobby does not.

**Trade-off:** smaller community than Next.js. Astro patterns for production sites are less battle-tested. If we needed full SSR, server actions, or large React app patterns, Next.js would be the right call. We don't.

**Alternative rejected:** Next.js App Router (overengineered for a static content site; React baseline weight); SvelteKit (smaller community than even Astro); Hugo (awkward MDX story).

**Revisit trigger:** if the site adds a backend / form processing / authenticated routes / dynamic rendering — at that point Next.js becomes a reasonable swap.

**Interview Angle:**
> *Q: "Why did you pick Astro for a portfolio when Next.js is more popular?"*
> *Strong answer covers: per-page JS hydration model (islands), MDX content collections vs file-based routing, the Core Web Vitals → bounce rate empirical link (Google/SOASTA 2017), Lighthouse Performance budget tradeoffs, "popular doesn't mean right" — engineering is fit-to-problem.*
> *Competency tags: system design, performance engineering, framework selection rigor*
> *Skill level: mid → senior*

---

### D2. R3F isolated to ONE page

**What:** React Three Fiber lives only on `/projects/ai-design-team`. Every other route is Astro-static. The R3F bundle is code-split and lazy-loaded.

**Why:** Research §3.1 (Höffler-Leutner) — 3D earns its keep only when *representational*. Research §3.3 (CLT) — extraneous load on a time-pressure scan kills callbacks. Research §4.1 (Google/SOASTA) — bounce rises 32-90% with LCP slippage. Putting R3F on the home page would blow the LCP budget. Restricting it to one project page (a) preserves the representational mapping (bulb = the design team), (b) keeps first paint flat and fast, (c) doubles as a demonstrated frontend-skill artifact for FDE-track HMs.

**Trade-off:** the only place HMs see frontend skill is on that one page. If they don't navigate there, no R3F signal. Mitigated by adjacent framing copy + revised default state (subtle idle glow → hover-into-view).

**Alternative rejected:** R3F on home (perf failure); R3F nowhere (no engineering-frontend signal); R3F on all project pages (over-engineering, perf risk on every route).

**Revisit trigger:** if mobile real-device tests show R3F failing to load on >5% of devices, drop to static AVIF entirely.

**Interview Angle:**
> *Q: "How do you decide where to use heavyweight client-side rendering vs static?"*
> *Strong answer covers: Cognitive Load Theory (Sweller) and representational vs decorative animation (Höffler-Leutner meta-analysis); progressive enhancement; the "spotlight" pattern of localized hydration; budget-based architecture (set the budget first, then design within it); reduced-motion fallbacks.*
> *Competency tags: cognitive UX design, performance budgeting, progressive enhancement*
> *Skill level: senior*

---

### D3. Case-study schema enforcement (Zod `.min(200)` per required field)

**What:** `problem` / `approach` / `what_didnt_work` / `outcomes` are required Zod string fields with 200-char minimum. Pre-commit hook blocks stub content. CI fails on missing fields.

**Why:** Market research §2.1 and Research §2.2-2.3 converge: the case studies are 70% of the callback signal. Earlier draft scheduled them as "buffer" — Critic C1 caught the inversion. Schema enforcement converts a soft writing intent into a hard build gate. Engineers respect gates that fail builds; they ignore conventions that don't.

**Trade-off:** less flexibility — a project that genuinely has nothing to say in one section is blocked from publishing. Acceptable: if a project has nothing to say, it shouldn't be on a portfolio.

**Alternative rejected:** MDX convention only (would rot); markdown linter that warns without blocking (warnings get ignored); separate review pass before publish (manual = will skip).

**Revisit trigger:** if a future project legitimately has no "what didn't work" content (e.g., wholly external contribution), revisit by allowing schema-validated NULL with explicit acknowledgment field.

**Interview Angle:**
> *Q: "How do you ensure technical writing quality at the same level as code quality?"*
> *Strong answer covers: shifting from code review to content review; schema-driven content systems (vs CMS); the case for build-time validation of human-authored fields; pre-commit hooks as enforcement vs warnings; the principle of "make the right thing easy and the wrong thing impossible."*
> *Competency tags: developer experience, content strategy, build-time validation*
> *Skill level: mid → senior*

---

### D4. Photography as design language only (zero user photos)

**What:** The photographer identity is expressed through visual language (key/fill/rim lighting vocabulary, DoF, grain, framing) and the `/about` decoder mapping. The user's actual photographic work does NOT appear on the site.

**Why:** User-direction. Plus: the decoder mapping (composition → IA, key light → primary signal, etc.) carries the metaphor *as the artifact* — it's proof of intentional design choice, not coincidence. Including the user's own photography risks (a) genre-signaling "creative dev" (Market Scout §2.2), (b) requiring constant content maintenance, (c) competing with the engineering artifacts for attention.

**Trade-off:** the photographer signal is harder to decode for HMs who don't read the `/about` page. Mitigation: the visual language is consistent everywhere; the `/about` decoder is reachable from the persistent header.

**Alternative rejected:** user's photography everywhere (genre mismatch); user's photography on About only (Critic C2 caught the contradiction with §12); ignoring the photographer identity entirely (loses the unfair-advantage differentiator).

**Revisit trigger:** if inbound interview rate is low post-launch AND user-survey reveals HMs don't decode the photography metaphor, consider adding a curated photo essay surface as V1.1.

**Interview Angle:**
> *Q: "How do you balance personal brand expression with target-audience optimization?"*
> *Strong answer covers: van Schaik 2009 (unconventional design helps only when content-justified); signaling theory (Spence 1973) — unusual backgrounds are informative only if legibly decoded; the difference between identity-as-claim and identity-as-artifact; designing for the primary user without erasing the maker.*
> *Competency tags: brand design, audience targeting, signaling theory*
> *Skill level: senior → staff*

---

### D5. Static photo composite for home; no WebGL first paint

**What:** The home studio scene is a pre-rendered AVIF/WebP composite, ~80KB, with CSS-only DoF, grain, vignette, and focus-pull. WebGL appears nowhere on `/`.

**Why:** Research §1.1 (7-second scan) + §4.1 (bounce-vs-LCP) + §9.2 (50ms credibility) all converge: the first paint must be fast and complete. A WebGL canvas at first paint forces shader compile time = unacceptable LCP. The "studio illusion" can be achieved with photographic composition + CSS — no WebGL required for the home.

**Trade-off:** less interactive home. Static composite cannot rotate / orbit / animate in ways WebGL could. CSS DoF and focus-pull provide enough motion to feel alive without the cost.

**Alternative rejected:** WebGL on home (LCP failure); pure plain image grid (loses the photography vocabulary); R3F island on home (still costs hydration JS budget).

**Revisit trigger:** if 12 months in, perf budgets become looser or LCP target shifts, reconsider for V2.

**Interview Angle:**
> *Q: "When would you use WebGL vs CSS for visual effects on a content site?"*
> *Strong answer covers: shader compile time on cold loads; CSS GPU acceleration vs WebGL context overhead; backdrop-filter cost; the principle that perf-critical surfaces should use the lightest tool that meets the requirement; budget-driven decisions.*
> *Competency tags: web performance, CSS/WebGL tradeoff judgment, progressive enhancement*
> *Skill level: senior*

---

### D6. Effect-Cutting Priority Order pre-committed

**What:** §3.6 of architecture defines the order of effect cuts if perf gates fail: grain → DoF magnitude → italic weight → vignette → R3F texture quality.

**Why:** Decisions under pressure default to wrong defaults. Pre-committing the cut order means the build phase doesn't agonize over which effect to drop — it's been decided. Critic C3 caught the absence; the fix is cheap.

**Trade-off:** less flexibility. If during build a different effect turns out to be a better cut, the order needs explicit override.

**Alternative rejected:** no cut order (Critic-rejected — build-time decisions degrade); over-budget design with vague "we'll figure it out" (perfectionism rot).

**Revisit trigger:** if Phase 0-1 testing reveals a different effect dominates cost.

**Interview Angle:**
> *Q: "How do you handle budget overruns during a build when multiple constraints compete?"*
> *Strong answer covers: pre-committing decision orders before pressure hits; the principle that "decide once, execute many times"; cost/benefit ranking of features; preserving load-bearing elements (R3F representational mapping) over decorative (grain).*
> *Competency tags: technical leadership, decision-making under constraint*
> *Skill level: senior → staff*

---

### D7. `/now` page in V1

**What:** Single markdown file, ~100 words, monthly cadence, visible date stamp.

**Why:** Critic M5 + Market Scout §2.1: "alive" vs "brochure" portfolios differ on whether they show ongoing motion. The cheapest aliveness signal is a `/now` surface. Even when unmaintained, the *stale date* communicates something honest. 3-hour build cost, real signal.

**Trade-off:** another surface to maintain. If it rots, it actively hurts. Mitigation: the date IS the signal. A stale `/now` says "this candidate started a portfolio and didn't finish maintaining it" — better information than no surface.

**Alternative rejected:** V2-deferral (would have shipped without learn-in-public signal); standalone blog (overkill for a stream); RSS feed (overkill for V1).

**Revisit trigger:** if monthly cadence proves untenable, drop to quarterly OR cut.

**Interview Angle:**
> *Q: "How would you signal ongoing learning to a recruiter without a blog?"*
> *Strong answer covers: Karpathy-style /now pages; the difference between brochure and alive signals; the principle that stale-honesty beats fake-aliveness; activity stream design.*
> *Competency tags: personal branding, content cadence design*
> *Skill level: mid*

---

### D8. Tier = Internal (per scope.md)

**What:** Build Lead engages the project as Tier "Internal" — hardened perf + a11y gates + CI, but no Production governance (NIST AI RMF, model cards, incident-disclosure).

**Why:** Audience is real (hiring managers) and the failure cost is real (lost interviews). That's above Prototype. But there's no user data, no SLA, no AI runtime, no compliance footprint — that's below Production. Internal is the right floor.

**Trade-off:** harder build than Prototype; less ceremony than Production. Acceptable; matches the actual risk profile.

**Alternative rejected:** Prototype (under-engineered for the hiring stakes); Production (over-engineered for a personal site with no AI runtime).

**Revisit trigger:** if site adds AI features or compliance-bound users.

**Interview Angle:**
> *Q: "How do you decide what level of engineering rigor a personal project deserves?"*
> *Strong answer covers: matching ceremony to risk; the "would you build this for a weekend prototype?" test; the asymmetry between under-engineering (cheap to fix) and over-engineering (cost paid in compounding complexity); tiered engagement models.*
> *Competency tags: engineering judgment, scope discipline*
> *Skill level: senior*

---

## PART 2 — Research Dossier (Load-Bearing Papers)

### Strongly load-bearing (decisions break if these are wrong)

1. **Höffler & Leutner (2007) — Meta-analysis on animation vs static imagery.** Animation only helps when representational; decorative animation has zero benefit. Underpins D2 (R3F representational mapping) and D5 (no decorative WebGL on home). **What breaks if wrong:** the entire R3F strategy is built on this; if representational animation isn't actually better, we just have expensive chrome.

2. **Google / SOASTA-Akamai (2017) — Bounce-rate vs LCP empirics.** Bounce probability rises 32% from 1→3s LCP. Underpins D1 (Astro), D5 (no WebGL home), D6 (effect-cutting order). **What breaks if wrong:** the perf budget rationale is undermined; we might have over-optimized for a non-issue.

3. **Sweller, Ayres, Kalyuga (2011) — Cognitive Load Theory.** Extraneous load is catastrophic under time pressure. Underpins D2, D4, D5. **What breaks if wrong:** decorative-3D might actually help under different conditions; the whole "scene + interactions" identity-carrier argument depends on this.

4. **WCAG 2.2 + EAA (June 2025).** Accessibility floor; required for any portfolio targeting compliance-sensitive employers. Underpins entire §6.2. **What breaks if wrong:** in theory nothing — WCAG is conservative — but the depth of accessibility investment becomes a judgment call rather than a hard floor.

### Moderately load-bearing

5. **Profy.dev (2022) hiring-manager survey.** 70% effort to writeups, 30% to shell. Underpins D3 (case-study schema enforcement). **What breaks if wrong:** the writeup-priority schedule might be wrong; chrome might actually be where effort should go. Confidence is preliminary; cross-corroborated by Bertrand & Mullainathan resume-quality findings.

6. **Bertrand & Mullainathan (2004) — Resume quality lifts callbacks ~30%.** Polish > novelty. Underpins D1 (Astro for polished perf), D3 (case-study quality). **What breaks if wrong:** novelty might matter more than I'm assuming; the design-conservatism argument weakens.

7. **Fogg et al. (2003) + Lindgaard et al. (2006) — Credibility forms in 50ms based on visual design.** First viewport is everything. Underpins D5 (static fast home). **What breaks if wrong:** users might tolerate slower first paints than the data suggests; budget could loosen.

### Honest gaps

- No peer-reviewed RCT on 3D portfolios vs flat for engineering hiring outcomes. D2's representational-3D argument is *inferred* from CLT + animation meta, not directly tested.
- No direct data on HM mobile share. D5 + §6.5 mobile gates rest on inferred 25-40%.
- No research on hybrid creative-tech narrative reception in technical hiring. D4's photographer-identity-as-design-language is a judgment call.

---

## PART 3 — POC → Enterprise Roadmap

| Practice | Now (V1) | Soon (V1.1) | Later (V2+) | Never |
|---|---|---|---|---|
| CWV CI gates | ✅ | — | — | — |
| Axe-core CI gates | ✅ | — | — | — |
| Zod content validation | ✅ | — | — | — |
| Lighthouse-CI on every PR | ✅ | — | — | — |
| Custom domain + SSL | Optional | Recommended | — | — |
| Cloudflare Web Analytics | ✅ | — | — | — |
| Server-side rendering | — | — | Only if interactivity demands | — |
| Database / backend | — | — | Only for a real reason | First reach |
| Vitest unit tests | — | If visual regression bites | — | — |
| Playwright E2E | — | If regressions emerge | — | — |
| RSS feed | — | If `/blog` is added | ✅ | — |
| Newsletter / email capture | — | — | Optional | First reach |
| CMS migration | — | — | Only if MDX scales fail | Default |
| Sitemap + structured data | ✅ basic | Rich SD | — | — |
| Open Graph + Twitter cards | ✅ | — | — | — |
| Error tracking (Sentry etc.) | — | If real users hit issues | — | — |
| OTel tracing | — | — | Never (static site) | ✅ |
| AI features on site | — | — | If hosting matters | First reach |

**Reasoning:** the V1 gates are load-bearing — perf, a11y, content quality — and cheap. Most "later" items are deferred because they don't earn their keep on a static portfolio (a CMS for ~3-5 projects is a workflow downgrade). "Never" items are explicit rejections to prevent scope creep.

---

## PART 4 — Interview Competency Map

Each architecture decision tagged with the AI/engineering competency it tests and the seniority level a strong answer signals.

| Decision | System Design | Cost Optimization | Reliability | Scalability | LLM Ops | Security | DevOps | Skill Level |
|---|---|---|---|---|---|---|---|---|
| D1 — Astro | ✅✅ | ✅ | ✅ | — | — | — | ✅ | mid → senior |
| D2 — R3F isolated | ✅✅ | ✅✅ | — | — | — | — | ✅ | senior |
| D3 — Schema enforcement | ✅ | — | ✅✅ | — | — | — | ✅✅ | mid → senior |
| D4 — Photography-as-language | ✅ | — | — | — | — | — | — | senior → staff |
| D5 — Static first paint | ✅ | ✅✅ | ✅ | — | — | — | — | senior |
| D6 — Cut-order pre-commit | ✅ | ✅ | ✅ | — | — | — | ✅ | senior → staff |
| D7 — `/now` page | — | — | — | — | — | — | — | mid |
| D8 — Tier=Internal | ✅✅ | ✅ | ✅ | — | — | — | ✅ | senior |

**Themes to study based on this competency map:**
- **System Design (most decisions touch this):** islands architecture, content collections, schema-driven content, when to add backend complexity
- **Cost Optimization (D2, D5, D6):** budget-driven engineering, the cost of WebGL vs CSS, free-tier hosting strategy
- **Reliability (D3 especially):** schema validation as a build gate, the difference between conventions and enforcement
- **DevOps (D1, D3, D8):** static-first deploys, CI gate design, tier-based engagement models

**Sample interview questions to drill (drawn from "Interview Angle" sections):**
1. "Why did you pick Astro for a portfolio when Next.js is more popular?"
2. "How do you decide where to use heavyweight client-side rendering vs static?"
3. "How do you ensure technical writing quality at the same level as code quality?"
4. "How do you balance personal brand expression with target-audience optimization?"
5. "When would you use WebGL vs CSS for visual effects on a content site?"
6. "How do you handle budget overruns during a build when multiple constraints compete?"
7. "How would you signal ongoing learning to a recruiter without a blog?"
8. "How do you decide what level of engineering rigor a personal project deserves?"

The site itself doubles as the answer prompt: a hiring manager who clicks `/projects/ai-design-team` may ask any of these. Be ready.
