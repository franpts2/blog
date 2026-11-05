/** Focus, touch, and link states shared by every interactive element. */
export const focusRing =
	'focus-visible:[outline:2px_solid_var(--color-accent)] focus-visible:outline-offset-3';

export const touch = 'touch-manipulation';

export const linkUnderline =
	'relative inline-block after:absolute after:inset-x-0 after:-bottom-[0.1em] after:h-[1.5px] after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-200 after:ease-out-expo hover:after:origin-left hover:after:scale-x-100 motion-reduce:after:transition-none pointer-coarse:underline pointer-coarse:decoration-line pointer-coarse:underline-offset-[3px]';
