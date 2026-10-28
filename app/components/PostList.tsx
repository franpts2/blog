import { Link } from 'react-router';
import { bodyType, labelBase, labelType } from '~/lib/styles';
import type { PostMeta } from '~/lib/posts';
import { formatDate } from '~/lib/posts';

type PostListProps = {
	posts: PostMeta[];
	showIndex?: boolean;
};

export function PostList({ posts, showIndex = false }: PostListProps) {
	if (posts.length === 0) {
		return (
			<div className="border-y border-line py-10">
				<p className={labelType}>No essays yet</p>
				<p className={`${bodyType} mt-3`}>The first essay is being written.</p>
			</div>
		);
	}

	const gridCols = showIndex
		? 'md:grid-cols-[2rem_7.5rem_minmax(0,1fr)_1.5rem]'
		: 'md:grid-cols-[7.5rem_minmax(0,1fr)_1.5rem]';
	const dateCol = showIndex ? 'md:col-start-2' : 'md:col-start-1';
	const contentCol = showIndex ? 'md:col-start-3' : 'md:col-start-2';
	const arrowCol = showIndex ? 'md:col-start-4' : 'md:col-start-3';

	return (
		<ul className="border-t border-line">
			{posts.map((post, index) => (
				<li key={post.slug} className="border-b border-line">
					<Link
						to={`/writing/${post.slug}`}
						className={`group grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-2 py-6 transition-colors duration-150 active:bg-paper-soft motion-reduce:transition-none md:items-baseline md:gap-x-6 md:py-7 ${gridCols} focus-visible:[outline:2px_solid_var(--color-accent)] focus-visible:outline-offset-[-1px]`}
					>
						{showIndex && (
							<span
								className={`hidden md:col-start-1 md:row-start-1 md:block ${labelBase} text-faint-soft`}
								aria-hidden="true"
							>
								{String(index + 1).padStart(2, '0')}
							</span>
						)}

						<time
							dateTime={post.date}
							className={`col-start-1 row-start-1 ${dateCol} ${labelType}`}
						>
							{formatDate(post.date)}
						</time>

						<div
							className={`col-span-2 row-start-2 min-w-0 md:col-span-1 md:row-start-1 ${contentCol}`}
						>
							<div className="flex items-baseline gap-3">
								<h2 className="font-display text-[1.35rem] font-semibold leading-[1.2] tracking-[-0.02em] text-ink break-words text-balance transition-colors duration-150 ease-out-expo group-hover:text-accent-ink group-focus-visible:text-accent-ink motion-reduce:transition-none md:text-2xl">
									{post.title}
								</h2>
								{post.draft && (
									<span className="inline-block whitespace-nowrap rounded-full border border-line bg-accent-soft px-1.5 py-0.5 font-mono text-[0.6rem] font-medium uppercase leading-[1.4] tracking-[0.08em] text-accent-ink">
										Draft
									</span>
								)}
							</div>
							{post.summary && (
								<p className="mt-1.5 max-w-[60ch] text-[0.95rem] leading-[1.65] text-muted">
									{post.summary}
								</p>
							)}
							{post.tags.length > 0 && (
								<p className={`mt-2.5 ${labelType}`}>{post.tags.join(' · ')}</p>
							)}
						</div>

						<span
							className={`col-start-2 row-start-1 justify-self-end font-mono text-base leading-[1.4] text-faint-soft transition-[color,transform] duration-150 ease-out-expo group-hover:translate-x-0.5 group-hover:text-accent group-focus-visible:text-accent-ink motion-reduce:transition-none ${arrowCol}`}
							aria-hidden="true"
						>
							→
						</span>
					</Link>
				</li>
			))}
		</ul>
	);
}
