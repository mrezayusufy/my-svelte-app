import { supabase } from '$lib/supabaseClient';
import type { PageServerLoad } from './$types';
import { defaultCategories, defaultMenuItems } from '$lib/data/menuData';
import type { CategoryMenu, MenuItem } from '$lib/types/menu';

export const load: PageServerLoad = async () => {
	let categories: CategoryMenu[] = [];
	let menu: MenuItem[] = [];

	try {
		const [categoriesResult, menuResult] = await Promise.all([
			supabase.from('category_menu').select('*').order('id', { ascending: true }),
			supabase.from('menu').select('*').order('id', { ascending: true })
		]);

		if (categoriesResult.data && categoriesResult.data.length > 0) {
			categories = categoriesResult.data as CategoryMenu[];
		}
		if (menuResult.data && menuResult.data.length > 0) {
			menu = menuResult.data as MenuItem[];
		}
	} catch (err) {
		console.error('Error fetching menu data from Supabase:', err);
	}
	console.log("menu",menu)
	return {
		categories: categories.length > 0 ? categories : defaultCategories,
		menu: menu.length > 0 ? menu : defaultMenuItems
	};
};
