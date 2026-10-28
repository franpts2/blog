import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration
} from 'react-router';

import type { Route } from './+types/root';
import { ErrorState } from './components/ErrorState';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { SkipLink } from './components/SkipLink';
import { site } from './lib/site';
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
	if (isRouteErrorResponse(error) && error.status === 404) {
		return [
			{ title: `Page not found — ${site.name}` },
			{ name: 'description', content: 'That page does not exist, or it moved.' },
			{ name: 'robots', content: 'noindex' },
			{ property: 'og:title', content: `Page not found — ${site.name}` },
			{ property: 'og:description', content: 'That page does not exist, or it moved.' }
		];
	}

	return [
		{ title: site.title },
		{ name: 'description', content: site.description }
	];
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
	let label = 'Error';
	let title = 'Something went wrong';
	let message = 'An unexpected error occurred.';

	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			label = '404';
			title = 'This page went missing';
			message = 'The link may be old, or the essay moved.';
		} else {
			label = String(error.status);
			title = 'Something went wrong';
			message = error.statusText || message;
		}
	} else if (import.meta.env.DEV && error instanceof Error) {
		message = error.message;
	}

	return <ErrorState label={label} title={title} message={message} />;
}
