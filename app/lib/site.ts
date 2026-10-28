/**
 * Single source of truth for site-level metadata. Change it here and it
 * propagates to page titles, Open Graph tags, RSS, and the sitemap.
 */
export const site = {
	name: 'Francisca Portugal',
	title: 'Francisca Portugal — Writing',
	description:
		'Essays about building small products: the constraints, the rewrites, and the parts of shipping nobody blogs about.',
	url: 'https://blog.franciscapt.dev',
	author: {
		name: 'Francisca Portugal',
		url: 'https://franciscapt.dev'
	},
	links: {
		home: 'https://franciscapt.dev',
		github: 'https://github.com/franpts2'
	}
} as const;
