import type { CollectionEntry } from 'astro:content';

export type Doc = CollectionEntry<'docs'>;

// Sidebar group order. Groups not listed here sort last.
const GROUP_ORDER = ['Getting Started', 'Raindrop API', 'Cyclone API', 'Architecture', 'Contributing'];

const REPO_URL = 'https://github.com/Canadian-Severe-Storms-Laboratory/docs';

export function docUrl(doc: Doc): string {
  return doc.id === 'index' ? '/docs' : `/docs/${doc.id}`;
}

export function editUrl(doc: Doc): string | undefined {
  return doc.filePath ? `${REPO_URL}/blob/main/${doc.filePath}` : undefined;
}

function groupRank(group: string): number {
  const i = GROUP_ORDER.indexOf(group);
  return i === -1 ? GROUP_ORDER.length : i;
}

export function sortDocs(docs: Doc[]): Doc[] {
  return [...docs].sort(
    (a, b) => groupRank(a.data.group) - groupRank(b.data.group) || a.data.order - b.data.order,
  );
}
