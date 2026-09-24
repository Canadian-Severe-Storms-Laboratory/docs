# CSSL docs

Documentation for [CSSL Weather Intelligence](https://weather.cssl.ca) and the Raindrop and Cyclone APIs behind it. Built with Astro, MDX and Tailwind CSS, and themed to match Weather Intelligence.

## Development

Requires [Bun](https://bun.sh) and Node.js 22.12 or later.

```bash
bun install
bun run dev          # http://localhost:4321
bun run build        # static site in dist/
bun run astro check  # type-check
```

## Writing pages

Pages are MDX files in `src/content/docs/`. A file's path sets its URL: `raindrop/alerts.mdx` is served at `/raindrop/alerts`.

```mdx
---
title: "Alerts"
description: "One-sentence summary."
group: "Raindrop API"   # sidebar section; order is set in src/lib/docs.ts
order: 4
icon: "bell"            # name from src/components/icons.ts
---

import { Callout, Endpoint } from '@/components/mdx';
```

The [Writing docs](src/content/docs/contributing/writing-docs.mdx) page lists every frontmatter field and component, with examples. Check facts against the service code ([raindrop](https://github.com/Canadian-Severe-Storms-Laboratory/raindrop), [cyclone](https://github.com/Canadian-Severe-Storms-Laboratory/cyclone), [mesonet](https://github.com/Canadian-Severe-Storms-Laboratory/mesonet)), and use real API responses in examples.
