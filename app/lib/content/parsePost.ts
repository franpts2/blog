import { splitFrontmatter } from './frontmatter';
import { readingTime } from './markdown';
import type { PostMeta } from './types';

export function slugFromPath(path: string): string {
	return path.split('/').pop()!.replace(/\.md$/, '');
}

/** Turn one Markdown file into validated metadata plus its raw body. */
export function parsePost(path: string, raw: string): { meta: PostMeta; body: string } {
	const slug = slugFromPath(path);
	const { data, body } = splitFrontmatter(raw, slug);

	if (typeof data.title !== 'string' || !data.title.trim()) {
		throw new Error(`Post "${slug}" is missing a title in its frontmatter.`);
	}
	if (typeof data.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
		throw new Error(`Post "${slug}" needs a date in YYYY-MM-DD format.`);
	}

	return {
		meta: {
			slug,
			title: data.title,
			date: data.date,
			summary: typeof data.summary === 'string' ? data.summary : '',
			tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
			draft: data.draft === true,
			readingTime: readingTime(body)
		},
		body
	};
}
