import {
	containerWide,
	focusRing,
	labelType,
	linkUnderline,
	touch
} from '~/lib/styles';
import { site } from '~/lib/site';

export function SiteFooter() {
	const year = new Date().getFullYear();
	const footerLink = `${linkUnderline} ${touch} ${focusRing} hover:text-accent-ink`;

	return (
		<footer className="border-t border-line py-8 pb-[calc(2rem_+_env(safe-area-inset-bottom,0px))] print:hidden">
			<div className={`${containerWide} flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between`}>
				<p className="text-sm text-muted">
					© {year} {site.author.name}
				</p>

				<nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted" aria-label="Elsewhere">
					<a
						href={site.links.home}
						className={footerLink}
						target="_blank"
						rel="noopener noreferrer"
					>
						franciscapt.dev
					</a>
					<a
						href={site.links.github}
						className={footerLink}
						target="_blank"
						rel="noopener noreferrer"
					>
						github
					</a>
				</nav>

				<p className={labelType}>Have a great day! :D</p>
			</div>
		</footer>
	);
}
