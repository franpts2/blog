import { NavLink } from 'react-router';

const links = [
	{ to: '/writing', label: 'Writing' },
	{ to: '/about', label: 'About' }
];

export function SiteHeader() {
	return (
		<header className="mx-auto flex w-full max-w-2xl items-baseline justify-between gap-6 px-6 pt-10 pb-10 sm:pt-14">
			<NavLink
				to="/"
				className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink hover:text-accent"
			>
				Francisca Portugal
			</NavLink>
			<nav className="flex items-baseline gap-5 text-sm text-muted">
				{links.map((link) => (
					<NavLink
						key={link.to}
						to={link.to}
						className={({ isActive }) =>
							isActive ? 'text-ink underline underline-offset-4' : 'hover:text-ink'
						}
					>
						{link.label}
					</NavLink>
				))}
				<a href="/rss.xml" className="hover:text-ink">
					RSS
				</a>
			</nav>
		</header>
	);
}
