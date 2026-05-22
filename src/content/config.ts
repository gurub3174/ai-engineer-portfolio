import { defineCollection, z } from 'astro:content';

// Case-study schema (per spec/architecture.md §1.4 + Critic C1)
// Required sections enforced with .min(200) — build fails on stub content
const projects = defineCollection({
  type: 'content', // MDX body for the case-study narrative
  schema: z.object({
    title: z.string().min(3),
    slug: z.string().regex(/^[a-z0-9-]+$/, 'slug must be kebab-case'),
    hero_object: z.enum(['microphone', 'printer', 'lightbulb']),
    asset_strategy: z.enum(['stock-photo', 'r3f-model']),
    asset_url: z.string(),
    one_line_pitch: z.string().max(120),
    status: z.enum(['shipped', 'in-progress', 'exploration']),
    github_url: z.string().url().optional(),
    demo_url: z.string().url().optional(),
    tech_stack: z.array(z.string()).default([]),
    role: z.string(),
    timeline: z.string(),
    // Case-study discipline — these are LOAD-BEARING (Critic C1 + M8)
    problem: z.string().min(200, 'Case-study Problem section must be at least 200 chars'),
    approach: z.string().min(200, 'Case-study Approach section must be at least 200 chars'),
    what_didnt_work: z
      .string()
      .min(
        200,
        'Case-study What-Didn\'t-Work section must be at least 200 chars (highest-signal section per market research)',
      ),
    outcomes: z.string().min(200, 'Case-study Outcomes section must be at least 200 chars'),
    build_logs: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().url(),
          date: z.string(), // ISO 8601
          summary: z.string().max(200),
        }),
      )
      .default([]),
    blogs: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().url(),
          date: z.string(),
        }),
      )
      .default([]),
    embedded_media: z
      .array(
        z.object({
          type: z.enum(['youtube', 'vimeo', 'loom', 'spotify']),
          url: z.string().url(),
          caption: z.string().optional(),
        }),
      )
      .default([]),
    tags: z.array(z.string()).default([]),
  }),
});

const about = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().default('About'),
    decoder_pairs: z
      .array(
        z.object({
          photography_term: z.string(),
          engineering_term: z.string(),
          caption: z.string().optional(),
        }),
      )
      .min(3)
      .max(5),
  }),
});

const now = defineCollection({
  type: 'content',
  schema: z.object({
    updated: z.string(), // ISO 8601 date — the date IS the signal
  }),
});

export const collections = { projects, about, now };
