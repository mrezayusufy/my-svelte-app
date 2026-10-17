export interface BlogPost {
	id: number;
	slug: string;
	title: string;
	excerpt: string;
	category: string;
	author: string;
	date: string;
	image: string;
	readTime: string;
}

export const blogPosts: BlogPost[] = [
	{
		id: 1,
		slug: 'leichte-sommergerichte-fuer-erfrischenden-genuss',
		title: 'Leichte Sommergerichte für erfrischenden Genuss',
		excerpt:
			'Entdecken Sie aromatische Sommergerichte und leichte Delikatessen, die perfekt zu warmen Tagen in Hamburg und einer erfrischenden Pause passen.',
		category: 'Rezepte & Kulinarik',
		author: 'Giovanni Team',
		date: '19. Mai 2025',
		image: '/assets/images/innerpage/blog/blog-img1.jpg',
		readTime: '4 Min. Lesezeit'
	},
	{
		id: 2,
		slug: 'ein-tag-im-leben-unseres-kuechenchefs',
		title: 'Ein Tag im Leben unseres Küchenchefs bei Giovanni’s',
		excerpt:
			'Begleiten Sie unseren Küchenchef von den ersten Vorbereitungen am Morgen bis zum Service und erfahren Sie, wie unsere Signature Bowls und Gerichte entstehen.',
		category: 'Hinter den Kulissen',
		author: 'Giovanni Team',
		date: '15. Mai 2025',
		image: '/assets/images/innerpage/blog/blog-img2.jpg',
		readTime: '5 Min. Lesezeit'
	},
	{
		id: 3,
		slug: 'der-mediterrane-einfluss-hinter-unseren-kaffeekreationen',
		title: 'Der mediterrane Einfluss hinter unseren Kaffeekreationen',
		excerpt:
			'Traditionelle italienische Röstkunst trifft moderne Barista-Handwerkskunst: Erfahren Sie alles über unsere Bohnenauswahl und das Geheimnis samtweicher Crema.',
		category: 'Kaffeekultur',
		author: 'Giovanni Team',
		date: '10. Mai 2025',
		image: '/assets/images/innerpage/blog/blog-img3.jpg',
		readTime: '6 Min. Lesezeit'
	},
	{
		id: 4,
		slug: 'vom-feld-auf-den-teller-woher-unsere-zutaten-stammen',
		title: 'Vom Feld auf den Teller: Woher unsere Zutaten stammen',
		excerpt:
			'Höchste Frische, Transparenz und Qualität: Ein Einblick in unsere regionalen Partnerschaften mit Erzeugern und Lieferanten.',
		category: 'Zutaten & Herkunft',
		author: 'Giovanni Team',
		date: '04. Mai 2025',
		image: '/assets/images/innerpage/blog/blog-img4.jpg',
		readTime: '4 Min. Lesezeit'
	},
	{
		id: 5,
		slug: 'saisonale-spezialitaeten-neue-highlights-diesen-monat',
		title: 'Saisonale Spezialitäten: Die neuen Highlights diesen Monat',
		excerpt:
			'Jeden Monat überraschen wir Sie mit neuen Geschmackserlebnissen – von kreativen Matcha- und Iced-Drinks bis hin zu köstlichen Dessert-Kreationen.',
		category: 'Neuheiten',
		author: 'Giovanni Team',
		date: '28. April 2025',
		image: '/assets/images/innerpage/blog/blog-img5.jpg',
		readTime: '3 Min. Lesezeit'
	},
	{
		id: 6,
		slug: 'feste-feiern-bei-giovannis-ihr-event-in-hamburg',
		title: 'Feste feiern bei Giovanni’s: So wird Ihr Event unvergesslich',
		excerpt:
			'Ob Geburtstagsbrunch, Firmenmeeting oder privates Familienfest: Entdecken Sie unsere Möglichkeiten für exklusive Events in gemütlicher Atmosphäre.',
		category: 'Events',
		author: 'Giovanni Team',
		date: '22. April 2025',
		image: '/assets/images/innerpage/blog/blog-img6.jpg',
		readTime: '5 Min. Lesezeit'
	}
];
