<script lang="ts">
	import { onMount } from 'svelte';
	import AOS from 'aos';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import {
		Preloader,
		Header,
		HeroSection,
		AboutSection,
		EnjoyFoodSection,
		FoodMenuSection,
		GallerySection,
		TestimonialSection,
		TeamSection,
		BookingSection,
		OpeningTimeSection,
		BlogSection,
		Footer
	} from '$lib/components';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	onMount(() => {
		// Initialize AOS for scroll animations
		AOS.init({
			offset: 40,
			duration: 800,
			once: true
		});

		// Initialize GSAP ScrollTrigger for .text-anm headings
		gsap.registerPlugin(ScrollTrigger);

		const headings = document.querySelectorAll('.text-anm');
		headings.forEach((heading) => {
			gsap.from(heading, {
				scrollTrigger: {
					trigger: heading,
					start: 'top 88%',
					toggleActions: 'play none none none'
				},
				y: 40,
				opacity: 0,
				duration: 0.9,
				ease: 'power2.out'
			});
		});
	});
</script>

<!-- Preloader -->
<Preloader />

<!-- Header Navigation -->
<Header />

<div id="smooth-wrapper">
	<div id="smooth-content">
		<main>
			<!-- Hero Section -->
			<HeroSection data={data.sections['hero']} />

			<!-- About Section -->
			<AboutSection data={data.sections['about']} />

			<!-- Enjoy Food Feature Section -->
			<EnjoyFoodSection data={data.sections['feature']}/>

			<!-- Food Menu Section -->
			<FoodMenuSection categories={data.categories} menuItems={data.menu} />

			<!-- Gallery Section -->
			<GallerySection data={data.sections['fruhstuckszeit']}/>

			<!-- Testimonial Section -->
			<TestimonialSection />

			<!-- Team Section -->
			<TeamSection data={data.sections['unser-team']}/>

			<!-- Booking Table Banner -->
			<BookingSection data={data.sections['tischreservierung']}/>

			<!-- Opening Times & Location Map -->
			<OpeningTimeSection />

			<!-- Recent Blog Posts -->
			<BlogSection />
		</main>

		<!-- Footer -->
		<Footer />
	</div>
</div>
