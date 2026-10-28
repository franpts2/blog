import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration
} from 'react-router';

import type { Route } from './+types/root';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { site } from './lib/site';
import './app.css';

export const links: Route.LinksFunction = () => [
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap'
	}
];

export const meta: Route.MetaFunction = () => [
	{ title: site.title },
	{ name: 'description', content: site.description },
	{ property: 'og:site_name', content: site.name },
	{ property: 'og:type', content: 'website' },
	{ name: 'theme-color', content: '#faf8f5' }
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="min-h-dvh">
				<div className="flex min-h-dvh flex-col">
					<SiteHeader />
					<main className="mx-auto w-full max-w-2xl flex-1 px-6">{children}</main>
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
	let title = 'Something went wrong';
	let message = 'An unexpected error occurred.';

	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			title = 'Page not found';
			message = 'That page does not exist, or it moved.';
		} else {
			title = `${error.status}`;
			message = error.statusText || message;
		}
	} else if (import.meta.env.DEV && error instanceof Error) {
		message = error.message;
	}

	return (
		<div className="py-16">
			<h1 className="text-2xl font-medium tracking-tight">{title}</h1>
			<p className="mt-3 text-sm text-muted">{message}</p>
			<a
				href="/"
				className="mt-8 inline-block text-sm underline underline-offset-4 hover:text-accent"
			>
				Back to writing
			</a>
		</div>
	);
}
