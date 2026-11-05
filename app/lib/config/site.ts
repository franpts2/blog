/**
 * Single source of truth for site-level metadata. Change it here and it
 * propagates to page titles, Open Graph tags, and the sitemap.
 */
export const site = {
	name: 'Francisca Portugal',
	shortName: 'blog.f.pt',
	title: 'Francisca Portugal — Writing',
	description:
		'Essays about building small products: the constraints, the rewrites, and the parts of shipping nobody blogs about.',
	url: 'https://blog.franciscapt.dev',
	author: {
		name: 'Francisca Portugal'
	},
	elsewhere: [
		{ label: 'franciscapt.dev', href: 'https://franciscapt.dev' },
		{ label: 'github', href: 'https://github.com/franpts2' }
	]
} as const;
