import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';
import { AccentDot } from '~/components/AccentDot';
import { PillLink } from '~/components/PillLink';
import { PostList } from '~/components/PostList';
import {
	bodyType,
	containerWide,
	displayType,
	focusRing,
	labelType,
	linkUnderline,
	touch
} from '~/lib/styles';
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
	{ property: 'og:type', content: 'website' },
	{ property: 'og:url', content: site.url },
	{ tagName: 'link', rel: 'canonical', href: site.url }
];

export default function Home({ loaderData }: { loaderData: ReturnType<typeof loader> }) {
	const latest = loaderData.posts.slice(0, 5);

	return (
		<div className={containerWide}>
			<section className="pt-[clamp(2rem,5vw,4rem)] pb-[clamp(3rem,8vw,6rem)]">
				<p className={labelType}>Writing</p>
				<h1
					className={`${displayType} mt-4 max-w-[46rem] text-[clamp(3rem,8vw,5.5rem)] leading-[0.92]`}
				>
					Notes on building small things
					<AccentDot />
				</h1>
				<p className={`${bodyType} mt-6 max-w-[38rem]`}>
					I'm Francisca, a frontend engineer. I write about the constraints you find after you
					announce, the rewrites they force, and the parts of shipping nobody blogs about.
				</p>
				<div className="mt-8 flex flex-wrap gap-3">
					<PillLink to="/writing">Read the latest</PillLink>
				</div>
			</section>

			<section className="pb-[clamp(4rem,8vw,7rem)]">
				<div className="flex items-baseline justify-between gap-4 pb-3">
					<h2 className={labelType}>Latest</h2>
					<Link
						to="/writing"
						className={`${labelType} ${linkUnderline} ${touch} ${focusRing} hover:text-accent-ink`}
					>
						All writing →
					</Link>
				</div>
				<PostList posts={latest} />
			</section>
		</div>
	);
}
