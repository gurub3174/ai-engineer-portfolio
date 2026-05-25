---
project: ai-engineer-portfolio
type: asset-license-register
created: 2026-05-24
purpose: track licensing/usage rights for every visual asset shipped on the site
required_by: .claude/rules/performance.md + spec/scope.md governance section
---

# Asset License Register

Every visual asset shipped on the site MUST have an entry here. If an asset lacks a license entry, the build is non-compliant.

Schema per entry:

```
## <asset-filename>
- **Path:** <where it lives in src/ or public/>
- **Source:** <generator / photographer / URL>
- **Date acquired:** YYYY-MM-DD
- **License:** <license name + URL>
- **Commercial use:** <yes/no + citation>
- **Attribution required:** <yes/no + form>
- **Modifications allowed:** <yes/no>
- **Used on:** <which route(s)>
- **Verification:** <how license was verified — TOS link, license file, etc.>
```

---

## home-scene.png (LEGACY — superseded by home-bg.png + cutouts)

- **Path:** `src/assets/home-scene.png` (kept as fallback / archive)
- **Source:** ChatGPT image generator (OpenAI), prompted by site owner 2026-05-24
- **Date acquired:** 2026-05-24
- **License:** OpenAI Terms of Use — Content section (user owns generated output)
- **Commercial use:** Yes per OpenAI ToS
- **Used on:** No longer used in production (v5 build uses the layered cutout system). Kept as archive.

## home-bg.png

- **Path:** `src/assets/home-bg.png` (source; AVIF + WebP variants generated at build time)
- **Source:** ChatGPT image generator (OpenAI), prompted by site owner 2026-05-24
- **Date acquired:** 2026-05-24
- **License:** OpenAI Terms of Use — Content section (user owns generated output)
- **Commercial use:** **Yes** — per OpenAI Terms of Use, users own the input they submit and the output generated, including for commercial purposes, subject to compliance with terms (no infringement, no misuse). Reference: https://openai.com/policies/row-terms-of-use/ Content section.
- **Attribution required:** No
- **Modifications allowed:** Yes
- **Used on:** `/` (home page studio scene — base layer, empty table with softbox)
- **Verification:** OpenAI Terms of Use Content section reviewed 2026-05-24.

## home-binder.png

- **Path:** `src/assets/home-binder.png`
- **Source:** ChatGPT image generator (OpenAI), prompted by site owner 2026-05-24
- **Date acquired:** 2026-05-24
- **License:** OpenAI Terms of Use — Content section
- **Commercial use:** Yes
- **Attribution required:** No
- **Modifications allowed:** Yes
- **Used on:** `/` (home page — binder cutout, doc-extractor hero subject)
- **Verification:** Same as home-bg.png.

## home-mic.png

- **Path:** `src/assets/home-mic.png`
- **Source:** ChatGPT image generator (OpenAI), prompted by site owner 2026-05-24
- **Date acquired:** 2026-05-24
- **License:** OpenAI Terms of Use — Content section
- **Commercial use:** Yes
- **Attribution required:** No
- **Modifications allowed:** Yes
- **Used on:** `/` (home page — microphone cutout, podcast pipeline subject)
- **Verification:** Same as home-bg.png.

## home-bulb.png

- **Path:** `src/assets/home-bulb.png`
- **Source:** ChatGPT image generator (OpenAI), prompted by site owner 2026-05-24
- **Date acquired:** 2026-05-24
- **License:** OpenAI Terms of Use — Content section
- **Commercial use:** Yes
- **Attribution required:** No
- **Modifications allowed:** Yes
- **Used on:** `/` (home page — lightbulb cutout, AI design team subject)
- **Verification:** Same as home-bg.png.

### Caveats / future-proofing

- **OpenAI ToS changes.** Terms can update; if the home asset is being long-shipped (>6 months), re-verify the ToS hasn't introduced new restrictions on AI-generated content used commercially.
- **Asset replacement plan.** This is a placeholder for Phase 2. Phase 3 may swap for a real-camera photograph shot by the site owner, which would obviate any AI-licensing concerns. See `spec/implementation-plan.md` Phase 3 asset acquisition.
- **Watermark check.** The originally-saved file had a generator watermark; verified removed in the final source file before shipping.

---

## Adding a new asset

When you add an image to `src/assets/` or `public/`, append an entry above. The format is non-negotiable — missing entries should fail review.

If the asset is stock (Unsplash, Pexels, Pixabay), the license URL is usually on the photo page; record the photographer name even if attribution isn't required (it's nice).

If the asset is your own work, list yourself as source and "All rights reserved, used by author" as license.

---

## Related

- `.claude/rules/performance.md` — image strategy + asset discipline rules
- `spec/scope.md` — governance section (no third-party trackers, asset rights cleared)
- `src/assets/` — source images (processed at build time)
- `public/` — static assets shipped as-is
