import { getAllPosts } from '~/lib/content/posts';
import { buildSitemap } from '~/lib/seo/sitemap';

/** Resource route: /sitemap.xml */
export async function loader() {
	return new Response(buildSitemap(getAllPosts()), {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
