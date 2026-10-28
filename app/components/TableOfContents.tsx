import { useEffect, useState } from 'react';
import type { Heading } from '~/lib/markdown';
import { focusRing, labelType, touch } from '~/lib/styles';

type TableOfContentsProps = {
	headings: Heading[];
};

export function TableOfContents({ headings }: TableOfContentsProps) {
	const [activeId, setActiveId] = useState(headings[0]?.id ?? '');

	useEffect(() => {
		const elements = headings
			.map((heading) => document.getElementById(heading.id))
			.filter((element): element is HTMLElement => element !== null);

		if (elements.length === 0) return;

		let frame = 0;

		const update = () => {
			frame = 0;
			const offset = 120;
			let next = elements[0].id;

			for (const element of elements) {
				if (element.getBoundingClientRect().top <= offset) next = element.id;
				else break;
			}

			setActiveId(next);
		};

		const schedule = () => {
			if (frame) return;
			frame = requestAnimationFrame(update);
		};

		update();
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule);

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
		};
	}, [headings]);

	if (headings.length === 0) return null;

	return (
		<aside className="absolute inset-y-0 left-[calc(50%_+_22rem_+_2rem)] hidden w-56 xl:block">
			<div className="h-full pt-[clamp(2rem,5vw,4rem)]">
				<nav className="sticky top-[calc(5rem_+_2rem)]" aria-label="On this page">
					<p className={`${labelType} mb-5`}>On this page</p>
					<ol className="border-l border-line">
						{headings.map((heading) => {
							const active = heading.id === activeId;

							return (
								<li key={heading.id}>
									<a
										href={`#${heading.id}`}
										aria-current={active ? 'location' : undefined}
										className={`-ml-px block border-l-2 py-2 pr-3 text-[0.95rem] leading-[1.45] transition-colors duration-150 motion-reduce:transition-none ${
											heading.level === 3 ? 'pl-8' : 'pl-5'
										} ${
											active
												? 'border-accent text-accent-ink'
												: 'border-transparent text-muted hover:text-ink'
										} ${focusRing} ${touch}`}
									>
										{heading.text}
									</a>
								</li>
							);
						})}
					</ol>
				</nav>
			</div>
		</aside>
	);
}
