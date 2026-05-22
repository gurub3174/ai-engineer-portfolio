---
project: ai-engineer-portfolio
type: scope
purpose: build-team-handoff
created: 2026-05-22
status: ready
---

# Scope — AI Engineer Portfolio (Build Team Handoff)

This file is what Build Lead reads at session start to determine tier engagement.

## Tier

**Internal**

## Tier rationale

Public-facing site with a real hiring-outcome stake (failure costs interview opportunities) — above Prototype. But no end-users beyond viewer-readers, no SLA, no data persistence, no AI runtime, no compliance footprint — below Production. Internal is the right floor: hardened perf + a11y gates, real CI, eval-style perf budgets, but no NIST AI RMF / model-card burden.

## Skills required

### Base skills (always-on for any tier)
- `tdd-pytest` — NOT directly applicable (TypeScript project, not Python) → substitute: Vitest-driven component testing pattern when added
- `ruff-python` — NOT applicable → substitute: Biome for lint/format
- `git-workflow` — required

### Internal-tier additions
- `eval-harness` — repurpose for perf eval (Lighthouse-CI assertions vs CWV budgets)
- `security-baseline` — minimal applicability (no auth, no data handling); apply for headers (CSP, Referrer-Policy, etc.)
- `ci-cd-baseline` — GitHub Actions → Cloudflare Pages auto-deploy

### Project-specific (design-team identified)
- `anthropics/frontend-design` — first-party Anthropic Claude Code skill, design-thinking + implementation discipline
- `pbakaus/impeccable` (v3.1.1+) — 23 design commands, deterministic CLI lint, 27 anti-pattern rules. **Primary design driver.**
- `obra/superpowers` (optional) — workflow discipline; install if structured methodology helps

### Skills NOT to install
- `nextlevelbuilder/ui-ux-pro-max-skill` — overlaps impeccable, star count unverifiable per Market Scout

## Agent roster engagement (Tier: Internal)

| Agent | Engagement | Notes |
|---|---|---|
| **Build Lead** | Full session orchestrator | Reads spec/scope.md, delegates per tier matrix |
| **Code Reviewer** | Active on every PR | Lighthouse-CI + axe-core + Biome + Astro check; review gate before merge |
| **AI Engineer** | NOT engaged | No AI runtime in this project |
| **Pattern Scout** | Engaged ad-hoc | When adopting unfamiliar patterns (e.g., Astro content collections, R3F island integration) |
| **Test Author** | Light engagement | Vitest deferred per Critic L2; engage if/when visual regression appears |
| **Performance Specialist** | Engaged | Phase 1 reference page validation + Phase 4 final perf gate |
| **Security Reviewer** | Light engagement | CSP / Referrer-Policy / HTTPS strict; no auth surface |
| **Accessibility Specialist** | Engaged | Axe-core CI + manual screen-reader test on R3F page |

## Out of scope (locked — guards against build-time scope creep)

- CMS / dynamic backend / database
- Authentication / user accounts / comments
- Multi-language i18n
- Newsletter / email capture / forms
- Building the AI/Data Engineer projects themselves (this site only *displays* them)
- Server-side rendering (Astro static-only)
- Adding routes beyond §1.1 in architecture without explicit user approval
- Standalone /blog surface (deferred to V2; writing is project-attached in V1)
- Real-time / live features (no SSE, no WebSockets, no Server-Sent Events)
- User-uploaded content / UGC
- Analytics dashboards beyond basic Cloudflare Web Analytics
- A/B testing infrastructure
- Feature flags

## Deployment intent

**Public / Production** (it is publicly accessible at launch)

Hosted on Cloudflare Pages free tier. Custom domain recommended but not gating. No private/internal-only mode.

## Eval targets (Internal+ requirement)

| Metric | Target | Gate |
|---|---|---|
| LCP @ p75 mid-tier Android 4G | ≤2.5s | CI block |
| INP @ p75 | ≤200ms | CI block |
| CLS @ p75 | ≤0.1 | CI block |
| Lighthouse Performance | ≥95 median across routes | CI block |
| Lighthouse Accessibility | 100 | CI block |
| Axe-core AA violations | 0 per route | CI block |
| Home page total compressed weight | ≤200KB desktop, ≤150KB mobile | CI warn → block on overage |
| Home page hydrated JS | ≤20KB | CI block |
| Inbound interview-references | ≥1/month sustained 3 months post-launch | Postmortem metric |

## Governance gates

**None applicable.** No AI runtime, no PII handling, no regulated industry, no model card requirement.

Standard web governance applies:
- HTTPS enforced (Cloudflare auto-issues)
- CSP / X-Frame-Options / Referrer-Policy headers configured (security-baseline skill)
- No third-party trackers beyond Cloudflare Web Analytics (privacy-first, no cookie banner needed)
- Open Graph / Twitter card metadata on every route
- Sitemap.xml + robots.txt published

## Build-team handoff checklist

When Build Lead reads this file, the following inputs are also in `spec/`:

- [x] `design-brief.md` — problem framing
- [x] `market-research.md` — competitive landscape + adoption tiers
- [x] `research-brief.md` — empirical evidence base
- [x] `architecture.md` (v3-final, critic-resolved) — system design
- [x] `critical-review.md` — 13 findings, all accepted
- [x] `implementation-plan.md` — sprint breakdown
- [x] `product-spec.md` — PRD-style consolidation
- [x] `test-plan.md` — acceptance → validation
- [x] `design-rationale.md` — per-decision rationale + interview prep
- [x] `postmortem-template.md` — empty, fill at launch +90d
- [x] `scope.md` — this file

**Build Lead first command (post-scaffold, fresh Claude Code session at `C:\projects\ai-engineer-portfolio\`):**
```
/consult-build-lead "I'm starting the AI Engineer Portfolio build. Read spec/scope.md and spec/implementation-plan.md. Confirm tier engagement and identify Phase -1 inventory-check tasks."
```

Or for full sprint:
```
/build "Phase -1 inventory check + Phase 0 scaffold per implementation-plan.md"
```
