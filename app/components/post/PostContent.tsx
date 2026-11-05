import { proseClass } from '~/lib/styles';

type PostContentProps = {
	html: string;
};

export function PostContent({ html }: PostContentProps) {
	// The HTML comes from trusted Markdown committed to this repo.
	return <div className={`${proseClass} mt-12`} dangerouslySetInnerHTML={{ __html: html }} />;
}
