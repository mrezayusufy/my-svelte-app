<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve, asset } from '$app/paths';
	import { AOS, aosAction } from '$lib/actions/aos';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { Preloader, Header, Footer } from '$lib/components';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

 

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
	<title>{data.post.title} - Giovanni's Kaffeewelt Blog</title>
	<meta name="description" content={data.post.excerpt} />
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
								<ul>
									<li><a href={resolve('/')}>Startseite</a></li>
									<li>/</li>
									<li><a href={resolve('/blog')}>Blog</a></li>
									<li>/</li>
									<li>{data.post.category}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!--====== End Page Banner ======-->

			<!--====== Start Blog Details Section ======-->
			<section class="giovanni-blog-details py-5">
				<div class="container">
					<div class="blog-details-wrapper py-5">
						<div class="row justify-content-center">
							<div class="col-lg-10">
								<!-- Article Header -->
								<div class="blog-post-header mb-4">
									<div class="post-meta mb-3 d-flex flex-wrap gap-3 text-muted" data-aos="fade-down" data-aos-duration="600" use:aosAction>
										<span class="badge bg-gold text-white px-3 py-2 rounded-pill">{data.post.category}</span>
										<span><i class="far fa-user me-1 text-gold"></i>{data.post.author}</span>
										<span><i class="far fa-calendar-alt me-1 text-gold"></i>{data.post.date}</span>
										<span><i class="far fa-clock me-1 text-gold"></i>{data.post.readTime}</span>
									</div>
									<h2 class="title text-anm mb-4">{data.post.title}</h2>
								</div>

								<!-- Featured Image -->
								<div class="featured-image-wrap mb-5 rounded-4 overflow-hidden shadow-sm" data-aos="fade-up" data-aos-duration="800" use:aosAction>
									<img
										src={asset(data.post.image)}
										alt={data.post.title}
										class="img-fluid w-100 object-fit-cover"
										style="max-height: 480px;"
									/>
								</div>

								<!-- Content Body -->
								<div class="blog-post-body fs-5 text-secondary lh-lg mb-5" data-aos="fade-up" data-aos-duration="1000" use:aosAction>
									<p class="lead fw-medium text-dark mb-4">
										{data.post.excerpt}
									</p>
									<p class="mb-4">
										In Giovanni’s Kaffeewelt in Hamburg dreht sich alles um Leidenschaft für guten Geschmack und das
										Gefühl von herzlicher Gemütlichkeit. Jeder Handgriff, von der sorgfältigen Auswahl edler Kaffeebohnen
										bis hin zur Zubereitung unserer frischen Bowls und Spezialitäten, folgt unserem Streben nach
										authentischer Spitzenqualität.
									</p>

									<!-- Highlight Quote Box -->
									<blockquote class="custom-quote-box p-4 my-5 rounded-3 border-start border-4 border-gold">
										<p class="fst-italic mb-2 fs-5 text-dark">
											„Kaffee ist für uns kein schnelles Getränk, sondern ein Moment des Innehaltens, der Freude und
											der italienischen Lebensart.“
										</p>
										<cite class="fw-bold text-gold small text-uppercase letter-spacing-1">
											– Das Barista-Team von Giovanni’s
										</cite>
									</blockquote>

									<p class="mb-4">
										Ob Sie am Vormittag auf ein ausgiebiges Frühstück mit frisch gepressten Säften und feinen Croissants
										vorbeischauen, zur Mittagszeit eine unserer beliebten Bowls genießen oder am Nachmittag mit Freunden
										bei Cappuccino und hausgemachtem Kuchen verweilen: Bei uns erleben Sie italienische Gastfreundschaft
										in ihrer schönsten Form.
									</p>

									<!-- Feature Points Grid -->
									<div class="row g-4 my-4">
										<div class="col-md-6">
											<div class="feature-card p-4 rounded-3 h-100">
												<div class="d-flex align-items-center mb-3">
													<div class="icon-circle me-3">
														<i class="flaticon-chef fs-3 text-gold"></i>
													</div>
													<h5 class="mb-0">Handverlesene Zutaten</h5>
												</div>
												<p class="small text-muted mb-0">
													Frische Früchte, regionale Erzeugnisse und schonend geröstete Bohnen garantieren puren Geschmack.
												</p>
											</div>
										</div>
										<div class="col-md-6">
											<div class="feature-card p-4 rounded-3 h-100">
												<div class="d-flex align-items-center mb-3">
													<div class="icon-circle me-3">
														<i class="flaticon-dining-room fs-3 text-gold"></i>
													</div>
													<h5 class="mb-0">Gemütliches Ambiente</h5>
												</div>
												<p class="small text-muted mb-0">
													Ein einladender Treffpunkt im Herzen von Hamburg für Kaffeeliebhaber, Freunde und Familien.
												</p>
											</div>
										</div>
									</div>
								</div>

								<!-- Post Navigation / Back Button -->
								<div class="post-navigation-footer pt-4 border-top d-flex justify-content-between align-items-center flex-wrap gap-3">
									<a href={resolve('/blog')} class="theme-btn style-one">
										<i class="far fa-arrow-left me-2"></i> Zurück zur Blog-Übersicht
									</a>
									<a href="{resolve('/')}#menu" class="theme-btn style-two">
										Speisekarte ansehen <i class="far fa-arrow-right ms-2"></i>
									</a>
								</div>
							</div>
						</div>
					</div>

					<!-- Related Posts -->
					{#if data.recentPosts.length > 0}
						<div class="related-posts-section pt-5 border-top">
							<div class="section-title text-center mb-5">
								<span class="sub-title">Weitere Beiträge</span>
								<h2>Das könnte Sie auch interessieren</h2>
							</div>
							<div class="row">
								{#each data.recentPosts as recent}
									<div class="col-lg-4 col-md-6 mb-4">
										<div class="giovanni-blog-post shadow-sm rounded-3 overflow-hidden bg-white h-100">
											<div class="post-thumbnail position-relative overflow-hidden">
												<a href={resolve('/blog/[slug]',{ slug: recent.slug})} class="d-flex">
													<img
														src={asset(recent.image)}
														alt={recent.title}
														class="img-fluid w-100 object-fit-cover"
														style="height: 220px;"
													/>
												</a>
											</div>
											<div class="post-content p-4">
												<div class="post-meta mb-2 small text-muted">
													<span><i class="far fa-calendar-alt me-1 text-gold"></i>{recent.date}</span>
												</div>
												<h5 class="mb-3">
													<a href={resolve('/blog/[slug]',{ slug: recent.slug})} class="text-dark text-decoration-none">
														{recent.title}
													</a>
												</h5>
												<a href={resolve('/blog/[slug]',{ slug: recent.slug})} class="read-more style-one small">
													Weiterlesen <i class="far fa-arrow-right ms-1"></i>
												</a>
											</div>
										</div>
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

	.custom-quote-box {
		background-color: #fbf9f6;
	}

	.feature-card {
		background-color: #f8f9fa;
		border: 1px solid var(--border-color, #e9e9e9);
	}

	.icon-circle {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background-color: rgba(208, 150, 92, 0.15);
		display: flex;
		align-items: center;
		justify-content: center;
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
 
</style>
