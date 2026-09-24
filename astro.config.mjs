// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

/** Wrap Markdown tables so wide ones scroll instead of overflowing the page. */
const wrapTables = {
  name: 'wrap-tables',
  element: {
    filter: ['table'],
    /** @param {any} node @param {any} ctx */
    visit(node, ctx) {
      ctx.wrapNode(node, {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-wrap'] },
        children: [],
      });
    },
  },
};

/** Expose ```lang title="…"``` as `data-title` so <CodeGroup> can label its tabs. */
const codeTitle = {
  name: 'code-title',
  /** @param {any} node */
  pre(node) {
    // @ts-ignore -- `this` is Shiki's transformer context
    const title = this.options.meta?.__raw?.match(/title="([^"]+)"/)?.[1];
    if (title) node.properties['data-title'] = title;
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.cssl.ca',
  integrations: [mdx(), sitemap()],

  redirects: {
    '/': '/docs',
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        onwarn(warning, defaultHandler) {
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
          defaultHandler(warning);
        },
        output: {
          chunkFileNames: (chunkInfo) => {
            const name = chunkInfo.name.replace(/^\.+/, '');
            return `chunks/${name}_[hash].mjs`;
          },
        },
      },
    },
  },

  markdown: {
    processor: satteri({ hastPlugins: [wrapTables] }),
    shikiConfig: {
      theme: 'github-dark-default',
      wrap: false,
      transformers: [codeTitle],
    },
  },

  adapter: cloudflare(),
});
