<script lang="ts">
	import { onMount } from 'svelte';
	import Siema from 'siema';
	import type { SectionItem } from '$lib/types/menu';
	import { sanitizeHtml } from '$lib/utils/sanitizeHtml';
    import { asset, assets } from '$app/paths';
    import BrushPaint from '../common/BrushPaint.svelte';

	let { sliders }: { sliders: SectionItem[] } = $props();

	let sliderEl = $state<HTMLElement>();
	let siema: Siema | null = null;
	let currentIndex = $state(0);
	let autoplayTimer: ReturnType<typeof setInterval> | null = null;

	const AUTOPLAY_MS = 5000;

	function goTo(index: number) {
		if (!siema) return;
		siema.goTo(index);
		currentIndex = index;
	}

	function prev() {
		if (!siema) return;
		siema.prev();
		currentIndex = (currentIndex - 1 + sliders.length) % sliders.length;
	}

	function next() {
		if (!siema) return;
		siema.next();
		currentIndex = (currentIndex + 1) % sliders.length;
	}

	function startAutoplay() {
		stopAutoplay();
		autoplayTimer = setInterval(() => next(), AUTOPLAY_MS);
	}

	function stopAutoplay() {
		if (autoplayTimer !== null) {
			clearInterval(autoplayTimer);
			autoplayTimer = null;
		}
	}

	onMount(() => {
		if (!sliderEl || sliders.length === 0) return;

		siema = new Siema({
			selector: sliderEl, 
			easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
			perPage: 1,
			startIndex: 0,
			draggable: true,
			loop: true,
			onChange: function () {
				currentIndex = (this as Siema).currentSlide;
			}
		});

		// startAutoplay();

		return () => {
			// stopAutoplay();
			siema?.destroy();
		};
	});
</script>

<section class="rs-hero-slider">
	<!-- Slider track -->
	<div
		class="hero-slider-track"
		bind:this={sliderEl}
		onmouseenter={stopAutoplay}
		onmouseleave={startAutoplay}
		role="region"
		aria-label="Hero slideshow"
	>
		{#each sliders as slide, i}
			<div class="hero-slide" aria-hidden={i !== currentIndex}>
				<!-- Background image -->
				{#if slide.section_images?.[0]?.image_path}
					<div
						class="hero-slide-bg"
						style="background-image: url('{slide.section_images[0].image_path}');"
					></div>
				{/if}
				<!-- Dark overlay -->
				<div class="hero-slide-overlay"></div>

				<!-- Content -->
				<div class="container h-100">
					
					<div class="row h-100 align-items-center justify-content-center">
						<div class="col-lg-9 text-left">
							<div class="hero-slide-content">
								<div class="text-white font-display relative flex flex-col items-center text-center text-3xl mb-3 slide-meta-title">
									<BrushPaint cls="fill-green-700 absolute" />
									<p>Montag bis Donnerstag</p>
								</div>
								<div class="hero-slide-html relative flex flex-col">
									<div class="relative max-w-120 text-center h-38 flex justify-center flex-col slide-title">
										<BrushPaint cls="fill-red-800 absolute"/>
										<h1 class="relative">{slide.title}</h1>
										<h2 class="relative">{slide.subtitle}</h2>
									</div>
									<div class="relative max-w-56 flex flex-col items-center price-tag">
										<BrushPaint cls="fill-amber-500 max-w-56 top-0 absolute"/>
										<p class="relative text-amber-950 text-center text-5xl my-2">{slide.meta_title}</p>
									</div>
									<div class="relative z-20 flex">
										{@html sanitizeHtml(slide.content)}
									</div>
								</div>
								<div class="hero-cta">
									<a href="#reservation" class="theme-btn style-one">Tisch reservieren</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Prev / Next arrows -->
	{#if sliders.length > 1}
		

		<!-- Dot indicators -->
		<div class="hero-dots" role="tablist" aria-label="Folien-Navigation">
			{#each sliders as _, i}
				<button
					class="hero-dot"
					class:active={i === currentIndex}
					onclick={() => goTo(i)}
					role="tab"
					aria-selected={i === currentIndex}
					aria-label="Folie {i + 1}"
				></button>
			{/each}
		</div>
	{/if}
</section>

<style>
	/* ── Wrapper ─────────────────────────────────────────────── */
	.rs-hero-slider {
		position: relative;
		width: 100%;
		overflow: hidden;
		background-color: var(--primary-black-color, #111);
	}


	/* ── Individual slide ────────────────────────────────────── */
	.hero-slide {
		position: relative;
		height: 100vh;
		min-height: 600px;
		display: flex;
		align-items: center;
	}

	/* Background image */
	.hero-slide-bg {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		transition: transform 6s ease-out;
	}

	/* Dark gradient overlay */
	.hero-slide-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to right,
			rgba(0, 0, 0, 0.72) 0%,
			rgba(0, 0, 0, 0.45) 60%,
			rgba(0, 0, 0, 0.3) 100%
		);
	}
	
	.hero-cta {
		margin-top: auto;
		margin-inline: auto;
	}

	:global(.hero-slide-html) {
		margin-bottom: 8px;
	}

	/* Headings inside the HTML block */
	:global(.hero-slide-html h1),
	:global(.hero-slide-html h2),
	:global(.hero-slide-html h3) {
		color: #fff;
		line-height: 1.2;
		margin-bottom: 12px;
	}

	/* Definition list (variants / options) */
	:global(.hero-slide-html dl) {
		margin: 16px;
		max-width: 360px;
		text-align: left;
		display: inline-block;
	}
	:global(.hero-slide-html dt) {
		color: #fff;
		font-size: 1rem;
		letter-spacing: 2px;
		text-transform: uppercase;
		margin-bottom: 6px;
	}
	:global(.hero-slide-html dd) {
		color: rgba(255, 255, 255, 0.88);
		font-size: 1rem;
		margin: 0 0 4px 42px;
		padding-left: 12px;
		position: relative;
	}
	:global(.hero-slide-html dd::before) {
		content: '✔';
		position: absolute;
		left: -6px;
		color:  #199600;
	}

	/* Lists */
	:global(.hero-slide-html ul),
	:global(.hero-slide-html ol) {
		color: rgba(255, 255, 255, 0.88);
		padding-left: 1.25rem;
		margin-bottom: 16px;
		text-align: left;
		display: inline-block;
	}
	:global(.hero-slide-html li) {
		margin-bottom: 4px;
	}

	/* Inline emphasis */
	:global(.hero-slide-html strong),
	:global(.hero-slide-html b) {
		color: #fff;
	}
	:global(.hero-slide-html em),
	:global(.hero-slide-html i) {
		color: rgba(255, 255, 255, 0.8);
	}

	/* ── Arrows ──────────────────────────────────────────────── */
	.hero-arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 10;
		width: 52px;
		height: 52px;
		border-radius: 50%;
		border: 2px solid rgba(255, 255, 255, 0.5);
		background: rgba(0, 0, 0, 0.3);
		color: #fff;
		font-size: 18px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.3s, border-color 0.3s;
		backdrop-filter: blur(4px);
	}
	.hero-arrow:hover {
		background: var(--primary-color, #c8a97e);
		border-color: var(--primary-color, #c8a97e);
	}
	.hero-arrow--prev { left: 24px; }
	.hero-arrow--next { right: 24px; }

	@media (max-width: 575.98px) {
		.hero-arrow { width: 40px; height: 40px; font-size: 14px; }
		.hero-arrow--prev { left: 12px; }
		.hero-arrow--next { right: 12px; }
	}

	/* ── Dots ────────────────────────────────────────────────── */
	.hero-dots {
		position: absolute;
		bottom: 32px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.hero-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.45);
		border: none;
		cursor: pointer;
		transition: background 0.3s, transform 0.3s, width 0.3s;
		padding: 0;
	}
	.hero-dot.active {
		background: var(--primary-color, #c8a97e);
		transform: scale(1.3);
		width: 28px;
		border-radius: 5px;
	}
</style>
