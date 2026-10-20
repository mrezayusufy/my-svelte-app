<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve, asset } from '$app/paths';
	import { AOS, aosAction } from '$lib/actions/aos';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { Preloader, Header, Footer } from '$lib/components';
	import type { PageData } from './$types';
	import { formatBlogDate, calculateReadTime } from '$lib/types/blog';

	let { data }: { data: PageData } = $props();

	const post = $derived(data.post);
	const postDate = $derived(formatBlogDate(post.published_at || post.created_at));
	const readTime = $derived(calculateReadTime(post.content));
	const categoryName = $derived(post.categories?.name || 'Kaffeewelt');
	const featuredImage = $derived(post.featured_image_url || '/assets/blog.avif');
	const featuredImageAlt = $derived(post.featured_image_alt || post.title);

	// SEO Meta values
	const pageTitle = $derived(
		post.meta_title ? post.meta_title : `${post.title} | Giovanni's Kaffeewelt Hamburg`
	);
	const pageDescription = $derived(
		post.meta_description
			? post.meta_description
			: post.excerpt
				? post.excerpt
				: `${post.title} - Ein Beitrag von Giovanni's Kaffeewelt in Hamburg.`
	);
	const canonicalUrl = $derived(
		post.canonical_url
			? post.canonical_url
			: `https://giovanniskaffeewelt.de/blog/${post.slug}`
	);

	onMount(() => {
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
	<!-- Primary SEO Meta Tags -->
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="article" />
	<meta property="og:site_name" content="Giovanni's Kaffeewelt" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:image" content={featuredImage.startsWith('http') ? featuredImage : `https://giovanniskaffeewelt.de${featuredImage}`} />
	<meta property="og:image:alt" content={featuredImageAlt} />
	{#if post.published_at}
		<meta property="article:published_time" content={post.published_at} />
	{/if}
	<meta property="article:modified_time" content={post.updated_at} />
	<meta property="article:section" content={categoryName} />

	<!-- Twitter Cards -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={canonicalUrl} />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={featuredImage.startsWith('http') ? featuredImage : `https://giovanniskaffeewelt.de${featuredImage}`} />

	<!-- Schema.org BlogPosting Structured Data -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		"mainEntityOfPage": {
			"@type": "WebPage",
			"@id": "${canonicalUrl}"
		},
		"headline": "${post.title.replace(/"/g, '\\"')}",
		"description": "${(post.meta_description || post.excerpt || '').replace(/"/g, '\\"')}",
		"image": ["${featuredImage.startsWith('http') ? featuredImage : 'https://giovanniskaffeewelt.de' + featuredImage}"],
		"datePublished": "${post.published_at || post.created_at}",
		"dateModified": "${post.updated_at}",
		"author": {
			"@type": "Organization",
			"name": "Giovanni's Kaffeewelt",
			"url": "https://giovanniskaffeewelt.de"
		},
		"publisher": {
			"@type": "Organization",
			"name": "Giovanni's Kaffeewelt",
			"url": "https://giovanniskaffeewelt.de",
			"logo": {
				"@type": "ImageObject",
				"url": "https://giovanniskaffeewelt.de/assets/images/logo/logo.png"
			}
		},
		"articleSection": "${categoryName.replace(/"/g, '\\"')}"
	}
	</script>`}

	<!-- Schema.org BreadcrumbList -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{
				"@type": "ListItem",
				"position": 1,
				"name": "Startseite",
				"item": "https://giovanniskaffeewelt.de"
			},
			{
				"@type": "ListItem",
				"position": 2,
				"name": "Blog",
				"item": "https://giovanniskaffeewelt.de/blog"
			},
			{
				"@type": "ListItem",
				"position": 3,
				"name": "${post.title.replace(/"/g, '\\"')}",
				"item": "${canonicalUrl}"
			}
		]
	}
	</script>`}

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
				style="background-image: url('{asset('/assets/images/innerpage/bg/page-bg.jpg')}');"
			>
				<div class="container">
					<div class="row justify-content-center">
						<div class="col-lg-10">
							<div class="page-content text-center">
								<h1>Blog Details</h1>
								<nav aria-label="Brotkrumen-Navigation">
									<ul>
										<li><a href={resolve('/')}>Startseite</a></li>
										<li>/</li>
										<li><a href={resolve('/blog')}>Blog</a></li>
										<li>/</li>
										<li>{categoryName}</li>
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!--====== End Page Banner ======-->

			<!--====== Start Blog Details Section ======-->
			<section class="giovanni-blog-details py-5" aria-label="Blogbeitrag Inhalt">
				<div class="container">
					<div class="blog-details-wrapper py-5">
						<div class="row justify-content-center">
							<div class="col-lg-10">
								<!-- Article Container -->
								<article class="blog-post-article">
									<!-- Article Header -->
									<header class="blog-post-header mb-4">
										<div class="post-meta mb-3 d-flex flex-wrap gap-3 align-items-center text-muted" data-aos="fade-down" data-aos-duration="600" use:aosAction>
											<span class="badge bg-gold text-white px-3 py-2 rounded-pill">{categoryName}</span>
											<span><i class="far fa-user me-1 text-gold"></i>Giovanni Team</span>
											{#if postDate}
												<span>
													<i class="far fa-calendar-alt me-1 text-gold"></i>
													<time datetime={post.published_at || post.created_at}>{postDate}</time>
												</span>
											{/if}
											<span><i class="far fa-clock me-1 text-gold"></i>{readTime}</span>
										</div>
										<h1 class="title text-anm mb-4">{post.title}</h1>
									</header>

									<!-- Featured Image -->
									{#if featuredImage}
										<figure class="featured-image-wrap mb-5 rounded-4 overflow-hidden shadow-sm" data-aos="fade-up" data-aos-duration="800" use:aosAction>
											<img
												src={asset(featuredImage)}
												alt={featuredImageAlt}
												class="img-fluid w-100 object-fit-cover"
												style="max-height: 500px;"
												loading="eager"
												fetchpriority="high"
											/>
											{#if post.featured_image_alt}
												<figcaption class="text-muted small p-2 text-center bg-light">
													{post.featured_image_alt}
												</figcaption>
											{/if}
										</figure>
									{/if}

									<!-- Excerpt Lead -->
									{#if post.excerpt}
										<div class="lead-excerpt p-4 mb-4 rounded-3 border-start border-4 border-gold bg-light" data-aos="fade-up" data-aos-duration="900" use:aosAction>
											<p class="lead fw-medium text-dark mb-0 fs-5">
												{post.excerpt}
											</p>
										</div>
									{/if}

									<!-- Markdown Parsed Content Body -->
									<div class="blog-post-body markdown-content fs-5 text-secondary lh-lg mb-5" data-aos="fade-up" data-aos-duration="1000" use:aosAction>
										{@html data.contentHtml}
									</div>

									<!-- Post Footer / Navigation -->
									<footer class="post-navigation-footer pt-4 border-top d-flex justify-content-between align-items-center flex-wrap gap-3">
										<a href={resolve('/blog')} class="theme-btn style-one">
											<i class="far fa-arrow-left me-2"></i> Zurück zur Blog-Übersicht
										</a>
										<a href="{resolve('/')}#reservation" class="theme-btn style-two">
											Tisch reservieren <i class="far fa-calendar-check ms-2"></i>
										</a>
									</footer>
								</article>
							</div>
						</div>
					</div>

					<!-- Related Posts Section -->
					{#if data.recentPosts && data.recentPosts.length > 0}
						<div class="related-posts-section pt-5 border-top">
							<div class="section-title text-center mb-5">
								<span class="sub-title">Weitere Beiträge</span>
								<h2>Das könnte Sie auch interessieren</h2>
							</div>
							<div class="row">
								{#each data.recentPosts as recent}
									{@const recentImage = recent.featured_image_url || '/assets/blog-img1.jpg'}
									{@const recentDate = formatBlogDate(recent.published_at || recent.created_at)}
									<div class="col-lg-4 col-md-6 mb-4">
										<article class="giovanni-blog-post shadow-sm rounded-3 overflow-hidden bg-white h-100 d-flex flex-column">
											<div class="post-thumbnail position-relative overflow-hidden">
												<a href={resolve('/blog/[slug]', { slug: recent.slug })} class="d-flex" aria-label={recent.title}>
													<img
														src={asset(recentImage)}
														alt={recent.featured_image_alt || recent.title}
														loading="lazy"
														class="img-fluid w-100 object-fit-cover"
														style="height: 220px;"
													/>
												</a>
											</div>
											<div class="post-content p-4 d-flex flex-column flex-grow-1">
												<div class="post-meta mb-2 small text-muted">
													{#if recentDate}
														<span><i class="far fa-calendar-alt me-1 text-gold"></i>{recentDate}</span>
													{/if}
												</div>
												<h3 class="mb-3 fs-6">
													<a href={resolve('/blog/[slug]', { slug: recent.slug })} class="text-dark text-decoration-none">
														{recent.title}
													</a>
												</h3>
												<div class="mt-auto">
													<a href={resolve('/blog/[slug]', { slug: recent.slug })} class="read-more style-one small" aria-label="Weiterlesen: {recent.title}">
														Weiterlesen <i class="far fa-arrow-right ms-1"></i>
													</a>
												</div>
											</div>
										</article>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</section>
			<!--====== End Blog Details Section ======-->
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

	.bg-gold {
		background-color: var(--primary-color, #d0965c);
	}

	.border-gold {
		border-color: var(--primary-color, #d0965c) !important;
	}

	.title {
		font-family: var(--heading-font, 'Marcellus', serif);
		color: var(--heading-color, #2d4443);
		font-size: 38px;
		line-height: 1.25;
	}

	@media (max-width: 767.98px) {
		.title {
			font-size: 28px;
		}
	}

	/* Markdown Content Styles */
	:global(.markdown-content) {
		color: #4a5568;
		font-size: 1.125rem;
		line-height: 1.85;
	}

	:global(.markdown-content h1),
	:global(.markdown-content h2),
	:global(.markdown-content h3),
	:global(.markdown-content h4),
	:global(.markdown-content h5),
	:global(.markdown-content h6) {
		font-family: var(--heading-font, 'Marcellus', serif);
		color: var(--heading-color, #2d4443);
		margin-top: 2.2rem;
		margin-bottom: 1rem;
		line-height: 1.35;
	}

	:global(.markdown-content h2) {
		font-size: 1.85rem;
		border-bottom: 1px solid rgba(208, 150, 92, 0.2);
		padding-bottom: 0.5rem;
	}

	:global(.markdown-content h3) {
		font-size: 1.45rem;
	}

	:global(.markdown-content h4) {
		font-size: 1.25rem;
	}

	:global(.markdown-content p) {
		margin-bottom: 1.5rem;
	}

	:global(.markdown-content ul),
	:global(.markdown-content ol) {
		margin-bottom: 1.5rem;
		padding-left: 1.75rem;
	}

	:global(.markdown-content li) {
		margin-bottom: 0.5rem;
	}

	:global(.markdown-content blockquote) {
		background-color: #fbf9f6;
		border-left: 4px solid var(--primary-color, #d0965c);
		padding: 1.25rem 1.5rem;
		margin: 2rem 0;
		border-radius: 0 8px 8px 0;
		font-style: italic;
		color: #2d4443;
	}

	:global(.markdown-content blockquote p:last-child) {
		margin-bottom: 0;
	}

	:global(.markdown-content a) {
		color: var(--primary-color, #d0965c);
		text-decoration: underline;
		transition: color 0.2s ease;
	}

	:global(.markdown-content a:hover) {
		color: #b07842;
	}

	:global(.markdown-content img) {
		max-width: 100%;
		height: auto;
		border-radius: 12px;
		margin: 2rem 0;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
	}

	:global(.markdown-content code) {
		background-color: #edf2f7;
		color: #2d3748;
		padding: 0.2rem 0.4rem;
		border-radius: 4px;
		font-size: 0.9em;
	}

	:global(.markdown-content pre) {
		background-color: #1a202c;
		color: #e2e8f0;
		padding: 1.25rem;
		border-radius: 8px;
		overflow-x: auto;
		margin: 1.5rem 0;
	}

	:global(.markdown-content pre code) {
		background-color: transparent;
		color: inherit;
		padding: 0;
	}

	:global(.markdown-content table) {
		width: 100%;
		border-collapse: collapse;
		margin: 2rem 0;
	}

	:global(.markdown-content th),
	:global(.markdown-content td) {
		border: 1px solid #e2e8f0;
		padding: 0.75rem 1rem;
		text-align: left;
	}

	:global(.markdown-content th) {
		background-color: #f7fafc;
		font-weight: 600;
		color: #2d3748;
	}

	:global(.markdown-content hr) {
		border: none;
		border-top: 1px solid #e2e8f0;
		margin: 2.5rem 0;
	}
</style>
