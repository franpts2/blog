import { PageTitle } from './PageTitle';
import { PillLink } from './PillLink';
import { bodyType, containerProse } from '~/lib/styles';

type ErrorStateProps = {
	label: string;
	title: string;
	message: string;
};

export function ErrorState({ label, title, message }: ErrorStateProps) {
	return (
		<div
			className={`${containerProse} flex min-h-[60vh] flex-col justify-center py-[clamp(3rem,8vh,6rem)]`}
		>
			<PageTitle eyebrow={label} title={title} />
			<p className={`${bodyType} mt-5`}>{message}</p>
			<PillLink to="/" className="mt-8 self-start">
				Back to writing
			</PillLink>
		</div>
	);
}
