import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';
import type { Post } from '$lib/types/blog';
import { fallbackPosts } from '$lib/data/blogData';
import { marked } from 'marked';

// Configure marked for clean GFM parsing
marked.setOptions({
	gfm: true,
	breaks: true
});

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug;
	let post: Post | null = null;
	let recentPosts: Post[] = [];

	try {
		// 1. Fetch current post by slug
		const { data: postData, error: postErr } = await supabase
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
					slug,
					meta_title,
					meta_description
				)
			`)
			.eq('slug', slug)
			.eq('status', 'published')
			.maybeSingle();

		if (postData) {
			post = postData as unknown as Post;
		} else {
			// Fallback check
			const foundFallback = fallbackPosts.find((p) => p.slug === slug);
			if (foundFallback) {
				post = foundFallback;
			}
		}

		if (!post) {
			throw error(404, 'Blogbeitrag nicht gefunden');
		}

		// 2. Fetch recent / related posts
		const { data: recentData } = await supabase
			.from('posts')
			.select(`
				id,
				category_id,
				title,
				slug,
				excerpt,
				featured_image_url,
				featured_image_alt,
				status,
				published_at,
				created_at,
				categories (
					id,
					name,
					slug
				)
			`)
			.eq('status', 'published')
			.neq('slug', slug)
			.order('published_at', { ascending: false, nullsFirst: false })
			.limit(3);

		if (recentData && recentData.length > 0) {
			recentPosts = recentData as unknown as Post[];
		} else {
			recentPosts = fallbackPosts.filter((p) => p.slug !== slug).slice(0, 3);
		}
	} catch (err: any) {
		if (err?.status === 404) {
			throw err;
		}
		console.error('Error fetching blog detail from Supabase:', err);
		const foundFallback = fallbackPosts.find((p) => p.slug === slug);
		if (foundFallback) {
			post = foundFallback;
			recentPosts = fallbackPosts.filter((p) => p.slug !== slug).slice(0, 3);
		} else {
			throw error(404, 'Blogbeitrag nicht gefunden');
		}
	}

	// 3. Parse markdown content using marked
	const contentHtml = await marked.parse(post.content || '');

	return {
		post,
		contentHtml,
		recentPosts
	};
};
