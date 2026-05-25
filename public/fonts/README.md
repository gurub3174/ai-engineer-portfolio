# Self-hosted fonts

The site self-hosts three OFL-licensed font families. Total compressed payload budget: ≤ 60 KB across all three.

| Family | File | Source (canonical) | License |
|---|---|---|---|
| Source Serif 4 | `SourceSerif4-Subhead-Semibold.woff2` | https://github.com/adobe-fonts/source-serif/releases | SIL OFL 1.1 |
| Geist Sans | `GeistVariableVF.woff2` | https://github.com/vercel/geist-font/releases | SIL OFL 1.1 |
| Geist Mono | `GeistMonoVariableVF.woff2` | https://github.com/vercel/geist-font/releases | SIL OFL 1.1 |

## Install

```bash
pnpm install-fonts
```

The script downloads the canonical woff2 files from the upstream GitHub releases, verifies size against the 60 KB total budget, and places them in this directory. Re-run if a font upstream releases a new variable file.

## If files are missing

The `font-family` stacks in `src/styles/tokens.css` fall back to system serif / sans / mono. The page still renders; the spec lock is documented and the install can happen out-of-band.

## License notices

All three families are SIL Open Font License 1.1. Copies of the OFL text live in each upstream repo; redistribution must preserve the license file. The `pnpm install-fonts` script also fetches `OFL.txt` for each family into this directory.
