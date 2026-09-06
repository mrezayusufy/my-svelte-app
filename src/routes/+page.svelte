<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	let container = $state<HTMLElement>();

	onMount(() => {
		// Register plugin on client
		gsap.registerPlugin(ScrollTrigger);

		// Use gsap.context for automatic cleanup and selector scoping
		const ctx = gsap.context(() => {
			// 1. Hero fade & slide-in on load
			gsap.from('.hero-content', {
				y: 40,
				opacity: 0,
				duration: 1,
				ease: 'power3.out'
			});

			// 2. ScrollTrigger reveal for the blog image
			gsap.from('.featured-image', {
				scrollTrigger: {
					trigger: '.featured-image',
					start: 'top 85%',
					toggleActions: 'play none none reverse'
				},
				scale: 0.92,
				opacity: 0,
				duration: 1.2,
				ease: 'power2.out'
			});

			// 3. Staggered feature cards triggered by scroll
			gsap.from('.feature-card', {
				scrollTrigger: {
					trigger: '.features-grid',
					start: 'top 80%',
					toggleActions: 'play none none reverse'
				},
				y: 50,
				opacity: 0,
				duration: 0.8,
				stagger: 0.2,
				ease: 'power3.out'
			});

			// 4. Scrubbed horizontal indicator based on page scroll
			gsap.to('.scroll-progress', {
				scrollTrigger: {
					trigger: container,
					start: 'top top',
					end: 'bottom bottom',
					scrub: true
				},
				scaleX: 1,
				transformOrigin: 'left center',
				ease: 'none'
			});
		}, container);

		return () => ctx.revert();
	});
</script>

<!-- Top Scroll Progress Indicator -->
<div
	class="scroll-progress fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 z-50 origin-left scale-x-0"
></div>

<div bind:this={container} class="min-h-screen bg-slate-900 text-slate-100 selection:bg-indigo-500 selection:text-white">
	<!-- Hero Section -->
	<section class="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
		<div class="hero-content space-y-4">
			<span class="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 border border-indigo-800 rounded-full">
				GSAP + ScrollTrigger Active
			</span>
			<h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
				Welcome to SvelteKit
			</h1>
			<p class="text-lg text-slate-400 max-w-2xl mx-auto">
				Explore modern animations powered by <span class="text-indigo-300 font-medium">GSAP</span> and
				<span class="text-indigo-300 font-medium">ScrollTrigger</span>. Scroll down to see reactive triggers in action.
			</p>
			<div class="pt-2">
				<a
					href="https://svelte.dev/docs/kit"
					target="_blank"
					rel="noreferrer"
					class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/25"
				>
					SvelteKit Documentation &rarr;
				</a>
			</div>
		</div>
	</section>

	<!-- Featured Image Section with ScrollTrigger -->
	<section class="max-w-4xl mx-auto px-6 py-12">
		<div class="featured-image relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-800/40 shadow-2xl shadow-indigo-950/50">
			<img
				src="{base}/blog-img1.jpg"
				alt="Café Giovanni's Kaffeewelt"
				class="w-full h-auto object-cover max-h-[500px]"
			/>
			<div class="p-6 bg-slate-800/80 backdrop-blur-sm border-t border-slate-700/50">
				<h2 class="text-xl font-bold text-white">Café Giovanni's Kaffeewelt</h2>
				<p class="text-sm text-slate-400 mt-1">
					Triggered via GSAP ScrollTrigger with smooth scale and fade transition when entering view.
				</p>
			</div>
		</div>
	</section>

	<!-- Feature Cards Section with Staggered ScrollTrigger -->
	<section class="max-w-4xl mx-auto px-6 py-16">
		<div class="text-center mb-10">
			<h2 class="text-2xl sm:text-3xl font-bold text-white">Scroll-Triggered Features</h2>
			<p class="text-slate-400 text-sm mt-2">These cards animate into view with staggered timings as you scroll.</p>
		</div>

		<div class="features-grid grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="feature-card p-6 rounded-xl border border-slate-800 bg-slate-800/50 backdrop-blur shadow-lg">
				<div class="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-lg mb-4">
					1
				</div>
				<h3 class="text-lg font-semibold text-white">SSR Safe</h3>
				<p class="text-sm text-slate-400 mt-2">
					Plugins and animations run inside Svelte lifecycle hooks, ensuring smooth Server-Side Rendering without window errors.
				</p>
			</div>

			<div class="feature-card p-6 rounded-xl border border-slate-800 bg-slate-800/50 backdrop-blur shadow-lg">
				<div class="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-lg mb-4">
					2
				</div>
				<h3 class="text-lg font-semibold text-white">Scoped Context</h3>
				<p class="text-sm text-slate-400 mt-2">
					Using <code class="text-xs text-indigo-300 bg-slate-900 px-1.5 py-0.5 rounded">gsap.context()</code> cleanly encapsulates all selectors and eliminates DOM selector conflicts.
				</p>
			</div>

			<div class="feature-card p-6 rounded-xl border border-slate-800 bg-slate-800/50 backdrop-blur shadow-lg">
				<div class="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-lg mb-4">
					3
				</div>
				<h3 class="text-lg font-semibold text-white">Auto Cleanup</h3>
				<p class="text-sm text-slate-400 mt-2">
					All ScrollTriggers and timelines revert automatically when leaving the route, preventing memory leaks during client navigation.
				</p>
			</div>
		</div>
	</section>

	<!-- Footer Spacing -->
	<footer class="max-w-4xl mx-auto px-6 py-16 text-center text-sm text-slate-500 border-t border-slate-800/60">
		<p>Built with SvelteKit, GSAP, ScrollTrigger & Tailwind CSS</p>
	</footer>
</div>

