import type { Route } from './+types/home';
import { PostList } from '~/components/post/PostList';
import { PageTitle } from '~/components/ui/PageTitle';
import { site } from '~/lib/config/site';
import { getAllPosts } from '~/lib/content/posts';
import { pluralize } from '~/lib/format';
import { pageMeta } from '~/lib/seo/meta';
import { bodyType, containerWide, labelType } from '~/lib/styles';

export function loader() {
	return { posts: getAllPosts() };
}

export const meta: Route.MetaFunction = () =>
	pageMeta({
		title: `Writing — ${site.name}`,
		description: 'Every essay, newest first.',
		path: '/'
	});

export default function Home({ loaderData }: Route.ComponentProps) {
	const { posts } = loaderData;

	return (
		<div className={containerWide}>
			<header className="pt-[clamp(2rem,5vw,4rem)] pb-8">
				<PageTitle eyebrow="Archive" title="Writing" />
				<div className="mt-5 flex flex-wrap items-baseline justify-between gap-3">
					<p className={bodyType}>Essays and notes, newest first.</p>
					<p className={`${labelType} ml-auto text-right`}>
						{pluralize(posts.length, 'essay', 'essays')}
					</p>
				</div>
			</header>

			<PostList posts={posts} />
		</div>
	);
}
