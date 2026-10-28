import { site } from '~/lib/site';

export function SiteFooter() {
	return (
		<footer className="mx-auto mt-20 w-full max-w-2xl border-t border-line px-6 py-8 text-xs text-faint">
			<div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
				<p>
					© {new Date().getFullYear()} {site.author.name}
				</p>
				<div className="flex gap-4">
					<a href={site.links.home} className="hover:text-ink">
						franciscapt.dev
					</a>
					<a href={site.links.github} className="hover:text-ink">
						GitHub
					</a>
					<a href="/rss.xml" className="hover:text-ink">
						RSS
					</a>
				</div>
			</div>
		</footer>
	);
}
