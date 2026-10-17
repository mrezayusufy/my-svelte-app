<script lang="ts">
	import { onMount } from "svelte";
	import { supabase } from "$lib/supabaseClient";
	import { aosAction } from "$lib/actions/aos";
	import type { CategoryMenu, MenuItem } from "$lib/types/menu";

	let {
		categories = [],
		menuItems = [],
	}: {
		categories?: CategoryMenu[];
		menuItems?: MenuItem[];
	} = $props();

	// Live data fetched from Supabase (null until client fetch succeeds)
	let supabaseCategories = $state<CategoryMenu[] | null>(null);
	let supabaseMenuItems = $state<MenuItem[] | null>(null);

	// Active data: uses Supabase data when available, otherwise falls back to server props
	let activeCategories = $derived(
		supabaseCategories && supabaseCategories.length > 0
			? supabaseCategories
			: categories,
	);
	let activeMenuItems = $derived(
		supabaseMenuItems && supabaseMenuItems.length > 0
			? supabaseMenuItems
			: menuItems,
	);

	let isFetching = $state(false);
	let fetchSource = $state<"supabase" | "fallback">("fallback");
	let fetchError = $state<string | null>(null);

	// Client-side fetch directly from Supabase on mount
	onMount(async () => {
		isFetching = true;
		try {
			console.log(
				"[FoodMenuSection] Fetching category_menu and menu directly from Supabase...",
			);
			const [catRes, menuRes] = await Promise.all([
				supabase
					.from("category_menu")
					.select("*")
					.order("id", { ascending: true }),
				supabase
					.from("menu")
					.select("*")
					.order("id", { ascending: true }),
			]);

			console.log(
				"[FoodMenuSection] Supabase category_menu response:",
				catRes,
			);
			console.log("[FoodMenuSection] Supabase menu response:", menuRes);

			if (catRes.error) {
				console.error(
					"[FoodMenuSection] category_menu error:",
					catRes.error,
				);
				fetchError = catRes.error.message;
			}
			if (menuRes.error) {
				console.error("[FoodMenuSection] menu error:", menuRes.error);
				fetchError = menuRes.error.message;
			}

			if (catRes.data && catRes.data.length > 0) {
				supabaseCategories = catRes.data as CategoryMenu[];
				fetchSource = "supabase";
			}

			if (menuRes.data && menuRes.data.length > 0) {
				supabaseMenuItems = menuRes.data as MenuItem[];
				fetchSource = "supabase";
			}

			if (fetchSource === "supabase") {
				console.info(
					`[FoodMenuSection] Live Supabase fetch succeeded! (${supabaseCategories?.length} categories, ${supabaseMenuItems?.length} menu items)`,
				);
			} else {
				console.warn(
					"[FoodMenuSection] Supabase connected (status 200), but returned 0 rows. Using fallback dataset. If you have data in Supabase, make sure Row Level Security (RLS) has a SELECT policy for anon. You can run static/assets/seed_menu.sql in Supabase SQL Editor.",
				);
			}
		} catch (err) {
			console.error(
				"[FoodMenuSection] Failed to fetch from Supabase:",
				err,
			);
			fetchError = err instanceof Error ? err.message : "Unknown error";
		} finally {
			isFetching = false;
		}
	});

	// State for filtering & pagination
	let selectedCategoryId = $state<number | "all">("all");
	let searchQuery = $state("");
	let currentPage = $state(1);
	const ITEMS_PER_PAGE = 10;

	// Top-level categories (no parent_id)
	let primaryCategories = $derived(
		activeCategories.filter((c) => !c.parent_id),
	);

	// Calculate item count per category
	function getCategoryCount(catId: number): number {
		return activeMenuItems.filter((item) => item.category_id === catId).length;
	}

	// Select a main category
	function handleSelectCategory(catId: number | "all") {
		selectedCategoryId = catId;
		currentPage = 1;
	}

	// Priority Navigation / Responsive Overflow Tabs
	interface CategoryTabItem {
		id: number | "all";
		name: string;
		count: number;
	}

	let allCategoryTabs = $derived<CategoryTabItem[]>([
		{ id: "all", name: "Alle", count: activeMenuItems.length },
		...primaryCategories.map((c) => ({
			id: c.id,
			name: c.name,
			count: getCategoryCount(c.id),
		})),
	]);

	let navContainerRef = $state<HTMLElement | null>(null);
	let measurerRef = $state<HTMLElement | null>(null);
	let moreBtnMeasurerRef = $state<HTMLElement | null>(null);
	let visibleCount = $state<number>(999);
	let isMoreOpen = $state(false);

	let visibleTabs = $derived(allCategoryTabs.slice(0, visibleCount));
	let overflowTabs = $derived(allCategoryTabs.slice(visibleCount));
	let isOverflowActive = $derived(
		overflowTabs.some((tab) => tab.id === selectedCategoryId),
	);

	function updateVisibleCount() {
		if (!navContainerRef || !measurerRef) return;
		const containerWidth = navContainerRef.clientWidth;
		if (containerWidth <= 0) return;

		const tabEls = Array.from(
			measurerRef.querySelectorAll<HTMLElement>(".measurer-tab"),
		);
		if (tabEls.length === 0) {
			visibleCount = allCategoryTabs.length;
			return;
		}

		const GAP = 8;
		const moreBtnWidth = moreBtnMeasurerRef?.offsetWidth || 54;

		// 1. If all tabs fit comfortably without the More button, show all
		let totalWidth = 0;
		for (let i = 0; i < tabEls.length; i++) {
			totalWidth += tabEls[i].offsetWidth;
			if (i > 0) totalWidth += GAP;
		}

		if (totalWidth <= containerWidth) {
			visibleCount = tabEls.length;
			return;
		}

		// 2. Otherwise reserve space for the More button and fit tabs one by one
		const availableWidth = containerWidth - moreBtnWidth - GAP;
		let accumulatedWidth = 0;
		let count = 0;

		for (let i = 0; i < tabEls.length; i++) {
			const itemWidth = tabEls[i].offsetWidth;
			const needed = accumulatedWidth + (count > 0 ? GAP : 0) + itemWidth;
			if (needed <= availableWidth) {
				accumulatedWidth = needed;
				count++;
			} else {
				break;
			}
		}

		// Always keep at least 1 tab visible (e.g. "Alle")
		visibleCount = Math.max(1, count);
	}

	$effect(() => {
		if (!navContainerRef) return;

		let rafId: number | null = null;
		const ro = new ResizeObserver(() => {
			if (rafId) cancelAnimationFrame(rafId);
			rafId = requestAnimationFrame(() => {
				updateVisibleCount();
			});
		});
		ro.observe(navContainerRef);

		const handleOutsideClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement | null;
			if (isMoreOpen && target && !target.closest(".more-menu-wrapper")) {
				isMoreOpen = false;
			}
		};

		const handleKeydown = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isMoreOpen) {
				isMoreOpen = false;
			}
		};

		window.addEventListener("click", handleOutsideClick);
		window.addEventListener("keydown", handleKeydown);

		if (typeof document !== "undefined" && document.fonts) {
			document.fonts.ready.then(() => {
				updateVisibleCount();
			});
		}

		return () => {
			if (rafId) cancelAnimationFrame(rafId);
			ro.disconnect();
			window.removeEventListener("click", handleOutsideClick);
			window.removeEventListener("keydown", handleKeydown);
		};
	});

	$effect(() => {
		// When categories or menu items update, recalculate fitting tabs
		const _ = allCategoryTabs;
		requestAnimationFrame(() => {
			updateVisibleCount();
		});
	});

	// Filtered menu items
	let filteredItems = $derived.by(() => {
		let list = activeMenuItems;

		// 1. Filter by category
		if (selectedCategoryId !== "all") {
			list = list.filter(
				(item) => item.category_id === selectedCategoryId,
			);
		}

		// 2. Filter by search query
		const q = searchQuery.trim().toLowerCase();
		if (q) {
			list = list.filter(
				(item) =>
					item.title.toLowerCase().includes(q) ||
					(item.desc && item.desc.toLowerCase().includes(q)) ||
					item.price.toLowerCase().includes(q),
			);
		}

		return list;
	});

	// Total pages calculation (10 items per page)
	let totalPages = $derived(
		Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE)),
	);

	// Items to display on the active page
	let displayedItems = $derived.by(() => {
		const start = (currentPage - 1) * ITEMS_PER_PAGE;
		return filteredItems.slice(start, start + ITEMS_PER_PAGE);
	});

	// Smart page numbers array for pagination bar (e.g. 1, 2, 3, '...', 8)
	let paginationPages = $derived.by(() => {
		if (totalPages <= 7) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}
		const pages: (number | "...")[] = [];
		if (currentPage <= 4) {
			pages.push(1, 2, 3, 4, 5, "...", totalPages);
		} else if (currentPage >= totalPages - 3) {
			pages.push(
				1,
				"...",
				totalPages - 4,
				totalPages - 3,
				totalPages - 2,
				totalPages - 1,
				totalPages,
			);
		} else {
			pages.push(
				1,
				"...",
				currentPage - 1,
				currentPage,
				currentPage + 1,
				"...",
				totalPages,
			);
		}
		return pages;
	});

	function goToPage(page: number) {
		if (page < 1 || page > totalPages || page === currentPage) return;
		currentPage = page;
		const menuSection = document.getElementById("menu");
		if (menuSection) {
			menuSection.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	}

	// Reset page when search changes
	$effect(() => {
		const _ = searchQuery;
		currentPage = 1;
	});

	// Keep currentPage in valid bounds if items list shrinks
	$effect(() => {
		if (currentPage > totalPages) {
			currentPage = Math.max(1, totalPages);
		}
	});

	function resetFilters() {
		selectedCategoryId = "all";
		searchQuery = "";
		currentPage = 1;
	}
</script>

<section class="rs-food-menu py-5 position-relative" id="menu">
	<div class="container">
		<!-- Section Header -->
		<div class="row pt-4 pb-2">
			<div class="col-lg-12">
				<div class="section-title text-white text-center">
					<span
						class="sub-title"
						data-aos="fade-down"
						data-aos-duration="1000"
						use:aosAction>Giovanni's Speisekarte</span
					>
					<h2 class="text-anm">Genuss in jedem Bissen</h2>

					<p
						class="mt-3 text-white-50 mx-auto"
						style="max-width: 680px;"
						data-aos="fade-up"
						data-aos-duration="1100"
						use:aosAction
					>
						Entdecken Sie unsere handverlesenen Kaffeespezialitäten,
						frischen Bowls, herzhaften Frühstücke, französischen
						Crêpes und hausgemachten Speisen.
					</p>
				</div>
			</div>
		</div>

		<!-- Search & Filter Controls -->
		<div
			class="row justify-content-center mb-4"
			data-aos="fade-up"
			data-aos-duration="1000"
			use:aosAction
		>
			<div class="col-lg-6 col-md-8">
				<div class="search-box position-relative">
					<i class="fas fa-search search-icon"></i>
					<input
						type="text"
						class="form-control menu-search-input"
						placeholder="Suchen nach Gerichten, Zutaten (z.B. Avocado, Matcha, Lachs)..."
						bind:value={searchQuery}
					/>
					{#if searchQuery}
						<button
							class="btn-clear-search"
							type="button"
							onclick={() => (searchQuery = "")}
							aria-label="Suche löschen"
						>
							<i class="fas fa-times"></i>
						</button>
					{/if}
				</div>
			</div>
		</div>

		<!-- Category Navigation Pills -->
		<div
			class="row mb-3 category-pills"
			data-aos="fade-up"
			data-aos-duration="1100"
			use:aosAction
		>
			<div class="col-lg-12">
				<div class="category-tabs-wrapper" bind:this={navContainerRef}>
					<div class="category-tabs">
						<!-- Visible Category Tabs -->
						{#each visibleTabs as tab (tab.id)}
							<button
								type="button"
								class="category-tab-btn {selectedCategoryId ===
								tab.id
									? 'active'
									: ''}"
								onclick={() => handleSelectCategory(tab.id)}
							>
								<span class="cat-label">{tab.name}</span>
								{#if tab.count > 0}
									<span class="cat-badge">{tab.count}</span>
								{/if}
							</button>
						{/each}

						<!-- Three-Dots More Button & Dropdown for Remaining Items -->
						{#if overflowTabs.length > 0}
							<div class="more-menu-wrapper">
								<button
									type="button"
									class="category-tab-btn more-btn {isOverflowActive
										? 'active'
										: ''} {isMoreOpen ? 'open' : ''}"
									onclick={(e) => {
										e.stopPropagation();
										isMoreOpen = !isMoreOpen;
									}}
									aria-haspopup="true"
									aria-expanded={isMoreOpen}
									aria-label="Weitere Kategorien"
									title="Weitere Kategorien"
								>
									<i class="fas fa-ellipsis-h more-icon"></i>
									<span class="cat-badge more-badge">
										{overflowTabs.length}
									</span>
								</button>

								{#if isMoreOpen}
									<div
										class="category-overflow-dropdown"
										role="menu"
									>
										<div class="overflow-dropdown-header">
											<span class="dropdown-heading"
												>Weitere Kategorien</span
											>
											<span class="overflow-count-tag"
												>{overflowTabs.length}</span
											>
										</div>
										<div class="overflow-dropdown-list">
											{#each overflowTabs as tab (tab.id)}
												<button
													type="button"
													class="overflow-tab-item {selectedCategoryId ===
													tab.id
														? 'active'
														: ''}"
													onclick={() => {
														handleSelectCategory(
															tab.id,
														);
														isMoreOpen = false;
													}}
													role="menuitem"
												>
													<span
														class="overflow-item-left"
													>
														{#if selectedCategoryId === tab.id}
															<i
																class="fas fa-check check-icon"
															></i>
														{/if}
														<span
															class="overflow-item-name"
															>{tab.name}</span
														>
													</span>
													{#if tab.count > 0}
														<span class="cat-badge"
															>{tab.count}</span
														>
													{/if}
												</button>
											{/each}
										</div>
									</div>
								{/if}
							</div>
						{/if}
					</div>

					<!-- Off-screen Tab Measurer (Accurate width calculations for dynamic priority overflow) -->
					<div
						class="category-tabs-measurer"
						aria-hidden="true"
						bind:this={measurerRef}
					>
						{#each allCategoryTabs as tab (tab.id)}
							<div class="category-tab-btn measurer-tab">
								<span class="cat-label">{tab.name}</span>
								{#if tab.count > 0}
									<span class="cat-badge">{tab.count}</span>
								{/if}
							</div>
						{/each}
						<div
							class="category-tab-btn more-btn measurer-more"
							bind:this={moreBtnMeasurerRef}
						>
							<i class="fas fa-ellipsis-h more-icon"></i>
							<span class="cat-badge more-badge">99</span>
						</div>
					</div>
				</div>
			</div>
		</div>


		<!-- Active Filters Status / Item Counter -->
		<div class="row mb-4">
			<div class="col-lg-12 text-center">
				<div
					class="d-inline-flex align-items-center gap-2 text-white-50 small"
				>
					<span>
						<strong>{filteredItems.length}</strong>
						{filteredItems.length === 1 ? "Gericht" : "Gerichte"} gefunden
					</span>
					{#if selectedCategoryId !== "all" || searchQuery}
						<span>•</span>
						<button
							type="button"
							class="btn btn-link btn-sm text-primary-gold p-0 text-decoration-none"
							onclick={resetFilters}
						>
							Filter zurücksetzen
						</button>
					{/if}
				</div>
			</div>
		</div>

		<!-- Menu Items Grid -->
		<div class="row pb-4 g-4">
			{#if displayedItems.length === 0}
				<!-- Empty State -->
				<div class="col-lg-12 text-center py-5">
					<div
						class="empty-state p-5 rounded-4 mx-auto"
						style="max-width: 500px; background: rgba(255, 255, 255, 0.04); border: 1px dashed rgba(255, 255, 255, 0.2);"
					>
						<i
							class="fas fa-utensils mb-3 text-primary-gold"
							style="font-size: 40px;"
						></i>
						<h4 class="text-white mb-2">Keine Gerichte gefunden</h4>
						<p class="text-white-50 mb-3">
							{#if searchQuery}
								Es gibt keine Treffer für "{searchQuery}".
							{:else}
								In dieser Kategorie sind noch keine Gerichte
								hinterlegt.
							{/if}
						</p>
						<button
							type="button"
							class="theme-btn style-two btn-sm"
							onclick={resetFilters}
						>
							Alle anzeigen
						</button>
					</div>
				</div>
			{:else}
				{#each displayedItems as item (item.id)}
					<div class="col-lg-6 col-md-12">
						<div class="menu-card flex flex-row h-100 items-center">
							<div
								class="size-20 overflow-hidden rounded-full me-3 bg-white text-center"
							>
								<img
									class="size-20 overflow-hidden"
									src={item.photo}
									alt={item.title}
								/>
							</div>
							<div class="flex-col flex-1 relative">
								<div
									class="menu-card-header d-flex align-items-baseline justify-content-between"
								>
									<div class="menu-card-title-group me-2">
										<h3 class="menu-card-title">
											{item.title}
										</h3>
									</div>
									<div
										class="menu-card-dots flex-1 mx-2"
									></div>
									<div class="menu-card-price">
										{item.price}
									</div>
								</div>

								{#if item.desc}
									<p class="menu-card-desc mb-0 mt-2">
										{item.desc}
									</p>
								{/if}

								{#if item.rating}
									<div class="menu-card-rating mt-2">
										{#each Array(item.rating) as _}
											<i class="fas fa-star text-gold"
											></i>
										{/each}
									</div>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>

		<!-- Pagination Controls (10 items per page) -->
		{#if totalPages > 1}
			<div class="row pb-5" data-aos="fade-up" data-aos-duration="800" use:aosAction>
				<div class="col-lg-12">
					<nav
						class="menu-pagination d-flex flex-column align-items-center gap-3"
						aria-label="Menü Seiten"
					>
						<div
							class="pagination-buttons d-flex align-items-center gap-2"
						>
							<!-- Prev Page Button -->
							<button
								type="button"
								class="pagination-btn pagination-nav-btn"
								disabled={currentPage === 1}
								onclick={() => goToPage(currentPage - 1)}
								aria-label="Vorherige Seite"
								title="Vorherige Seite"
							>
								<i class="fas fa-chevron-left"></i>
							</button>

							<!-- Page Numbers -->
							{#each paginationPages as page, idx (idx)}
								{#if page === "..."}
									<span class="pagination-ellipsis">…</span>
								{:else}
									<button
										type="button"
										class="pagination-btn pagination-num-btn {currentPage ===
										page
											? 'active'
											: ''}"
										onclick={() => goToPage(Number(page))}
										aria-current={currentPage === page
											? "page"
											: undefined}
									>
										{page}
									</button>
								{/if}
							{/each}

							<!-- Next Page Button -->
							<button
								type="button"
								class="pagination-btn pagination-nav-btn"
								disabled={currentPage === totalPages}
								onclick={() => goToPage(currentPage + 1)}
								aria-label="Nächste Seite"
								title="Nächste Seite"
							>
								<i class="fas fa-chevron-right"></i>
							</button>
						</div>

						<!-- Page Summary Indicator -->
						<div class="pagination-info text-white-50 small">
							Zeige {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(
								currentPage * ITEMS_PER_PAGE,
								filteredItems.length,
							)} von {filteredItems.length}
							{filteredItems.length === 1
								? "Gericht"
								: "Gerichten"}
						</div>
					</nav>
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	.rs-food-menu {
		background-color: #354b4a;
	}

	.text-primary-gold {
		color: var(--primary-color, #d0965c) !important;
	}

	.text-gold {
		color: #ff9f1a;
		font-size: 11px;
	}

	/* Search Input */
	.search-box {
		margin-top: 15px;
	}

	.search-icon {
		position: absolute;
		left: 18px;
		top: 50%;
		transform: translateY(-50%);
		color: rgba(255, 255, 255, 0.4);
		pointer-events: none;
		font-size: 15px;
	}

	.menu-search-input {
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 50px;
		padding: 12px 45px 12px 48px;
		color: #ffffff;
		font-size: 15px;
		transition: all 0.3s ease;
	}

	.menu-search-input:focus {
		background: rgba(255, 255, 255, 0.14);
		border-color: var(--primary-color, #d0965c);
		color: #ffffff;
		box-shadow: 0 0 15px rgba(208, 150, 92, 0.3);
	}

	.menu-search-input::placeholder {
		color: rgba(255, 255, 255, 0.5);
	}

	.btn-clear-search {
		position: absolute;
		right: 15px;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		color: rgba(255, 255, 255, 0.5);
		cursor: pointer;
		padding: 6px;
		border-radius: 50%;
		transition: color 0.2s;
	}

	.btn-clear-search:hover {
		color: #ffffff;
	}

	/* Responsive Category Tabs Navigation (Not scrollable) */
	.category-pills {
		z-index: 10;
		position: relative !important;
	}
	.category-tabs-wrapper {
		position: relative;
		width: 100%;
		padding: 6px 0 12px;
		overflow: visible;
	}

	.category-tabs {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		width: 100%;
		flex-wrap: nowrap;
		margin: 0 auto;
	}

	.category-tab-btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 9px 18px;
		border-radius: 30px;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.15);
		color: rgba(255, 255, 255, 0.85);
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.25s ease;
		white-space: nowrap;
		flex-shrink: 0;
	}

	/* Three-dots More Button */
	.more-menu-wrapper {
		position: relative;
		display: inline-flex;
		flex-shrink: 0;
	}

	.more-btn {
		padding: 9px 14px;
	}

	.more-btn .more-icon {
		font-size: 15px;
		line-height: 1;
		transition: transform 0.2s ease;
	}

	.more-btn.open {
		background: rgba(255, 255, 255, 0.16);
		border-color: var(--primary-color, #d0965c);
		color: #ffffff;
	}

	.more-btn.open .more-icon {
		transform: scale(1.15);
	}

	/* Three-dots Overflown Categories Dropdown */
	.category-overflow-dropdown {
		position: absolute;
		top: calc(100% + 8px);
		right: 0;
		z-index: 1050;
		min-width: 220px;
		max-width: min(320px, calc(100vw - 32px));
		background: #223534;
		border: 1px solid rgba(208, 150, 92, 0.38);
		border-radius: 16px;
		box-shadow:
			0 16px 36px rgba(0, 0, 0, 0.55),
			0 0 15px rgba(208, 150, 92, 0.12);
		padding: 8px;
		backdrop-filter: blur(16px);
		animation: dropdownFadeSlide 0.22s cubic-bezier(0.16, 1, 0.3, 1);
	}

	@keyframes dropdownFadeSlide {
		from {
			opacity: 0;
			transform: translateY(-8px) scale(0.97);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	.overflow-dropdown-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 8px 12px 6px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		margin-bottom: 6px;
	}

	.dropdown-heading {
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.6px;
		color: rgba(255, 255, 255, 0.5);
		font-weight: 600;
	}

	.overflow-count-tag {
		font-size: 11px;
		background: rgba(208, 150, 92, 0.2);
		color: var(--primary-color, #d0965c);
		padding: 2px 7px;
		border-radius: 10px;
		font-weight: 600;
		height: 20px;
		line-height: 1.5;
	}

	.overflow-dropdown-list {
		display: flex;
		flex-direction: column;
		gap: 3px;
		max-height: 280px;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: var(--primary-color, #d0965c) rgba(255, 255, 255, 0.05);
	}

	.overflow-dropdown-list::-webkit-scrollbar {
		width: 4px;
	}

	.overflow-dropdown-list::-webkit-scrollbar-thumb {
		background: var(--primary-color, #d0965c);
		border-radius: 4px;
	}

	.overflow-tab-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 8px 12px;
		background: transparent;
		border: 1px solid transparent;
		border-radius: 10px;
		color: rgba(255, 255, 255, 0.85);
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		text-align: left;
		transition: all 0.2s ease;
		width: 100%;
	}

	.overflow-tab-item:hover {
		background: rgba(255, 255, 255, 0.08);
		color: #ffffff;
		border-color: rgba(255, 255, 255, 0.15);
	}

	.overflow-tab-item.active {
		background: rgba(208, 150, 92, 0.18);
		border-color: var(--primary-color, #d0965c);
		color: #ffffff;
		font-weight: 600;
	}

	.overflow-item-left {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.check-icon {
		color: var(--primary-color, #d0965c);
		font-size: 12px;
	}

	.overflow-tab-item.active .cat-badge {
		background: var(--primary-color, #d0965c);
		color: #ffffff;
	}

	/* Hidden Measurer Container (Never visible to users) */
	.category-tabs-measurer {
		position: absolute;
		top: 0;
		left: -9999px;
		visibility: hidden;
		pointer-events: none;
		display: flex;
		gap: 8px;
		white-space: nowrap;
	}

	.category-tab-btn:hover {
		background: rgba(255, 255, 255, 0.15);
		color: #ffffff;
		border-color: rgba(255, 255, 255, 0.35);
		transform: translateY(-1px);
	}

	.category-tab-btn.active {
		background: var(--primary-color, #d0965c);
		border-color: var(--primary-color, #d0965c);
		color: #ffffff;
		box-shadow: 0 4px 15px rgba(208, 150, 92, 0.4);
	}

	.cat-badge {
		background: rgba(0, 0, 0, 0.25);
		padding-inline: 4px;
		height: 20px;
		min-width: 20px;
		border-radius: 12px;
		font-size: 11px;
		font-weight: 600;
		line-height: 1.8;
		text-align: center;
	}

	.category-tab-btn.active .cat-badge {
		background: rgba(255, 255, 255, 0.25);
		color: #ffffff;
	}



	/* Menu Card */
	.menu-card {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 12px;
		padding: 20px 24px;
		transition: all 0.3s ease;
		backdrop-filter: blur(4px);
	}

	.menu-card:hover {
		background: rgba(255, 255, 255, 0.07);
		border-color: rgba(208, 150, 92, 0.4);
		transform: translateY(-3px);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
	}

	.menu-card-title {
		font-family: var(--heading-font, "Marcellus", serif);
		font-size: 20px;
		color: #ffffff;
		margin: 0;
		line-height: 1.3;
	}


	.menu-card-dots {
		border-bottom: 2px dotted rgba(255, 255, 255, 0.2);
		min-width: 25px;
		margin-bottom: 4px;
	}

	.menu-card-price {
		font-family: var(--heading-font, "Roboto", sans-serif);
		font-weight: 700;
		color: var(--primary-color, #d0965c);
		font-size: 17px;
		white-space: nowrap;
	}

	.menu-card-desc {
		color: rgba(255, 255, 255, 0.72);
		font-size: 14px;
		line-height: 1.5;
	}

	@media (max-width: 767.98px) {
		.menu-card-dots {
			display: none;
		}

		.menu-card-header {
			flex-direction: column;
			align-items: flex-start !important;
		}

		.menu-card-price {
			margin-top: 6px;
		}

		.menu-card {
			padding: 16px 18px;
		}

		.menu-card-title {
			font-size: 18px;
		}
	}

	/* Pagination Controls */
	.menu-pagination {
		margin-top: 10px;
	}

	.pagination-buttons {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		flex-wrap: wrap;
	}

	.pagination-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 42px;
		height: 42px;
		padding: 0 12px;
		border-radius: 50px;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.15);
		color: rgba(255, 255, 255, 0.85);
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.25s ease;
		user-select: none;
	}

	.pagination-btn:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.16);
		border-color: rgba(208, 150, 92, 0.5);
		color: #ffffff;
		transform: translateY(-2px);
	}

	.pagination-btn.active {
		background: var(--primary-color, #d0965c);
		border-color: var(--primary-color, #d0965c);
		color: #ffffff;
		font-weight: 700;
		box-shadow: 0 4px 15px rgba(208, 150, 92, 0.4);
	}

	.pagination-btn:disabled {
		opacity: 0.3;
		cursor: not-allowed;
		pointer-events: none;
	}

	.pagination-ellipsis {
		color: rgba(255, 255, 255, 0.4);
		padding: 0 6px;
		font-size: 14px;
		user-select: none;
	}

	.pagination-info {
		letter-spacing: 0.3px;
	}
</style>
