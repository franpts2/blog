import { focusRing, touch } from '~/lib/styles';

export function SkipLink() {
	return (
		<a
			href="#main-content"
			className={`fixed left-4 top-[calc(1rem_+_env(safe-area-inset-top,0px))] z-[100] -translate-y-[200%] ${touch} rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper focus-visible:translate-y-0 ${focusRing} print:hidden`}
		>
			Skip to main content
		</a>
	);
}
