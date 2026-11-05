/** Stable across locales and timezones: the frontmatter date is a plain day. */
export function formatDate(date: string): string {
	return new Intl.DateTimeFormat('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		timeZone: 'UTC'
	}).format(new Date(`${date}T00:00:00Z`));
}

/** `pluralize(1, 'essay', 'essays')` → `1 essay`; `pluralize(3, ...)` → `3 essays`. */
export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
	return `${count} ${count === 1 ? singular : plural}`;
}
