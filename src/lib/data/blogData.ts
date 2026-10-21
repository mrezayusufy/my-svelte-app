import type { Post, Category } from '$lib/types/blog';

export const fallbackCategories: Category[] = [
	{
		id: '11111111-1111-1111-1111-111111111111',
		name: 'Kaffeekultur',
		slug: 'kaffeekultur',
		meta_title: 'Kaffeekultur - Giovanni\'s Kaffeewelt',
		meta_description: 'Traditionelle italienische Röstkunst und Kaffeekultur in Hamburg.',
		created_at: '2025-01-01T00:00:00Z',
		updated_at: '2025-01-01T00:00:00Z'
	},
	{
		id: '22222222-2222-2222-2222-222222222222',
		name: 'Rezepte & Kulinarik',
		slug: 'rezepte-kulinarik',
		meta_title: 'Rezepte & Kulinarik - Giovanni\'s Kaffeewelt',
		meta_description: 'Mediterrane Rezepte, Bowls und frische Delikatessen.',
		created_at: '2025-01-01T00:00:00Z',
		updated_at: '2025-01-01T00:00:00Z'
	},
	{
		id: '33333333-3333-3333-3333-333333333333',
		name: 'Hinter den Kulissen',
		slug: 'hinter-den-kulissen',
		meta_title: 'Hinter den Kulissen - Giovanni\'s Kaffeewelt',
		meta_description: 'Einblicke hinter die Kulissen unseres Cafés in Hamburg.',
		created_at: '2025-01-01T00:00:00Z',
		updated_at: '2025-01-01T00:00:00Z'
	},
	{
		id: '44444444-4444-4444-4444-444444444444',
		name: 'Neuheiten',
		slug: 'neuheiten',
		meta_title: 'Neuheiten - Giovanni\'s Kaffeewelt',
		meta_description: 'Saisonale Getränke und neue Spezialitäten.',
		created_at: '2025-01-01T00:00:00Z',
		updated_at: '2025-01-01T00:00:00Z'
	},
	{
		id: '55555555-5555-5555-5555-555555555555',
		name: 'Events',
		slug: 'events',
		meta_title: 'Events - Giovanni\'s Kaffeewelt',
		meta_description: 'Veranstaltungen und Feiern im Herzen von Hamburg.',
		created_at: '2025-01-01T00:00:00Z',
		updated_at: '2025-01-01T00:00:00Z'
	}
];

export const fallbackPosts: Post[] = [
	{
		id: 'a1111111-1111-1111-1111-111111111111',
		category_id: '22222222-2222-2222-2222-222222222222',
		title: 'Leichte Sommergerichte für erfrischenden Genuss',
		slug: 'leichte-sommergerichte-fuer-erfrischenden-genuss',
		excerpt:
			'Entdecken Sie aromatische Sommergerichte und leichte Delikatessen, die perfekt zu warmen Tagen in Hamburg und einer erfrischenden Pause passen.',
		content: `## Frische Aromen für sonnige Tage

Wenn die Hamburger Sommertage Einzug halten, sehnen wir uns nach leichten, belebenden Aromen. Bei **Giovanni's Kaffeewelt** verbinden wir italienische Leichtigkeit mit saisonalen Zutaten aus der Region.

### Das Geheimnis unserer Sommer-Bowls

Unsere Küchencrew setzt auf eine harmonische Komposition aus:
- **Frischem Blattspinat und Rucola** direkt vom Hamburger Großmarkt
- **Sonnengereiften Kirschtomaten** und cremiger Büffelmozzarella
- **Hausgemachtem Basilikum-Pesto** mit feinstem ligurischem Olivenöl

> „Echtes italienisches Essen braucht nicht viele Zutaten – aber jede einzelne muss von herausragender Qualität sein.“

### Erfrischende Begleiter
Zu unseren leichten Gerichten empfehlen wir unseren spritzigen *Cold Brew Tonic* mit frischer Orangenzeste oder eine hausgemachte Limonade mit Minze und Ingwer. Kommen Sie vorbei und genießen Sie den Sommer auf unserer sonnigen Terrasse!`,
		featured_image_url: '/assets/blog-img1.jpg',
		featured_image_alt: 'Leichte Sommergerichte bei Giovanni Kaffeewelt',
		status: 'published',
		meta_title: 'Leichte Sommergerichte in Hamburg | Giovanni\'s Kaffeewelt',
		meta_description: 'Aromatische Sommergerichte, Bowls und erfrischende Delikatessen bei Giovanni\'s Kaffeewelt in Hamburg.',
		canonical_url: 'https://giovannikaffeewelt.de/blog/leichte-sommergerichte-fuer-erfrischenden-genuss',
		published_at: '2025-05-19T10:00:00Z',
		created_at: '2025-05-19T10:00:00Z',
		updated_at: '2025-05-19T10:00:00Z',
		categories: fallbackCategories[1]
	},
	{
		id: 'b2222222-2222-2222-2222-222222222222',
		category_id: '33333333-3333-3333-3333-333333333333',
		title: 'Ein Tag im Leben unseres Küchenchefs bei Giovanni’s',
		slug: 'ein-tag-im-leben-unseres-kuechenchefs',
		excerpt:
			'Begleiten Sie unseren Küchenchef von den ersten Vorbereitungen am Morgen bis zum Service und erfahren Sie, wie unsere Signature Bowls und Gerichte entstehen.',
		content: `## Leidenschaft ab sechs Uhr morgens

Noch bevor die ersten Sonnenstrahlen die Straßen Hamburgs erleuchten, beginnt in unserer Küche das emsige Treiben. Für unseren Küchenchef ist jeder Morgen der Beginn eines neuen kulinarischen Kapitels.

### Die morgendliche Frische-Inspektion
Der Tag beginnt mit der Anlieferung frischer Kräuter, backfrischem Brot und feinsten italienischen Spezialitäten:
1. **Verkostung des frisch gebrühten Espressos**: Der perfekte Start, um die Geschmackssinne zu schärfen.
2. **Prüfung der Teige und Saucen**: Unsere Pastasaucen werden stundenlang sanft geschmort.
3. **Zubereitung der hausgemachten Kuchen**: Täglich ofenfrisch aus unserer Backstube.

> „Kochen ist wie Musik – jede Zutat muss im richtigen Takt zusammenspielen.“

Wir laden Sie herzlich ein, bei Ihrem nächsten Besuch einen Blick in unsere offene Küche zu werfen!`,
		featured_image_url: '/assets/images/innerpage/blog/blog-img2.jpg',
		featured_image_alt: 'Küchenchef bei der Zubereitung bei Giovanni Kaffeewelt',
		status: 'published',
		meta_title: 'Ein Tag im Leben unseres Küchenchefs | Giovanni\'s Kaffeewelt',
		meta_description: 'Hinter den Kulissen von Giovanni\'s Kaffeewelt: Wie unser Küchenchef täglich frische italienische Köstlichkeiten zaubert.',
		canonical_url: 'https://giovannikaffeewelt.de/blog/ein-tag-im-leben-unseres-kuechenchefs',
		published_at: '2025-05-15T09:30:00Z',
		created_at: '2025-05-15T09:30:00Z',
		updated_at: '2025-05-15T09:30:00Z',
		categories: fallbackCategories[2]
	},
	{
		id: 'c3333333-3333-3333-3333-333333333333',
		category_id: '11111111-1111-1111-1111-111111111111',
		title: 'Der mediterrane Einfluss hinter unseren Kaffeekreationen',
		slug: 'der-mediterrane-einfluss-hinter-unseren-kaffeekreationen',
		excerpt:
			'Traditionelle italienische Röstkunst trifft moderne Barista-Handwerkskunst: Erfahren Sie alles über unsere Bohnenauswahl und das Geheimnis samtweicher Crema.',
		content: `## Italienische Kaffeekultur pur

In Italien ist ein Espresso nicht bloß ein Muntermacher – er ist ein Ritual, ein kurzes Innehalten und ein Stück Lebensfreude. Genau dieses Lebensgefühl bringen wir nach Hamburg.

### Die Kunst der Röstung und Extraktion
Für unsere Kaffeekreationen nutzen wir sorgfältig ausgewählte Bohnenmischungen aus nachhaltigem Anbau:
- **Schonende Trommelröstung**: Entlockt den Bohnen ihre feinen Nuss- und Schokoladennoten.
- **Präzise Wassertemperatur und Mahlgrad**: Exakt abgestimmt auf Luftfeuchtigkeit und Wetter.
- **Samtige Mikroschaum-Konsistenz**: Perfekt für Latte Art und vollmundigen Geschmack.

Probieren Sie unseren klassischen *Espresso Macchiato* oder einen samtigen *Flat White* bei Ihrem nächsten Besuch!`,
		featured_image_url: '/assets/images/innerpage/blog/blog-img3.jpg',
		featured_image_alt: 'Kaffeekreationen und Latte Art bei Giovanni',
		status: 'published',
		meta_title: 'Mediterrane Kaffeekreationen | Giovanni\'s Kaffeewelt Hamburg',
		meta_description: 'Erfahren Sie alles über italienische Röstkunst, Bohnenauswahl und Barista-Handwerk bei Giovanni\'s Kaffeewelt.',
		canonical_url: 'https://giovannikaffeewelt.de/blog/der-mediterrane-einfluss-hinter-unseren-kaffeekreationen',
		published_at: '2025-05-10T11:00:00Z',
		created_at: '2025-05-10T11:00:00Z',
		updated_at: '2025-05-10T11:00:00Z',
		categories: fallbackCategories[0]
	}
];
