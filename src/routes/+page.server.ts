import { supabase } from '$lib/supabaseClient';
import type { PageServerLoad } from './$types';
import type { CategoryMenu, MenuItem, SectionItem } from '$lib/types/menu';
import type { Post } from '$lib/types/blog';
import { fallbackPosts } from '$lib/data/blogData';

export const load: PageServerLoad = async () => {
	let categories: CategoryMenu[] = [];
	let menu: MenuItem[] = [];
	let section: SectionItem[] = [];
	let latestPosts: Post[] = [];

	try {
		const [categoriesResult, menuResult, sectionResult, postsResult] = await Promise.all([
			supabase.from('category_menu').select('*').order('sort_order', { ascending: true }),
			supabase.from('menu_with_category_order').select('*').order('category_sort_order', { ascending: true }),
			supabase
				.from('sections')
				.select(`
					id,
					slug,
					title,
					subtitle,
					content,
					section_images (
						id,
						image_path,
						alt_text,
						sort_order
					)
				`)
				.eq('is_active', true),
			supabase
				.from('posts')
				.select(`
					id,
					category_id,
					title,
					slug,
					excerpt,
					content,
					featured_image_url,
					featured_image_alt,
					status,
					meta_title,
					meta_description,
					canonical_url,
					published_at,
					created_at,
					updated_at,
					categories (
						id,
						name,
						slug
					)
				`)
				.eq('status', 'published')
				.order('published_at', { ascending: false, nullsFirst: false })
				.limit(3)
		]);

		if (categoriesResult.data && categoriesResult.data.length > 0) {
			categories = categoriesResult.data as CategoryMenu[];
		}
		if (menuResult.data && menuResult.data.length > 0) {
			menu = menuResult.data as MenuItem[];
		}
		if (sectionResult.data && sectionResult.data.length > 0) {
			section = sectionResult.data as SectionItem[];
		}
		if (postsResult.data && postsResult.data.length > 0) {
			latestPosts = postsResult.data as unknown as Post[];
		} else {
			latestPosts = fallbackPosts.slice(0, 3);
		}
	} catch (err) {
		console.error('Error fetching data from Supabase:', err);
		latestPosts = fallbackPosts.slice(0, 3);
	}

	const sections = Object.fromEntries(
		section.map((s) => [s.slug, s])
	);

	return {
		categories: categories.length > 0 ? categories : [],
		menu: menu.length > 0 ? menu : [],
		sections: sections,
		latestPosts: latestPosts
	};
};
