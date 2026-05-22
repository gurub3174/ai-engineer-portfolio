---
project: ai-engineer-portfolio
type: design-brief
version: v2-approved
created: 2026-05-22
updated: 2026-05-22
status: confirmed
tags: [portfolio, frontend, hiring, design-language]
---

# Design Brief — AI Engineer Portfolio Website

**Project codename:** `ai-engineer-portfolio` (rename at scaffold if desired)
**Domain:** Personal portfolio / job-search marketing asset
**Note:** This is a non-agentic frontend project. The design team's process applies (framing → research → architecture → critic → spec). The "agent architecture" lens substitutes for *information architecture / design system / perf budget / accessibility plan*.

## Goal

A portfolio site that earns **interviews from technically-fluent hiring managers** at AI-native or AI-adjacent companies, by demonstrating *what was built*, *how the candidate thinks*, and *how they communicate technical ideas*. Expressive design language reflects the candidate's photographer identity but never blocks the recruiter's primary task.

## Primary user

**Technical hiring managers / engineering leads / IC interviewers** who:
- Care about *shipped artifacts*, not credentials
- Test *intellectual curiosity* by reading how you reason about problems
- Value *communication ability* — can you explain a technical idea on video / in writing?
- Will spend ~30 seconds skimming and 5+ minutes on a project page if hooked

**Explicitly de-prioritized:** non-technical recruiters, ATS keyword optimization, FAANG-style CS-fundamentals signaling. (Those audiences served by LinkedIn / résumé PDF, not the site.)

## Content model (load-bearing IA decision)

**Tier 1 — Projects (the hero surface)**
Each project is a **first-class page** containing:
- Problem / context / why this mattered
- Approach + decisions + trade-offs (the *thinking*)
- **Build logs nested inline** (LinkedIn build logs become per-project chapters)
- **Blogs nested inline** (longer-form writing attached to the same project)
- GitHub link, demo link, outcome metrics
- Photography-influenced visual treatment (project-specific imagery)

**Tier 2 — Talks & Media (canonical-home surface)**
- Podcast appearances (embedded playback)
- Educational videos / reels (embedded)
- Exists because nowhere else aggregates them — that's its job

**Tier 3 — About / Contact**
- Brief identity statement
- Photography-influenced visual presence
- Contact paths (email, LinkedIn, GitHub)

**NOT a standalone section:** "Build Logs," "Blog," or "Articles." Writing lives where it belongs — attached to the project it's about. Possible exception: a "Now / Currently learning" thought-stream if validated in architecture.

## Design direction

Both researched, winner surfaced in synthesis:
- **(A) Product-photography studio metaphor** — central 3D "product" with key/fill/rim lighting; camera-mechanic interactions (click-to-shoot, focus pulls)
- **(B) Built-PC metaphor** — 3D motherboard / CPU / GPU as navigable hardware nodes
- **(D) Fallback if both fail evidence tests** — 2D photography-influenced design (cinematic lighting, grain, depth-of-field) without WebGL

## Success metrics

- **Leading:** Inbound interview requests citing the portfolio (count baseline = 0, target ≥ 1/month sustained)
- **Lagging:** % of *hiring-manager conversations* where they reference specific projects or videos from the site
- **Anti-metric:** Pretty-design / Awwwards-style accolades. Vanity.

## Constraints

- **Stack:** Open-source, static-first. Next.js (App Router) or Astro + MDX. R3F/Three.js if 3D wins.
- **Hosting:** Free tier (Vercel / Cloudflare Pages / GitHub Pages — to be decided)
- **Path:** `C:\projects\<project-name>\`
- **Budget:** ~$0
- **Timeline:** Soft target ~2-4 weeks of focused build work

## Out of scope

- CMS / dynamic backend (markdown files only)
- Comments / community features
- Multi-language i18n (English-only)
- Building the AI/Data projects themselves (this site only *displays* them)
- A standalone blog section (writing is project-attached)

## Pipeline plan (user-confirmed)

| Stage | Run? | Rationale |
|---|---|---|
| Market Scout | YES | Tooling undecided; 3D-portfolio precedents need surveying; 4 referenced skills need evaluation |
| Research Analyst | YES | Recruiter-attention research, 3D cognitive-load, perf empirics, accessibility — empirical questions |
| Design Critic | YES | High overengineering risk (3D nav); pre-mortem must catch "slow LCP costs interviews" failure mode |

## Research questions dispatched

**Market Scout (8 questions):** AI/Data Engineer portfolio precedents in 2026, 3D-portfolio precedents (Bruno Simon, Larose, Lusion), static-site framework comparison, 3D library comparison (R3F vs Threlte vs vanilla), four-skills investigation, hosting comparison, embedded media patterns, photographer-engineer hybrids.

**Research Analyst (10 questions):** recruiter attention behavior, predictors of portfolio-driven callbacks, 3D cognitive-load empirics, perf-to-bounce-rate research, WCAG/accessibility baseline, content-order empirics, mobile traffic share, communication-signal empirics, brand vs convention trade-off, photographer-engineer narrative reception.
