import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { blogPosts } from '$lib/data/blogData';

export const load: PageServerLoad = async ({ params }) => {
	const post = blogPosts.find((p) => p.slug === params.slug);

	if (!post) {
		throw error(404, 'Blogbeitrag nicht gefunden');
	}

	const recentPosts = blogPosts.filter((p) => p.slug !== params.slug).slice(0, 3);

	return {
		post,
		recentPosts
	};
};
