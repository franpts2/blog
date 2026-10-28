import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
	index('routes/writing.tsx'),
	route('writing', 'routes/writing-redirect.ts'),
	route('writing/:slug', 'routes/post.tsx'),
	route('sitemap.xml', 'routes/sitemap[.]xml.ts')
] satisfies RouteConfig;
