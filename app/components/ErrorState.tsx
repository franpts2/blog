import { AccentDot } from './AccentDot';
import { PillLink } from './PillLink';
import { bodyType, containerProse, displayType, labelType } from '~/lib/styles';

type ErrorStateProps = {
	label: string;
	title: string;
	message: string;
};

export function ErrorState({ label, title, message }: ErrorStateProps) {
	return (
		<div className={`${containerProse} flex min-h-[60vh] flex-col justify-center py-[clamp(3rem,8vh,6rem)]`}>
			<p className={labelType}>{label}</p>
			<h1
				className={`${displayType} mt-4 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]`}
			>
				{title}
				<AccentDot />
			</h1>
			<p className={`${bodyType} mt-5`}>{message}</p>
			<PillLink to="/" className="mt-8 self-start">
				Back to writing
			</PillLink>
		</div>
	);
}
