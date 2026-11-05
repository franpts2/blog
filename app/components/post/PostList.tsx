import type { PostMeta } from '~/lib/content/types';
import { EmptyPostList } from './EmptyPostList';
import { PostListItem } from './PostListItem';

type PostListProps = {
	posts: PostMeta[];
};

export function PostList({ posts }: PostListProps) {
	if (posts.length === 0) return <EmptyPostList />;

	return (
		<ul className="border-t border-line">
			{posts.map((post) => (
				<PostListItem key={post.slug} post={post} />
			))}
		</ul>
	);
}
