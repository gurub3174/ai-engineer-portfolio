---
project: ai-engineer-portfolio
type: phase-(-1)-inventory-check
created: 2026-05-23
status: provisional — placeholders pending, finalize before Phase 3 (Day 15)
---

# Phase -1 — Inventory Check

**Goal:** verify each V1 project surface has the source material to support a ≥500-word case study before further build work proceeds.

**Verdict legend:** `PASS` (evidence pasted in) · `PROV` (provisional, placeholders pending) · `SUB` (substitute) · `FAIL`

---

## 1. Podcast — `/projects/podcast`

**Requirement:** ≥2 podcast appearance URLs.

**Verdict:** `PROV`

**Evidence:**
- `TODO(user): podcast appearance #1 — URL, episode title, air date, ~1-line topic`
- `TODO(user): podcast appearance #2 — URL, episode title, air date, ~1-line topic`

**Notes:** User declared finalized URLs to be supplied later. Surface is greenlit at the inventory level; case-study draft in Phase 3 will block on real URLs landing in the MDX frontmatter (`embedded_media[]`) before Zod validation passes.

---

## 2. Doc Extractor / CC Distribution Parser — `/projects/doc-extractor`

**Requirement:** GitHub repo link + ≥1 build log.

**Verdict:** `PROV`

**Evidence:**
- GitHub repo: `TODO(user): repo URL for cc-distribution-parser` (project lives locally at `C:\projects\cc-distribution-parser\`, Sprint 0 committed at `e6cb1af`)
- Build log #1: `TODO(user): build log URL or local path` — Sprint 0 retro candidate (scaffold + 49-file hybrid rules tree)

**Notes:** Sprint 0 is real and committed; Sprint 1 (FastAPI + parsing + OTel) is queued. A Sprint-0 retro written as the first build log would be the natural inaugural artifact — keeps case-study writing in Phase 3 from fabricating from memory.

---

## 3. AI Design Team — `/projects/ai-design-team`

**Requirement:** workspace link + ≥1 shipped design output.

**Verdict:** `PROV`

**Evidence:**
- Workspace: `~/.claude/ai-design-team` (v2 architecture approved 2026-04-09; this very portfolio's `spec/` was produced by this team)
- Associated blog: `TODO(user): blog URL`
- Associated website: `TODO(user): website URL`
- Shipped design output #1: this portfolio's 11-file `spec/` package (Phase 3 case study can reference these by path)
- Finalized product link: `TODO(user): finalized product URL when ready`

**Notes:** User noted a finalized product, a blog, and a website are associated. Strong inventory position — the only slot with a built-in second sample (the design team designed itself, and now designs this portfolio).

---

## Substitution decision

Not invoked. All three V1 slots provisionally PASS pending placeholder fills. If any slot fails to land real evidence by **Day 15 (Phase 3 start, 2026-06-07)**, substitute `job-search-pipeline` per `spec/scope.md`. That project has 10 commits through Day 5 of v2 build and shipped passes (Pass 5 wire, HITL gate, `/apply`, `/refine`, `/promote-baseline`) — substitution-ready.

## Exit criterion

Phase -1 closes when this file has no `TODO(user)` markers remaining. Until then, Phase 0 may proceed (the scaffold doesn't presuppose any of the three surfaces existing), but Phase 3 is blocked on resolution.

## Carry-forward

- Resolve all `TODO(user)` markers above before Day 15 (2026-06-07)
- Phase 3 Zod schema enforcement (`min(200)` per required field) is the second gate; this file is the first
