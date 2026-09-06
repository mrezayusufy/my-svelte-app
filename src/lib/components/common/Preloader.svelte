<script lang="ts">
	import { onMount } from 'svelte';

	let visible = $state(true);

	onMount(() => {
		const timer = setTimeout(() => {
			visible = false;
		}, 400);

		return () => clearTimeout(timer);
	});
</script>

{#if visible}
	<div class="preloader">
		<div class="loader"></div>
	</div>
{/if}
