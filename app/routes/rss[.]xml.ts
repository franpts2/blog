import { Feed } from 'feed';
import { getAllPosts } from '~/lib/posts';
import { site } from '~/lib/site';

/**
 * Resource route: /rss.xml
 *
 * Resource routes return a Response instead of a component. This one is not
 * prerendered (prerender writes HTML files), so the Worker renders it per
 * request — cheap, and always in sync with the content.
 */
export async function loader() {
	const posts = getAllPosts();

	const feed = new Feed({
		title: site.title,
		description: site.description,
		id: site.url,
		link: site.url,
		language: 'en',
		copyright: `© ${new Date().getFullYear()} ${site.author.name}`,
		updated: posts[0] ? new Date(`${posts[0].date}T00:00:00Z`) : new Date(),
		feedLinks: { rss: `${site.url}/rss.xml` },
		author: { name: site.author.name, link: site.author.url }
	});

	for (const post of posts) {
		const url = `${site.url}/writing/${post.slug}`;
		feed.addItem({
			title: post.title,
			id: url,
			link: url,
			description: post.summary,
			date: new Date(`${post.date}T00:00:00Z`),
			author: [{ name: site.author.name, link: site.author.url }]
		});
	}

	return new Response(feed.rss2(), {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
