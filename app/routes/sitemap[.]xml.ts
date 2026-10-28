import { getAllPosts } from '~/lib/posts';
import { site } from '~/lib/site';

/** Resource route: /sitemap.xml */
export async function loader() {
	const posts = getAllPosts();
	const staticPaths = ['/', '/writing'];
	const postPaths = posts.map((post) => `/writing/${post.slug}`);

	const urls = [...staticPaths, ...postPaths]
		.map((path) => {
			const post = posts.find((p) => path === `/writing/${p.slug}`);
			const lastmod = post ? `<lastmod>${post.date}</lastmod>` : '';
			return `  <url><loc>${site.url}${path}</loc>${lastmod}</url>`;
		})
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
