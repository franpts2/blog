import { Link } from 'react-router';
import type { PostMeta } from '~/lib/posts';
import { formatDate } from '~/lib/posts';

export function PostList({ posts }: { posts: PostMeta[] }) {
	if (posts.length === 0) {
		return <p className="text-sm text-muted">Nothing published yet.</p>;
	}

	return (
		<ul className="divide-y divide-line border-y border-line">
			{posts.map((post) => (
				<li key={post.slug}>
					<article className="group flex flex-col gap-1.5 py-5 sm:flex-row sm:items-baseline sm:gap-6">
						<time
							dateTime={post.date}
							className="shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] text-faint sm:w-32"
						>
							{formatDate(post.date)}
						</time>
						<div className="min-w-0">
							<h2 className="text-[17px] font-medium leading-snug tracking-[-0.01em]">
								<Link to={`/writing/${post.slug}`} className="hover:text-accent">
									{post.title}
								</Link>
								{post.draft && (
									<span className="ml-2 align-middle font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
										draft
									</span>
								)}
							</h2>
							{post.summary && (
								<p className="mt-1 text-sm leading-relaxed text-muted">{post.summary}</p>
							)}
						</div>
					</article>
				</li>
			))}
		</ul>
	);
}
