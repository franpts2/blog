import type { PostMeta } from '~/lib/content/types';
import { formatDate } from '~/lib/format';
import { labelType } from '~/lib/styles';
import { DraftBadge } from '~/components/ui/DraftBadge';
import { TagList } from './TagList';

type PostMetadataProps = {
	post: PostMeta;
};

export function PostMetadata({ post }: PostMetadataProps) {
	return (
		<div className={`mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-4 ${labelType}`}>
			<time dateTime={post.date}>{formatDate(post.date)}</time>
			<span aria-hidden="true">·</span>
			<span>{post.readingTime} min read</span>
			{post.tags.length > 0 && (
				<>
					<span aria-hidden="true">·</span>
					<TagList tags={post.tags} />
				</>
			)}
			{post.draft && <DraftBadge />}
		</div>
	);
}
