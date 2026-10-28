import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
	index('routes/home.tsx'),
	route('writing', 'routes/writing.tsx'),
	route('writing/:slug', 'routes/post.tsx'),
	route('about', 'routes/about.tsx'),
	route('rss.xml', 'routes/rss[.]xml.ts'),
	route('sitemap.xml', 'routes/sitemap[.]xml.ts')
] satisfies RouteConfig;
