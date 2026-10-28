import { splitFrontmatter } from './frontmatter';
import { markdownToHtml, readingTime } from './markdown';

export type PostMeta = {
	slug: string;
	title: string;
	date: string;
	summary: string;
	tags: string[];
	draft: boolean;
	readingTime: number;
};

export type Post = PostMeta & { html: string };

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

function slugFromPath(path: string): string {
	return path.split('/').pop()!.replace(/\.md$/, '');
}

function parse(path: string, raw: string): { meta: PostMeta; body: string } {
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

/** Posts newest first. Drafts are visible in dev and prerendered nowhere else. */
export function getAllPosts({ includeDrafts = import.meta.env.DEV } = {}): PostMeta[] {
	return Object.entries(files)
		.map(([path, raw]) => parse(path, raw).meta)
		.filter((post) => includeDrafts || !post.draft)
		.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export async function getPost(slug: string): Promise<Post | undefined> {
	const entry = Object.entries(files).find(([path]) => slugFromPath(path) === slug);
	if (!entry) return undefined;

	const [path, raw] = entry;
	const { meta, body } = parse(path, raw);
	if (meta.draft && !import.meta.env.DEV) return undefined;

	return { ...meta, html: await markdownToHtml(body) };
}

/** Stable across locales and timezones: the frontmatter date is a plain day. */
export function formatDate(date: string): string {
	return new Intl.DateTimeFormat('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		timeZone: 'UTC'
	}).format(new Date(`${date}T00:00:00Z`));
}
