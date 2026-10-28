import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';
import { PostList } from '~/components/PostList';
import { getAllPosts } from '~/lib/posts';
import { site } from '~/lib/site';

export function loader() {
	return { posts: getAllPosts() };
}

export const meta: MetaFunction = () => [
	{ title: site.title },
	{ name: 'description', content: site.description },
	{ property: 'og:title', content: site.title },
	{ property: 'og:description', content: site.description },
	{ property: 'og:url', content: site.url },
	{ tagName: 'link', rel: 'canonical', href: site.url }
];

export default function Home({ loaderData }: { loaderData: ReturnType<typeof loader> }) {
	const { posts } = loaderData;
	const [latest, ...rest] = posts;

	return (
		<div>
			<section className="max-w-xl">
				<p className="text-[15px] leading-relaxed text-muted">
					I'm Francisca, a frontend engineer. I write about building small products — the
					constraints you find after you announce, the rewrites they force, and the parts of
					shipping nobody blogs about.
				</p>
			</section>

			{latest ? (
				<section className="mt-12">
					<div className="mb-4 flex items-baseline justify-between">
						<h1 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-faint">
							Latest
						</h1>
						<Link to="/writing" className="text-xs text-muted hover:text-ink">
							All writing
						</Link>
					</div>
					<PostList posts={[latest, ...rest].slice(0, 5)} />
				</section>
			) : (
				<section className="mt-12 border-y border-line py-10">
					<p className="text-sm text-muted">
						The first essay is being written. Add a Markdown file to{' '}
						<code className="font-mono text-[13px]">content/posts/</code> to publish it.
					</p>
				</section>
			)}
		</div>
	);
}
