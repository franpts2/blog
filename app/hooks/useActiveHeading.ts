import { useEffect, useState } from 'react';
import type { Heading } from '~/lib/content/types';

const ACTIVE_OFFSET = 120;

/** Track which heading is closest to the top of the viewport. */
export function useActiveHeading(headings: Heading[]): string {
	const [activeId, setActiveId] = useState(headings[0]?.id ?? '');

	useEffect(() => {
		const elements = headings
			.map((heading) => document.getElementById(heading.id))
			.filter((element): element is HTMLElement => element !== null);

		if (elements.length === 0) return;

		let frame = 0;

		const update = () => {
			frame = 0;
			let next = elements[0].id;

			const scrollable = document.documentElement.scrollHeight > window.innerHeight + 1;
			const atBottom =
				scrollable &&
				window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;

			if (atBottom) {
				// The last heading may never cross the offset when the page runs
				// out of room to scroll, so select it explicitly at the bottom.
				next = elements[elements.length - 1].id;
			} else {
				for (const element of elements) {
					if (element.getBoundingClientRect().top <= ACTIVE_OFFSET) next = element.id;
					else break;
				}
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

	return activeId;
}
