import { Link, NavLink } from 'react-router';
import { containerWide, focusRing, navLink, touch } from '~/lib/styles';
import { site } from '~/lib/site';

const links = [{ to: '/writing', label: 'Writing' }];

export function SiteHeader() {
	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/90 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md print:hidden">
			<div className={containerWide}>
				<nav className="flex h-16 items-center justify-between gap-4 md:h-20" aria-label="Primary">
					<Link
						to="/"
						className={`font-display text-lg font-semibold tracking-tight text-ink hover:text-accent-ink ${touch} ${focusRing}`}
						aria-label={`${site.name}, writing home`}
					>
						f.pt
					</Link>

					<div className="flex items-center gap-4 sm:gap-7">
						{links.map((link) => (
							<NavLink key={link.to} to={link.to} className={navLink}>
								{link.label}
							</NavLink>
						))}
					</div>
				</nav>
			</div>
		</header>
	);
}
