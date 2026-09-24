// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';
import tailwindcss from '@tailwindcss/vite';

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
  integrations: [mdx()],
  redirects: {
    '/': '/docs',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    processor: satteri({ hastPlugins: [wrapTables] }),
    shikiConfig: {
      theme: 'github-dark-default',
      wrap: false,
      transformers: [codeTitle],
    },
  },
});
