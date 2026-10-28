import type { LoaderFunctionArgs, MetaFunction } from 'react-router';
import { PillLink } from '~/components/PillLink';
import {
	bodyType,
	containerProse,
	displayType,
	labelType,
	proseClass
} from '~/lib/styles';
import { formatDate, getPost } from '~/lib/posts';
import { site } from '~/lib/site';

export async function loader({ params }: LoaderFunctionArgs) {
	const post = await getPost(params.slug!);
	if (!post) throw new Response('Not found', { status: 404 });
	return { post };
}

export const meta: MetaFunction<typeof loader> = ({ loaderData }) => {
	if (!loaderData) return [{ title: `Not found — ${site.name}` }];

	const { post } = loaderData;
	const url = `${site.url}/writing/${post.slug}`;

	return [
		{ title: `${post.title} — ${site.name}` },
		{ name: 'description', content: post.summary },
		{ property: 'og:title', content: post.title },
		{ property: 'og:description', content: post.summary },
		{ property: 'og:type', content: 'article' },
		{ property: 'article:published_time', content: post.date },
		...post.tags.map((tag) => ({ property: 'article:tag', content: tag })),
		{ property: 'og:url', content: url },
		{ tagName: 'link', rel: 'canonical', href: url }
	];
};

export default function Post({ loaderData }: { loaderData: Awaited<ReturnType<typeof loader>> }) {
	const { post } = loaderData;

	return (
		<article className={containerProse}>
			<header className="pt-[clamp(2rem,5vw,4rem)]">
				<h1
					className={`${displayType} text-[clamp(2.25rem,6vw,4rem)] leading-[0.98]`}
				>
					{post.title}
				</h1>
				{post.summary && <p className={`${bodyType} mt-5 max-w-[40rem]`}>{post.summary}</p>}

				<div className={`mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-4 ${labelType}`}>
					<time dateTime={post.date}>{formatDate(post.date)}</time>
					<span aria-hidden="true">·</span>
					<span>{post.readingTime} min read</span>
					{post.tags.length > 0 && (
						<>
							<span aria-hidden="true">·</span>
							<span>{post.tags.join(' · ')}</span>
						</>
					)}
					{post.draft && (
						<span className="inline-block whitespace-nowrap rounded-full border border-line bg-accent-soft px-1.5 py-0.5 font-mono text-[0.6rem] font-medium uppercase leading-[1.4] tracking-[0.08em] text-accent-ink">
							Draft
						</span>
					)}
				</div>
			</header>

			{/* The HTML comes from trusted Markdown committed to this repo. */}
			<div className={`${proseClass} mt-12`} dangerouslySetInnerHTML={{ __html: post.html }} />

			<footer className="mt-[clamp(3rem,8vw,5rem)] border-t border-line pt-8 pb-[clamp(4rem,8vw,7rem)] print:hidden">
				<div className="flex items-center justify-between gap-4">
					<p className={labelType}>Thanks for reading.</p>
					<PillLink to="/writing" variant="outline" className="shrink-0">
						More writing
					</PillLink>
				</div>
			</footer>
		</article>
	);
}
