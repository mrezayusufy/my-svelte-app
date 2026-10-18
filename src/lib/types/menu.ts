export interface CategoryMenu {
	id: number;
	name: string;
	category_slug: string;
	sort_order: number;
	created_at?: string;
}

export interface MenuItem {
	id: number;
	title: string;
	price: string;
	price_desc: string;
	category_id: number;
	desc?: string | null;
	rating?: number | null;
	photo?: string | null;
	created_at?: string;
}
export interface SectionItem {
	id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  content: string | null;
  section_images: {
    id: number;
    image_path: string;
    alt_text: string | null;
    sort_order: number;
  }[];
}