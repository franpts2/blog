import type { LoaderFunctionArgs, MetaFunction } from 'react-router';
import { Link } from 'react-router';
import { formatDate, getPost } from '~/lib/posts';
import { site } from '~/lib/site';

export async function loader({ params }: LoaderFunctionArgs) {
	const post = await getPost(params.slug!);
	if (!post) throw new Response('Not found', { status: 404 });
	return { post };
}

export const meta: MetaFunction<typeof loader> = ({ loaderData }) => {
	if (!loaderData) return [{ title: `Not found — ${site.name}` }];

	const url = `${site.url}/writing/${loaderData.post.slug}`;
	return [
		{ title: `${loaderData.post.title} — ${site.name}` },
		{ name: 'description', content: loaderData.post.summary },
		{ property: 'og:title', content: loaderData.post.title },
		{ property: 'og:description', content: loaderData.post.summary },
		{ property: 'og:type', content: 'article' },
		{ property: 'article:published_time', content: loaderData.post.date },
		{ property: 'og:url', content: url },
		{ tagName: 'link', rel: 'canonical', href: url }
	];
};

export default function Post({ loaderData }: { loaderData: Awaited<ReturnType<typeof loader>> }) {
	const { post } = loaderData;

	return (
		<article>
			<header className="max-w-xl">
				<Link
					to="/writing"
					className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint hover:text-ink"
				>
					← Writing
				</Link>
				<h1 className="mt-6 text-[2rem] font-medium leading-[1.15] tracking-[-0.02em] sm:text-[2.5rem]">
					{post.title}
				</h1>
				{post.summary && (
					<p className="mt-4 text-[15px] leading-relaxed text-muted">{post.summary}</p>
				)}
				<div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-faint">
					<time dateTime={post.date}>{formatDate(post.date)}</time>
					<span aria-hidden="true">·</span>
					<span>{post.readingTime} min read</span>
					{post.tags.length > 0 && (
						<>
							<span aria-hidden="true">·</span>
							<span>{post.tags.join(', ')}</span>
						</>
					)}
					{post.draft && (
						<span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
							draft
						</span>
					)}
				</div>
			</header>

			{/* The HTML comes from trusted Markdown committed to this repo. */}
			<div className="prose mt-12" dangerouslySetInnerHTML={{ __html: post.html }} />
		</article>
	);
}
