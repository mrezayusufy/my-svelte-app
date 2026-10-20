import { supabase } from '$lib/supabaseClient';
import type { PageServerLoad } from './$types';
import type { Post, Category } from '$lib/types/blog';

export const load: PageServerLoad = async () => {
	let posts: Post[] = [];
	let categories: Category[] = [];

	try {
		const [postsRes, categoriesRes] = await Promise.all([
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
				.order('published_at', { ascending: false, nullsFirst: false }),
			supabase
				.from('categories')
				.select('*')
				.order('name', { ascending: true })
		]);

		posts = postsRes.data as unknown as Post[];

		categories = categoriesRes.data as Category[];
	} catch (err) {
		console.error('Error loading blog data from Supabase:', err); 
	}
	return {
		posts,
		categories
	};
};
