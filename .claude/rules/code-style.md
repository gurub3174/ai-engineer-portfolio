# Code Style — AI Engineer Portfolio

Loaded contextually when writing or reviewing code.

## Karpathy's 4 principles (mandatory)

1. **Think Before Coding.** No code without a stated intent. Sketch the API, the data flow, the failure modes — then implement.
2. **Simplicity First.** Default to the simplest thing that could possibly work. Add complexity only when an existing requirement demands it. Three similar lines beats a premature abstraction.
3. **Surgical Changes.** Touch the minimum code needed for the change. Refactor in its own commit, not folded into a feature.
4. **Goal-Driven Execution.** Every commit has a stated goal. Drift is observable: if you cannot explain how the diff serves the current goal, stop.

## TypeScript / Astro

- Strict TypeScript (`astro/tsconfigs/strict` extends to strict mode)
- Prefer `type` over `interface` unless declaration merging is needed
- No `any`. Use `unknown` with refinement.
- Path aliases: `@/*`, `@components/*`, `@content/*`, `@layouts/*`, `@styles/*`
- Astro components default; React only inside `r3f/` and where interactive client-side rendering is needed
- File names: kebab-case for files, PascalCase for component files (`StudioTable.astro`)

## Component conventions

- `*.astro` for static / server-rendered components
- `*.tsx` only for React-hydrated islands (one R3F file is the main case)
- One component per file
- Props typed via Zod schema where the component reads from content (so frontmatter validates at build)

## Imports

- Order: stdlib → external → internal → relative
- Type imports separate: `import type { Foo } from './foo'`
- Astro components import without extension: `import StudioTable from '@components/StudioTable.astro'`

## Anti-patterns (CI-enforced via Biome)

- No `console.log` in shipped code (warn → error in production builds)
- No untyped `any`
- No commented-out code (delete or document with a real comment)

## Comments

Default: write NO comments. Only when the **why** is non-obvious (a constraint, an invariant, a known surprise). Self-documenting code beats explanation.

## File organization

```
src/
  content/        # MDX + Zod schemas
  components/     # *.astro
  components/r3f/ # *.tsx React islands
  layouts/        # *.astro shells
  pages/          # route entries
  styles/         # CSS / tokens
  assets/         # source assets
```
