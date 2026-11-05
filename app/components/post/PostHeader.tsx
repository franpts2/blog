import type { Post } from '~/lib/content/types';
import { bodyType, displayType } from '~/lib/styles';
import { PostMetadata } from './PostMetadata';

type PostHeaderProps = {
	post: Post;
};

export function PostHeader({ post }: PostHeaderProps) {
	return (
		<header className="pt-[clamp(2rem,5vw,4rem)]">
			<h1 className={`${displayType} text-[clamp(2.25rem,6vw,4rem)] leading-[0.98]`}>
				{post.title}
			</h1>
			{post.summary && <p className={`${bodyType} mt-5 max-w-[40rem]`}>{post.summary}</p>}
			<PostMetadata post={post} />
		</header>
	);
}
