# AGENTS.md

Guidance for Claude Code and other coding assistants working in this repository.

## What this is

The public documentation site for the Canadian Severe Storms Laboratory (CSSL) Weather Intelligence portal and the Raindrop and Cyclone APIs. Built with **Astro 7** (Sätteri Markdown processor), **MDX**, **Bun** and **Tailwind CSS v4**, laid out like Mintlify and themed to match Weather Intelligence.

## Services documented

- `weather.cssl.ca`: the Weather Intelligence web portal. Always call it **Weather Intelligence**, not "Mesonet". Source: `~/mesonet`.
- `raindrop.cssl.ca`: station observations, alerts and the station catalog (REST, `/api/v1`). Source: `~/raindrop`. The live OpenAPI document is at `https://raindrop.cssl.ca/openapi/v1.json`.
- `cyclone.cssl.ca`: gridded data (model output, radar, satellite, lightning). Source: `~/cyclone` (Rust; routes in `crates/cyclone-app-core/src/serve_http.rs` and `crates/cyclone-serve/src/`).

**Every claim in the docs must be verifiable against those repos or the live APIs.** Local checkouts can lag `origin/main`, so fetch before relying on them. Use real, trimmed API responses in examples; don't invent values, parameters, client libraries or API keys.

## Commands

```bash
bun install
bun run dev
bun run build
bun run preview
bun run astro check
```

## Layout

- `src/content/docs/`: MDX pages, loaded by `src/content.config.ts`. Frontmatter: `title`, `description`, `sidebarTitle`, `group`, `order`, `icon`, `badge`.
- `src/lib/docs.ts`: URL helpers and sidebar group order.
- `src/layouts/`: `BaseLayout.astro` (HTML shell, pre-paint theme script) and `DocsLayout.astro` (header, sidebar, content, table of contents; adds heading anchors and code copy buttons).
- `src/components/`: `Header`, `Sidebar`, `TableOfContents`, `SearchModal` (⌘K, indexes titles and headings from `src/pages/api/search.json.ts`), `ThemeToggle`, `ServiceDiagram`, and `icons.ts` (icon names usable in frontmatter and cards).
- `src/components/mdx/`: `Callout`, `Card`, `CardGroup`, `Steps`, `Step`, `Tabs`, `TabItem`, `CodeGroup`, `Accordion`, `AccordionGroup`, `Endpoint`, `ParamField`, `ResponseField`, `Badge`. Import from `@/components/mdx`.
- `astro.config.mjs`: wraps tables for horizontal scrolling and passes ```` ```lang title="…" ```` through as the `<CodeGroup>` tab label.
- `src/styles/global.css`: Tailwind v4 theme and prose styles. Prose rules only target class-less elements (Markdown output), so component markup is unaffected. Colour tokens come from `mesonet`: `--color-tempest: #dc2929` (accent), `--color-sleet: #151518`, `--color-storm: #09090b`, `--color-blizzard: #f8f8f8`, plus the shadcn HSL surface tokens.
