import fs from 'node:fs';
import path from 'node:path';
import type { Config } from '@react-router/dev/config';
import { splitFrontmatter } from './app/lib/content/frontmatter';

const postsDir = path.join(process.cwd(), 'content/posts');

/**
 * Slugs are read from disk here because this file runs in Node during the
 * build, before the app bundle exists. Drafts are skipped: prerendering a
 * draft would turn its 404 loader into a failed build.
 *
 * `splitFrontmatter` is shared with the app so the build config and the
 * runtime cannot drift apart.
 */
function isPublished(file: string): boolean {
	const raw = fs.readFileSync(path.join(postsDir, file), 'utf8');

	try {
		const { data } = splitFrontmatter(raw, file);
		return data.draft !== true;
	} catch {
		// Let the app surface the real validation error when it renders the post.
		return true;
	}
}

function publishedPostSlugs(): string[] {
	if (!fs.existsSync(postsDir)) return [];

	return fs
		.readdirSync(postsDir)
		.filter((file) => file.endsWith('.md'))
		.filter(isPublished)
		.map((file) => file.replace(/\.md$/, ''));
}

export default {
	// Render on the server, but emit static HTML for every page we know about.
	// The Worker stays around for the sitemap and 404s.
	ssr: true,
	prerender: () => ['/', ...publishedPostSlugs().map((slug) => `/writing/${slug}`)]
} satisfies Config;
