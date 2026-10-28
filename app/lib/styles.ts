/**
 * Shared Tailwind class recipes.
 *
 * Everything visual lives here as utilities so components stay plain JSX and
 * app.css stays a Tailwind theme file. The prose recipe targets the HTML that
 * comes out of the Markdown pipeline, which cannot carry utility classes of
 * its own.
 */

export const containerWide =
	'mx-auto w-[min(92vw,72rem)] max-[30rem]:w-[calc(100%_-_2rem)]';

export const containerProse =
	'mx-auto w-[min(92vw,44rem)] max-[30rem]:w-[calc(100%_-_2rem)]';


export const displayType =
	'font-display font-semibold tracking-[-0.03em] text-balance break-words';

export const labelBase =
	'font-mono text-[0.7rem] font-medium uppercase leading-[1.4] tracking-[0.08em]';

export const labelType = `${labelBase} text-faint`;

export const bodyType = 'text-[clamp(1rem,1.1vw,1.15rem)] leading-[1.65] text-muted';

export const focusRing =
	'focus-visible:[outline:2px_solid_var(--color-accent)] focus-visible:outline-offset-3';

export const touch = 'touch-manipulation';

export const linkUnderline =
	'relative inline-block after:absolute after:inset-x-0 after:-bottom-[0.1em] after:h-[1.5px] after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-200 after:ease-out-expo hover:after:origin-left hover:after:scale-x-100 motion-reduce:after:transition-none pointer-coarse:underline pointer-coarse:decoration-line pointer-coarse:underline-offset-[3px]';

export const navLink = [
	'relative inline-flex min-h-11 touch-manipulation items-center font-mono text-[0.7rem] font-medium uppercase leading-[1.4] tracking-[0.08em] text-muted transition-colors duration-150 ease-out-expo',
	'after:absolute after:inset-x-0 after:bottom-[0.45rem] after:h-[1.5px] after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 after:ease-out-expo',
	'hover:text-accent-ink hover:after:origin-left hover:after:scale-x-100',
	'aria-[current=page]:text-ink aria-[current=page]:after:origin-left aria-[current=page]:after:scale-x-100',
	'motion-reduce:transition-none motion-reduce:after:transition-none',
	focusRing,
].join(' ');

/**
 * Markdown output cannot receive utilities, so the wrapper styles its
 * descendants with arbitrary variants. Syntax tokens get the same treatment.
 */
export const proseClass = [
	'text-[1.125rem] leading-[1.75] text-ink [overflow-wrap:break-word]',
	'[&>*+*]:mt-[1.5em]',

	// Headings
	'[&_h2]:font-display [&_h2]:font-semibold [&_h2]:leading-[1.15] [&_h2]:tracking-[-0.02em] [&_h2]:text-[clamp(1.5rem,3vw,1.85rem)] [&_h2]:mt-[2.6em]',
	'[&_h3]:font-display [&_h3]:font-semibold [&_h3]:leading-[1.15] [&_h3]:tracking-[-0.02em] [&_h3]:text-[1.35rem] [&_h3]:mt-[2.2em]',
	'[&_h4]:mt-[2em] [&_h4]:text-[1.05rem] [&_h4]:font-semibold',

	// Text and links
	'[&_p]:text-pretty',
	'[&_a]:text-accent-ink [&_a]:underline [&_a]:underline-offset-[3px] [&_a]:decoration-accent/50 [&_a]:decoration-1 [&_a]:transition-[color,text-decoration-color] [&_a]:duration-150 [&_a]:ease-out-expo [&_a:hover]:decoration-accent-ink [&_a:hover]:decoration-[1.5px] [&_a]:touch-manipulation',
	'[&_a:focus-visible]:[outline:2px_solid_var(--color-accent)] [&_a:focus-visible]:outline-offset-3',
	'[&_strong]:font-semibold [&_strong]:text-ink',
	'[&_em]:italic',
	'[&_del]:text-muted [&_del]:line-through',

	// Lists
	'[&_ul]:list-disc [&_ul]:pl-[1.3rem] [&_ol]:list-decimal [&_ol]:pl-[1.3rem]',
	'[&_li+li]:mt-[0.4em] [&_li>ul]:mt-[0.4em] [&_li>ol]:mt-[0.4em]',
	'[&_li::marker]:text-accent [&_ol>li::marker]:text-accent-ink',
	'[&_.contains-task-list]:list-none [&_.contains-task-list]:pl-0',
	'[&_.task-list-item]:flex [&_.task-list-item]:items-baseline [&_.task-list-item]:gap-2',
	'[&_input]:accent-accent',

	// Quotes, rules, media
	'[&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-5 [&_blockquote]:text-muted',
	'[&_blockquote>*+*]:mt-4',
	'[&_hr]:my-12 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-line',
	'[&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-xl [&_img]:border [&_img]:border-line',
	'[&_figure]:my-8',
	'[&_figcaption]:mt-3 [&_figcaption]:font-mono [&_figcaption]:text-[0.7rem] [&_figcaption]:font-medium [&_figcaption]:uppercase [&_figcaption]:leading-[1.4] [&_figcaption]:tracking-[0.08em] [&_figcaption]:text-faint',
	'[&_video]:max-w-full [&_iframe]:max-w-full',
	'[&_sup]:text-[0.75em] [&_sup]:leading-none [&_sub]:text-[0.75em] [&_sub]:leading-none',

	// Code
	'[&_code]:rounded [&_code]:border [&_code]:border-line [&_code]:bg-paper-soft [&_code]:px-[0.35em] [&_code]:py-[0.12em] [&_code]:font-mono [&_code]:text-[0.875em]',
	'[&_pre]:my-8 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-code-bg [&_pre]:px-6 [&_pre]:py-5 [&_pre]:font-mono [&_pre]:text-[0.875rem] [&_pre]:leading-[1.7] [&_pre]:text-code-ink [&_pre]:[tab-size:2] [&_pre]:[-webkit-overflow-scrolling:touch]',
	'[&_pre_code]:block [&_pre_code]:border-0 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit',
	'max-[40rem]:[&_pre]:px-4 max-[40rem]:[&_pre]:py-3 max-[40rem]:[&_pre]:text-[0.8125rem]',

	// Tables
	'[&_table]:block [&_table]:w-full [&_table]:min-w-full [&_table]:overflow-x-auto [&_table]:border-collapse [&_table]:text-[0.95rem]',
	'[&_th]:border-b [&_th]:border-line [&_th]:px-[0.7rem] [&_th]:py-[0.6rem] [&_th]:text-left [&_th]:align-top [&_th]:font-semibold',
	'[&_td]:border-b [&_td]:border-line [&_td]:px-[0.7rem] [&_td]:py-[0.6rem] [&_td]:text-left [&_td]:align-top',

	// Small inline elements
	'[&_mark]:rounded-sm [&_mark]:bg-accent-soft [&_mark]:px-[0.2em] [&_mark]:py-[0.1em] [&_mark]:text-ink',
	'[&_kbd]:rounded [&_kbd]:border [&_kbd]:border-b-2 [&_kbd]:border-line [&_kbd]:bg-paper [&_kbd]:px-[0.35em] [&_kbd]:py-[0.1em] [&_kbd]:font-mono [&_kbd]:text-[0.8em]',

	// Highlight.js tokens
	'[&_.hljs-comment]:text-[#8f877d] [&_.hljs-comment]:italic [&_.hljs-quote]:text-[#8f877d] [&_.hljs-quote]:italic',
	'[&_.hljs-keyword]:text-[#ff9a75] [&_.hljs-selector-tag]:text-[#ff9a75] [&_.hljs-literal]:text-[#ff9a75] [&_.hljs-type]:text-[#ff9a75]',
	'[&_.hljs-string]:text-[#b8d8a8] [&_.hljs-attr]:text-[#b8d8a8] [&_.hljs-template-tag]:text-[#b8d8a8]',
	'[&_.hljs-number]:text-[#f2c879] [&_.hljs-symbol]:text-[#f2c879]',
	'[&_.hljs-title]:text-[#9ecbff]',
	'[&_.hljs-variable]:text-[#f3efe8] [&_.hljs-params]:text-[#f3efe8] [&_.hljs-property]:text-[#f3efe8]',
	// The underscore in `hljs-built_in` is a space in Tailwind arbitrary
	// variants, so match the class by attribute instead.
	'[&_[class*=hljs-built]]:text-[#ffd28a]',
	'[&_.hljs-meta]:text-[#8fd6c9] [&_.hljs-tag]:text-[#8fd6c9]',
	'[&_.hljs-attribute]:text-[#e6c98a]',
	'[&_.hljs-emphasis]:italic [&_.hljs-strong]:font-semibold',

	// Print
	'print:text-[12pt] print:[&_a]:text-black print:[&_a]:underline print:[&_pre]:border print:[&_pre]:border-neutral-300 print:[&_pre]:bg-paper-soft print:[&_pre]:text-ink',
].join(' ');
