import { Link } from 'react-router';
import { containerWide, focusRing, touch } from '~/lib/styles';
import { site } from '~/lib/site';

export function SiteHeader() {
	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/90 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md print:hidden">
			<div className={containerWide}>
				<div className="flex h-16 items-center md:h-20">
					<Link
						to="/"
						className={`font-display text-lg font-semibold tracking-tight text-ink hover:text-accent-ink ${touch} ${focusRing}`}
						aria-label={`${site.name}, writing home`}
					>
						f.pt
					</Link>
				</div>
			</div>
		</header>
	);
}
