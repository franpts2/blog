import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { focusRing, touch } from '~/lib/styles';

type PillLinkProps = {
	to: string;
	variant?: 'primary' | 'outline';
	className?: string;
	children: ReactNode;
};

const base = `inline-flex min-h-11 ${touch} items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-[color,background-color,border-color,transform] duration-150 ease-out-expo active:scale-[0.97] motion-reduce:transition-none ${focusRing}`;

const variants = {
	primary: 'bg-ink text-paper hover:bg-accent hover:text-ink',
	outline: 'border border-line text-ink hover:border-accent hover:text-accent-ink'
} as const;

export function PillLink({
	to,
	variant = 'primary',
	className = '',
	children
}: PillLinkProps) {
	return (
		<Link to={to} className={`${base} ${variants[variant]} ${className}`.trim()}>
			{children}
		</Link>
	);
}
