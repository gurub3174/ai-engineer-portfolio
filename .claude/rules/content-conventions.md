# Content Conventions — AI Engineer Portfolio

Loaded when writing MDX content or editing case studies. Derived from `spec/architecture.md` §1.4 (Case-Study Discipline) and `spec/critical-review.md` C1 + M8.

## Required project schema (Zod-enforced)

Every project MDX file in `src/content/projects/` MUST have these frontmatter fields:

```yaml
---
title: string
slug: string (kebab-case)
hero_object: 'microphone' | 'printer' | 'lightbulb'
asset_strategy: 'stock-photo' | 'r3f-model'
asset_url: string
one_line_pitch: string (max 120 chars)
status: 'shipped' | 'in-progress' | 'exploration'
github_url: string (URL) optional
demo_url: string (URL) optional
tech_stack: string[]
role: string
timeline: string
problem: string (min 200 chars)         # REQUIRED
approach: string (min 200 chars)        # REQUIRED
what_didnt_work: string (min 200 chars) # REQUIRED — highest-signal section
outcomes: string (min 200 chars)        # REQUIRED
build_logs: { title, url, date, summary }[]  optional
blogs: { title, url, date }[]                 optional
embedded_media: { type, url, caption }[]      optional
---
```

**Build fails if any required field is missing or shorter than 200 chars.** No exceptions, no warnings — hard gates only.

## Section-writing guidance

### Problem
What was the actual context? Why did this matter? Who was the user / stakeholder? What was the constraint that made it hard?

**Good:** "PE limited partners receive monthly capital-call notices in inconsistent PDF layouts across 20+ GPs. Extraction by hand takes 6+ hours per cycle and introduces ~5% line-item error. The team wanted to cut this to <1 hour with <1% error, on commodity hardware."

**Bad:** "We needed to extract data from documents."

### Approach
What decisions did you make? What tradeoffs did you accept? What did you reject and why? Show the **thinking**, not just the result.

**Good:** "Chose a hybrid rules + LLM approach over pure LLM extraction. Rules handle the predictable header/footer regions (~60% of fields) deterministically — cheap, fast, zero hallucination. LLM handles only the variable-format middle section, with structured output validation. This trades implementation complexity for cost (~10x cheaper) and reliability (fabrication risk isolated to one extraction path)."

**Bad:** "I used LangChain and GPT-4."

### What didn't work (HIGHEST-SIGNAL section per Profy.dev 2022)

Dead ends, false starts, things that broke. **This is the differentiator.** Engineers respect candidates who can describe their failures clearly. Hiring managers read this section more carefully than "Outcomes."

**Good:** "Initial spike used semantic chunking + RAG retrieval over the full document. Worked great on training docs, failed on production where the layout assumption broke. Spent ~2 weeks chasing this before realizing the entire chunking step was solving the wrong problem — the documents are structured enough that layout-aware extraction beats semantic retrieval. Killed the RAG path, rebuilt extraction around layout regions. Lost ~10 days but the rebuild was the right answer."

**Bad:** "Some things didn't work but I figured it out."

### Outcomes
Measurable result. What changed because of this? What did you learn? What would you do differently next time?

**Good:** "Cut per-document extraction from 6 hours manual to 12 minutes automated, with 0.4% line-item error on production data (target was <1%). Saved an estimated 80 hours/month across the LP team. Next iteration: add HITL gate for high-uncertainty extractions to catch the remaining ~0.4%. Biggest learning: structured-output validation is load-bearing — without it the LLM path silently fabricates ~3% of the time."

**Bad:** "It worked well and saved time."

## Tone

- Direct, evidence-backed, not breathless
- Engineering-credible, not marketing-glossy
- Specific numbers > vague adjectives
- First-person ("I", "we") is fine — be authentic
- No emoji decoration (one emoji per case-study max if it actually helps)
- No hedge words ("kind of," "sort of," "I think") — commit to your assertions

## Anti-patterns

- "Used X and Y to do Z" without explaining why
- Hyperbolic claims without measurement ("blazing fast", "best-in-class", "10x")
- Padding the writeup to hit word count — better one short tight paragraph than three thin ones
- Stale TODOs / "Coming soon" placeholders — pre-commit hook blocks these
- Copy-pasted job-description language ("synergize", "leverage", "stakeholder alignment")

## Tags

Use frontmatter `tags: []` for taxonomy. Common tags:
- Domain: `ai`, `data-eng`, `frontend`, `ml-ops`, `documents`, `audio`
- Stage: `shipped`, `in-progress`, `exploration`
- Stack: `python`, `typescript`, `fastapi`, `astro`, `react`, etc.

## Build logs and blogs

Build logs nest INSIDE the project frontmatter (`build_logs: []`). They are NOT a separate content collection. Same for blogs (`blogs: []`).

This is the IA decision from `spec/design-brief.md`: writing is project-attached, not standalone. There is no `/blog` route in V1.

## Adding a new project

```bash
pnpm new-project <slug>
# Generates src/content/projects/<slug>.mdx with all required sections + word-count guidance
```

The generator writes the skeleton with placeholders that will FAIL the Zod check until you replace them with real content. This is intentional — you cannot accidentally ship stub content.
