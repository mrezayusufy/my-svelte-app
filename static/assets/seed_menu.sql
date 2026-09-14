-- ============================================================
-- GIOVANNI'S KAFFEEWELT - SUPABASE SEED & RLS SCRIPT
-- Paste and Run this in your Supabase Dashboard -> SQL Editor
-- ============================================================

-- 1. ROW LEVEL SECURITY (RLS) POLICIES
-- Grant public SELECT access to anon (publishable key) & authenticated users
ALTER TABLE IF EXISTS public.category_menu ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read on category_menu" ON public.category_menu;
CREATE POLICY "Allow public read on category_menu"
ON public.category_menu FOR SELECT
TO anon, authenticated
USING (true);

ALTER TABLE IF EXISTS public.menu ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read on menu" ON public.menu;
CREATE POLICY "Allow public read on menu"
ON public.menu FOR SELECT
TO anon, authenticated
USING (true);

-- 2. INSERT OR UPDATE CATEGORIES (17 rows)
INSERT INTO public.category_menu (id, name, category_slug, parent_id)
VALUES
  (1, 'Kaltgetränke', 'kaltgetranke', NULL),
  (2, 'Soft Drinks', 'soft-drinks', NULL),
  (3, 'Shakes', 'shakes', NULL),
  (4, 'Matcha & Iced Drinks', 'matcha-iced-drinks', NULL),
  (5, 'Summer Limonaden', 'summer-limonaden', NULL),
  (6, 'POMOM Frühstück', 'pomom-fruhstuck', NULL),
  (7, 'Bali Bowl', 'bali-bowl', 6),
  (8, 'Passionfruit Bowl', 'passionfruit-bowl', 6),
  (9, 'Acai Bowl', 'acai-bowl', 6),
  (10, 'Frühstück', 'fruhstuck', NULL),
  (11, 'Süßes Frühstück', 'susses-fruhstuck', 10),
  (12, 'Kaffee', 'kaffee', NULL),
  (13, 'Tee & Heissgetränke', 'tee-heissgetranke', NULL),
  (14, 'Crêpes', 'crepes', NULL),
  (15, 'Suppen', 'suppen', NULL),
  (16, 'Hauptgerichte & Salate', 'hauptgerichte-salate', NULL),
  (17, 'Kuchen', 'kuchen', NULL)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category_slug = EXCLUDED.category_slug,
  parent_id = EXCLUDED.parent_id;

-- 3. INSERT OR UPDATE MENU ITEMS (107 rows)
INSERT INTO public.menu (id, title, price, category_id, "desc", rating)
VALUES
  (1, 'Fritz-Kola alle Sorten', '0,33 l 3,00 €', 1, 'Alle Sorten', 5),
  (2, 'Mineralwasser mit Sprudel', '0,75 l 5,00 €', 1, '', 5),
  (3, 'Mineralwasser mit Sprudel', '0,33 l 3,00 €', 1, '', 5),
  (4, 'Stilles Wasser', '0,33 l 3,00 €', 1, '', 5),
  (5, 'Stilles Wasser', '0,75 l 3,00 €', 1, '', 5),
  (6, 'Vio Bio Zitrone-Limette', '0,25 l 3,00 €', 1, '', 5),
  (7, 'Vio Apfelschorle', '0,25 l 3,00 €', 1, '', 5),
  (8, 'Vio Rhabarberschorle', '0,25 l 3,00 €', 1, '', 5),
  (9, 'Vio Schwarze-Johannisbeere', '0,25 l 3,00 €', 1, '', 5),
  (10, 'Vio Bio Limo Orange', '0,25 l 3,00 €', 1, '', 5),
  (11, 'Coca-Cola', '0,33 l 3,00 €', 1, '', 5),
  (12, 'Coca-Cola light', '0,33 l 3,00 €', 1, '', 5),
  (13, 'Coca-Cola Zero Sugar', '0,33 l 3,00 €', 1, '', 5),
  (14, 'Mezzo Mix', '0,33 l 3,00 €', 1, '', 5),
  (15, 'Fanta', '0,33 l 3,00 €', 1, '', 5),
  (16, 'Sprite', '0,33 l 3,00 €', 1, '', 5),
  (17, 'Orangensaft', '3,00 € / 4,00 €', 2, '0,3 l / 0,4 l', 5),
  (18, 'Karottensaft', '3,00 € / 4,00 €', 2, '0,3 l / 0,4 l', 5),
  (19, 'Apfelsaft', '3,00 € / 4,00 €', 2, '0,3 l / 0,4 l', 5),
  (20, 'Ananassaft', '3,00 € / 4,00 €', 2, '0,3 l / 0,4 l', 5),
  (21, 'Kiba-Saft', '3,00 € / 4,00 €', 2, '0,3 l / 0,4 l', 5),
  (22, 'Kirschsaft', '3,00 € / 4,00 €', 2, '0,3 l / 0,4 l', 5),
  (23, 'Bananen-Shake', '5,90 €', 3, 'Auf Wunsch mit Sahne oder Hafermilch', 5),
  (24, 'Erdbeer-Shake', '5,90 €', 3, 'Auf Wunsch mit Sahne oder Hafermilch', 5),
  (25, 'Raffaello-Shake', '5,90 €', 3, 'Auf Wunsch mit Sahne oder Hafermilch', 5),
  (26, 'Oreo-Shake', '5,90 €', 3, 'Auf Wunsch mit Sahne oder Hafermilch', 5),
  (27, 'Vanille-Shake', '5,90 €', 3, 'Auf Wunsch mit Sahne oder Hafermilch', 5),
  (28, 'Schoko-Shake', '5,90 €', 3, 'Auf Wunsch mit Sahne oder Hafermilch', 5),
  (29, 'Blaue Piña Colada', '6,90 €', 3, 'Auf Wunsch mit Sahne oder Hafermilch', 5),
  (30, 'Matcha Latte', '5,90 €', 4, '', 5),
  (31, 'Matcha Iced Tea', '5,90 €', 4, '', 5),
  (32, 'Iced Strawberry Matcha', '5,90 €', 4, '', 5),
  (33, 'Iced Mango Matcha', '5,90 €', 4, '', 5),
  (34, 'Iced Orange Matcha', '5,90 €', 4, '', 5),
  (35, 'Iced Honig-Limetten-Matcha', '5,90 €', 4, '', 5),
  (36, 'Iced Coffee', '3,90 €', 4, '', 5),
  (37, 'Iced Schokolade', '3,90 €', 4, '', 5),
  (38, 'Iced Americano', '4,90 €', 4, '', 5),
  (39, 'Iced Latte', '4,90 €', 4, '', 5),
  (40, 'Iced Cappuccino', '4,90 €', 4, '', 5),
  (41, 'Iced Caramel Latte', '4,90 €', 4, '', 5),
  (42, 'Iced Vanilla Latte', '4,90 €', 4, '', 5),
  (43, 'Iced Coffee Honey Lime', '4,90 €', 4, '', 5),
  (44, 'Hawaii', '6,90 €', 5, '', 5),
  (45, 'Orange-Limetten-Limo', '6,90 €', 5, '', 5),
  (46, 'Mango-Limo', '6,90 €', 5, '', 5),
  (47, 'Virgin Mojito', '6,90 €', 5, '', 5),
  (48, 'Virgin Waldmeister-Limo', '6,90 €', 5, '', 5),
  (49, 'Classic Virgin Mojito', '6,90 €', 5, '', 5),
  (50, 'Kiwi Mojito', '6,90 €', 5, '', 5),
  (51, 'Ipanema Klassik', '6,90 €', 5, '', 5),
  (52, 'Bali Bowl', '9,90 €', 7, 'Banane, Mango, Ananas, Kokosmilch, Pfirsich, Blaue Spirulina. Basis: Müsli, Haferflocken, Nüsse, frisches Obst, Kokosraspeln', 5),
  (53, 'Passionfruit Bowl', '9,90 €', 8, 'Banane, Passionsfrucht, Mango, Pfirsich, Dattelpüree, Kokosmilch. Basis: Müsli, Haferflocken, Nüsse, frisches Obst, Kokosraspeln', 5),
  (54, 'Acai Bowl', '9,90 €', 9, 'Banane, Erdbeere, Blaubeere, Acaipüree, Dattelpüree. Basis: Müsli, Haferflocken, Nüsse, frisches Obst, Kokosraspeln', 5),
  (55, 'Spiegelei mit frischem Salat und Avocado', '12,90 €', 10, 'Mit frischem Salat und Avocado', 5),
  (56, 'Rührei mit Gouda-Käse & Avocado', '12,90 €', 10, 'Mit Gouda-Käse & Avocado', 5),
  (57, 'Omelette mit Salami und Käse', '12,90 €', 10, 'Mit Salami und Käse', 5),
  (58, 'Veganer Frühstücksteller', '10,90 €', 10, 'Gemüse, Hummus, Brot', 5),
  (59, 'Giovannis Frühstücksplatte', '12,90 €', 10, 'Butter, Käse, Pute, Salami, Ei, Frischkäse, Brötchen', 5),
  (60, 'Extra Lachs', '3,90 €', 10, 'Frühstücksextra', 5),
  (61, 'Extra Avocado', '2,90 €', 10, 'Frühstücksextra', 5),
  (62, 'Extra Ei', '2,00 €', 10, 'Frühstücksextra', 5),
  (63, 'Süßes Frühstück', '10,90 €', 11, 'Croissant, 2 Brötchen, Sahne, Honig, Nutella, Marmelade, Butter', 5),
  (64, 'Obstteller mit Honig & Joghurt', '10,90 €', 11, 'Frisches Obst mit Honig & Joghurt', 5),
  (65, 'Filterkaffee', '2,00 € / 2,70 €', 12, 'Klein / Groß', 5),
  (66, 'Caffè Crema', '2,80 € / 3,70 €', 12, 'Klein / Groß', 5),
  (67, 'Espresso', '2,20 €', 12, '', 5),
  (68, 'Doppelter Espresso', '3,20 €', 12, '', 5),
  (69, 'Espresso Macchiato', '2,80 € / 3,70 €', 12, 'Klein / Groß', 5),
  (70, 'Milchkaffee', '3,70 €', 12, '', 5),
  (71, 'Latte Macchiato', '3,20 € / 4,50 €', 12, 'Klein / Groß', 5),
  (72, 'Cappuccino', '3,20 € / 4,00 €', 12, 'Klein / Groß', 5),
  (73, 'Americano', '2,80 € / 3,70 €', 12, 'Klein / Groß', 5),
  (74, 'Chai Latte', '3,60 €', 12, '', 5),
  (75, 'Caro Kaffee', '2,50 € / 3,20 €', 12, 'Klein / Groß', 5),
  (76, 'Heiße Schokolade', '3,70 €', 12, '', 5),
  (77, 'Pfefferminztee', '2,90 €', 13, '', 5),
  (78, 'Rooibos-Vanille-Tee', '2,90 €', 13, '', 5),
  (79, 'Grüner Darjeeling-Tee', '2,90 €', 13, '', 5),
  (80, 'Kräutertee', '2,90 €', 13, '', 5),
  (81, 'Schwarzer Darjeeling-Tee', '2,90 €', 13, '', 5),
  (82, 'English Breakfast Tea', '2,90 €', 13, '', 5),
  (83, 'Früchtetee', '2,90 €', 13, '', 5),
  (84, 'Grüner Tee', '2,90 €', 13, '', 5),
  (85, 'Schwarzer Tee', '2,90 €', 13, '', 5),
  (86, 'Safrantee', '4,90 €', 13, '', 5),
  (87, 'Frischer Ingwer-Zitrone-Minze', '4,00 €', 13, '', 5),
  (88, 'Heißes Wasser', '2,00 €', 13, '', 5),
  (89, 'Crêpe mit Puderzucker', '5,90 €', 14, '', 5),
  (90, 'Crêpe mit Nutella', '6,90 €', 14, '', 5),
  (91, 'Crêpe mit Nutella & Banane', '7,90 €', 14, '', 5),
  (92, 'Crêpe mit Nutella & Erdbeeren', '7,90 €', 14, '', 5),
  (93, 'Crêpe mit Nutella & Kiwi', '7,90 €', 14, '', 5),
  (94, 'Crêpe mit Nutella, Banane & Erdbeeren', '8,90 €', 14, '', 5),
  (95, 'Crêpe mit Nutella alle 3 Sorten', '10,90 €', 14, 'Nutella, Banane, Erdbeeren & Kiwi', 5),
  (96, 'Tomatensuppe', '7,90 €', 15, '', 5),
  (97, 'Gulaschsuppe', '7,90 €', 15, '', 5),
  (98, 'Linsensuppe', '7,90 €', 15, '', 5),
  (99, 'Pasta Arrabbiata', '10,90 €', 16, '', 5),
  (100, 'Pasta Bolognese', '10,90 €', 16, '', 5),
  (101, 'Butter Chicken mit Reis', '12,90 €', 16, '', 5),
  (102, 'Süßkartoffel-Curry mit Reis', '10,90 €', 16, '', 5),
  (103, 'Thai Chicken Curry mit Reis', '10,90 €', 16, '', 5),
  (104, 'Räucherlachs-Avocado-Salat', '12,90 €', 16, 'Mit Kirschtomaten, Sesam und Zitrone', 5),
  (105, 'Caprese-Salat', '10,90 €', 16, 'Mit Tomaten, Mozzarella, Basilikum und Pesto', 5),
  (106, 'Thunfischsalat', '7,90 €', 16, '', 5),
  (107, 'Bruschetta', '4,90 €', 16, 'Frische Tomaten, Knoblauch, Olivenöl, Basilikum', 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  price = EXCLUDED.price,
  category_id = EXCLUDED.category_id,
  "desc" = EXCLUDED."desc",
  rating = EXCLUDED.rating;

-- 4. UPDATE PRIMARY KEY SEQUENCES
SELECT setval(pg_get_serial_sequence('public.category_menu', 'id'), COALESCE((SELECT MAX(id) FROM public.category_menu), 1));
SELECT setval(pg_get_serial_sequence('public.menu', 'id'), COALESCE((SELECT MAX(id) FROM public.menu), 1));
