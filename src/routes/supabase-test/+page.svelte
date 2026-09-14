<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="container py-5 text-white" style="max-width: 800px; margin: 40px auto;">
	<h1 class="mb-4">Supabase Connection Test</h1>

	<div class="p-4 mb-4 bg-dark rounded border border-secondary">
		<h3>Categories ({data.categories.length})</h3>
		{#if data.categoriesError}
			<p class="text-danger">Error: {data.categoriesError}</p>
		{:else if data.categories.length === 0}
			<p class="text-white-50">No categories in database yet. You can import <code>static/assets/category_menu_rows.csv</code> in Supabase Dashboard.</p>
		{:else}
			<ul>
				{#each data.categories as cat}
					<li>{cat.id}: {cat.name} ({cat.category_slug})</li>
				{/each}
			</ul>
		{/if}
	</div>

	<div class="p-4 mb-4 bg-dark rounded border border-secondary">
		<h3>Menu Items ({data.menu.length})</h3>
		{#if data.menuError}
			<p class="text-danger">Error: {data.menuError}</p>
		{:else if data.menu.length === 0}
			<p class="text-white-50">No menu items in database yet. You can import <code>static/assets/menu_rows.csv</code> in Supabase Dashboard.</p>
		{:else}
			<ul>
				{#each data.menu as item}
					<li>{item.title} - {item.price}</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
