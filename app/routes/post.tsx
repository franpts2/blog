import type { Route } from './+types/post';
import { PostContent } from '~/components/post/PostContent';
import { PostFooter } from '~/components/post/PostFooter';
import { PostHeader } from '~/components/post/PostHeader';
import { TableOfContents } from '~/components/post/TableOfContents';
import { site } from '~/lib/config/site';
import { getPost } from '~/lib/content/posts';
import { articleMeta } from '~/lib/seo/meta';
import { containerProse } from '~/lib/styles';

export async function loader({ params }: Route.LoaderArgs) {
	const post = await getPost(params.slug!);
	if (!post) throw new Response('Not found', { status: 404 });
	return { post };
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
	if (!loaderData) return [{ title: `Not found — ${site.name}` }];
	return articleMeta(loaderData.post);
};

export default function Post({ loaderData }: Route.ComponentProps) {
	const { post } = loaderData;

	return (
		<div className="relative">
			<article className={`${containerProse} min-w-0`}>
				<PostHeader post={post} />
				<PostContent html={post.html} />
				<PostFooter />
			</article>

			{post.headings.length > 0 && <TableOfContents headings={post.headings} />}
		</div>
	);
}
