<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let { data } = $props();

	// DOM ref for siema
	let sliderEl = $state<HTMLElement | undefined>(undefined);

	// Track active slide index for dots
	let activeIndex = $state(0);
	const totalSlides = $derived(data.section_images.length);

	// Siema instance & autoplay timer
	let siema: any;
	let autoplayTimer: ReturnType<typeof setInterval> | null = null;
	let isHovered = false;

	// Responsive perPage: breakpoint map for Siema
	const perPage = { 600: 1, 768: 2, 1024: 3 };

	function goToNext() {
		siema?.next();
		activeIndex = siema ? Math.round(siema.currentSlide) % totalSlides : activeIndex;
	}

	function goToPrev() {
		siema?.prev();
		activeIndex = siema ? ((siema.currentSlide % totalSlides) + totalSlides) % totalSlides : activeIndex;
	}

	function goToSlide(idx: number) {
		siema?.goTo(idx);
		activeIndex = idx;
	}

	function startAutoplay() {
		stopAutoplay();
		autoplayTimer = setInterval(() => {
			if (!isHovered) goToNext();
		}, 3500);
	}

	function stopAutoplay() {
		if (autoplayTimer) {
			clearInterval(autoplayTimer);
			autoplayTimer = null;
		}
	}

	function onSiemaChange(this: any) {
		activeIndex = ((this.currentSlide % totalSlides) + totalSlides) % totalSlides;
	}

	onMount(async () => {
		// Dynamic import – Siema is CJS, must be client-side only
		const Siema = (await import('siema')).default;

		siema = new Siema({
			selector: sliderEl,
			duration: 600,
			easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
			perPage,
			startIndex: 0,
			draggable: true,
			multipleDrag: false,
			threshold: 20,
			loop: true,
			rtl: false,
			onInit() {},
			onChange: onSiemaChange
		});

		startAutoplay();
	});

	onDestroy(() => {
		stopAutoplay();
		siema?.destroy(true);
	});
</script>

<section class="rs-gallery pt-5" id="gallery">
	<div class="container">
		<div class="row py-5">
			<div class="col-lg-12">
				<div class="section-title text-center mt-4" data-aos="fade-down" data-aos-duration="1000">
					<span class="sub-title" data-aos="fade-down" data-aos-duration="1000">{data.subtitle}</span>
					<h2>{data.title}</h2>
				</div>
			</div>
		</div>
	</div>

	<div class="container-fluid px-0">
		<!-- Siema Wrapper -->
		<div
			class="gallery-slider-wrapper position-relative"
			role="region"
			aria-label="Gallery Image Slider"
			onmouseenter={() => { isHovered = true; }}
			onmouseleave={() => { isHovered = false; }}
		>
			<!-- Siema attaches to this element's children as slides -->
			<div class="siema-track" bind:this={sliderEl}>
				{#each data.section_images as item (item.image_path)}
					<div class="gallery-slide-item">
						<div class="giovanni-gallery-item">
							<div class="gallery-img">
								<img
									src={item.image_path}
									alt={item.alt_text}
									draggable="false"
								/>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Prev Arrow -->
			<button
				type="button"
				class="gallery-arrow prev"
				onclick={() => { stopAutoplay(); goToPrev(); startAutoplay(); }}
				aria-label="Previous Slide"
			>
				<i class="far fa-angle-left"></i>
			</button>

			<!-- Next Arrow -->
			<button
				type="button"
				class="gallery-arrow next"
				onclick={() => { stopAutoplay(); goToNext(); startAutoplay(); }}
				aria-label="Next Slide"
			>
				<i class="far fa-angle-right"></i>
			</button>
		</div>

		<!-- Dot Indicators -->
		<div class="gallery-dots mt-4 d-flex justify-content-center gap-2">
			{#each data.section_images as _, idx}
				<button
					type="button"
					class="dot-btn {activeIndex === idx ? 'active' : ''}"
					onclick={() => { stopAutoplay(); goToSlide(idx); startAutoplay(); }}
					aria-label="Go to slide {idx + 1}"
				></button>
			{/each}
		</div>
	</div>
</section>

<style>
	.rs-gallery {
		position: relative;
		z-index: 5;
		margin-bottom: -155px;
	}

	@media (max-width: 991.98px) {
		.rs-gallery {
			margin-bottom: -90px;
		}
	}

	.gallery-slider-wrapper {
		position: relative;
		overflow: hidden;
		padding: 20px 0;
	}

	/* Siema manages the transform on .siema-track internally */

	.gallery-slide-item {
		padding: 0 14px;
		box-sizing: border-box;
	}

	.giovanni-gallery-item {
		width: 100%;
	}

	.giovanni-gallery-item .gallery-img {
		position: relative;
		overflow: hidden;
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.18);
		height: 440px;
		background-color: #1a2524;
	}

	@media (max-width: 767.98px) {
		.giovanni-gallery-item .gallery-img {
			height: 320px;
		}
	}

	.giovanni-gallery-item .gallery-img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 0.65s cubic-bezier(0.25, 1, 0.5, 1);
		pointer-events: none;
	}

	.giovanni-gallery-item:hover .gallery-img img {
		transform: scale(1.08);
	}

	/* Navigation Arrows */
	.gallery-arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 52px;
		height: 52px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.95);
		color: #2d4443;
		border: none;
		font-size: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		z-index: 10;
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
		transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
		opacity: 0.85;
	}

	.gallery-slider-wrapper:hover .gallery-arrow {
		opacity: 1;
	}

	.gallery-arrow.prev {
		left: 20px;
	}

	.gallery-arrow.next {
		right: 20px;
	}

	.gallery-arrow:hover {
		background: var(--primary-color, #c99b67);
		color: #ffffff;
		transform: translateY(-50%) scale(1.1);
	}

	@media (max-width: 767.98px) {
		.gallery-arrow {
			width: 40px;
			height: 40px;
			font-size: 15px;
		}

		.gallery-arrow.prev {
			left: 10px;
		}

		.gallery-arrow.next {
			right: 10px;
		}
	}

	/* Dot Indicators */
	.gallery-dots .dot-btn {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: rgba(45, 68, 67, 0.3);
		border: none;
		padding: 0;
		cursor: pointer;
		transition: all 0.35s ease;
	}

	.gallery-dots .dot-btn.active {
		width: 28px;
		border-radius: 6px;
		background: var(--primary-color, #c99b67);
	}
</style>
