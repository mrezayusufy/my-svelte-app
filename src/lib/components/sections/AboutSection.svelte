<script lang="ts">
	import { onMount } from 'svelte';
	import { asset } from '$app/paths';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	let sectionEl = $state<HTMLElement>();

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			const bigText = sectionEl?.querySelector('.big-text');
			if (bigText) {
				gsap.to(bigText, {
					scrollTrigger: {
						trigger: sectionEl,
						start: 'top bottom',
						end: 'bottom top',
						scrub: 1
					},
					x: -80,
					ease: 'none'
				});
			}
		}, sectionEl);

		return () => ctx.revert();
	});
</script>

<section bind:this={sectionEl} class="rs-about p-r z-1 py-5" id="about">
	<div class="shape shape-one">
		<span><img src={asset('/assets/images/home-restaurant/about/shape1.png')} alt="Decorative leaf shape" /></span>
	</div>
	<div class="shape shape-two">
		<span><img src={asset('/assets/images/home-restaurant/about/shape2.png')} alt="Decorative botanical shape" /></span>
	</div>
	<div class="big-text text-anm text-center text-lg-end">A Culinary <br /> Journey</div>

	<div class="container">
		<div class="row py-5 my-xl-4">
			<div class="col-lg-6">
				<!-- Content Box Left -->
				<div class="bistly-content-box mb-5 text-center text-lg-start">
					<div class="bistly-image image-one mb-5 pb-5" data-aos="fade-up" data-aos-duration="1000">
						<img src={asset('/assets/images/home-restaurant/about/about-img1.jpg')} alt="Chef plating" />
					</div>
					<p class="mb-4" data-aos="fade-up" data-aos-duration="1200">
						Embark on a culinary journey where tradition meets innovation. Our dishes are thoughtfully crafted with the finest ingredients, celebrating flavors from Italy and beyond. Each bite tells a story.
					</p>
					 
				</div>
			</div>

			<div class="col-lg-6">
				<!-- Content Box Right -->
				<div class="bistly-content-box text-center text-lg-start">
					<h3 class="ps-lg-5 ms-xxl-5" data-aos="fade-up" data-aos-duration="1000">
						Every dish is expertly crafted by our skilled chefs using freshest ingredients sourced from local farms
					</h3>
					<div class="bistly-image image-two pt-5 mt-5 float-lg-end" data-aos="fade-up" data-aos-duration="1200">
						<img src={asset('/assets/images/home-restaurant/about/about-img2.jpg')} alt="Signature Italian dish" />
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
