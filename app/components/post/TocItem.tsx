import type { MouseEvent } from 'react';
import type { Heading } from '~/lib/content/types';
import { focusRing, touch } from '~/lib/styles';

type TocItemProps = {
	heading: Heading;
	active: boolean;
	onClick: (event: MouseEvent<HTMLAnchorElement>, id: string) => void;
};

export function TocItem({ heading, active, onClick }: TocItemProps) {
	return (
		<li>
			<a
				href={`#${heading.id}`}
				onClick={(event) => onClick(event, heading.id)}
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
}
