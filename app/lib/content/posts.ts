import { extractHeadings, markdownToHtml } from './markdown';
import { parsePost, slugFromPath } from './parsePost';
import type { Post, PostMeta } from './types';

/**
 * Every post is inlined into the build as a raw string by Vite. There is no
 * filesystem access at runtime — which is what makes this work in a Worker
 * and lets the whole blog be prerendered.
 */
const files = import.meta.glob('/content/posts/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

const postsBySlug = new Map(
	Object.entries(files).map(([path, raw]) => [slugFromPath(path), { path, raw }])
);

/** Posts newest first. Drafts are visible in dev and prerendered nowhere else. */
export function getAllPosts({ includeDrafts = import.meta.env.DEV } = {}): PostMeta[] {
	return [...postsBySlug.values()]
		.map(({ path, raw }) => parsePost(path, raw).meta)
		.filter((post) => includeDrafts || !post.draft)
		.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export async function getPost(slug: string): Promise<Post | undefined> {
	const entry = postsBySlug.get(slug);
	if (!entry) return undefined;

	const { meta, body } = parsePost(entry.path, entry.raw);
	if (meta.draft && !import.meta.env.DEV) return undefined;

	const html = await markdownToHtml(body);
	return { ...meta, html, headings: extractHeadings(html) };
}
