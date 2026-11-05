import { parse as parseYaml } from 'yaml';

export type Frontmatter = Record<string, unknown>;

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*\r?\n?/;

/**
 * Splits a Markdown file into its YAML frontmatter and body.
 *
 * Written by hand (instead of a library) because it is three lines of logic and
 * makes the format obvious: a `---` fence, YAML, another `---`.
 */
export function splitFrontmatter(raw: string, source = 'post'): { data: Frontmatter; body: string } {
	const match = FRONTMATTER.exec(raw);
	if (!match) {
		throw new Error(`"${source}" is missing a frontmatter block (--- ... ---).`);
	}

	const data = parseYaml(match[1]) ?? {};
	if (typeof data !== 'object' || Array.isArray(data)) {
		throw new Error(`"${source}" frontmatter must be a YAML object.`);
	}

	return { data: data as Frontmatter, body: raw.slice(match[0].length) };
}
