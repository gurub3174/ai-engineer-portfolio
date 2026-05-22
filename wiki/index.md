---
type: index
created: 2026-05-22
tags: [project-wiki, portfolio]
---

# Project Wiki — AI Engineer Portfolio

Project-local LLM wiki (optional). Follows the Karpathy lifecycle: raw notes → compiled to structured topics/sources. See `~/.claude/ai-design-team/wiki/` for the design-team wiki this project descends from.

## Structure

- `raw/` — narrative notes from build sessions, compiled later
- `topics/` — synthesized notes by theme
- `sources/` — per-paper / per-repo references
- `patterns/` — actionable design patterns
- `lessons-learned/` — per-skill or per-phase playbooks

## Status

V0 — empty starter. Populate as the build progresses if useful.

The DESIGN-team wiki (at `~/.claude/ai-design-team/wiki/`) contains the load-bearing prior research for this project. Reference it from build sessions via:

```bash
grep -r "portfolio" "$USERPROFILE/.claude/ai-design-team/wiki/"
```

## Related design-team raw notes (compiled into spec/)

- `wiki/raw/2026-05-22-market-scout-portfolio.md` (in design-team wiki)
- `wiki/raw/2026-05-22-research-analyst-portfolio.md` (in design-team wiki)
- `wiki/raw/2026-05-22-design-critic-portfolio.md` (in design-team wiki)

All three were compiled into `spec/*` for this project.
