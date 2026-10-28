import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

/**
 * Markdown → HTML.
 *
 * This is the whole "blog engine": parse Markdown into an AST, add GitHub
 * flavoured syntax and heading ids, turn the AST into HTML, highlight code,
 * then serialise it. It runs at build time (prerender) and, for posts that
 * are not prerendered, in the Worker.
 */
export async function markdownToHtml(markdown: string): Promise<string> {
	const file = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype)
		.use(rehypeSlug)
		.use(rehypeHighlight, {
			// Only the languages this blog actually writes. Keeping this list
			// short keeps the Worker bundle small.
			languages: {},
			detect: false
		})
		.use(rehypeStringify)
		.process(markdown);

	return String(file);
}

/** ~220 words per minute, rounded up. Good enough for a reading estimate. */
export function readingTime(markdown: string): number {
	const words = markdown.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 220));
}
