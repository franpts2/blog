import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration
} from 'react-router';

import type { Route } from './+types/root';
import { SiteFooter } from '~/components/layout/SiteFooter';
import { SiteHeader } from '~/components/layout/SiteHeader';
import { SkipLink } from '~/components/layout/SkipLink';
import { ErrorState } from '~/components/ui/ErrorState';
import { site } from '~/lib/config/site';
import { getErrorCopy } from '~/lib/errors';
import { defaultMeta, notFoundMeta } from '~/lib/seo/meta';
import './app.css';

export const links: Route.LinksFunction = () => [
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
	{ rel: 'preconnect', href: 'https://api.fontshare.com', crossOrigin: 'anonymous' },
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap'
	},
	{
		rel: 'stylesheet',
		href: 'https://api.fontshare.com/v2/css?f[]=clash-display@500;600&display=swap'
	},
	{ rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }
];

export const meta: Route.MetaFunction = ({ error }) => {
	if (isRouteErrorResponse(error) && error.status === 404) return notFoundMeta();
	return defaultMeta;
};

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			className="scroll-smooth [accent-color:var(--color-accent)] [color-scheme:light] [scroll-padding-top:calc(4rem_+_env(safe-area-inset-top,0px)_+_1rem)] [-webkit-text-size-adjust:100%] motion-reduce:scroll-auto md:[scroll-padding-top:calc(5rem_+_env(safe-area-inset-top,0px)_+_1rem)]"
		>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
				<meta name="color-scheme" content="light" />
				<meta name="theme-color" content="#faf8f5" />
				<meta property="og:site_name" content={site.name} />
				<meta property="og:image" content={`${site.url}/og-image.png`} />
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="630" />
				<meta property="og:image:alt" content={`Writing — ${site.name}`} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:image" content={`${site.url}/og-image.png`} />
				<Meta />
				<Links />
			</head>
			<body className="min-h-dvh bg-paper font-sans text-[1rem] leading-[1.55] text-ink antialiased [font-synthesis:none] [-webkit-tap-highlight-color:transparent] selection:bg-accent selection:text-ink print:bg-white print:text-black">
				<SkipLink />
				<div className="flex min-h-dvh flex-col">
					<SiteHeader />
					<main
						id="main-content"
						tabIndex={-1}
						className="flex-1 pt-[calc(4rem_+_1px_+_env(safe-area-inset-top,0px))] focus:outline-none md:pt-[calc(5rem_+_1px_+_env(safe-area-inset-top,0px))] print:pt-0"
					>
						{children}
					</main>
					<SiteFooter />
				</div>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	return <ErrorState {...getErrorCopy(error)} />;
}
