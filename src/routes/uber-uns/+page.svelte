<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { resolve, asset } from '$app/paths';
	import { AOS, aosAction } from '$lib/actions/aos';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { Preloader, Header, Footer } from '$lib/components';

	// Gallery slider state
	let galleryEl = $state<HTMLElement | undefined>(undefined);
	let gallerySiema: any;
	let autoplayTimer: ReturnType<typeof setInterval> | null = null;

	// Testimonials state
	let currentTestimonial = $state(0);
	const testimonials = [
		{
			quote:
				'Italienische Kaffeekultur neu definiert! Jedes Heißgetränk und jedes Frühstück wird mit traditionellen Rezepten und höchstem handwerklichen Anspruch zubereitet.',
			author: 'Marco Valenti / Kaffeekenner',
			rating: 5
		},
		{
			quote:
				'Giovanni’s Kaffeewelt ist für uns der schönste Ort in Hamburg, um den Morgen mit frischem Croissant, Spezialitätenkaffee und bester Laune zu beginnen.',
			author: 'Elena Becker / Food-Bloggerin',
			rating: 5
		},
		{
			quote:
				'Hervorragender Service, authentische Atmosphäre und Kaffeespezialitäten auf Spitzen-Niveau. Ein absolutes Muss bei jedem Besuch in Hamburg.',
			author: 'David Sommer / Gastronom',
			rating: 5
		}
	];

	function nextTestimonial() {
		currentTestimonial = (currentTestimonial + 1) % testimonials.length;
	}

	function prevTestimonial() {
		currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
	}

	// Video Modal state
	let showVideoModal = $state(false);

	const galleryImages = [
		asset('/assets/images/innerpage/about/gallery-img1.jpg'),
		asset('/assets/images/innerpage/about/gallery-img2.jpg'),
		asset('/assets/images/innerpage/about/gallery-img3.jpg'),
		asset('/assets/images/innerpage/about/gallery-img4.jpg'),
		asset('/assets/images/innerpage/about/gallery-img5.jpg')
	];

	const instagramImages = [
		asset('/assets/images/innerpage/instagram/insta-img1.jpg'),
		asset('/assets/images/innerpage/instagram/insta-img2.jpg'),
		asset('/assets/images/innerpage/instagram/insta-img3.jpg'),
		asset('/assets/images/innerpage/instagram/insta-img4.jpg'),
		asset('/assets/images/innerpage/instagram/insta-img2.jpg'),
		asset('/assets/images/innerpage/instagram/insta-img3.jpg')
	];

	const blogPosts = [
		{
			title: 'Leichte Sommergerichte für erfrischenden Genuss',
			author: 'Giovanni Team',
			date: '19. Mai 2025',
			image: asset('/assets/images/innerpage/blog/blog-img1.jpg'),
			duration: 800
		},
		{
			title: 'Ein Tag im Leben unseres Küchenchefs bei Giovanni’s',
			author: 'Giovanni Team',
			date: '19. Mai 2025',
			image: asset('/assets/images/innerpage/blog/blog-img2.jpg'),
			duration: 1000
		},
		{
			title: 'Der mediterrane Einfluss hinter unseren Kaffeekreationen',
			author: 'Giovanni Team',
			date: '19. Mai 2025',
			image: asset('/assets/images/innerpage/blog/blog-img3.jpg'),
			duration: 1200
		}
	];

	onMount(async () => {
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

		// Initialize Siema gallery slider
		if (galleryEl) {
			try {
				const Siema = (await import('siema')).default;
				gallerySiema = new Siema({
					selector: galleryEl,
					duration: 400,
					easing: 'ease-out',
					perPage: { 0: 1, 576: 2, 992: 3 },
					startIndex: 0,
					draggable: true,
					multipleDrag: true,
					loop: true
				});

				autoplayTimer = setInterval(() => {
					gallerySiema?.next();
				}, 3500);
			} catch (err) {
				console.warn('Could not initialize Siema:', err);
			}
		}
	});

	onDestroy(() => {
		if (autoplayTimer) {
			clearInterval(autoplayTimer);
		}
		gallerySiema?.destroy();
	});
</script>

<svelte:head>
	<title>Über uns - Giovanni's Kaffeewelt</title>
	<meta
		name="description"
		content="Erfahren Sie mehr über Giovanni's Kaffeewelt in Hamburg – unsere Philosophie, frische Zutaten, erstklassigen Kaffee und echte Leidenschaft."
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
				style="background-image: url('{asset('/assets/images/innerpage/bg/page-bg.jpg')}');"
			>
				<div class="container">
					<div class="row justify-content-center">
						<div class="col-lg-10">
							<!-- Page Content -->
							<div class="page-content text-center">
								<h1>Über uns</h1>
								<ul>
									<li><a href={resolve('/')}>Startseite</a></li>
									<li>/</li>
									<li>Über uns</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!--====== End Page Banner ======-->

			<!--====== Start About Section ======-->
			<section class="giovanni-about-sec py-5">
				<div class="container">
					<div class="row py-5 align-items-end justify-content-center">
						<div class="col-lg-7 col-md-12">
							<!-- Giovanni Content Box -->
							<div class="giovanni-content-box pe-lg-5">
								<!-- Section Title -->
								<div class="section-title mb-4">
									<span class="sub-title" data-aos="fade-down" data-aos-duration="1000" use:aosAction
										>Über uns</span
									>
									<h2 class="text-anm">Die Geschichte hinter dem Geschmack</h2>
								</div>
								<p class="mb-4" data-aos="fade-up" data-aos-duration="1000" use:aosAction>
									Begeben Sie sich auf eine kulinarische Reise, bei der italienische Tradition auf innovative
									Leidenschaft trifft. Unsere Kaffeespezialitäten, Bowls, Frühstücke und warmen Gerichte
									werden stets aus frischesten Zutaten und mit vollster Hingabe zubereitet.
								</p>

								<!-- Gallery Slider Wrap -->
								<div class="gallery-slider-wrap mt-4 pt-2">
									<div class="d-flex justify-content-between align-items-center mb-3">
										<span class="text-gold fw-bold small text-uppercase letter-spacing-1">
											Einblicke in unsere Küche
										</span>
										<div class="gallery-arrows d-flex gap-2">
											<button
												class="btn btn-sm btn-outline-secondary rounded-circle"
												onclick={() => gallerySiema?.prev()}
												aria-label="Vorheriges Bild"
											>
												<i class="far fa-arrow-left"></i>
											</button>
											<button
												class="btn btn-sm btn-outline-secondary rounded-circle"
												onclick={() => gallerySiema?.next()}
												aria-label="Nächstes Bild"
											>
												<i class="far fa-arrow-right"></i>
											</button>
										</div>
									</div>

									<!-- Siema Container -->
									<div bind:this={galleryEl} class="gallery-slider-container overflow-hidden">
										{#each galleryImages as img, idx}
											<div class="gallery-item px-2">
												<div class="thumbnail rounded-3 overflow-hidden shadow-sm">
													<img
														src={img}
														alt="Galeriebild {idx + 1}"
														class="img-fluid w-100 object-fit-cover"
														style="height: 240px;"
													/>
												</div>
											</div>
										{/each}
									</div>
								</div>
							</div>
						</div>

						<div class="col-lg-5 col-md-8">
							<!-- Giovanni Image -->
							<div
								class="giovanni-image mb-4 pb-2 mt-xl-0 mt-5 text-center"
								data-aos="fade-down"
								data-aos-duration="1000"
								use:aosAction
							>
								<img
									src={asset('/assets/images/innerpage/about/about-img1.jpg')}
									alt="Über Giovanni's Kaffeewelt"
									class="img-fluid"
									style="border-radius: 400px 400px 0px 0px; max-height: 480px; object-fit: cover;"
								/>
							</div>
							<div class="text-box ps-xl-3" data-aos="fade-up" data-aos-duration="1000" use:aosAction>
								<p class="mb-4 text-muted">
									Erleben Sie echte italienische Kaffeekultur und hausgemachte Köstlichkeiten im Herzen
									von Hamburg.
								</p>
								<a href={resolve('/contact')} class="theme-btn style-one">Kontaktieren Sie uns</a>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!--====== End About Section ======-->

			<!--====== Start Fun Fact Section ======-->
			<section class="giovanni-fun-fact py-5">
				<div class="container">
					<div class="counter-item-wrapper">
						<div class="row py-lg-4">
							<div class="col-lg-3 col-sm-6 counter-item-border">
								<!-- Giovanni Counter Item -->
								<div class="giovanni-counter-item text-center mb-4" data-aos="fade-up" data-aos-duration="800" use:aosAction>
									<div class="icon">
										<i class="flaticon-chef"></i>
									</div>
									<div class="content">
										<h2><span class="counter">300</span>+</h2>
										<p>Köstliche Kreationen</p>
									</div>
								</div>
							</div>
							<div class="col-lg-3 col-sm-6 counter-item-border">
								<!-- Giovanni Counter Item -->
								<div class="giovanni-counter-item text-center mb-4" data-aos="fade-up" data-aos-duration="1000" use:aosAction>
									<div class="icon">
										<i class="flaticon-dining-room"></i>
									</div>
									<div class="content">
										<h2><span class="counter">260</span>+</h2>
										<p>Gemütliche Plätze</p>
									</div>
								</div>
							</div>
							<div class="col-lg-3 col-sm-6 counter-item-border">
								<!-- Giovanni Counter Item -->
								<div class="giovanni-counter-item text-center mb-4" data-aos="fade-up" data-aos-duration="1200" use:aosAction>
									<div class="icon">
										<i class="flaticon-offers"></i>
									</div>
									<div class="content">
										<h2><span class="counter">5</span>K+</h2>
										<p>Servierte Kaffees</p>
									</div>
								</div>
							</div>
							<div class="col-lg-3 col-sm-6 counter-item-border">
								<!-- Giovanni Counter Item -->
								<div class="giovanni-counter-item text-center mb-4" data-aos="fade-up" data-aos-duration="1400" use:aosAction>
									<div class="icon">
										<i class="flaticon-happy-face"></i>
									</div>
									<div class="content">
										<h2><span class="counter">27</span>K+</h2>
										<p>Zufriedene Gäste</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!--====== End Fun Fact Section ======-->

			<!--====== Start Feature Section ======-->
			<section class="giovanni-features-sec py-5">
				<div class="container">
					<div class="row align-items-center py-5 justify-content-center">
						<div class="col-xl-6 col-lg-8">
							<!-- Giovanni Content Box -->
							<div class="giovanni-content-box text-white">
								<div class="section-title mb-4">
									<span class="sub-title" data-aos="fade-down" data-aos-duration="1000" use:aosAction
										>Einfach, Klassisch, Köstlich</span
									>
									<h2 class="text-anm text-white">Feinste Kaffeekunst im Herzen von Hamburg</h2>
								</div>
								<p class="mb-5 text-white-50" data-aos="fade-up" data-aos-duration="1000" use:aosAction>
									Erleben Sie eine einzigartige Kombination aus handwerklichem Barista-Können, besten Bohnen
									und mediterran inspirierten Köstlichkeiten in stilvoller und entspannter Umgebung.
								</p>
								<div class="row">
									<div class="col-sm-6">
										<!-- Giovanni Iconic Box -->
										<div class="giovanni-iconic-box mb-4" data-aos="fade-up" data-aos-duration="1200" use:aosAction>
											<div class="icon">
												<i class="flaticon-chef"></i>
											</div>
											<div class="content">
												<h5 class="text-white mb-0">Erfahrene Baristas</h5>
											</div>
										</div>
										<!-- Giovanni Iconic Box -->
										<div class="giovanni-iconic-box mb-4" data-aos="fade-up" data-aos-duration="1300" use:aosAction>
											<div class="icon">
												<i class="flaticon-dining-room"></i>
											</div>
											<div class="content">
												<h5 class="text-white mb-0">Gemütliches Ambiente</h5>
											</div>
										</div>
									</div>
									<div class="col-sm-6">
										<!-- Giovanni Iconic Box -->
										<div class="giovanni-iconic-box mb-4" data-aos="fade-up" data-aos-duration="1400" use:aosAction>
											<div class="icon">
												<i class="flaticon-offers"></i>
											</div>
											<div class="content">
												<h5 class="text-white mb-0">Frischeste Zutaten</h5>
											</div>
										</div>
										<!-- Giovanni Iconic Box -->
										<div class="giovanni-iconic-box mb-4" data-aos="fade-up" data-aos-duration="1500" use:aosAction>
											<div class="icon">
												<i class="flaticon-happy-face"></i>
											</div>
											<div class="content">
												<h5 class="text-white mb-0">Herzlicher Service</h5>
											</div>
										</div>
									</div>
								</div>
								<div class="giovanni-button mt-4" data-aos="fade-up" data-aos-duration="1600" use:aosAction>
									<a href="{resolve('/')}#menu" class="theme-btn style-one">Speisekarte entdecken</a>
								</div>
							</div>
						</div>
						<div class="col-xl-6 col-lg-8">
							<!-- Giovanni Image -->
							<div
								class="giovanni-image text-center text-xl-end mt-xl-0 mt-5"
								data-aos="fade-down"
								data-aos-duration="1800"
								use:aosAction
							>
								<img
									src={asset('/assets/images/innerpage/gallery/feature-img1.jpg')}
									alt="Giovanni's Kaffeewelt Spezialitäten"
									class="img-fluid"
									style="border-radius: 400px 400px 0px 0px; max-height: 520px; object-fit: cover;"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!--====== End Feature Section ======-->

			<!--====== Start Intro Section ======-->
			<section
				class="giovanni-intro-sec bg_cover py-5 p-r z-1"
				style="background-image: url('{asset('/assets/images/innerpage/bg/intro-bg.jpg')}');"
			>
				<div class="container">
					<div class="row justify-content-center py-xl-5">
						<div class="col-xl-7 col-md-10">
							<!-- Giovanni Content Box -->
							<div class="giovanni-content-box text-center pt-4 pb-2 text-white">
								<button
									type="button"
									class="video-popup mb-4 border-0 bg-transparent"
									onclick={() => (showVideoModal = true)}
									data-aos="fade-down"
									data-aos-duration="1400"
									use:aosAction
									aria-label="Video abspielen"
								>
									<i class="fas fa-play"></i>
								</button>
								<h2 class="text-anm text-white">
									Tauchen Sie ein in die Kaffeewelt von Giovanni
								</h2>
								<p class="text-white-50 mt-3" data-aos="fade-up" data-aos-duration="1600" use:aosAction>
									Sehen Sie selbst, wie Leidenschaft, Duft und Handwerk zu einem unvergesslichen Erlebnis werden.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!--====== End Intro Section ======-->

			<!--====== Start Testimonial Section ======-->
			<section class="rs-testimonial py-5">
				<div class="container">
					<div class="row justify-content-center py-5">
						<div class="col-xl-8 col-lg-10">
							<!-- Testimonial Slider -->
							<div class="testimonial-slider py-lg-4 text-center">
								<div class="giovanni-testimonial-item">
									<div class="testimonial-content">
										<div class="ratings mb-3 text-warning">
											{#each Array(testimonials[currentTestimonial].rating) as _}
												<i class="fas fa-star mx-1"></i>
											{/each}
										</div>
										<p class="fs-4 fst-italic mb-4 text-muted">
											"{testimonials[currentTestimonial].quote}"
										</p>
										<span class="fw-bold text-dark fs-6 d-block mb-4">
											{testimonials[currentTestimonial].author}
										</span>

										<!-- Navigation Controls -->
										<div class="d-flex justify-content-center gap-3">
											<button
												class="btn btn-outline-dark rounded-circle px-3 py-2"
												onclick={prevTestimonial}
												aria-label="Vorherige Bewertung"
											>
												<i class="far fa-chevron-left"></i>
											</button>
											<button
												class="btn btn-outline-dark rounded-circle px-3 py-2"
												onclick={nextTestimonial}
												aria-label="Nächste Bewertung"
											>
												<i class="far fa-chevron-right"></i>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!--====== End Testimonial Section ======-->

			<!--====== Start Blog Section ======-->
			<section class="rs-blog py-lg-5 bg-light bg-opacity-50">
				<div class="container">
					<div class="row justify-content-center py-5">
						<div class="col-lg-7">
							<!-- Section Title -->
							<div class="section-title text-center mt-3">
								<span class="sub-title" data-aos="fade-down" data-aos-duration="1000" use:aosAction
									>Unser Blog</span
								>
								<h2 class="text-anm">Aktuelle Beiträge</h2>
							</div>
						</div>
					</div>
					<div class="row justify-content-center pb-5">
						{#each blogPosts as post}
							<div class="col-xl-4 col-md-6 col-sm-12">
								<!-- Giovanni Blog Post -->
								<div
									class="giovanni-blog-post mb-4 shadow-sm rounded-3 overflow-hidden bg-white"
									data-aos="fade-up"
									data-aos-duration={post.duration}
									use:aosAction
								>
									<div class="post-thumbnail overflow-hidden">
										<img
											src={post.image}
											alt={post.title}
											class="img-fluid w-100 object-fit-cover"
											style="height: 240px; transition: transform 0.4s ease;"
										/>
									</div>
									<div class="post-content p-4">
										<div class="post-meta mb-2 text-muted small">
											<span class="me-3"><i class="far fa-user me-1"></i>{post.author}</span>
											<span><i class="far fa-calendar-alt me-1"></i>{post.date}</span>
										</div>
										<h4 class="mb-3">
											<a href="{resolve('/')}#blog" class="text-dark text-decoration-none">
												{post.title}
											</a>
										</h4>
										<a href="{resolve('/')}#blog" class="read-more style-one">Weiterlesen</a>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</section>
			<!--====== End Blog Section ======-->

			<!--====== Start Instagram Section ======-->
			<section class="giovanni-instagram-sec py-4">
				<div class="container-fluid px-0">
					<!-- Instagram Row -->
					<div class="row g-0">
						{#each instagramImages as img, idx}
							<div class="col-xl-2 col-lg-4 col-md-4 col-6">
								<div class="giovanni-instagram-item position-relative overflow-hidden">
									<a
										href="https://instagram.com/giovanniskaffeewelt"
										target="_blank"
										rel="noreferrer"
										class="d-block position-relative"
									>
										<div class="thumbnail">
											<img
												src={img}
												alt="Instagram Beitrag {idx + 1}"
												class="w-100 object-fit-cover"
												style="height: 220px;"
											/>
											<div class="hover-content">
												<div class="icon">
													<i class="fab fa-instagram"></i>
												</div>
											</div>
										</div>
									</a>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</section>
			<!--====== End Instagram Section ======-->
		</main>

		<!-- Footer -->
		<Footer />
	</div>
</div>

<!-- Video Popup Modal -->
{#if showVideoModal}
	<div
		class="video-modal-backdrop"
		onclick={(e) => {
			if (e.target === e.currentTarget) showVideoModal = false;
		}}
		onkeydown={(e) => e.key === 'Escape' && (showVideoModal = false)}
		role="dialog"
		tabindex="0"
		aria-modal="true"
		aria-label="Video Modal"
	>
		<div class="video-modal-container">
			<button
				class="video-modal-close"
				onclick={() => (showVideoModal = false)}
				aria-label="Video schließen"
			>
				<i class="far fa-times"></i>
			</button>
			<div class="video-responsive-wrap">
				<iframe
					src="https://www.youtube-nocookie.com/embed/Fjf20HmHRd8?autoplay=1"
					title="Giovanni Video"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			</div>
		</div>
	</div>
{/if}

<style>
	:global(.page-banner) {
		position: relative;
	}

	.text-gold {
		color: var(--primary-color, #d0965c);
	}

	.letter-spacing-1 {
		letter-spacing: 1px;
	}

	/* Counter Box Customizations */
	.giovanni-counter-item .icon {
		color: var(--primary-color, #d0965c);
		font-size: 50px;
		margin-bottom: 15px;
	}

	.giovanni-counter-item .content h2 {
		font-family: var(--heading-font, 'Marcellus', serif);
		color: var(--heading-color, #2d4443);
		font-size: 42px;
	}

	.giovanni-counter-item .content p {
		color: #666;
		font-size: 16px;
	}

	/* Video Modal */
	.video-modal-backdrop {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.85);
		z-index: 99999;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
		backdrop-filter: blur(5px);
	}

	.video-modal-container {
		position: relative;
		width: 100%;
		max-width: 860px;
		background: #000;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
	}

	.video-modal-close {
		position: absolute;
		top: 10px;
		right: 15px;
		background: rgba(0, 0, 0, 0.6);
		border: none;
		color: #fff;
		font-size: 24px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
		transition: background 0.3s;
	}

	.video-modal-close:hover {
		background: var(--primary-color, #d0965c);
	}

	.video-responsive-wrap {
		position: relative;
		padding-bottom: 56.25%;
		height: 0;
	}

	.video-responsive-wrap iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}

	/* Instagram Item styling */
	.giovanni-instagram-item .thumbnail {
		position: relative;
		overflow: hidden;
	}

	.giovanni-instagram-item .thumbnail img {
		transition: transform 0.5s ease;
	}

	.giovanni-instagram-item:hover .thumbnail img {
		transform: scale(1.08);
	}

	.giovanni-instagram-item .hover-content {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(45, 68, 67, 0.65);
		opacity: 0;
		transition: opacity 0.35s ease;
	}

	.giovanni-instagram-item:hover .hover-content {
		opacity: 1;
	}

	.giovanni-instagram-item .hover-content .icon {
		color: #fff;
		font-size: 28px;
		transform: translateY(15px);
		transition: transform 0.35s ease;
	}

	.giovanni-instagram-item:hover .hover-content .icon {
		transform: translateY(0);
	}
</style>
