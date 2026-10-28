import fs from 'node:fs';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';
import type { Config } from '@react-router/dev/config';

const postsDir = path.join(process.cwd(), 'content/posts');

/**
 * Slugs are read from disk here because this file runs in Node during the
 * build, before the app bundle exists. Drafts are skipped: prerendering a
 * draft would turn its 404 loader into a failed build.
 *
 * The frontmatter parse is repeated (instead of importing app code) so this
 * file stays in the Node TypeScript project.
 */
function isPublished(file: string): boolean {
	const raw = fs.readFileSync(path.join(postsDir, file), 'utf8');
	const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
	if (!match) return true;
	const data = parseYaml(match[1]);
	return !(data && typeof data === 'object' && (data as { draft?: unknown }).draft === true);
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
	prerender: () => ['/', '/writing', ...publishedPostSlugs().map((slug) => `/writing/${slug}`)]
} satisfies Config;
