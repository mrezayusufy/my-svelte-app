export interface Category {
	id: string;
	name: string;
	slug: string;
	meta_title: string | null;
	meta_description: string | null;
	created_at: string;
	updated_at: string;
}

export interface Post {
	id: string;
	category_id: string | null;
	title: string;
	slug: string;
	excerpt: string | null;
	content: string;
	featured_image_url: string | null;
	featured_image_alt: string | null;
	status: 'draft' | 'published' | 'archived';
	meta_title: string | null;
	meta_description: string | null;
	canonical_url: string | null;
	published_at: string | null;
	created_at: string;
	updated_at: string;
	categories?: Category | null;
}

/**
 * Format timestamp into German date string (e.g., "20. Nov. 2026")
 */
export function formatBlogDate(dateStr: string | null | undefined): string {
	if (!dateStr) return '';
	const date = new Date(dateStr);
	if (isNaN(date.getTime())) return dateStr;

	return new Intl.DateTimeFormat('de-DE', {
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	}).format(date);
}

/**
 * Calculate estimated reading time in German (e.g. "4 Min. Lesezeit")
 */
export function calculateReadTime(content: string | null | undefined): string {
	if (!content) return '3 Min. Lesezeit';
	const words = content.trim().split(/\s+/).length;
	const minutes = Math.max(1, Math.ceil(words / 200));
	return `${minutes} Min. Lesezeit`;
}
