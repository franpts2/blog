import type { MetaFunction } from 'react-router';
import { PostList } from '~/components/PostList';
import { getAllPosts } from '~/lib/posts';
import { site } from '~/lib/site';

export function loader() {
	return { posts: getAllPosts() };
}

export const meta: MetaFunction = () => [
	{ title: `Writing — ${site.name}` },
	{ name: 'description', content: 'Every essay, newest first.' }
];

export default function Writing({ loaderData }: { loaderData: ReturnType<typeof loader> }) {
	return (
		<div>
			<h1 className="text-2xl font-medium tracking-tight">Writing</h1>
			<p className="mt-2 text-sm text-muted">Essays and notes, newest first.</p>
			<div className="mt-10">
				<PostList posts={loaderData.posts} />
			</div>
		</div>
	);
}
