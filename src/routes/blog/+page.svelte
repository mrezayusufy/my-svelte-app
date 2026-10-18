<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve, asset } from '$app/paths';
	import { AOS, aosAction } from '$lib/actions/aos';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { Preloader, Header, Footer } from '$lib/components';
	import { blogPosts, type BlogPost } from '$lib/data/blogData';

	// Category filter state
	let selectedCategory = $state('Alle');
	const categories = ['Alle', 'Kaffeekultur', 'Rezepte & Kulinarik', 'Hinter den Kulissen', 'Neuheiten', 'Events'];

	// Pagination state
	const itemsPerPage = 6;
	let currentPage = $state(1);

	// Filtered posts
	const filteredPosts = $derived(
		selectedCategory === 'Alle'
			? blogPosts
			: blogPosts.filter((post) => post.category === selectedCategory)
	);

	const totalPages = $derived(Math.ceil(filteredPosts.length / itemsPerPage) || 1);

	const paginatedPosts = $derived(
		filteredPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
	);

	function setCategory(cat: string) {
		selectedCategory = cat;
		currentPage = 1;
	}

	function goToPage(p: number) {
		if (p >= 1 && p <= totalPages) {
			currentPage = p;
			window.scrollTo({ top: 400, behavior: 'smooth' });
		}
	}

	onMount(() => {
		// Initialize GSAP ScrollTrigger
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

<svelte:head>
	<title>Blog & Aktuelles - Giovanni's Kaffeewelt</title>
	<meta
		name="description"
		content="Aktuelle Beiträge, Kaffeekultur, Rezepte und Einblicke hinter die Kulissen von Giovanni's Kaffeewelt in Hamburg."
	/>
	<link rel="stylesheet" href={asset('/assets/css/pages/innerpages.css')} />
</svelte:head>

<!-- AOS Svelte Global Configuration -->
<AOS options={{ offset: 40, duration: 800, once: true, disable: false }} />

<!-- Preloader -->
<Preloader />

<!-- Header Navigation -->
<Header />

<div id="smooth-wrapper">
	<div id="smooth-content">
		<main>
			<!--====== Start Page Banner ======-->
			<section
				class="page-banner bg_cover p-r z-1"
				style="background-image: url('{asset('/assets/blog.avif')}');"
			>
				<div class="container">
					<div class="row justify-content-center">
						<div class="col-lg-10">
							<!-- Page Content -->
							<div class="page-content text-center">
								<h1>Blog & Aktuelles</h1>
								<ul>
									<li><a href={resolve('/')}>Startseite</a></li>
									<li>/</li>
									<li>Blog & Aktuelles</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!--====== End Page Banner ======-->

			<!--====== Start Blogs Sec ======-->
			<section class="giovanni-blog-sec py-5">
				<div class="container">
					<!-- Section Header -->
					<div class="row py-5 align-items-center">
						<div class="col-lg-6">
							<div class="section-title mb-4">
								<span class="sub-title" data-aos="fade-down" data-aos-duration="1000" use:aosAction
									>Neueste Beiträge</span
								>
								<h2 class="text-anm">Inspirationen & Neuigkeiten</h2>
							</div>
						</div>
						<div class="col-lg-6">
							<div class="text-box mb-4" data-aos="fade-up" data-aos-duration="1000" use:aosAction>
								<p class="text-muted">
									Tauchen Sie ein in unsere neuesten Blogbeiträge voller aromatischer Inspirationen,
									wertvoller Barista-Tipps und spannender Geschichten hinter den Kulissen von Giovanni’s
									Kaffeewelt in Hamburg.
								</p>
							</div>
						</div>
					</div>

					<!-- Category Filter Pills -->
					<div class="category-filter-wrap mb-5 d-flex flex-wrap gap-2 justify-content-center" data-aos="fade-up" data-aos-duration="800" use:aosAction>
						{#each categories as cat}
							<button
								type="button"
								class="category-pill-btn {selectedCategory === cat ? 'active' : ''}"
								onclick={() => setCategory(cat)}
							>
								{cat}
							</button>
						{/each}
					</div>

					<!-- Posts Grid -->
					<div class="row">
						{#if paginatedPosts.length === 0}
							<div class="col-12 text-center py-5">
								<p class="text-muted fs-5">Keine Beiträge in dieser Kategorie gefunden.</p>
							</div>
						{:else}
							{#each paginatedPosts as post, idx}
								<div class="col-xl-4 col-md-6 col-sm-12">
									<!-- Giovanni Blog Post -->
									<article
										class="giovanni-blog-post mb-5 shadow-sm rounded-3 overflow-hidden bg-white"
										data-aos="fade-up"
										data-aos-duration={700 + idx * 150}
										use:aosAction
									>
										<div class="post-thumbnail position-relative overflow-hidden">
											<a href={resolve('/blog/[slug]',{ slug: post.slug})} class="d-flex">
												<img
													src={asset(post.image)}
													alt={post.title}
													class="img-fluid w-100 object-fit-cover post-image"
													style="height: 250px;"
												/>
											</a>
											<span class="category-tag ">
												{post.category}
											</span>
										</div>
										<div class="post-content p-4">
											<div class="post-meta mb-3 d-flex flex-wrap small text-muted">
												<span class="me-2"><i class="far fa-user me-1 text-gold"></i>{post.author}</span>
												<span class="me-2"><i class="far fa-calendar-alt me-1 text-gold"></i>{post.date}</span>
												<span class="me-2"><i class="far fa-clock me-1 text-gold"></i>{post.readTime}</span>
											</div>
											<h4 class="mb-3 post-title">
												<a href={resolve('/blog/[slug]',{ slug: post.slug})} class="text-dark text-decoration-none">
													{post.title}
												</a>
											</h4>
											<p class="text-muted small mb-4 line-clamp-3">
												{post.excerpt}
											</p>
											<a href={resolve('/blog/[slug]',{ slug: post.slug})} class="read-more style-one d-inline-flex align-items-center">
												Weiterlesen <i class="far fa-arrow-right ms-2"></i>
											</a>
										</div>
									</article>
								</div>
							{/each}
						{/if}
					</div>

					<!-- Pagination -->
					{#if totalPages > 1}
						<div class="row pb-5">
							<div class="col-lg-12">
								<div class="giovanni-pagination text-center mt-4 pb-lx-4">
									<ul>
										{#each Array(totalPages) as _, i}
											{@const pageNum = i + 1}
											<li class={currentPage === pageNum ? 'active' : ''}>
												<button
													type="button"
													class="page-link-btn {currentPage === pageNum ? 'active' : ''}"
													onclick={() => goToPage(pageNum)}
													aria-label="Seite {pageNum}"
												>
													{pageNum < 10 ? `0${pageNum}` : pageNum}
												</button>
											</li>
										{/each}
										{#if currentPage < totalPages}
											<li>
												<button
													type="button"
													class="page-link-btn"
													onclick={() => goToPage(currentPage + 1)}
													aria-label="Nächste Seite"
												>
													<i class="far fa-long-arrow-right"></i>
												</button>
											</li>
										{/if}
									</ul>
								</div>
							</div>
						</div>
					{/if}
				</div>
			</section>
			<!--====== End Blogs Sec ======-->
		</main>

		<!-- Footer -->
		<Footer />
	</div>
</div>

<style>
	:global(.page-banner) {
		position: relative;
	}

	.text-gold {
		color: var(--primary-color, #d0965c);
	}

	/* Category Filter Pills */
	.category-pill-btn {
		background-color: transparent;
		border: 1px solid var(--border-color, #e9e9e9);
		color: var(--heading-color, #2d4443);
		padding: 8px 22px;
		border-radius: 30px;
		font-weight: 500;
		font-size: 14px;
		transition: all 0.3s ease;
		cursor: pointer;
	}

	.category-pill-btn:hover,
	.category-pill-btn.active {
		background-color: var(--primary-color, #d0965c);
		border-color: var(--primary-color, #d0965c);
		color: #ffffff;
	}

	/* Category Tag on Post */
	.category-tag {
		background-color: rgba(45, 68, 67, 0.85);
		backdrop-filter: blur(4px);
		letter-spacing: 0.5px;
		left:0;
		line-height: 1.5;
		padding: 4px 12px;
		font-size: 12px;
		position: absolute;
		top: 0;
		margin: 12px;
		border-radius: 100px;
		color: #fff;
		font-weight: bold;
	}

	/* Post card hover effects */
	.giovanni-blog-post {
		transition: transform 0.35s ease, box-shadow 0.35s ease;
	}

	.giovanni-blog-post:hover {
		transform: translateY(-6px);
		box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08) !important;
	}

	.post-image {
		transition: transform 0.5s ease;
	}

	.giovanni-blog-post:hover .post-image {
		transform: scale(1.06);
	}

	.post-title a {
		font-family: var(--heading-font, 'Marcellus', serif);
		transition: color 0.3s ease;
	}

	.post-title a:hover {
		color: var(--primary-color, #d0965c) !important;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		line-height: 1.6;
	}

	/* Pagination button styles */
	.page-link-btn {
		width: 55px;
		height: 55px;
		border-radius: 50%;
		border: 1px solid var(--border-color, #e9e9e9);
		background-color: transparent;
		color: var(--heading-color, #2d4443);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		font-weight: 600;
		transition: all 0.3s ease;
	}

	.page-link-btn:hover,
	.page-link-btn.active {
		background-color: var(--primary-color, #d0965c);
		border-color: var(--primary-color, #d0965c);
		color: #ffffff;
	}
 
</style>
