# AI Engineer Portfolio

Personal portfolio for a junior AI/Data Engineer targeting technical hiring managers at AI-native companies. Design language is a product-photography studio with three featured projects rendered as lit subjects (mic / printer / light bulb).

**Stack:** Astro 5.x + MDX + R3F (one page only) + TypeScript + Cloudflare Pages.

**Launch target:** 2026-06-21.

## Project tree

```
.claude/          # local Claude Code tooling (gitignored)
spec/             # design package — Build Lead's source of truth
src/              # Astro source: content, components, layouts, pages, styles
public/           # static assets shipped as-is
tests/            # a11y + (deferred) e2e
docs/             # build decisions, asset licenses, perf-decisions, standup-log
scripts/          # build/maint scripts
wiki/             # project-local LLM wiki (Karpathy lifecycle, optional)
```

## Slash commands

- `/consult-build-lead` — routine questions, in-build judgments
- `/build` — sprint pipeline (full Build Lead delegation per tier)
- `/research <question>` — timeboxed external-evidence brief
- `/grill-me <plan>` — Socratic interview on a decision
- `/impeccable <command>` — design skill (23 commands: shape / critique / audit / polish / animate / colorize / typeset / adapt / optimize / live ...)
- See `.claude/skills/` for installed skill inventory.

## Key references

- `spec/scope.md` — Tier (Internal), skills, agent roster — **Build Lead reads this first**
- `spec/architecture.md` — system design + IA + design system principles
- `spec/implementation-plan.md` — sprint breakdown + risk register
- `spec/design-rationale.md` — per-decision rationale + interview prep
- `spec/test-plan.md` — acceptance criteria → validation tests
- `.claude/rules/` — modular conventions (code-style, design-system, accessibility, performance, content-conventions)

## Bash workaround

User profile path contains an apostrophe. For any bash command touching `$USERPROFILE`, use the variable directly — do not hardcode the full path.

## Conventions pointer

All rules live modularly in `.claude/rules/*.md` per the Claude Code project standard. CLAUDE.md stays <200 lines.
