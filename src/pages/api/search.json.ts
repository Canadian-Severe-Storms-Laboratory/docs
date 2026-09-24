import type { APIRoute } from 'astro';
import { getCollection, render } from 'astro:content';
import { docUrl, sortDocs } from '@/lib/docs';

export const GET: APIRoute = async () => {
  const docs = sortDocs(await getCollection('docs'));

  const index = await Promise.all(
    docs.map(async (doc) => {
      const { headings } = await render(doc);
      return {
        title: doc.data.title,
        description: doc.data.description ?? '',
        group: doc.data.group,
        url: docUrl(doc),
        headings: headings
          .filter((h) => h.depth === 2 || h.depth === 3)
          .map((h) => ({ text: h.text, slug: h.slug })),
      };
    }),
  );

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};
