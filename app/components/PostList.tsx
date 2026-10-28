import { Link } from 'react-router';
import { bodyType, labelType } from '~/lib/styles';
import type { PostMeta } from '~/lib/posts';
import { formatDate } from '~/lib/posts';

type PostListProps = {
	posts: PostMeta[];
};

export function PostList({ posts }: PostListProps) {
	if (posts.length === 0) {
		return (
			<div className="border-y border-line py-10">
				<p className={labelType}>No essays yet</p>
				<p className={`${bodyType} mt-3`}>The first essay is being written.</p>
			</div>
		);
	}

	return (
		<ul className="border-t border-line">
			{posts.map((post) => (
				<li key={post.slug} className="border-b border-line">
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
								{post.draft && (
									<span className="inline-block whitespace-nowrap rounded-full border border-line bg-accent-soft px-1.5 py-0.5 font-mono text-[0.6rem] font-medium uppercase leading-[1.4] tracking-[0.08em] text-accent-ink">
										Draft
									</span>
								)}
							</div>
							{post.summary && (
								<p className="mt-1.5 text-[0.95rem] leading-[1.65] text-muted">
									{post.summary}
								</p>
							)}
							{post.tags.length > 0 && (
								<p className={`mt-2.5 ${labelType}`}>{post.tags.join(' · ')}</p>
							)}
						</div>
					</Link>
				</li>
			))}
		</ul>
	);
}
