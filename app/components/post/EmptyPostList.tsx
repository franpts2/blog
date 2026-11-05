import { bodyType, labelType } from '~/lib/styles';

export function EmptyPostList() {
	return (
		<div className="border-y border-line py-10">
			<p className={labelType}>No essays yet</p>
			<p className={`${bodyType} mt-3`}>The first essay is being written.</p>
		</div>
	);
}
