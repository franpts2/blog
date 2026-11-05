export type Heading = {
	id: string;
	text: string;
	level: 2 | 3;
};

export type PostMeta = {
	slug: string;
	title: string;
	date: string;
	summary: string;
	tags: string[];
	draft: boolean;
	readingTime: number;
};

export type Post = PostMeta & {
	html: string;
	headings: Heading[];
};
