import { PillLink } from '~/components/ui/PillLink';
import { labelType } from '~/lib/styles';

export function PostFooter() {
	return (
		<footer className="mt-[clamp(3rem,8vw,5rem)] border-t border-line pt-8 pb-[clamp(4rem,8vw,7rem)] print:hidden">
			<div className="flex items-center justify-between gap-4">
				<p className={labelType}>Thanks for reading.</p>
				<PillLink to="/" variant="outline" className="shrink-0">
					More writing
				</PillLink>
			</div>
		</footer>
	);
}
