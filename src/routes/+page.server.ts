import { supabase } from '$lib/supabaseClient';
import type { PageServerLoad } from './$types';
import type { CategoryMenu, MenuItem, SectionItem } from '$lib/types/menu';

export const load: PageServerLoad = async () => {
	let categories: CategoryMenu[] = [];
	let menu: MenuItem[] = [];
	let section: SectionItem[] = [];
 
	try {
		const [categoriesResult, menuResult, sectionResult] = await Promise.all([
			supabase.from('category_menu').select('*').order('id', { ascending: true }),
			supabase.from('menu').select('*').order('id', { ascending: true }),
			supabase.from("sections")
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
			.eq("is_active", true)
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
	} catch (err) {
		console.error('Error fetching menu data from Supabase:', err);
	} 
	const sections = Object.fromEntries(
  section.map((s) => [
    s.slug,
    s,
  ])
);
	return {
		categories: categories.length > 0 ? categories : [],
		menu: menu.length > 0 ? menu : [],
		sections: sections,
	};
};
