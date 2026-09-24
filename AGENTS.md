# CLAUDE.md

This file provides guidance to Claude Code and AI coding assistants when working with this repository.

## What this is

The public **Documentation** website for the Canadian Severe Storms Laboratory (CSSL) Weather Intelligence Portal, Raindrop observation APIs, and Cyclone-serve forecast engines.

Built with **Astro 5+**, **Bun**, and **Tailwind CSS v4**, styled after **Mintlify**, and themed to match **CSSL Weather Intelligence** (`~/projects/cssl/mesonet`).

## Canonical Services

- `weather.cssl.ca`: Weather Intelligence web portal (always refer to as **Weather Intelligence**, not "Mesonet").
- `raindrop.cssl.ca`: Station observation data and catalog APIs.
- `cyclone.cssl.ca`: Raster data (radar composites + numerical weather model forecasts).

## Commands

```bash
bun install             # Install dependencies
bun run dev             # Start dev server
bun run build           # Build production static site
bun run preview         # Preview built site
bun run astro check     # Run typecheck diagnostics
```

## Architecture

- **`src/content/docs/`**: MDX documentation pages powered by Astro Content Layer (`src/content.config.ts`).
- **`src/layouts/`**: `BaseLayout.astro` (HTML shell, zero-flash dark mode script) and `DocsLayout.astro` (Mintlify 3-column layout).
- **`src/components/`**: Mintlify UI components:
  - `Header.astro`: Top navigation, search trigger, theme toggle, and CSSL logo.
  - `Sidebar.astro`: Categorized doc links with icons, active indicator pills, and mobile drawer.
  - `TableOfContents.astro`: Sticky right sidebar with scrollspy.
  - `SearchModal.astro`: Keyboard-navigated search dialog (`⌘K`).
  - `ThemeToggle.astro`: Zero-flash light/dark toggle.
  - `mdx/`: `<Card>`, `<CardGroup>`, `<Callout>`, `<Steps>`, `<Step>`, `<Tabs>`, `<Accordion>`, `<CodeGroup>`, `<ParamField>`, `<ResponseField>`, `<Badge>`.
- **`src/styles/global.css`**: Tailwind v4 configuration and CSS theme tokens from `mesonet`:
  - `--color-tempest: #dc2929` (accent)
  - `--color-sleet: #151518`, `--color-storm: #09090b`, `--color-blizzard: #f8f8f8`
  - Dark / light HSL surface tokens and Mintlify prose styling.
