type TagListProps = {
	tags: string[];
	className?: string;
};

export function TagList({ tags, className = '' }: TagListProps) {
	if (tags.length === 0) return null;

	return <p className={className}>{tags.join(' · ')}</p>;
}
