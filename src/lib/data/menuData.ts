import type { CategoryMenu, MenuItem } from '$lib/types/menu';

export const defaultCategories: CategoryMenu[] = [
	{ id: 1, name: 'Kaltgetränke', created_at: '2026-09-06 18:59:49.425844+00', category_slug: 'kaltgetranke', parent_id: null },
	{ id: 2, name: 'Soft Drinks', created_at: '2026-09-06 19:00:07.775257+00', category_slug: 'soft-drinks', parent_id: null },
	{ id: 3, name: 'Shakes', created_at: '2026-09-06 19:00:20.367662+00', category_slug: 'shakes', parent_id: null },
	{ id: 4, name: 'Matcha & Iced Drinks', created_at: '2026-09-06 19:00:33.772389+00', category_slug: 'matcha-iced-drinks', parent_id: null },
	{ id: 5, name: 'Summer Limonaden', created_at: '2026-09-06 19:03:23.356956+00', category_slug: 'summer-limonaden', parent_id: null },
	{ id: 6, name: 'POMOM Frühstück', created_at: '2026-09-06 19:04:59.566565+00', category_slug: 'pomom-fruhstuck', parent_id: null },
	{ id: 7, name: 'Bali Bowl', created_at: '2026-09-06 19:08:26.505702+00', category_slug: 'bali-bowl', parent_id: 6 },
	{ id: 8, name: 'Passionfruit Bowl', created_at: '2026-09-06 19:13:29.051456+00', category_slug: 'passionfruit-bowl', parent_id: 6 },
	{ id: 9, name: 'Acai Bowl', created_at: '2026-09-06 19:13:58.842862+00', category_slug: 'acai-bowl', parent_id: 6 },
	{ id: 10, name: 'Frühstück', created_at: '2026-09-06 19:15:12.823428+00', category_slug: 'fruhstuck', parent_id: null },
	{ id: 11, name: 'Süßes Frühstück', created_at: '2026-09-06 19:15:57.09411+00', category_slug: 'susses-fruhstuck', parent_id: 10 },
	{ id: 12, name: 'Kaffee', created_at: '2026-09-06 19:16:49.174976+00', category_slug: 'kaffee', parent_id: null },
	{ id: 13, name: 'Tee & Heissgetränke', created_at: '2026-09-06 19:17:13.827099+00', category_slug: 'tee-heissgetranke', parent_id: null },
	{ id: 14, name: 'Crêpes', created_at: '2026-09-06 19:17:30.442768+00', category_slug: 'crepes', parent_id: null },
	{ id: 15, name: 'Suppen', created_at: '2026-09-06 19:17:43.293783+00', category_slug: 'suppen', parent_id: null },
	{ id: 16, name: 'Hauptgerichte & Salate', created_at: '2026-09-06 19:18:10.869784+00', category_slug: 'hauptgerichte-salate', parent_id: null },
	{ id: 17, name: 'Kuchen', created_at: '2026-09-09 14:30:00.000000+00', category_slug: 'kuchen', parent_id: null }
];

export const defaultMenuItems: MenuItem[] = [
	// Kaltgetränke (Category 1)
	{ id: 1, title: 'Fritz-Kola alle Sorten', price: '0,33 l 3,00 €', category_id: 1, desc: 'Alle Sorten', rating: 5 },
	{ id: 2, title: 'Mineralwasser mit Sprudel', price: '0,75 l 5,00 €', category_id: 1, desc: null, rating: 5 },
	{ id: 3, title: 'Mineralwasser mit Sprudel', price: '0,33 l 3,00 €', category_id: 1, desc: null, rating: 5 },
	{ id: 4, title: 'Stilles Wasser', price: '0,33 l 3,00 €', category_id: 1, desc: null, rating: 5 },
	{ id: 5, title: 'Stilles Wasser', price: '0,75 l 3,00 €', category_id: 1, desc: null, rating: 5 },
	{ id: 6, title: 'Vio Bio Zitrone-Limette', price: '0,25 l 3,00 €', category_id: 1, desc: null, rating: 5 },
	{ id: 7, title: 'Vio Apfelschorle', price: '0,25 l 3,00 €', category_id: 1, desc: null, rating: 5 },
	{ id: 8, title: 'Vio Rhabarberschorle', price: '0,25 l 3,00 €', category_id: 1, desc: null, rating: 5 },
	{ id: 9, title: 'Vio Schwarze-Johannisbeere', price: '0,25 l 3,00 €', category_id: 1, desc: null, rating: 5 },
	{ id: 10, title: 'Vio Bio Limo Orange', price: '0,25 l 3,00 €', category_id: 1, desc: null, rating: 5 },
	{ id: 11, title: 'Coca-Cola', price: '0,33 l 3,00 €', category_id: 1, desc: null, rating: 5 },
	{ id: 12, title: 'Coca-Cola light', price: '0,33 l 3,00 €', category_id: 1, desc: null, rating: 5 },
	{ id: 13, title: 'Coca-Cola Zero Sugar', price: '0,33 l 3,00 €', category_id: 1, desc: null, rating: 5 },
	{ id: 14, title: 'Mezzo Mix', price: '0,33 l 3,00 €', category_id: 1, desc: null, rating: 5 },
	{ id: 15, title: 'Fanta', price: '0,33 l 3,00 €', category_id: 1, desc: null, rating: 5 },
	{ id: 16, title: 'Sprite', price: '0,33 l 3,00 €', category_id: 1, desc: null, rating: 5 },

	// Soft Drinks (Category 2)
	{ id: 17, title: 'Orangensaft', price: '3,00 € / 4,00 €', category_id: 2, desc: '0,3 l / 0,4 l', rating: 5 },
	{ id: 18, title: 'Karottensaft', price: '3,00 € / 4,00 €', category_id: 2, desc: '0,3 l / 0,4 l', rating: 5 },
	{ id: 19, title: 'Apfelsaft', price: '3,00 € / 4,00 €', category_id: 2, desc: '0,3 l / 0,4 l', rating: 5 },
	{ id: 20, title: 'Ananassaft', price: '3,00 € / 4,00 €', category_id: 2, desc: '0,3 l / 0,4 l', rating: 5 },
	{ id: 21, title: 'Kiba-Saft', price: '3,00 € / 4,00 €', category_id: 2, desc: '0,3 l / 0,4 l', rating: 5 },
	{ id: 22, title: 'Kirschsaft', price: '3,00 € / 4,00 €', category_id: 2, desc: '0,3 l / 0,4 l', rating: 5 },

	// Shakes (Category 3)
	{ id: 23, title: 'Bananen-Shake', price: '5,90 €', category_id: 3, desc: 'Auf Wunsch mit Sahne oder Hafermilch', rating: 5 },
	{ id: 24, title: 'Erdbeer-Shake', price: '5,90 €', category_id: 3, desc: 'Auf Wunsch mit Sahne oder Hafermilch', rating: 5 },
	{ id: 25, title: 'Raffaello-Shake', price: '5,90 €', category_id: 3, desc: 'Auf Wunsch mit Sahne oder Hafermilch', rating: 5 },
	{ id: 26, title: 'Oreo-Shake', price: '5,90 €', category_id: 3, desc: 'Auf Wunsch mit Sahne oder Hafermilch', rating: 5 },
	{ id: 27, title: 'Vanille-Shake', price: '5,90 €', category_id: 3, desc: 'Auf Wunsch mit Sahne oder Hafermilch', rating: 5 },
	{ id: 28, title: 'Schoko-Shake', price: '5,90 €', category_id: 3, desc: 'Auf Wunsch mit Sahne oder Hafermilch', rating: 5 },
	{ id: 29, title: 'Blaue Piña Colada', price: '6,90 €', category_id: 3, desc: 'Auf Wunsch mit Sahne oder Hafermilch', rating: 5 },

	// Matcha & Iced Drinks (Category 4)
	{ id: 30, title: 'Matcha Latte', price: '5,90 €', category_id: 4, desc: 'Japanischer Bio Matcha schonend aufgeschäumt', rating: 5 },
	{ id: 31, title: 'Matcha Iced Tea', price: '5,90 €', category_id: 4, desc: 'Erfrischender kalter Matcha auf Eis', rating: 5 },
	{ id: 32, title: 'Iced Strawberry Matcha', price: '5,90 €', category_id: 4, desc: 'Fruchtiges Erdbeerpüree mit Premium Matcha', rating: 5 },
	{ id: 33, title: 'Iced Mango Matcha', price: '5,90 €', category_id: 4, desc: 'Süße Mango harmonisch kombiniert mit Matcha', rating: 5 },
	{ id: 34, title: 'Iced Orange Matcha', price: '5,90 €', category_id: 4, desc: 'Frischer Orangensaft mit feinem Matcha', rating: 5 },
	{ id: 35, title: 'Iced Honig-Limetten-Matcha', price: '5,90 €', category_id: 4, desc: 'Spritzige Limette, aromatischer Honig und Matcha', rating: 5 },
	{ id: 36, title: 'Iced Coffee', price: '3,90 €', category_id: 4, desc: 'Kalter Kaffee auf Eiswürfeln serviert', rating: 5 },
	{ id: 37, title: 'Iced Schokolade', price: '3,90 €', category_id: 4, desc: 'Cremige Schokolade eiskalt serviert', rating: 5 },
	{ id: 38, title: 'Iced Americano', price: '4,90 €', category_id: 4, desc: 'Doppelter Espresso auf kaltem Wasser und Eis', rating: 5 },
	{ id: 39, title: 'Iced Latte', price: '4,90 €', category_id: 4, desc: 'Kühler Espresso mit cremiger kalter Milch', rating: 5 },
	{ id: 40, title: 'Iced Cappuccino', price: '4,90 €', category_id: 4, desc: 'Espresso auf Eis mit feinem kalten Milchschaum', rating: 5 },
	{ id: 41, title: 'Iced Caramel Latte', price: '4,90 €', category_id: 4, desc: 'Mit verlockendem Karamellsirup', rating: 5 },
	{ id: 42, title: 'Iced Vanilla Latte', price: '4,90 €', category_id: 4, desc: 'Mit edlem Vanillesirup auf Eis', rating: 5 },
	{ id: 43, title: 'Iced Coffee Honey Lime', price: '4,90 €', category_id: 4, desc: 'Erfrischende Kreation mit Honig und Limette', rating: 5 },

	// Summer Limonaden (Category 5)
	{ id: 44, title: 'Hawaii Limo', price: '6,90 €', category_id: 5, desc: 'Exotische Sommerlimonade mit Tropenfrüchten', rating: 5 },
	{ id: 45, title: 'Orange-Limetten-Limo', price: '6,90 €', category_id: 5, desc: 'Frisch gepresste Orange und Limette mit Minze', rating: 5 },
	{ id: 46, title: 'Mango-Limo', price: '6,90 €', category_id: 5, desc: 'Sonnengereifte Mango mit prickelndem Sodawasser', rating: 5 },
	{ id: 47, title: 'Virgin Mojito', price: '6,90 €', category_id: 5, desc: 'Alkoholfreier Klassiker mit Minze, Limette & Rohrzucker', rating: 5 },
	{ id: 48, title: 'Virgin Waldmeister-Limo', price: '6,90 €', category_id: 5, desc: 'Aromatischer Waldmeistergeschmack auf Eis', rating: 5 },
	{ id: 49, title: 'Classic Virgin Mojito', price: '6,90 €', category_id: 5, desc: 'Frische Limettenspalten, Minze und Crushed Ice', rating: 5 },
	{ id: 50, title: 'Kiwi Mojito', price: '6,90 €', category_id: 5, desc: 'Frische Kiwi mit Limette und Minze', rating: 5 },
	{ id: 51, title: 'Ipanema Klassik', price: '6,90 €', category_id: 5, desc: 'Ginger Ale, Maracujanektar, Limetten & Rohrzucker', rating: 5 },

	// POMOM Frühstück Bowls (Categories 7, 8, 9 - parent 6)
	{
		id: 52,
		title: 'Bali Bowl',
		price: '9,90 €',
		category_id: 7,
		desc: 'Banane, Mango, Ananas, Kokosmilch, Pfirsich, Blaue Spirulina. Basis: Müsli, Haferflocken, Nüsse, frisches Obst, Kokosraspeln',
		rating: 5
	},
	{
		id: 53,
		title: 'Passionfruit Bowl',
		price: '9,90 €',
		category_id: 8,
		desc: 'Banane, Passionsfrucht, Mango, Pfirsich, Dattelpüree, Kokosmilch. Basis: Müsli, Haferflocken, Nüsse, frisches Obst, Kokosraspeln',
		rating: 5
	},
	{
		id: 54,
		title: 'Acai Bowl',
		price: '9,90 €',
		category_id: 9,
		desc: 'Banane, Erdbeere, Blaubeere, Acaipüree, Dattelpüree. Basis: Müsli, Haferflocken, Nüsse, frisches Obst, Kokosraspeln',
		rating: 5
	},

	// Frühstück (Category 10)
	{ id: 55, title: 'Spiegelei mit frischem Salat und Avocado', price: '12,90 €', category_id: 10, desc: 'Frische Freilandeier, knackiger Marktsalat, reife Avocado & warmes Brot', rating: 5 },
	{ id: 56, title: 'Rührei mit Gouda-Käse & Avocado', price: '12,90 €', category_id: 10, desc: 'Cremiges Rührei mit herzhaftem Gouda, Avocado und Brotbeilage', rating: 5 },
	{ id: 57, title: 'Omelette mit Salami und Käse', price: '12,90 €', category_id: 10, desc: 'Klassisches Omelette gefüllt mit feiner Salami und zart geschmolzenem Käse', rating: 5 },
	{ id: 58, title: 'Veganer Frühstücksteller', price: '10,90 €', category_id: 10, desc: 'Bunt garniertes Marktgemüse, hausgemachter Hummus und ofenfrisches Brot', rating: 5 },
	{ id: 59, title: 'Giovannis Frühstücksplatte', price: '12,90 €', category_id: 10, desc: 'Butter, Käseauswahl, Putenschinken, Salami, gekochtes Ei, Frischkäse & Brötchen', rating: 5 },
	{ id: 60, title: 'Extra Lachs', price: '3,90 €', category_id: 10, desc: 'Fein geräucherter norwegischer Lachs als Extra', rating: 5 },
	{ id: 61, title: 'Extra Avocado', price: '2,90 €', category_id: 10, desc: 'Frische marinierte Avocadospalten', rating: 5 },
	{ id: 62, title: 'Extra Ei', price: '2,00 €', category_id: 10, desc: 'Zusätzliches Freilandei nach Wahl zubereitet', rating: 5 },

	// Süßes Frühstück (Category 11 - parent 10)
	{
		id: 63,
		title: 'Süßes Frühstück',
		price: '10,90 €',
		category_id: 11,
		desc: 'Frisches Buttercroissant, 2 knusprige Brötchen, süße Sahne, Honig, Nutella, Konfitüre & Landbutter',
		rating: 5
	},
	{
		id: 64,
		title: 'Obstteller mit Honig & Joghurt',
		price: '10,90 €',
		category_id: 11,
		desc: 'Bunte Auswahl an erntefrischen saisonalen Früchten mit cremigem Naturjoghurt und Waldhonig',
		rating: 5
	},

	// Kaffee (Category 12)
	{ id: 65, title: 'Filterkaffee', price: '2,00 € / 2,70 €', category_id: 12, desc: 'Frisch aufgebrühter aromatischer Röstkaffee (Klein / Groß)', rating: 5 },
	{ id: 66, title: 'Caffè Crema', price: '2,80 € / 3,70 €', category_id: 12, desc: 'Traditionell zubereitet mit samtiger Crema (Klein / Groß)', rating: 5 },
	{ id: 67, title: 'Espresso', price: '2,20 €', category_id: 12, desc: 'Kräftiger italienischer Espressoshot aus bester Röstung', rating: 5 },
	{ id: 68, title: 'Doppelter Espresso', price: '3,20 €', category_id: 12, desc: 'Doppelte Portion für maximalen Kaffeegenuss', rating: 5 },
	{ id: 69, title: 'Espresso Macchiato', price: '2,80 € / 3,70 €', category_id: 12, desc: 'Espresso verfeinert mit einem Hauch warmem Milchschaum', rating: 5 },
	{ id: 70, title: 'Milchkaffee', price: '3,70 €', category_id: 12, desc: 'Große Schale Kaffee mit reichlich cremiger heißer Milch', rating: 5 },
	{ id: 71, title: 'Latte Macchiato', price: '3,20 € / 4,50 €', category_id: 12, desc: 'Klassische Dreischichtung aus Espresso, heißer Milch und Schaum', rating: 5 },
	{ id: 72, title: 'Cappuccino', price: '3,20 € / 4,00 €', category_id: 12, desc: 'Italienischer Espressoklassiker mit samtigem Milchschaum', rating: 5 },
	{ id: 73, title: 'Americano', price: '2,80 € / 3,70 €', category_id: 12, desc: 'Mit heißem Wasser verlängerter samtiger Espresso', rating: 5 },
	{ id: 74, title: 'Chai Latte', price: '3,60 €', category_id: 12, desc: 'Gewürzter Schwarzteeextrakt mit samtig geschäumter Milch', rating: 5 },
	{ id: 75, title: 'Caro Kaffee', price: '2,50 € / 3,20 €', category_id: 12, desc: 'Koffeinfreier Getreidekaffee bekömmlich zubereitet', rating: 5 },
	{ id: 76, title: 'Heiße Schokolade', price: '3,70 €', category_id: 12, desc: 'Edelkakao mit heißer Vollmilch und optional Sahnehaube', rating: 5 },

	// Tee & Heissgetränke (Category 13)
	{ id: 77, title: 'Pfefferminztee', price: '2,90 €', category_id: 13, desc: 'Erfrischende Pfefferminzblätter schonend aufgebrüht', rating: 5 },
	{ id: 78, title: 'Rooibos-Vanille-Tee', price: '2,90 €', category_id: 13, desc: 'Südafrikanischer Rotbuschtee mit Bourbon-Vanillearoma', rating: 5 },
	{ id: 79, title: 'Grüner Darjeeling-Tee', price: '2,90 €', category_id: 13, desc: 'Feiner Hochland-Grüntee mit zarter Bitternote', rating: 5 },
	{ id: 80, title: 'Kräutertee', price: '2,90 €', category_id: 13, desc: 'Harmonische Mischung ausgewählter Alpenkräuter', rating: 5 },
	{ id: 81, title: 'Schwarzer Darjeeling-Tee', price: '2,90 €', category_id: 13, desc: 'Aromatischer Schwarztee mit blumig-würzigem Charakter', rating: 5 },
	{ id: 82, title: 'English Breakfast Tea', price: '2,90 €', category_id: 13, desc: 'Kräftige Schwarzteemischung ideal für den Morgen', rating: 5 },
	{ id: 83, title: 'Früchtetee', price: '2,90 €', category_id: 13, desc: 'Süffige Früchtemischung mit Hibiskus und Beerennoten', rating: 5 },
	{ id: 84, title: 'Grüner Tee', price: '2,90 €', category_id: 13, desc: 'Klassischer unfermentierter Grüntee reich an Antioxidantien', rating: 5 },
	{ id: 85, title: 'Schwarzer Tee', price: '2,90 €', category_id: 13, desc: 'Klassischer feiner Ceylon Schwarztee', rating: 5 },
	{ id: 86, title: 'Safrantee', price: '4,90 €', category_id: 13, desc: 'Kostbare Safranfäden veredelt zu einem königlichen Teeaufguss', rating: 5 },
	{ id: 87, title: 'Frischer Ingwer-Zitrone-Minze', price: '4,00 €', category_id: 13, desc: 'Frische Ingwerscheiben, Zitronenspalten und Minze im Glas', rating: 5 },
	{ id: 88, title: 'Heißes Wasser', price: '2,00 €', category_id: 13, desc: 'Frisch gefiltertes heißes Quellwasser', rating: 5 },

	// Crêpes (Category 14)
	{ id: 89, title: 'Crêpe mit Puderzucker', price: '5,90 €', category_id: 14, desc: 'Hauchdünner französischer Crêpe klassisch mit Puderzucker', rating: 5 },
	{ id: 90, title: 'Crêpe mit Nutella', price: '6,90 €', category_id: 14, desc: 'Großzügig bestrichen mit zartschmelzendem Nutella', rating: 5 },
	{ id: 91, title: 'Crêpe mit Nutella & Banane', price: '7,90 €', category_id: 14, desc: 'Warmer Crêpe gefüllt mit Nutella und frischen Bananenscheiben', rating: 5 },
	{ id: 92, title: 'Crêpe mit Nutella & Erdbeeren', price: '7,90 €', category_id: 14, desc: 'Süße Erdbeerstücke harmonisch vereint mit Nutella', rating: 5 },
	{ id: 93, title: 'Crêpe mit Nutella & Kiwi', price: '7,90 €', category_id: 14, desc: 'Fruchtige Kiwi kombiniert mit schokoladigem Nutella', rating: 5 },
	{ id: 94, title: 'Crêpe mit Nutella, Banane & Erdbeeren', price: '8,90 €', category_id: 14, desc: 'Der Publikumsliebling mit zweierlei frischem Lieblingsobst', rating: 5 },
	{ id: 95, title: 'Crêpe mit Nutella alle 3 Sorten', price: '10,90 €', category_id: 14, desc: 'Das volle Genusserlebnis: Nutella mit Banane, Erdbeeren & Kiwi', rating: 5 },

	// Suppen (Category 15)
	{ id: 96, title: 'Tomatensuppe', price: '7,90 €', category_id: 15, desc: 'Fruchtige sonnengereifte Tomaten mit Sahnehäubchen & frischem Basilikum', rating: 5 },
	{ id: 97, title: 'Gulaschsuppe', price: '7,90 €', category_id: 15, desc: 'Herzhafte Rindfleisch-Gulaschsuppe mit Paprika und Kräutern', rating: 5 },
	{ id: 98, title: 'Linsensuppe', price: '7,90 €', category_id: 15, desc: 'Wärmende traditionelle Linsensuppe mit feinem Wurzelgemüse', rating: 5 },

	// Hauptgerichte & Salate (Category 16)
	{ id: 99, title: 'Pasta Arrabbiata', price: '10,90 €', category_id: 16, desc: 'Al dente Penne in feuriger Tomatensauce mit Knoblauch, Chili & Kräutern', rating: 5 },
	{ id: 100, title: 'Pasta Bolognese', price: '10,90 €', category_id: 16, desc: 'Klassische italienische Hackfleischsauce nach Hausrezept stundenlang geschmort', rating: 5 },
	{ id: 101, title: 'Butter Chicken mit Reis', price: '12,90 €', category_id: 16, desc: 'Zartes Hähnchenfilet in samtiger Tomaten-Butter-Currysauce mit Basmatireis', rating: 5 },
	{ id: 102, title: 'Süßkartoffel-Curry mit Reis', price: '10,90 €', category_id: 16, desc: 'Veganer Genuss mit Süßkartoffeln, Kokosmilch, Kichererbsen und Duftreis', rating: 5 },
	{ id: 103, title: 'Thai Chicken Curry mit Reis', price: '10,90 €', category_id: 16, desc: 'Knackiges Gemüse und Hähnchenbrust in aromatischem Kokos-Curry', rating: 5 },
	{
		id: 104,
		title: 'Räucherlachs-Avocado-Salat',
		price: '12,90 €',
		category_id: 16,
		desc: 'Bunter Blattsalat mit feinem Räucherlachs, Avocado, Kirschtomaten, Sesam und Zitronen-Vinaigrette',
		rating: 5
	},
	{
		id: 105,
		title: 'Caprese-Salat',
		price: '10,90 €',
		category_id: 16,
		desc: 'Aromatische Strauchtomaten, frischer Büffelmozzarella, Basilikumblätter und feinstes Pesto',
		rating: 5
	},
	{ id: 106, title: 'Thunfischsalat', price: '7,90 €', category_id: 16, desc: 'Knackige Salate mit zartem Thunfisch, roten Zwiebeln und Oliven', rating: 5 },
	{
		id: 107,
		title: 'Bruschetta',
		price: '4,90 €',
		category_id: 16,
		desc: 'Geröstetes Landbrot mit marinierten Tomatenwürfeln, Knoblauch, nativem Olivenöl und Basilikum',
		rating: 5
	},

	// Kuchen (Category 17)
	{
		id: 108,
		title: 'Täglich frische Kuchenauswahl',
		price: 'Tagesangebot',
		category_id: 17,
		desc: 'Täglich ofenfrische handgemachte Torten und Kuchen. Fragen Sie unser Serviceteam nach der heutigen Auslage!',
		rating: 5
	}
];
