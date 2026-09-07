<script lang="ts">
	import { onMount } from 'svelte';
	import { asset } from '$app/paths';

	interface GalleryItem {
		src: string;
		alt: string;
		title: string;
	}

	const galleryItems: GalleryItem[] = [
		{
			src: asset('/assets/images/home-restaurant/gallery/gallery-img1.jpg'),
			alt: 'Romantic candlelit table setting',
			title: 'Candlelit Ambiance'
		},
		{
			src: asset('/assets/images/home-restaurant/gallery/gallery-img2.jpg'),
			alt: 'Chef pouring selected vintage wine',
			title: 'Fine Wine Pairing'
		},
		{
			src: asset('/assets/images/home-restaurant/gallery/gallery-img3.jpg'),
			alt: 'Artisan gourmet dinner plate',
			title: 'Culinary Masterpiece'
		},
		{
			src: asset('/assets/images/innerpage/gallery/gallery-img4.jpg'),
			alt: 'Intimate evening dining setting',
			title: 'Exclusive Evenings'
		},
		{
			src: asset('/assets/images/innerpage/gallery/gallery-img5.jpg'),
			alt: 'Freshly prepared specialty dessert',
			title: 'Artisan Desserts'
		}
	];

	const itemCount = galleryItems.length;

	// Triplicate items for seamless infinite looping
	const allSlides = [...galleryItems, ...galleryItems, ...galleryItems];

	let windowWidth = $state(1200);
	let visibleSlides = $derived.by(() => {
		if (windowWidth < 600) return 1;
		if (windowWidth < 1024) return 2;
		return 3;
	});

	// Start at first slide of second set
	let currentIndex = $state(itemCount);
	let isTransitioning = $state(false);
	let isDragging = $state(false);
	let startX = 0;
	let dragDistance = $state(0);
	let isHovered = $state(false);

	let autoplayTimer: ReturnType<typeof setInterval> | null = null;

	function startAutoplay() {
		stopAutoplay();
		autoplayTimer = setInterval(() => {
			if (!isHovered && !isDragging) {
				nextSlide();
			}
		}, 3500);
	}

	function stopAutoplay() {
		if (autoplayTimer) {
			clearInterval(autoplayTimer);
			autoplayTimer = null;
		}
	}

	function nextSlide() {
		isTransitioning = true;
		currentIndex++;
	}

	function prevSlide() {
		isTransitioning = true;
		currentIndex--;
	}

	function goToSlide(index: number) {
		isTransitioning = true;
		currentIndex = itemCount + (index % itemCount);
	}

	function handleTransitionEnd(e: TransitionEvent) {
		if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;
		if (currentIndex >= itemCount * 2) {
			isTransitioning = false;
			currentIndex -= itemCount;
		} else if (currentIndex < itemCount) {
			isTransitioning = false;
			currentIndex += itemCount;
		}
	}

	// Pointer drag / swipe handling
	function handlePointerDown(e: PointerEvent) {
		if (e.button !== 0) return;
		const target = e.target as HTMLElement;
		if (target.closest('button')) return;
		isDragging = true;
		startX = e.clientX;
		dragDistance = 0;
	}

	function handlePointerMove(e: PointerEvent) {
		if (!isDragging) return;
		dragDistance = e.clientX - startX;
	}

	function handlePointerUp() {
		if (!isDragging) return;
		isDragging = false;
		if (dragDistance < -50) {
			nextSlide();
		} else if (dragDistance > 50) {
			prevSlide();
		}
		dragDistance = 0;
	}

	function handlePointerCancel() {
		isDragging = false;
		dragDistance = 0;
	}

	onMount(() => {
		windowWidth = window.innerWidth;
		startAutoplay();
		return () => stopAutoplay();
	});

	// Derived current active dot index
	let activeDotIndex = $derived(((currentIndex % itemCount) + itemCount) % itemCount);
</script>

<svelte:window bind:innerWidth={windowWidth} />

<section class="rs-gallery pt-5" id="gallery">
	<div class="container">
		<div class="row py-5">
			<div class="col-lg-12">
				<div class="section-title text-center mt-4" data-aos="fade-down" data-aos-duration="1000">
					<img src={asset('/assets/images/home-restaurant/gallery/sub.png')} class="mb-4" alt="Sub Title" />
					<h2>Romantic Dinner</h2>
				</div>
			</div>
		</div>
	</div>

	<div class="container-fluid px-0">
		<div
			class="gallery-slider-wrapper position-relative {isDragging ? 'dragging' : ''}"
			role="region"
			aria-label="Gallery Image Slider"
			onmouseenter={() => (isHovered = true)}
			onmouseleave={() => (isHovered = false)}
			onpointerdown={handlePointerDown}
			onpointermove={handlePointerMove}
			onpointerup={handlePointerUp}
			onpointercancel={handlePointerCancel}
		>
			<div
				class="gallery-slider-track d-flex"
				style="
					transform: translateX(calc(-{currentIndex * (100 / visibleSlides)}% + {dragDistance}px));
					transition: {isTransitioning ? 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'};
				"
				ontransitionend={handleTransitionEnd}
			>
				{#each allSlides as item, idx (idx)}
					<div
						class="gallery-slide-item"
						style="flex: 0 0 {100 / visibleSlides}%; max-width: {100 / visibleSlides}%;"
					>
						<div class="giovanni-gallery-item">
							<div class="gallery-img">
								<img
									src={item.src}
									alt={item.alt}
									draggable="false"
								/>
								<div class="gallery-overlay">
									<div class="overlay-content">
										<span class="category">Romantic Gallery</span>
										<h4 class="title">{item.title}</h4>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Navigation Controls -->
			<button
				type="button"
				class="gallery-arrow prev"
				onclick={(e) => { e.stopPropagation(); prevSlide(); }}
				aria-label="Previous Slide"
			>
				<i class="far fa-angle-left"></i>
			</button>

			<button
				type="button"
				class="gallery-arrow next"
				onclick={(e) => { e.stopPropagation(); nextSlide(); }}
				aria-label="Next Slide"
			>
				<i class="far fa-angle-right"></i>
			</button>
		</div>

		<!-- Dot Indicators -->
		<div class="gallery-dots mt-4 d-flex justify-content-center gap-2">
			{#each galleryItems as _, idx}
				<button
					type="button"
					class="dot-btn {activeDotIndex === idx ? 'active' : ''}"
					onclick={() => goToSlide(idx)}
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
		cursor: grab;
		user-select: none;
		touch-action: pan-y;
		padding: 20px 0;
	}

	.gallery-slider-wrapper.dragging {
		cursor: grabbing;
	}

	.gallery-slider-track {
		display: flex;
		will-change: transform;
	}

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

	.gallery-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			rgba(16, 26, 25, 0.85) 0%,
			rgba(16, 26, 25, 0.2) 50%,
			transparent 100%
		);
		display: flex;
		align-items: flex-end;
		padding: 30px;
		opacity: 0;
		transition: opacity 0.4s ease;
		pointer-events: none;
	}

	.giovanni-gallery-item:hover .gallery-overlay {
		opacity: 1;
	}

	.overlay-content .category {
		color: var(--primary-color, #c99b67);
		font-size: 13px;
		letter-spacing: 1.5px;
		text-transform: uppercase;
		display: block;
		margin-bottom: 6px;
		font-weight: 500;
	}

	.overlay-content .title {
		color: #ffffff;
		font-family: 'Marcellus', serif;
		font-size: 22px;
		margin: 0;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
	}

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

	.gallery-arrow:hover {
		background: var(--primary-color, #c99b67);
		color: #ffffff;
		transform: translateY(-50%) scale(1.1);
	}

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
