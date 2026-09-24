import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs');

  const searchIndex = docs.map((doc) => {
    // If doc.id is index, url is /docs, else /docs/${doc.id}
    const cleanId = doc.id.replace(/\.(md|mdx)$/, '');
    const url = cleanId === 'index' ? '/docs' : `/docs/${cleanId}`;

    return {
      title: doc.data.title,
      description: doc.data.description || '',
      url,
      group: doc.data.group || 'General',
    };
  });

  return new Response(JSON.stringify(searchIndex), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
