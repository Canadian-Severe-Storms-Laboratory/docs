# CSSL Weather Intelligence Documentation

A high-performance documentation site built with **Astro 5** and **Bun**, styled after **Mintlify** and utilizing the exact theme tokens and brand identity from **CSSL Weather Intelligence** (`~/projects/cssl/mesonet`).

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.4+)
- Node.js (v22+)

### Commands

```bash
bun install             # Install dependencies
bun run dev             # Start Astro development server
bun run build           # Build static production documentation site
bun run preview         # Preview production build locally
bun run astro check     # Run TypeScript and Astro typecheck
```

## Adding New Documentation Pages

Add `.md` or `.mdx` files into `src/content/docs/`:

```mdx
---
title: "Your Page Title"
description: "Brief summary of the page."
group: "Getting Started" # Sidebar category name
order: 3                 # Sorting priority
icon: "rocket"           # Lucide icon name
badge: "New"             # Optional badge
---

import { Card, CardGroup, Callout } from '@/components/mdx';

Your content goes here...
```
