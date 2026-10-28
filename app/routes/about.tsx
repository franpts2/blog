import type { MetaFunction } from 'react-router';
import { site } from '~/lib/site';

export const meta: MetaFunction = () => [
	{ title: `About — ${site.name}` },
	{ name: 'description', content: `About ${site.author.name}.` }
];

export default function About() {
	return (
		<div className="max-w-xl">
			<h1 className="text-2xl font-medium tracking-tight">About</h1>

			<div className="prose mt-8">
				<p>
					I'm Francisca, a frontend engineer based in Portugal. I build interfaces that are
					rigorous underneath and effortless on the surface.
				</p>
				<p>
					This is where I write about the parts of building products that don't fit in a
					changelog: platform constraints discovered after launch, small assumptions that
					force big rewrites, and what shipping actually feels like from the inside.
				</p>
				<p>
					The main project here is <a href="https://cadence.franciscapt.dev">Cadence</a>, a
					calendar for the songs that mark your days.
				</p>
			</div>

			<ul className="mt-10 space-y-2 text-sm">
				<li>
					<span className="mr-3 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
						Site
					</span>
					<a className="underline underline-offset-4 hover:text-accent" href={site.links.home}>
						franciscapt.dev
					</a>
				</li>
				<li>
					<span className="mr-3 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
						Code
					</span>
					<a className="underline underline-offset-4 hover:text-accent" href={site.links.github}>
						github.com/franpts2
					</a>
				</li>
			</ul>
		</div>
	);
}
