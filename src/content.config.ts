import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Shorter label for the sidebar and prev/next links. Defaults to `title`.
    sidebarTitle: z.string().optional(),
    // Name from src/components/icons.ts.
    icon: z.string().optional(),
    group: z.string().default('Getting Started'),
    order: z.number().default(999),
    badge: z.string().optional(),
  }),
});

export const collections = { docs };
