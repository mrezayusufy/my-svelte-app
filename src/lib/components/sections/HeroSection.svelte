<script lang="ts">
	import { onMount } from 'svelte';
	import { asset } from '$app/paths';
	import { gsap } from 'gsap';

	let sectionEl = $state<HTMLElement>();

	onMount(() => {
		const ctx = gsap.context(() => {
			gsap.from('.hero-content', {
				y: 35,
				opacity: 0,
				duration: 1.1,
				ease: 'power3.out'
			});

			gsap.to('.hero-image.image_one img', {
				y: -25,
				duration: 3,
				repeat: -1,
				yoyo: true,
				ease: 'sine.inOut'
			});

			gsap.to('.hero-image.image_two img', {
				y: 25,
				duration: 3.5,
				repeat: -1,
				yoyo: true,
				ease: 'sine.inOut'
			});
		}, sectionEl);

		return () => ctx.revert();
	});
</script>

<section
	bind:this={sectionEl}
	class="rs-hero bg_cover"
	style="background-image: url('{asset('/assets/images/home-restaurant/hero/hero-bg.jpg')}');"
>
	<!-- Hero Arch Images -->
	<div class="hero-image image_one">
		<img src={asset('/assets/images/home-restaurant/hero/hero-img1.jpg')} alt="Italian Dish" />
	</div>
	<div class="hero-image image_two">
		<img src={asset('/assets/images/home-restaurant/hero/hero-img2.jpg')} alt="Artisan Pasta" />
	</div>

	<div class="container">
		<div class="row justify-content-center">
			<div class="col-lg-6">
				<!-- Hero Content -->
				<div class="hero-content text-center"> 
					<h1 class="text-anm">Classic Italian Redefined</h1>
					<p data-aos="fade-up" data-aos-duration="1000">
						Classic Italian cuisine reimagined with modern flair, fresh ingredients, and bold flavors
					</p>
					<div class="bistly-button mb-3 pb-3 mb-lg-5 pb-lg-5" data-aos="fade-up" data-aos-duration="1200">
						<a href="#reservation" class="theme-btn style-one">Make A Reservation</a>
					</div>
					<div class="row">
						<div class="col-md-6">
							<!-- Counter Experience -->
							<div class="bistly-counter-item text-center mb-4" data-aos="fade-up" data-aos-duration="1300">
								<div class="content">
									<h2 class="mb-4"><span class="counter">25</span>+</h2>
									<p>Years of Experience</p>
								</div>
							</div>
						</div>
						<div class="col-md-6">
							<!-- Counter Rating -->
							<div class="bistly-counter-item text-center mb-4" data-aos="fade-up" data-aos-duration="1400">
								<div class="content">
									<h2 class="mb-4">4.9<i class="fas fa-star ms-1"></i></h2>
									<p>Average rating</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
