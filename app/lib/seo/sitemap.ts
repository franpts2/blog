import { site } from '~/lib/config/site';
import type { PostMeta } from '~/lib/content/types';

function escapeXml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

/** Build the /sitemap.xml body from the same post list the site renders. */
export function buildSitemap(posts: PostMeta[]): string {
	const urls = [
		{ loc: `${site.url}/`, lastmod: undefined },
		...posts.map((post) => ({
			loc: `${site.url}/writing/${post.slug}`,
			lastmod: post.date
		}))
	]
		.map(({ loc, lastmod }) => {
			const modified = lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : '';
			return `  <url><loc>${escapeXml(loc)}</loc>${modified}</url>`;
		})
		.join('\n');

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}
