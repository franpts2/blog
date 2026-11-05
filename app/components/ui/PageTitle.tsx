import { AccentDot } from './AccentDot';
import { displayType, labelType } from '~/lib/styles';

type PageTitleProps = {
	eyebrow: string;
	title: string;
};

/** The eyebrow + display heading + accent dot shared by pages and errors. */
export function PageTitle({ eyebrow, title }: PageTitleProps) {
	return (
		<>
			<p className={labelType}>{eyebrow}</p>
			<h1 className={`${displayType} mt-4 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]`}>
				{title}
				<AccentDot />
			</h1>
		</>
	);
}
