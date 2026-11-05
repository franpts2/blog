import { Link } from 'react-router';
import { DraftBadge } from '~/components/ui/DraftBadge';
import type { PostMeta } from '~/lib/content/types';
import { formatDate } from '~/lib/format';
import { labelType } from '~/lib/styles';
import { TagList } from './TagList';

type PostListItemProps = {
	post: PostMeta;
};

export function PostListItem({ post }: PostListItemProps) {
	return (
		<li className="border-b border-line">
			<Link
				to={`/writing/${post.slug}`}
				className="group grid grid-cols-1 gap-x-4 gap-y-2 py-6 transition-colors duration-150 active:bg-paper-soft motion-reduce:transition-none md:grid-cols-[7.5rem_minmax(0,1fr)] md:items-baseline md:gap-x-6 md:py-7 focus-visible:[outline:2px_solid_var(--color-accent)] focus-visible:outline-offset-[-1px]"
			>
				<time
					dateTime={post.date}
					className={`col-start-1 row-start-1 md:col-start-1 ${labelType}`}
				>
					{formatDate(post.date)}
				</time>

				<div className="row-start-2 min-w-0 md:col-start-2 md:row-start-1">
					<div className="flex items-baseline gap-3">
						<h2 className="font-display text-[1.35rem] font-semibold leading-[1.2] tracking-[-0.02em] text-ink break-words text-balance transition-colors duration-150 ease-out-expo group-hover:text-accent-ink group-focus-visible:text-accent-ink motion-reduce:transition-none md:text-2xl">
							{post.title}
						</h2>
						{post.draft && <DraftBadge />}
					</div>
					{post.summary && (
						<p className="mt-1.5 text-[0.95rem] leading-[1.65] text-muted">
							{post.summary}
						</p>
					)}
					<TagList tags={post.tags} className={`mt-2.5 ${labelType}`} />
				</div>
			</Link>
		</li>
	);
}
