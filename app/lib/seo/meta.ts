import type { MetaDescriptor } from 'react-router';
import { site } from '~/lib/config/site';
import type { Post } from '~/lib/content/types';

type PageMetaOptions = {
	title: string;
	description: string;
	path?: string;
	robots?: string;
};

/** Title, description, Open Graph, and canonical tags for a regular page. */
export function pageMeta({
	title,
	description,
	path = '/',
	robots
}: PageMetaOptions): MetaDescriptor[] {
	const url = `${site.url}${path === '/' ? '' : path}`;

	return [
		{ title },
		{ name: 'description', content: description },
		...(robots ? [{ name: 'robots', content: robots }] : []),
		{ property: 'og:title', content: title },
		{ property: 'og:description', content: description },
		{ property: 'og:type', content: 'website' },
		{ property: 'og:url', content: url },
		{ tagName: 'link', rel: 'canonical', href: url }
	];
}

/** Article metadata for a single post. */
export function articleMeta(post: Post): MetaDescriptor[] {
	const url = `${site.url}/writing/${post.slug}`;

	return [
		{ title: `${post.title} — ${site.name}` },
		{ name: 'description', content: post.summary },
		{ property: 'og:title', content: post.title },
		{ property: 'og:description', content: post.summary },
		{ property: 'og:type', content: 'article' },
		{ property: 'article:published_time', content: post.date },
		...post.tags.map((tag) => ({ property: 'article:tag', content: tag })),
		{ property: 'og:url', content: url },
		{ tagName: 'link', rel: 'canonical', href: url }
	];
}

export const defaultMeta: MetaDescriptor[] = [
	{ title: site.title },
	{ name: 'description', content: site.description }
];

/** Metadata for the 404 page. The visible copy lives in `getErrorCopy`. */
export function notFoundMeta(): MetaDescriptor[] {
	const title = `Page not found — ${site.name}`;
	const description = 'That page does not exist, or it moved.';

	return [
		{ title },
		{ name: 'description', content: description },
		{ name: 'robots', content: 'noindex' },
		{ property: 'og:title', content: title },
		{ property: 'og:description', content: description }
	];
}
