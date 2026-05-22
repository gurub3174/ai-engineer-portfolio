---
project: ai-engineer-portfolio
type: critical-review
author: design-critic
created: 2026-05-22
inputs:
  - design-brief.md
  - market-research.md
  - research-brief.md
  - architecture.md (v2 principle-level)
  - wiki/lessons-learned/design-critic.md
  - prior-session: portfolio-portal-poc/critical-review.md (calibration on scope creep + tight perf)
  - prior-session: cc-distribution-parser/critical-review.md (calibration on clarification propagation + ritual decay)
tags: [portfolio, frontend, astro, r3f, critical-review]
---

# Critical Review — AI Engineer Portfolio

## Executive Summary

The architecture is **substantially sound and unusually disciplined about its own evidence base** — perf and a11y floors are quantitatively derived, the R3F island is correctly scoped to ONE page rather than diffused, the principle-level deferral to build-phase skills is explicit (not hand-wavy), and the Design Lead has visibly internalized prior-session lessons on tier discipline and CI gating. Compared to the portfolio-portal-poc review, scope inflation is much less of an issue here — this design has wisely refused to expand the V1 surface count.

The real findings cluster in three places: (1) **the load-bearing element of the project — the project case studies themselves — has no commitment device, template enforcement, or quality gate in the architecture, despite the architecture's own research saying they are 70% of the outcome**; (2) **the design language vs perf budget tension is real and not pre-resolved** — the spec sets aggressive floors AND specifies grain + DoF + custom serif + studio composite + R3F island, and someone has to decide in build which effects get cut when budgets bite; (3) **the photographer-identity-via-scene+interactions signal is fragile** — a cold technical HM may not decode the metaphor at all, and the architecture's primary decoder copy sits buried on the About page.

**Verdict: SHIP-WITH-REVISIONS.** Two Critical findings to address before build kickoff; the rest are productive sharpenings.

---

## Two-Lens Pre-Pass (per Critic Lessons Learned 2026-04-21)

### Clarification-Propagation Check

| User clarification | Status | Where it lives |
|---|---|---|
| "Visual finalization deferred to build using frontend-design + impeccable" | Propagated | §3 scope statement + §13 deferral table — explicit and clean |
| "Photographer identity rides on scene + interactions, NOT actual photos" | **Partial — internal contradiction** | §12 row 1: "Assets sourced from stock or 3D-rendered stills" (no user photos). §4.4: "One curated photograph (the user's own work — only place the user's photography appears explicitly)." These contradict. See **C2**. |
| Tier: Internal | Propagated | §9 with reasoned rationale |
| Hard floors LCP/INP/CLS/page weight/JS weight | Propagated | §6 budget table + §8 CI gates wire them in |
| 3 V1 featured projects (mic/printer/bulb) | Propagated | §1.1 routes; V2 candidates explicitly listed |
| Spot-check star counts before installing skills | Propagated | §5.3 spot-check requirement |

**Observation:** One genuine contradiction surfaced (photography assets), folded into **C2**. The rest of the propagation is clean — a strong improvement over cc-distribution-parser.

### Ritual-Decay Check

The architecture has minimal ongoing-process rituals — it's correctly scoped as a build-once-and-iterate site, not a learning system. However, two soft rituals exist that the lesson predicts will silently decay:

- **The "live status pulse" on the bulb (§4.1)** — requires manual update of a build-log timestamp within 7 days to keep the pulse on. No automatic trigger or fallback. See **M3**.
- **Adding new build logs and case studies over time** — the LOAD-BEARING element of the project, and the only enforcement mechanism is "user remembers to do it." See **C1**.

These are softer than the HITL/eval rituals in prior reviews, but the same lesson applies: an unscheduled write-when-you-feel-like-it ritual is the same as an unritualized one.

---

## Findings Table

| ID | Title | Category | Severity | Recommendation |
|---|---|---|---|---|
| C1 | No commitment device for case studies — the load-bearing element is treated as "buffer" | Pre-mortem / New-risk | **Critical** | Add §1.4 "Case-Study Discipline": MDX skeleton with mandatory Problem / Approach / What-Didn't-Work / Outcomes sections enforced by content schema; pre-commit lint that fails if sections empty; commit-to-launch with at least N words per section |
| C2 | Photography-assets contradiction between §4.4 and §12 — the photographer identity decoder is unresolved | Assumption / Clarification-propagation | **Critical** | Choose one: (a) ZERO user photographs anywhere, OR (b) ONE curated photograph on About. Update both §4.4 and §12 to match. Tied to L5 (does the photographer signal actually land?) |
| C3 | Design language vs perf budget tension is unresolved — someone has to cut something in build, and the spec doesn't say which | Lead-flagged Q4 / Overengineering | **Major** | Add §3.6 "Effect-Cutting Priority Order" — pre-commit which photographic effects get dropped first if perf gates fail (suggest: grain → DoF magnitude → font weight count → R3F texture quality), in that order |
| M1 | Bulb-as-design-team metaphor is double-encoded — cold HM has no anchor to decode it | Lead-flagged Q3 / New-risk | **Major** | Add explicit framing copy adjacent to the bulb on `/projects/ai-design-team`: 1-sentence "The bulb represents the team. Click to see them light up." Test with cold reader before committing |
| M2 | R3F-on-one-page is locked behind a click — HM may never see the interactive scene | Lead-flagged Q2 | **Major** | Either: (a) auto-bloom the bulb on idle after 2-3s with `prefers-reduced-motion` respected, OR (b) static-lit-state by default with click → off / interactive. Currently "static unlit by default" risks the only frontend-signal surface going unseen |
| M3 | "Live status pulse" on bulb (§4.1) is an unscheduled ritual — will silently rot per prior lesson | Pre-mortem / Ritual-decay | **Major** | Either automate (CI job reads latest LinkedIn build log timestamp, writes to a JSON the static build consumes), OR cut the feature. Don't ship a manually-maintained "live" signal |
| M4 | Asset acquisition for mic / printer / bulb is undefined — hidden gating dependency | New-risk | **Major** | Add §3.7 "Asset Sourcing Plan": chosen stock photo source OR 3D render path, license check, decision date pre-Phase 3. If 3D-rendered, who renders and on what timeline |
| M5 | No "Now / Currently learning" surface — engineering HMs explicitly look for learn-in-public signal | Lead-flagged Q7 / Pre-mortem | **Major** | Add minimal `/now` page in V1 (literally one short markdown file, ~100 words updated monthly). 3-hour build cost, fills the gap the Lead correctly flagged |
| M6 | Build-phase cohesion has no acceptance criteria — "principle-level + skills-driven" can produce inconsistent visual system | Lead-flagged Q8 / Assumption | **Major** | Add §3.8 "Design-Language Coherence Gates": define what "coherent" means as an output of Phase 1's reference page — e.g., final token set used by ≥80% of components, single typography pairing, motion curve count ≤ 3 |
| M7 | Mobile-first claimed but design language is desktop-cinematic — mobile experience risks degradation | Pre-mortem / New-risk | **Major** | Add §6.5 "Mobile Acceptance Criteria": studio composite on phone shows three subjects + identity tagline within 1 viewport scroll; DoF disabled below 768px; tested on real mid-tier Android in CI or pre-launch |
| M8 | "What didn't work" sections claimed as highest-signal but no enforcement mechanism | Pre-mortem / New-risk | **Major** | Make `what_didnt_work` a required string field in the Zod project schema (not just an MDX section convention); CI fails if empty or shorter than 200 characters |
| L1 | Three V1 projects is at the floor of the "3-5 deep" consensus; one weak surface degrades the set | Lead-flagged Q1 | **Minor** | If any of the 3 V1 surfaces is thin (e.g., podcast appearances has fewer than 2 episodes), promote a V2 candidate (job-search-pipeline) early. Decide pre-build |
| L2 | CI gate complexity (Playwright + Vitest + Lighthouse-CI + axe-core + Biome + Astro Check) is heavy for 5-route site | Overengineering | **Minor** | Defer Playwright + Vitest until first visual regression bites. Lighthouse-CI + axe-core are load-bearing — keep. Cut the rest from Phase 0 |
| L3 | No launch / Definition-of-Done criteria — site risks perfectionism rot | New-risk | **Minor** | Add §11.5 "Ship Criteria": explicit "all 3 projects have ≥500-word case studies + 1 build log + GitHub link → ship to custom domain by [date]." If buffer slips, ship anyway with the strongest 2 |

13 findings. 2 Critical, 8 Major, 3 Minor.

---

## Per-Finding Detail

### C1. No commitment device for case studies — the load-bearing element is treated as "buffer"

The market research explicitly says ~70% of effort should go to project case studies and writeups; the architecture acknowledges this and then schedules the writeups as a "1-2 week buffer" at the END of the implementation plan (§11). No template enforcement, no quality gate, no required-sections lint — the most important content is the most under-architected.

**Why it matters for THIS project:** The site's entire callback signal depends on these writeups being deep, honest, and well-written. If the user ships the scaffolding and then drifts on the writing (a textbook failure mode), the site is a beautiful empty shell. **Alternative:** Add §1.4 "Case-Study Discipline" with a Zod-enforced MDX schema (required `problem`, `approach`, `what_didnt_work`, `outcomes` fields with min-length validation), plus a pre-commit hook that fails on stub content. Treat the writeups as the spec's substance, not the buffer.

### C2. Photography-assets contradiction — the photographer-identity decoder is unresolved

§4.4 About page says "One curated photograph (the user's own work — only place the user's photography appears explicitly)." §12 rejected-alternatives says "Assets sourced from stock or 3D-rendered stills" with rationale "the photographer identity rides on scene + interactions, NOT photographic work." These are directly contradictory.

**Why it matters:** This isn't a copy-edit fix. It's the project's load-bearing identity claim. The Lead's own Q5 asks whether the photographer signal lands WITHOUT actual photos. §4.4 hedges by sneaking one in; §12 commits to none. Pick a lane. **Alternative:** Recommend the §12 path (zero user photos) and replace §4.4's photograph with a stronger photography-to-engineering vocabulary mapping that is itself the artifact — make the metaphor decode visually on the page (e.g., side-by-side: "composition" with a rule-of-thirds grid overlay on a wireframe diagram).

### C3. Design language vs perf budget tension is unresolved

§6 sets ≤200KB total / ≤20KB JS on home. §3 specifies custom serif (~30-60KB), film grain overlay (~10-30KB), DoF backdrop-filter, exposure shift on click, vignette, studio composite (~80KB), R3F island (≤200KB but cached). On paper achievable; in practice build will hit a wall and someone will cut something. The spec doesn't pre-commit what gets cut.

**Why it matters:** The Lead flagged this (Q4). If the cuts are made under build-time pressure without a priority order, the wrong effects get dropped — e.g., grain (cheap signal of photographic identity) gets kept while DoF (which is the actual focus-pull interaction) gets dropped. **Alternative:** Add §3.6 "Effect-Cutting Priority Order" — pre-commit that the cut order is: grain → DoF magnitude → font weight count (drop italic) → vignette → R3F texture quality. Cuts halt at first effect that brings perf gates green.

### M1. Bulb-as-design-team metaphor is double-encoded

The bulb represents (a) the design team and (b) the function of lighting / illuminating. A cold HM has neither anchor — they see a light bulb and have to read text to know it's "the team." The metaphor is clever but illegible cold.

**Why it matters:** The Lead flagged this (Q3). "Too clever by half" risk is real. **Alternative:** One sentence of framing copy adjacent to the bulb on `/projects/ai-design-team`: "The bulb represents the AI Design Team — click to light up the team members." Test with a cold reader (someone who hasn't seen the spec) before committing to the metaphor; if they don't get it within 3 seconds, drop the metaphor and use a different hero on this page.

### M2. R3F-on-one-page locked behind a click — HM may never see it

§4.3 says "Static unlit by default; click/tap to turn on." The R3F island is the only frontend-skill spotlight in V1. If the HM lands on `/projects/ai-design-team`, reads the text, and leaves without clicking the bulb, they have seen zero R3F.

**Why it matters:** The Lead's Q2 asks whether one R3F page is enough; my answer is "only if HM actually triggers the interaction." **Alternative:** Auto-bloom the bulb on idle after 2-3s with `prefers-reduced-motion` honored, OR ship the bulb in a lit + idle-animation state by default and let click cycle through team-member highlights. Reverse the default state.

### M3. "Live status pulse" on the bulb is an unscheduled ritual

§4.1 says "subtle pulse / glow if any 'live' status — e.g., active build log in the last 7 days." This requires manual update of a timestamp. Per the ritual-decay lesson confirmed across the linkedin-post-builder, cc-distribution-parser, and job-search-pipeline reviews — manually-maintained "live" signals always rot, usually within 3 weeks.

**Why it matters:** A perpetually-off "live indicator" reads worse than no indicator. **Alternative:** Automate it. CI job parses the user's LinkedIn build-log RSS (or the project's `build_logs[]` MDX frontmatter) at build time and emits a `last_activity.json` the static site consumes. If automation is too heavy, cut the feature.

### M4. Asset acquisition undefined

§11 Phase 3 says "Acquire / generate hero assets for mic, printer, light bulb (stock photos or 3D-rendered stills)." This is a single line for what is potentially weeks of work depending on source. License path, render path, fallback path all undefined.

**Why it matters:** Hidden gating dependencies kill timelines. **Alternative:** Add §3.7 "Asset Sourcing Plan" with: chosen stock source (Unsplash / commercial license) OR 3D-rendered path (Blender? someone else?), license validation step, decision deadline pre-Phase 3.

### M5. No "Now / Currently learning" surface

Market research §2.1 explicitly calls "alive" portfolios out vs "brochure" portfolios. The "Now" surface is one of the cheapest ways to signal aliveness — a single markdown file. The architecture defers it to V2 with no rationale beyond "stripped to essential surfaces."

**Why it matters:** Lead flagged this (Q7); my read is V1 is the right scope, but `/now` is a 3-hour build that fills a real gap. **Alternative:** Add `/now` as a V1 route. One markdown file, ~100 words, updated monthly. Even unmaintained, the *date* on it signals aliveness (or staleness — which IS information).

### M6. Build-phase cohesion has no acceptance criteria

§3 hands cohesion responsibility to `frontend-design` + `impeccable`. §13 says spec stays principle-level. But "coherent visual system" is asserted as an outcome without acceptance criteria. If Phase 1's design-language reference page ships and the skills produce three different motion-curve families and two competing typography pairings, the spec has no way to say "that's not coherent."

**Why it matters:** Lead flagged this (Q8) as the spec-to-build cohesion question. **Alternative:** Add §3.8 "Design-Language Coherence Gates" — define what coherence means as a measurable output of Phase 1: ≤3 motion curves total, single typography pairing finalized, ≥80% of components use color tokens (no one-off hex values), grain + DoF + vignette parameters locked. The reference page is the gate.

### M7. Mobile-first claimed but design language is desktop-cinematic

§6.4 says "mobile-first." §3 specifies grain, DoF, lighting, studio composite — all of which are desktop-cinematic effects. Research §7.1 estimates 25-40% of HM views are mobile. If the mobile experience is "three subjects stacked vertically with no DoF" (per §4.1), the photographer-identity signal collapses on mobile.

**Why it matters:** A meaningful slice of HM impressions will be mobile, and the design language doesn't extend there. **Alternative:** Add §6.5 "Mobile Acceptance Criteria": studio composite renders meaningfully at ≤768px (e.g., one focused subject with the other two as a small picker), identity tagline above-fold, at least one photographic effect (grain or vignette) preserved.

### M8. "What didn't work" sections claimed as highest-signal — no enforcement

§1.2 lists "What didn't work" as a project-page section and calls it "highest signal per Profy.dev." But the Zod schema doesn't make this a required field — it's only a markdown convention. Writers under deadline will skip the hard part.

**Why it matters:** The architecture's own evidence base says this section is the differentiator. **Alternative:** Add `what_didnt_work: z.string().min(200)` as a required schema field. Same enforcement for `problem`, `approach`, `outcomes` — see C1.

### L1. Three V1 projects at the floor of "3-5 deep" consensus

Market research says 3-5 deep projects. V1 is 3. If any one of them is thin (e.g., podcast appearances has only 1 episode), the set degrades to 2 strong + 1 weak — perceived as one real project. **Alternative:** Pre-build, gut-check the inventory. If podcast appearances has fewer than 2 episodes or the design-team artifact isn't demoable, promote a V2 candidate (job-search-pipeline) early.

### L2. CI gate complexity heavy for a 5-route site

§5.4 includes Playwright + Vitest in the default tooling. For a 5-route content site with no functional state, this is overengineered. **Alternative:** Defer Playwright + Vitest until first visual regression bites. Keep Lighthouse-CI + axe-core + Astro Check + Biome — those are load-bearing.

### L3. No Definition-of-Done / launch criteria

§11 phases end with "deploy to Cloudflare Pages" but no explicit ship criteria. Perfectionism rot is a real failure mode for personal sites. **Alternative:** Add §11.5 "Ship Criteria": all 3 projects have ≥500-word case studies + 1 build log + GitHub link → ship to custom domain by an explicit date. If buffer slips, ship with the strongest 2.

---

## Two-Lens Check (external vs internal visibility)

**External lens (visible to cold technical HM):**
- C1 (thin/empty writeups) — directly visible, kills callback signal
- C2 (photography contradiction → confused identity) — directly visible
- M1 (illegible bulb metaphor) — directly visible
- M2 (R3F never triggered) — visible as "no frontend signal"
- M3 (broken "live" indicator) — visible as staleness
- M5 (no Now surface) — visible as "brochure not alive"
- M7 (degraded mobile experience) — visible to ~25-40% of HMs
- M8 (no "what didn't work" section) — visible as missing the highest-signal content
- L1 (thin V1 set) — visible as "only 3 projects, one is weak"
- L3 (never launches) — terminally visible

**Internal lens (only matters to build team):**
- C3 (effect-cutting priority order) — invisible externally; internal build hygiene
- M4 (asset acquisition plan) — invisible externally; affects timeline
- M6 (build-phase cohesion criteria) — invisible externally as a process; visible externally only as the *output* if the gates fail
- L2 (CI gate over-tooling) — invisible externally; affects build velocity

**Observation:** 10 of 13 findings are visible to the cold-HM external lens — strong external-impact ratio. The Critical findings are both external-lens-visible, which is the right severity calibration.

---

## Verdict

**SHIP-WITH-REVISIONS.**

The architecture is well-grounded and the Lead has done the hard work of constraining V1 scope correctly. The two Critical findings (C1 case-study discipline, C2 photography-assets contradiction) are addressable in <2 hours of spec work and unblock the build. The 8 Major findings should each be reviewed and either adopted or explicitly rejected with rationale before Phase 0 begins — particularly C3 (effect-cutting priority), M3 (automate or cut the live pulse), and M6 (cohesion acceptance criteria), because those determine whether the build phase converges or fragments.

The spec earned its principle-level looseness on visuals; it should be tightened on the load-bearing content discipline, the asset path, and the cohesion gates. With those revisions, this design has a credible path to "earns interview callbacks from technical HMs" — which is the only metric that matters.
