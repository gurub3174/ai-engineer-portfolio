---
project: ai-engineer-portfolio
type: market-research
created: 2026-05-22
tags: [portfolio, frontend, hosting, 3d-web, claude-skills]
raw_notes: ../../../wiki/raw/2026-05-22-market-scout-portfolio.md
---

# Competitive Landscape Report — AI/Data Engineer Portfolio

**Project:** Personal portfolio for junior AI/Data Engineer roles. Audience: technical hiring managers / eng leads. Two design directions on the table: **(A) Product-photography-studio** and **(B) Built-PC** metaphors.

## 1. Executive Summary (the three things that matter)

1. **Content is the load-bearing element, not chrome.** Across every independent source on what gets engineers callbacks in 2026, the consensus is: 3-5 deep projects with case-study writeups, live demos, and build logs. Chrome (3D, animation) is decoration on top — it cannot rescue a thin content layer. Budget allocation should be roughly **60% content + writing / 30% framework + IA / 10% 3D chrome**.

2. **3D-as-decoration genre-signals "creative dev," which is the WRONG signal for AI/Data engineering roles.** Every elite 3D portfolio surveyed (Bruno Simon, Olivier Larose, Robin Mastromarino, Lusion) belongs to someone whose JOB is creative WebGL development. The portfolio IS the product. A technical hiring manager landing on a similar-looking site will pattern-match the candidate as creative-dev / agency-track, not engineering-IC track. Mitigation: 3D must be EARNED (it IS the project) not DECORATIVE (it frames the project). **Direction (B) Built-PC has a stronger claim here than Direction (A) Product Studio**, because hardware visualization can be presented as engineering deliverable rather than design metaphor.

3. **Astro + Cloudflare Pages + R3F-as-island is the unusually clean technical fit.** MDX-first content collections, zero-JS default, R3F components hydrated only where needed, unlimited bandwidth, no commercial-use restriction. The only reason to deviate is if the user already has deep Next.js leverage they want to amortize.

## 2. Market Map

### 2.1 AI/Data engineer portfolios — format consensus

| Pattern | Evidence strength | Notes |
|---|---|---|
| 3-5 deep projects, NOT 10+ | HIGH (5+ independent sources) | Quality over quantity is the universal advice |
| Live demo / runnable code on each project | HIGH | The single biggest callback signal |
| Case-study writeup per project | HIGH | Most-named failure pattern is "project title + tech stack list with no explanation" |
| Blog / build log presence | MEDIUM-HIGH | Distinguishes "alive" portfolios from brochures |
| Loom/video walkthroughs (15-30s, not 5 min) | MEDIUM | Growing pattern 2025-2026 |
| RAG + evals + observability projects | HIGH | Forward Deployed Engineer (FDE) skill stack — 2026 zeitgeist |
| Custom domain | MEDIUM | Senior signal; juniors often start github.io |

### 2.2 3D-web-portfolio precedents

| Portfolio | Stack | Mobile | Career outcome | Tier |
|---|---|---|---|---|
| Bruno Simon | Three.js → R3F rebuild | Touch-clunky, battery-heavy | Three.js Journey course | Mainstream / iconic |
| Olivier Larose | Next.js + Three.js + Framer + GSAP + Lenis | Acceptable scroll, degraded 3D | Freelance creative dev | Mainstream |
| Robin Mastromarino | Next.js + R3F + GSAP family | Mediocre on phones | Agency / freelance | Mainstream / award-winning |
| Lusion | Vanilla Three.js + custom WebGL | Optimized but heavy | Studio business | Mainstream high-end |

**Critical pattern:** All four are creative-dev career tracks. Mobile experience universally degraded. `prefers-reduced-motion` fallback rarely shipped.

### 2.3 The four referenced skills

| Skill | What it is | Adoption | Verdict |
|---|---|---|---|
| **anthropics/frontend-design** | First-party Claude Code skill. Design-thinking + implementation + anti-patterns. | Mainstream (Anthropic official) | **Install (base layer)** |
| **pbakaus/impeccable** | Multi-tool design skill on top of frontend-design. 23 commands, 27 anti-pattern rules, deterministic CLI lint. By Paul Bakaus (ex-Google DA, jQuery UI). 28.6k stars. v3.1.1 May 2026. | Mainstream | **Install (primary design driver)** |
| **obra/superpowers** | Software development methodology framework. NOT design-specific — TDD, debugging, brainstorm, plan, subagent dev. ~20k stars. v5.1.0 May 2026. | Early-adopter to Mainstream | **Install (optional, workflow discipline)** |
| **nextlevelbuilder/ui-ux-pro-max-skill** | "161 industry-specific reasoning rules / 67 styles / 161 palettes". Star count unverifiable (WebFetch reported 81.5k — likely inflated). v2.5.0 March 2026. | Unclear — LOW confidence | **Skip — overlaps impeccable, less verifiable** |

**Recommended install order:** frontend-design → impeccable → superpowers (optional).

**Caveat:** WebFetch hallucinated Superpowers at 202k stars; actual ~20k. User should spot-check star counts before committing.

### 2.4 Static-site frameworks

| Framework | Adoption | MDX | 3D islands | Lighthouse 100 realistic? | Verdict |
|---|---|---|---|---|---|
| **Astro** | Mainstream (~50k) | Best-in-class | Yes (any framework) | Yes | **Winner** |
| **Next.js (App Router)** | Mainstream (largest React) | Works, more config | Native React | Possible, harder | Runner-up |
| **SvelteKit** | Mainstream (smaller) | Workable | Yes (Threlte) | Yes | Only if user knows Svelte |
| **Hugo** | Mainstream (Go) | Awkward shortcodes | Non-idiomatic | Yes | Skip |

### 2.5 3D/WebGL libraries

| Library | Adoption | Stack alignment | Verdict |
|---|---|---|---|
| **R3F + Drei** | Mainstream (~30k R3F, 700k weekly npm) | Astro island or Next.js | **Recommended** |
| Vanilla Three.js | Mainstream (~105k) | Anywhere | Only if max control wanted |
| Threlte | Early-adopter (~2k) | Svelte-native | Skip unless SvelteKit |
| Spline | Mainstream as design tool | Heavy runtime (200-500kb) | Prototype only, re-implement in R3F |

### 2.6 Hosting

| Host | Bandwidth | Commercial use | Edge perf | Verdict |
|---|---|---|---|---|
| **Cloudflare Pages** | UNLIMITED | Yes | Best | **Recommended** |
| Vercel Hobby | 100 GB/mo | NO (Hobby blocks commercial) | Excellent | Only if Next.js + paid upgrade OK |
| Netlify Starter | 100 GB / 300 credits | Yes | Good | Forms differentiator |
| GitHub Pages | 100 GB / 1 GB site | Yes | OK (Fastly) | Fallback |

### 2.7 Embedded media patterns

**Facade pattern is non-negotiable.** Naïve embeds cost 500kb-1.5MB per third-party JS. Facade (static poster → real iframe on click) saves 2-3s LCP on mobile.

| Platform | Approach |
|---|---|
| YouTube | `lite-youtube-embed` (~5kb facade) |
| Vimeo | `vimeo-lazyload` or hand-rolled |
| Loom | Hand-rolled poster + click-to-load |
| Spotify | `<iframe loading="lazy">` + intersection observer |

**LCP gotcha:** Do not lazy-load LCP hero image. Eager-load with `fetchpriority="high"`.

### 2.8 Photographer-engineer hybrid

**Search-surface gap.** No clean named examples of running an AI/Data engineer + photographer hybrid portfolio successfully. Inferred patterns:
- Separate subdomains, OR
- Engineering site dominant with single "Photography" link to curated gallery
- **Never mix on the same page** — reads as unfocused

**Implication:** Direction (A) Product-Studio metaphor is the more sophisticated bridge — photography is *implicit* in the metaphor (key/fill/rim lighting language) while every "product" being lit is an engineering project.

## 3. Recommendation Matrix

| Decision | Recommendation | Adoption | Confidence | Key Risk |
|---|---|---|---|---|
| Framework | Astro | Mainstream | HIGH | Smaller community than Next.js |
| 3D library | R3F + Drei | Mainstream | HIGH | Learning curve if new |
| Hosting | Cloudflare Pages | Mainstream | HIGH | Build-config rougher for Next.js |
| Design skill #1 | anthropics/frontend-design | Mainstream | HIGH | None |
| Design skill #2 | pbakaus/impeccable | Mainstream (28.6k) | HIGH | None |
| Workflow skill | obra/superpowers (optional) | Early-adopter / Mainstream | MED-HIGH | Star count needs spot-check |
| Skip | ui-ux-pro-max-skill | Unverified | LOW | Overlaps impeccable |
| Video embeds | Facade pattern | Mainstream | HIGH | None |
| Photography integration | Implicit via metaphor OR separate gallery link | Inferred | MEDIUM | Mixing same page reads unfocused |
| Design direction | (B) Built-PC safer; (A) Product-Studio differentiated but risky | — | MEDIUM | (A) fails as "pretentious" if executed weakly |

## 4. DIY Baseline

Honest baseline: plain HTML + CSS + tiny build script, markdown rendered at build time, `<iframe loading="lazy">` for media, zero 3D. Lighthouse 100, sub-100kb, days not weeks.

The framework + 3D decision is about **differentiation and joy-of-building**, not callback rates. If the user values frontend competence as a secondary FDE-track signal, Astro + selective R3F justifies itself. Otherwise the DIY baseline is honest.

## 5. Open Questions for Critic

1. No evidence base for "3D helps vs hurts engineer callbacks." Single biggest decision, no controlled data.
2. Star-count inflation across the design-skill ecosystem. Spot-verify before installing.
3. Photography integration on same domain risks unfocused signaling. Implicit-in-metaphor OR behind one curated link.
4. Mobile experience universally degraded across 3D portfolios. `prefers-reduced-motion` + no-3D fallback rarely shipped.
5. Build-log + case-study writing is the load-bearing element. If user hasn't committed to 3-5 deep writeups, no framework choice saves it. Leading risk.
