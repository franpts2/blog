import type { MouseEvent } from 'react';
import { useActiveHeading } from '~/hooks/useActiveHeading';
import type { Heading } from '~/lib/content/types';
import { labelType } from '~/lib/styles';
import { TocItem } from './TocItem';

type TableOfContentsProps = {
	headings: Heading[];
};

/**
 * Scroll manually instead of letting the browser follow the hash. A plain
 * fragment link updates the URL but the router's scroll restoration puts
 * the page back where it was, so the first click appears to do nothing.
 * replaceState keeps the URL shareable without adding a history entry.
 */
function scrollToHeading(event: MouseEvent<HTMLAnchorElement>, id: string) {
	if (event.defaultPrevented || event.button !== 0) return;
	if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

	const target = document.getElementById(id);
	if (!target) return;

	event.preventDefault();
	target.scrollIntoView({ block: 'start' });
	window.history.replaceState(window.history.state, '', `#${id}`);
}

export function TableOfContents({ headings }: TableOfContentsProps) {
	const activeId = useActiveHeading(headings);

	if (headings.length === 0) return null;

	return (
		<aside className="absolute inset-y-0 left-[min(calc(50%_+_22rem_+_4rem),calc(100%_-_16rem))] hidden w-56 xl:block">
			<div className="h-full pt-[clamp(2rem,5vw,4rem)]">
				<nav className="sticky top-[calc(5rem_+_2rem)]" aria-label="On this page">
					<p className={`${labelType} mb-5`}>On this page</p>
					<ol className="border-l border-line">
						{headings.map((heading) => (
							<TocItem
								key={heading.id}
								heading={heading}
								active={heading.id === activeId}
								onClick={scrollToHeading}
							/>
						))}
					</ol>
				</nav>
			</div>
		</aside>
	);
}
