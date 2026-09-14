import { supabase } from '$lib/supabaseClient';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [categoriesResult, menuResult] = await Promise.all([
		supabase.from('category_menu').select('*').order('id', { ascending: true }),
		supabase.from('menu').select('*').order('id', { ascending: true })
	]);

	return {
		categories: categoriesResult.data ?? [],
		categoriesError: categoriesResult.error?.message ?? null,
		menu: menuResult.data ?? [],
		menuError: menuResult.error?.message ?? null
	};
};
