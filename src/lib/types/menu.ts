export interface CategoryMenu {
	id: number;
	name: string;
	category_slug: string;
	parent_id?: number | null;
	created_at?: string;
}

export interface MenuItem {
	id: number;
	title: string;
	price: string;
	category_id: number;
	desc?: string | null;
	rating?: number | null;
	photo?: string | null;
	created_at?: string;
}
