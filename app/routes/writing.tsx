import type { MetaFunction } from 'react-router';
import { AccentDot } from '~/components/AccentDot';
import { PostList } from '~/components/PostList';
import { bodyType, containerWide, displayType, labelType } from '~/lib/styles';
import { getAllPosts } from '~/lib/posts';
import { site } from '~/lib/site';

export function loader() {
	return { posts: getAllPosts() };
}

export const meta: MetaFunction = () => [
	{ title: `Writing — ${site.name}` },
	{ name: 'description', content: 'Every essay, newest first.' },
	{ property: 'og:title', content: `Writing — ${site.name}` },
	{ property: 'og:description', content: 'Every essay, newest first.' },
	{ property: 'og:type', content: 'website' },
	{ property: 'og:url', content: site.url },
	{ tagName: 'link', rel: 'canonical', href: site.url }
];

export default function Writing({ loaderData }: { loaderData: ReturnType<typeof loader> }) {
	const { posts } = loaderData;

	return (
		<div className={containerWide}>
			<header className="pt-[clamp(2rem,5vw,4rem)] pb-8">
				<p className={labelType}>Archive</p>
				<h1
					className={`${displayType} mt-4 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]`}
				>
					Writing
					<AccentDot />
				</h1>
				<div className="mt-5 flex max-w-[46rem] flex-wrap items-baseline justify-between gap-3">
					<p className={bodyType}>Essays and notes, newest first.</p>
					<p className={labelType}>
						{posts.length} {posts.length === 1 ? 'essay' : 'essays'}
					</p>
				</div>
			</header>

			<PostList posts={posts} showIndex />
		</div>
	);
}
