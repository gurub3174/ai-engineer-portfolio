---
project: ai-engineer-portfolio
type: research-brief
created: 2026-05-22
tags: [recruiter-attention, cognitive-load, web-performance, accessibility, hiring-signals]
raw_notes: ../../../wiki/raw/2026-05-22-research-analyst-portfolio.md
---

# Research Brief — Portfolio Website for Junior AI/Data Engineer Hiring

Brutally honest up front: there is **no peer-reviewed study** that directly tests "does a 3D portfolio help or hurt engineering callbacks?" The empirical question at the heart of this project is genuinely under-researched. What follows is the closest defensible evidence, with explicit transfer assumptions and confidence grades.

## Q1. Recruiter / hiring-manager attention behavior

**1.1 Resume initial scan is ~7s; F-pattern dominates info-dense layouts.**
- Citation: Ladders Inc., *Eye-Tracking Study* (2018 update; n=30 recruiters, professional rig).
- Confidence: **Moderate**. Industry-funded, small-n, not peer-reviewed; replicates Nielsen's earlier work.
- **So What:** Treat first viewport like a resume header: identity + value prop + proof signals in F-pattern top bar. Do not gate this behind a 3D loading screen.

**1.2 F-pattern foundational and still observed in 2024.**
- Citation: Nielsen, J. (2006 / updated 2024). *F-Shaped Pattern for Reading Web Content.* NN/G eye-tracking, n=232.
- Confidence: **Strong** (replicated, large-n, decades of follow-up).
- **So What:** A clear hero artifact (project tile, demo video) short-circuits F-pattern scanning. Design *into* the F-pattern or design *past* it with a strong fixation target — ignoring it is not viable.

## Q2. What predicts a portfolio-driven callback

**2.1 Resume quality lifts callbacks by ~30% for majority-coded candidates.**
- Citation: Bertrand & Mullainathan (2004). *Are Emily and Greg More Employable than Lakisha and Jamal?* AER 94(4). 4,870 fictitious applications, RCT-style field audit.
- Confidence: **Strong** (AER, replicated Kang et al. 2016).
- **So What:** Quality signals (clean writing, demonstrated outcomes) move the needle measurably. Polish > novelty when goal is to clear initial-screen veto.

**2.2 Portfolio site is the container; projects are the content.**
- Citation: Profy.dev hiring-manager survey (2022), n≈60.
- Confidence: **Preliminary** (small, non-random). Direction-of-effect only.
- 93% would look at a portfolio when linked; 51% said absence wouldn't hurt.
- **So What:** ~70% build effort to project case studies, ~30% to site shell. Do not invert.

**2.3 README quality predicts repo signaling.**
- Citation: Prana et al. (2021). *Categorizing the Content of GitHub README Files.* Information and Software Technology.
- Confidence: **Moderate** (peer-reviewed, observational not causal).
- **So What:** Invest in READMEs. Highest ROI for demonstrating communication ability for eng HMs.

## Q3. Cognitive load of 3D / WebGL

**3.1 Animation > static with medium effect — but ONLY when representational, not decorative.**
- Citation: Höffler & Leutner (2007). *Instructional animation vs static pictures: meta-analysis.* Learning and Instruction. k=26. Weighted d=0.37, 95% CI [0.25, 0.49]. Representational d=0.40, decorational ≈0.
- Confidence: **Strong** (peer-reviewed meta).
- **So What:** A 3D environment that *encodes information* (PC build where GPU = ML model, storage = data pipeline) has CLT-defensible upside. A photography-studio scene where the camera is purely decorative skin is *extraneous load* with no learning benefit and measurable perf/accessibility cost. **Choose the metaphor that represents content, not the prettier one.**

**3.2 Interactive animation conditional on pacing and concurrent text.**
- Citation: Berney & Bétrancourt (2016). *Does animation enhance learning? Meta-analysis.* Computers & Education. g=0.226 overall; system-paced g=0.309; with narration g=0.336; no-text g=0.883.
- Confidence: **Strong**.
- **So What:** 3D must be (a) user-paced, no autoplay on first paint, (b) accompanied by *either* narration *or* minimal competing text, not both.

**3.3 CLT: extraneous load = penalty; germane = good.**
- Citation: Sweller (1988) + Sweller, Ayres & Kalyuga (2011). *Cognitive Load Theory.* Springer.
- Confidence: **Strong**.
- **So What:** 7-second recruiter scan is high-time-pressure → extraneous load failures are catastrophic. 3D regime where benefit > cost: low time pressure, representational mapping, user-paced. **Keep first viewport flat and fast; gate 3D behind explicit opt-in.**

## Q4. Web performance → bounce-rate empirics

**4.1 Bounce probability rises 32% from 1→3s LCP, 90% from 1→5s.**
- Citation: Google / SOASTA-Akamai (2017). *State of Online Retail Performance.* n≈10 billion sessions.
- Confidence: **Strong** for ecommerce; **moderate** generalizability to portfolios.
- **So What:** Three.js portfolios commonly ship 4-8s LCP on mid-tier mobile. Each second above 2.5s LCP costs 10-15% of audience. Single hardest empirical constraint on the 3D direction.

**4.2 CWV thresholds: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at 75th percentile.**
- Citation: Google web.dev. Empirically derived from CrUX 75th-percentile real-user data. INP replaced FID March 2024.
- Confidence: **Strong** (de facto industry standard).
- **So What:** Targets. 3D scene must (a) lazy-load behind text/2D first paint, (b) keep INP <200ms during interaction, (c) avoid CLS during shader compile.

## Q5. Accessibility baseline

**5.1 WCAG 2.2 AA practical floor; 2.3.3 (Animation from Interactions) AAA but EAA-required (EU, June 2025).**
- Citation: W3C. *WCAG 2.2.* Recommendation, October 2023.
- Confidence: **Strong**.
- **So What:** Respect `prefers-reduced-motion`, provide "skip 3D" path, ensure keyboard focus order in 2D fallback. For enterprise/gov/healthcare/fintech HMs (meaningful slice of AI/DE market), failing accessibility is hard veto.

**5.2 Vestibular disorders affect ~35% of US adults across lifetime.**
- Citation: NIH NIDCD; Agrawal et al. 2009, *Archives of Internal Medicine*.
- Confidence: **Strong**.
- **So What:** Motion triggers (parallax, fast camera moves, auto-orbit) not niche. Default reduced motion; opt-in to full motion.

**5.3 WebGL canvas opaque to screen readers; requires parallel DOM tree.**
- Citation: W3C WAI ARIA / MDN WebGL accessibility.
- Confidence: **Strong** (technical fact).
- **So What:** Every piece of content reachable via 3D nav must also be reachable via semantic HTML with no 3D required. Non-negotiable for AA conformance.

## Q6. Content order — projects-first vs about-first

**6.1 No peer-reviewed studies found.** Adjacent: NN/g "Above the Fold" (Krug 2014; Nielsen 2018) — stay/leave decision in <10s. Industry consensus: projects above fold, brief tagline above projects, "about" deeper.
- Confidence: **Preliminary** (heuristic consensus).
- **So What:** Default projects-first with one-sentence identity tagline above. Honest gap — no controlled study.

## Q7. Mobile traffic share for hiring-context portfolio views

**7.1 No direct data.** LinkedIn web traffic ≈31% mobile / 69% desktop (SimilarWeb-derived). Recruiter tools desktop-dominant; first-touch links skew mobile.
- Confidence: **Preliminary** (inferred).
- **So What:** Assume 25-40% portfolio views mobile, first impressions higher. Mobile must work and be fast (compounds Q4). Strong argument against 3D-primary first paint.

## Q8. Communication-signal empirics

**8.1 Communication = #1 most-cited skill in employer hiring surveys.**
- Citation: NACE *Job Outlook 2024.* Employer self-report, n>200.
- Confidence: **Moderate** (self-report, not behavioral; consistent year-over-year).
- **So What:** Demonstrated communication (video walkthroughs, written project narratives, READMEs) aligned with stated HM priorities. Defensive signal.

**8.2 No peer-reviewed RCT** showing video/writing samples cause callback lift for engineers.
- **So What:** Stated preferences evidence, not revealed preferences. Ship written + video artifacts; don't claim causally proven to lift callbacks.

## Q9. Brand identity vs convention — credibility trade-off

**9.1 46.1% of users judge credibility primarily on visual design appeal.**
- Citation: Fogg et al. (2003). Stanford Persuasive Technology Lab. Replicated Stanford Web Credibility Project (n=4,500+).
- Confidence: **Strong**.
- **So What:** Visual design is dominant credibility lever for first impressions. Argues for polish but not novelty.

**9.2 Aesthetic judgments form in ~50ms and correlate with credibility.**
- Citation: Lindgaard et al. (2006). *50 milliseconds to make a good first impression.* Behaviour & IT 25(2).
- Confidence: **Strong** (replicated).
- **So What:** 3D loading screen at first paint trades 50ms of immediate aesthetic judgment for 4+ seconds of compile time — a costly trade.

**9.3 Unconventional design raises credibility only when justified by content.**
- Citation: van Schaik & Ling (2009). *Role of context in perceptions of aesthetics over time.* IJHCS.
- Confidence: **Moderate**.
- **So What:** For a *3D/WebGL/creative-developer* applicant, a Bruno-Simon-style site IS the work. For a *junior AI/Data Engineer*, 3D is off-domain novelty — evidence predicts this *reduces* credibility unless the 3D itself carries information (Q3 representational mapping) AND substance is reachable in <10s.

## Q10. Photographer-engineer narrative reception

**10.1 No direct research found.** Adjacent: Spence (1973) *Job Market Signaling.* Unusual backgrounds are high-cost-to-fake and informative *if the signal is legibly decoded*. T-shaped skills (IDEO 2010; Conley 2008) — industry consensus, weak empirical grounding.
- Confidence: **Preliminary at best.**
- **So What:** Narrative defensible but unproven. Tie photography skills explicitly to engineering ones ("composition → information architecture"). Treat as tiebreaker signal, not primary differentiator.

## Evidence Summary Table

| # | Finding | Citation | Confidence |
|---|---|---|---|
| 1.1 | Recruiter scan ~7s, F-pattern | Ladders 2018 | Moderate |
| 1.2 | F-pattern foundational, replicated | Nielsen / NN/G 2006-2024 | Strong |
| 2.1 | Resume quality lifts callbacks ~30% | Bertrand & Mullainathan 2004 (AER) | Strong |
| 2.2 | Portfolio container vs content | Profy.dev 2022 | Preliminary |
| 2.3 | README quality predicts repo signaling | Prana et al. 2021 | Moderate |
| 3.1 | Animation > static iff representational | Höffler & Leutner 2007 | Strong |
| 3.2 | Animation effect conditional on pacing | Berney & Bétrancourt 2016 | Strong |
| 3.3 | CLT extraneous load penalty | Sweller 1988 / 2011 | Strong |
| 4.1 | 32-90% bounce rise as LCP grows | Google/SOASTA 2017 | Strong |
| 4.2 | CWV thresholds | Google web.dev | Strong |
| 5.1 | WCAG 2.2 AA + 2.3.3 motion | W3C 2023 | Strong |
| 5.2 | Vestibular disorders ~35% lifetime | NIH/NIDCD (Agrawal 2009) | Strong |
| 5.3 | WebGL opaque to screen readers | W3C WAI / MDN | Strong |
| 6.1 | No controlled study on content order | — | Preliminary |
| 7.1 | No direct data on HM mobile share | LinkedIn (inferred) | Preliminary |
| 8.1 | Communication = #1 employer-cited skill | NACE 2024 | Moderate |
| 9.1 | 46% judge credibility on visual design | Fogg et al. 2003 Stanford | Strong |
| 9.2 | Aesthetic judgment in 50ms | Lindgaard et al. 2006 | Strong |
| 9.3 | Unconventional design credible only when content-justified | van Schaik & Ling 2009 | Moderate |
| 10.1 | No direct research on hybrid creative-tech brand | — | Preliminary |

## Research Gaps

1. No controlled study compares 3D vs flat portfolios on engineering hiring outcomes. Inference from CLT, performance, credibility research only. **3D direction is empirically a judgment call.**
2. No data on HM mobile vs desktop portfolio-view share. Best inference 25-40% mobile.
3. No peer-reviewed study on portfolio content order.
4. No research on hybrid creative-technical narrative reception in technical hiring.
5. Communication signal → callback supported by stated-preferences (NACE), not revealed-preferences RCTs.

## Headline implications

1. **Performance and accessibility are hard constraints.** LCP ≤2.5s, INP ≤200ms, WCAG 2.2 AA with `prefers-reduced-motion` and 2D-equivalent path. Non-negotiable evidence-backed targets.
2. **First viewport must work in <10s for a 7-second-scanner.** Identity + value + project signals in F-pattern top bar. 3D, if present, lives *behind* this.
3. **3D defensible only if representational, user-paced, progressively enhanced.** PC-build mapped to actual projects clears CLT bar; photography-studio purely-decorative does not.
4. **For junior AI/DE applicant, 3D is off-domain novelty.** Bar higher than for creative-developer applicant.
5. **Project depth + README quality dominate.** ~70% content, ~30% shell.
