<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import AOS from 'aos';

	let container = $state<HTMLElement>();
	let preloaderVisible = $state(true);
	let mobileMenuOpen = $state(false);
	let activeSubMenu = $state<string | null>(null);
	let scrollY = $state(0);
	let isSticky = $state(false);
	let lastScroll = 0;

	// Food items hover state
	let activeFood = $state<number | null>(null);
	let foodX = $state(0);
	let foodY = $state(0);

	const foodItems = [
		{
			name: 'Lobster',
			desc: 'Mixed Salad & Drinks',
			image: `${base}/assets/images/home-restaurant/menu/menu-img1.jpg`
		},
		{
			name: 'Chickens',
			desc: 'Mixed Salad & Soft Drinks',
			image: `${base}/assets/images/home-restaurant/menu/menu-img2.jpg`
		},
		{
			name: 'Risotto',
			desc: 'Mixed Soft Drinks',
			image: `${base}/assets/images/home-restaurant/menu/menu-img3.jpg`
		}
	];

	// Testimonials slider state
	let currentTestimonial = $state(0);
	const testimonials = [
		{
			quote:
				'Italian Redefined offers a delightful culinary experience. Each dish blends traditional Italian flavors with contemporary flair. Fresh ingredients and exceptional hospitality.',
			author: 'John Smith / Main Chef',
			rating: 5
		},
		{
			quote:
				'Bistly has become our favorite dining destination in town. The pasta is handmade daily, the wine pairings are inspired, and the atmosphere is wonderfully romantic.',
			author: 'Elena Rostova / Food Critic',
			rating: 5
		},
		{
			quote:
				'An extraordinary gastronomic journey. Every plate is crafted with authentic passion, exquisite balance, and an eye for artistic presentation.',
			author: 'Marco Valenti / Sommelier',
			rating: 5
		}
	];

	function nextTestimonial() {
		currentTestimonial = (currentTestimonial + 1) % testimonials.length;
	}

	function prevTestimonial() {
		currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
	}

	function toggleSubMenu(name: string) {
		activeSubMenu = activeSubMenu === name ? null : name;
	}

	function handleFoodEnter(index: number, e: MouseEvent) {
		activeFood = index;
		const target = e.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		foodX = e.clientX - rect.left;
		foodY = e.clientY - rect.top;
	}

	function handleFoodMove(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		foodX = e.clientX - rect.left;
		foodY = e.clientY - rect.top;
	}

	function handleFoodLeave() {
		activeFood = null;
	}

	// Sticky Header on Scroll
	$effect(() => {
		if (scrollY > 200) {
			if (scrollY < lastScroll) {
				isSticky = true;
			} else {
				isSticky = false;
			}
		} else {
			isSticky = false;
		}
		lastScroll = scrollY;
	});

	onMount(() => {
		// Preloader
		const timer = setTimeout(() => {
			preloaderVisible = false;
		}, 400);

		// AOS Initialization
		if (typeof AOS !== 'undefined') {
			AOS.init({
				offset: 40,
				duration: 800,
				once: true
			});
		}

		// GSAP Registration
		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			// Hero Content Entrance Animation
			gsap.from('.hero-content', {
				y: 35,
				opacity: 0,
				duration: 1.1,
				ease: 'power3.out'
			});

			// Hero Arch Images Subtle Floating Parallax
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

			// Headings with .text-anm scroll trigger reveal
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

			// Big Text Scroll Parallax in About Section
			const bigText = document.querySelector('.rs-about .big-text');
			if (bigText) {
				gsap.to(bigText, {
					scrollTrigger: {
						trigger: '.rs-about',
						start: 'top bottom',
						end: 'bottom top',
						scrub: 1
					},
					x: -80,
					ease: 'none'
				});
			}
		}, container);

		return () => {
			clearTimeout(timer);
			ctx.revert();
		};
	});
</script>

<svelte:window bind:scrollY={scrollY} />

<!--====== Start Loader Area ======-->
{#if preloaderVisible}
	<div class="preloader">
		<div class="loader"></div>
	</div>
{/if}

<!--====== Start Overlay ======-->
<div
	class="offcanvas__overlay {mobileMenuOpen ? 'overlay-open' : ''}"
	onclick={() => (mobileMenuOpen = false)}
	onkeydown={(e) => e.key === 'Escape' && (mobileMenuOpen = false)}
	role="button"
	tabindex="0"
	aria-label="Close Mobile Menu"
></div>

<!--====== Start Header Area ======-->
<header class="header-area header-one transparent-header {isSticky ? 'sticky' : ''}">
	<div class="container">
		<!-- Header Navigation -->
		<div class="header-navigation">
			<div class="nav-inner-menu">
				<div class="primary-menu">
					<!-- Site Branding -->
					<div class="site-branding">
						<a href="/" class="brand-logo">
							<img src="{base}/assets/images/home-restaurant/logo/logo-white.png" alt="Bistly Logo" />
						</a>
					</div>

					<!-- Theme Main Menu -->
					<div class="theme-nav-menu {mobileMenuOpen ? 'menu-on' : ''}">
						<!-- Mobile Menu Top -->
						<div class="theme-menu-top d-flex justify-content-between d-block d-lg-none mb-4">
							<div class="site-branding">
								<a href="/" class="brand-logo">
									<img src="{base}/assets/images/home-restaurant/logo/logo-main.png" alt="Bistly Logo" />
								</a>
							</div>
							<button class="navbar-close border-0 bg-transparent" onclick={() => (mobileMenuOpen = false)} aria-label="Close menu">
								<i class="far fa-times"></i>
							</button>
						</div>

						<!-- Navigation Links -->
						<nav class="main-menu">
							<ul>
								<li class="menu-item has-children">
									<a href="/" onclick={(e) => { e.preventDefault(); toggleSubMenu('home'); }}>
										Home
										<span class="dd-trigger ms-1"><i class="far fa-angle-down"></i></span>
									</a>
									<ul class="sub-menu" style="display: {activeSubMenu === 'home' || !mobileMenuOpen ? '' : 'none'};">
										<li><a href="/">Home Restaurant</a></li>
										<li><a href="#about">About Us</a></li>
										<li><a href="#menu">Menu</a></li>
									</ul>
								</li>
								<li class="menu-item"><a href="#about">About Us</a></li>
								<li class="menu-item has-children">
									<a href="#menu" onclick={(e) => { e.preventDefault(); toggleSubMenu('menu'); }}>
										Menu
										<span class="dd-trigger ms-1"><i class="far fa-angle-down"></i></span>
									</a>
									<ul class="sub-menu" style="display: {activeSubMenu === 'menu' || !mobileMenuOpen ? '' : 'none'};">
										<li><a href="#menu">Main Menu</a></li>
										<li><a href="#gallery">Gallery</a></li>
										<li><a href="#chefs">Our Chefs</a></li>
									</ul>
								</li>
								<li class="menu-item has-children">
									<a href="#chefs" onclick={(e) => { e.preventDefault(); toggleSubMenu('pages'); }}>
										Pages
										<span class="dd-trigger ms-1"><i class="far fa-angle-down"></i></span>
									</a>
									<ul class="sub-menu" style="display: {activeSubMenu === 'pages' || !mobileMenuOpen ? '' : 'none'};">
										<li><a href="#chefs">Our Chefs</a></li>
										<li><a href="#opening-time">Opening Hours</a></li>
										<li><a href="#blog">Latest Blog</a></li>
									</ul>
								</li>
								<li class="menu-item"><a href="#contact">Contact</a></li>
							</ul>
						</nav>

						<!-- Theme Nav Button (Mobile) -->
						<div class="theme-nav-button mt-3 d-block d-md-none">
							<a href="#reservation" class="theme-btn style-one">Reservation</a>
						</div>

						<!-- Theme Menu Bottom (Mobile) -->
						<div class="theme-menu-bottom mt-5 d-block d-lg-none">
							<h5>Follow Us</h5>
							<ul class="social-link">
								<li><a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a></li>
								<li><a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><i class="fab fa-twitter"></i></a></li>
								<li><a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><i class="fab fa-instagram"></i></a></li>
								<li><a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><i class="fab fa-youtube"></i></a></li>
							</ul>
						</div>
					</div>

					<!-- Header Nav Right -->
					<div class="nav-right-item">
						<div class="nav-button d-none d-md-block">
							<a href="#reservation" class="theme-btn style-one">Reservation</a>
						</div>
						<button
							class="navbar-toggler {mobileMenuOpen ? 'active' : ''} border-0 bg-transparent"
							onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
							aria-label="Toggle Navigation Menu"
						>
							<span></span>
							<span></span>
							<span></span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</header>

<div bind:this={container} id="smooth-wrapper">
	<div id="smooth-content">
		<main>
			<!--====== Start Hero Section ======-->
			<section
				class="rs-hero bg_cover"
				style="background-image: url('{base}/assets/images/home-restaurant/hero/hero-bg.jpg');"
			>
				<!-- Hero Arch Images -->
				<div class="hero-image image_one">
					<img src="{base}/assets/images/home-restaurant/hero/hero-img1.jpg" alt="Italian Dish" />
				</div>
				<div class="hero-image image_two">
					<img src="{base}/assets/images/home-restaurant/hero/hero-img2.jpg" alt="Artisan Pasta" />
				</div>

				<div class="container">
					<div class="row justify-content-center">
						<div class="col-lg-6">
							<!-- Hero Content -->
							<div class="hero-content text-center">
								<img
									src="{base}/assets/images/home-restaurant/hero/sub.png"
									class="sub-head"
									alt="Decorative Subheading"
								/>
								<h1 class="text-anm">Classic Italian Redefined</h1>
								<p data-aos="fade-up" data-aos-duration="1000">
									Classic Italian cuisine reimagined with modern flair, fresh ingredients, and bold flavors
								</p>
								<div class="bistly-button mb-3 pb-3 mb-lg-5 pb-lg-5" data-aos="fade-up" data-aos-duration="1200">
									<a href="#reservation" class="theme-btn style-one">Make A Reservation</a>
								</div>
								<div class="row">
									<div class="col-md-6">
										<!-- Bistly Counter -->
										<div class="bistly-counter-item text-center mb-4" data-aos="fade-up" data-aos-duration="1300">
											<div class="content">
												<h2 class="mb-4"><span class="counter">25</span>+</h2>
												<p>Years of Experience</p>
											</div>
										</div>
									</div>
									<div class="col-md-6">
										<!-- Bistly Counter -->
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

			<!--====== Start About Section ======-->
			<section class="rs-about p-r z-1 py-5" id="about">
				<div class="shape shape-one">
					<span><img src="{base}/assets/images/home-restaurant/about/shape1.png" alt="Decorative leaf shape" /></span>
				</div>
				<div class="shape shape-two">
					<span><img src="{base}/assets/images/home-restaurant/about/shape2.png" alt="Decorative botanical shape" /></span>
				</div>
				<div class="big-text text-anm">A Culinary <br /> Journey</div>
				<div class="container">
					<div class="row py-5 my-xl-4">
						<div class="col-lg-6">
							<!-- Bistly Content Box Left -->
							<div class="bistly-content-box mb-5 text-center text-lg-start">
								<div class="bistly-image image-one mb-5 pb-5" data-aos="fade-up" data-aos-duration="1000">
									<img src="{base}/assets/images/home-restaurant/about/about-img1.jpg" alt="Chef plating" />
								</div>
								<p class="mb-4" data-aos="fade-up" data-aos-duration="1200">
									Embark on a culinary journey where tradition meets innovation. Our dishes are thoughtfully crafted with the finest ingredients, celebrating flavors from Italy and beyond. Each bite tells a story.
								</p>
								<div class="author-sign" data-aos="fade-up" data-aos-duration="1400">
									<img src="{base}/assets/images/home-restaurant/about/sign.png" alt="Signature" />
									<h5 class="mt-3">CEO & Founder</h5>
								</div>
							</div>
						</div>
						<div class="col-lg-6">
							<!-- Bistly Content Box Right -->
							<div class="bistly-content-box text-center text-lg-start">
								<h3 class="ps-lg-5 ms-xxl-5" data-aos="fade-up" data-aos-duration="1000">
									Every dish is expertly crafted by our skilled chefs using freshest ingredients sourced from local farms
								</h3>
								<div class="bistly-image image-two pt-5 mt-5 text-center text-lg-end" data-aos="fade-up" data-aos-duration="1200">
									<img src="{base}/assets/images/home-restaurant/about/about-img2.jpg" alt="Signature Italian dish" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!--====== Start Enjoy Food Section ======-->
			<section class="rs-enjoy-food p-r z-1 py-5">
				<div class="shape shape-one">
					<span><img src="{base}/assets/images/home-restaurant/features/f-shape2.png" alt="Feature shape" /></span>
				</div>
				<div class="shape shape-two">
					<span><img src="{base}/assets/images/home-restaurant/features/f-shape1.png" alt="Feature shape" /></span>
				</div>
				<div class="container">
					<div class="row justify-content-center py-5 my-xl-4 align-items-center">
						<div class="col-xl-3 col-md-6 d-xl-block d-none">
							<!-- Left Feature Images -->
							<div class="bistly-image-box image-box-one">
								<div class="row">
									<div class="col-md-6">
										<div class="bistly-image image-radius mb-4" data-aos="fade-down" data-aos-duration="1000">
											<img src="{base}/assets/images/home-restaurant/features/feat-img1.jpg" alt="Specialty plate" />
										</div>
									</div>
									<div class="col-md-6">
										<div class="bistly-image image-radius mb-4" data-aos="fade-down" data-aos-duration="1100">
											<img src="{base}/assets/images/home-restaurant/features/feat-img2.jpg" alt="Artisan dessert" />
										</div>
									</div>
									<div class="col-sm-12">
										<div class="bistly-image mb-4" data-aos="fade-up" data-aos-duration="1200">
											<img src="{base}/assets/images/home-restaurant/features/feat-img3.jpg" alt="Gourmet dinner" />
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="col-xl-6 col-lg-9 order-xl-2 order-2">
							<!-- Center Content -->
							<div class="bistly-content-box text-white text-center">
								<div class="section-title text-center mb-4">
									<span class="sub-title" data-aos="fade-down" data-aos-duration="1000">Enjoy Your Food</span>
									<h2 class="text-anm">Pure Pleasure on Every Plate</h2>
								</div>
								<p class="mb-5 pb-2" data-aos="fade-up" data-aos-duration="1000">
									Experience pure pleasure on every plate—artfully prepared dishes, fresh ingredients, and bold flavors that awaken your senses and satisfy deeply.
								</p>
								<div class="bistly-button" data-aos="fade-up" data-aos-duration="1000">
									<a href="#contact" class="theme-btn style-two">Contact Us</a>
								</div>
							</div>
						</div>

						<div class="col-xl-3 col-md-6 order-xl-3 order-1">
							<!-- Right Feature Image -->
							<div class="bistly-image-box image-box-two mb-xl-0 mb-5">
								<div class="bistly-image" data-aos="fade-up" data-aos-duration="1000">
									<img src="{base}/assets/images/home-restaurant/features/feat-img4.png" alt="Signature cocktail" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!--====== Start Food Menu Section ======-->
			<section class="rs-food-menu py-5" id="menu">
				<div class="container">
					<div class="row py-5">
						<div class="col-lg-12">
							<div class="section-title mt-3 text-white text-center">
								<span class="sub-title" data-aos="fade-down" data-aos-duration="1000">Our Food Menu</span>
								<h2 class="text-anm">Choose Your Food</h2>
							</div>
						</div>
					</div>

					<div class="row pb-5">
						<div class="col-lg-12">
							{#each foodItems as item, idx}
								<div
									class="bistly-food-item position-relative"
									data-aos="fade-down"
									data-aos-duration={1000 + idx * 200}
									onmouseenter={(e) => handleFoodEnter(idx, e)}
									onmousemove={handleFoodMove}
									onmouseleave={handleFoodLeave}
									role="region"
									aria-label={item.name}
								>
									<div
										class="hover-image"
										style="opacity: {activeFood === idx ? 1 : 0}; visibility: {activeFood === idx ? 'visible' : 'hidden'}; pointer-events: none; transform: translate3d({foodX}px, {foodY}px, 0);"
									>
										<img src={item.image} alt={item.name} />
									</div>
									<div class="content">
										<h2 class="mb-4">{item.name}</h2>
										<p>{item.desc}</p>
									</div>
								</div>
							{/each}
						</div>
					</div>

					<div class="row pb-5">
						<div class="col-lg-12">
							<div class="bistly-button mb-xl-4 text-center" data-aos="fade-down" data-aos-duration="1600">
								<a href="#menu" class="theme-btn style-two">View All Menu Item</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!--====== Start Gallery Section ======-->
			<section class="rs-gallery pt-5" id="gallery">
				<div class="container">
					<div class="row py-5">
						<div class="col-lg-12">
							<div class="section-title text-center mt-4">
								<img src="{base}/assets/images/home-restaurant/gallery/sub.png" class="mb-4" alt="Sub Title" />
								<h2>Romantic Dinner</h2>
							</div>
						</div>
					</div>
				</div>

				<div class="container-fluid px-3 px-md-5">
					<div class="row g-4 justify-content-center">
						<div class="col-xl-3 col-md-6 col-sm-12">
							<div class="bistly-gallery-item overflow-hidden rounded-3 shadow-lg">
								<div class="gallery-img">
									<img
										src="{base}/assets/images/home-restaurant/gallery/gallery-img1.jpg"
										alt="Romantic table setting"
										class="w-100 object-fit-cover"
									/>
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-md-6 col-sm-12">
							<div class="bistly-gallery-item overflow-hidden rounded-3 shadow-lg">
								<div class="gallery-img">
									<img
										src="{base}/assets/images/home-restaurant/gallery/gallery-img2.jpg"
										alt="Chef wine pouring"
										class="w-100 object-fit-cover"
									/>
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-md-6 col-sm-12">
							<div class="bistly-gallery-item overflow-hidden rounded-3 shadow-lg">
								<div class="gallery-img">
									<img
										src="{base}/assets/images/home-restaurant/gallery/gallery-img3.jpg"
										alt="Candlelit meal"
										class="w-100 object-fit-cover"
									/>
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-md-6 col-sm-12">
							<div class="bistly-gallery-item overflow-hidden rounded-3 shadow-lg">
								<div class="gallery-img">
									<img
										src="{base}/assets/images/home-restaurant/gallery/gallery-img2.jpg"
										alt="Elegant dinner"
										class="w-100 object-fit-cover"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!--====== Start Testimonial Section ======-->
			<section class="rs-testimonial pb-5 pt-4">
				<div class="container">
					<div class="row justify-content-center py-5">
						<div class="col-xl-8 col-lg-10">
							<div class="testimonial-slider position-relative">
								{#each testimonials as item, idx}
									{#if currentTestimonial === idx}
										<div class="bistly-testimonial-item mb-4 text-center">
											<div class="testimonial-content">
												<div class="ratings mb-3 text-warning">
													{#each Array(item.rating) as _}
														<i class="fas fa-star mx-1"></i>
													{/each}
												</div>
												<p class="fs-4 fst-italic mb-4 text-white-50">"{item.quote}"</p>
												<span class="fw-bold text-white fs-6">{item.author}</span>
											</div>
										</div>
									{/if}
								{/each}

								<!-- Custom Slider Controls -->
								<div class="d-flex justify-content-center gap-3 mt-4">
									<button
										class="btn btn-outline-light rounded-circle px-3 py-2"
										onclick={prevTestimonial}
										aria-label="Previous Testimonial"
									>
										<i class="far fa-angle-left"></i>
									</button>
									<button
										class="btn btn-outline-light rounded-circle px-3 py-2"
										onclick={nextTestimonial}
										aria-label="Next Testimonial"
									>
										<i class="far fa-angle-right"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!--====== Start Team / Chefs Section ======-->
			<section class="rs-team py-5" id="chefs">
				<div class="container">
					<div class="row justify-content-center py-5">
						<div class="col-lg-6">
							<div class="section-title text-center mt-4">
								<span class="sub-title" data-aos="fade-down" data-aos-duration="1000">Our Chefs</span>
								<h2 class="text-anm">The Fly & Fine Chefs</h2>
							</div>
						</div>
					</div>

					<div class="row justify-content-center pb-5">
						<div class="col-lg-4 col-md-6 col-sm-12">
							<div class="rs-team-item text-center mb-4" data-aos="fade-up" data-aos-duration="1000">
								<div class="member-image mb-4">
									<img src="{base}/assets/images/home-restaurant/team/team-img1.jpg" alt="Massimo Bottura" />
								</div>
								<div class="member-info">
									<h3>Massimo Bottura</h3>
									<span class="position">Main Chef</span>
								</div>
							</div>
						</div>
						<div class="col-lg-4 col-md-6 col-sm-12">
							<div class="rs-team-item text-center mb-4" data-aos="fade-up" data-aos-duration="1200">
								<div class="member-image mb-4">
									<img src="{base}/assets/images/home-restaurant/team/team-img2.jpg" alt="Alain Ducasse" />
								</div>
								<div class="member-info">
									<h3>Alain Ducasse</h3>
									<span class="position">Junior Chef</span>
								</div>
							</div>
						</div>
						<div class="col-lg-4 col-md-6 col-sm-12">
							<div class="rs-team-item text-center mb-4" data-aos="fade-up" data-aos-duration="1400">
								<div class="member-image mb-4">
									<img src="{base}/assets/images/home-restaurant/team/team-img3.jpg" alt="Gordon Ramsay" />
								</div>
								<div class="member-info">
									<h3>Gordon Ramsay</h3>
									<span class="position">Junior Chef</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!--====== Start Booking Section ======-->
			<section
				class="rs-booking bg_cover p-r z-1 py-5"
				id="reservation"
				style="background-image: url('{base}/assets/images/home-restaurant/bg/booking-bg.jpg')"
			>
				<div class="container">
					<div class="row py-5 justify-content-center">
						<div class="col-lg-6">
							<div class="bistly-content-box text-center">
								<div class="section-title text-center text-white mb-5">
									<span class="sub-title" data-aos="fade-down" data-aos-duration="1000">Book Now</span>
									<h2 class="text-anm">Booking In Your Table</h2>
								</div>
								<div class="bistly-button" data-aos="fade-up" data-aos-duration="1200">
									<a href="#contact" class="theme-btn style-two">Make A Reservation</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!--====== Start Opening Time & Map Section ======-->
			<section class="rs-time-sec py-5" id="opening-time">
				<div class="container">
					<div class="row justify-content-center py-xl-4 mt-xl-5">
						<div class="col-xl-6 col-lg-8 col-md-10">
							<div class="bistly-content-box text-white text-center text-xl-start mb-5">
								<div class="section-title mb-4">
									<h2 class="text-anm">Join Us During These Opening Time</h2>
								</div>
								<p class="mb-4" data-aos="fade-up" data-aos-duration="1000">
									Join us during our opening hours for a memorable dining experience filled with delicious food, warm ambiance, and friendly service.
								</p>
								<div class="bistly-button" data-aos="fade-up" data-aos-duration="1200">
									<a href="#contact" class="theme-btn style-two">Contact Us</a>
								</div>
							</div>

							<!-- Map Box -->
							<div class="map-box mt-5 pt-3" data-aos="fade-up" data-aos-duration="1400">
								<iframe
									title="Restaurant Location Map"
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2370.3!2d10.018!3d53.553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDMzJzExLjAiTiAxMMKwMDEnMDUuMCJF!5e0!3m2!1sen!2sde!4v1700000000000"
									width="100%"
									height="280"
									style="border:0;"
									loading="lazy"
								></iframe>
							</div>
						</div>

						<div class="col-xl-6 col-lg-8 col-md-10">
							<div class="opening-time-box mb-5 mt-5 mt-xl-0" data-aos="fade-up" data-aos-duration="1000">
								<h3>Opening Time</h3>
								<ul>
									<li>Monday <span>10:00AM - 07:00PM</span></li>
									<li>Tuesday <span>10:00AM - 06:00PM</span></li>
									<li>Wednesday <span>10:00AM - 06:30PM</span></li>
									<li>Thursday <span>10:00AM - 07:00PM</span></li>
									<li>Friday <span>10:00AM - 06:00PM</span></li>
									<li>Saturday <span>10:00AM - 06:30PM</span></li>
									<li>Sunday <span class="close">Closed</span></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!--====== Start Blog Section ======-->
			<section class="rs-blog py-5" id="blog">
				<div class="container">
					<div class="row justify-content-center py-5">
						<div class="col-lg-7">
							<div class="section-title text-center mt-4">
								<span class="sub-title" data-aos="fade-down" data-aos-duration="1000">Latest Blog</span>
								<h2 class="text-anm">Our Recent Posts</h2>
							</div>
						</div>
					</div>

					<div class="row justify-content-center pb-xl-4">
						<!-- Blog Post 1 (Featuring blog-img1.jpg) -->
						<div class="col-xl-4 col-md-6 col-sm-12">
							<div class="bistly-blog-post mb-5" data-aos="fade-up" data-aos-duration="1000">
								<div class="post-thumbnail">
									<img src="{base}/blog-img1.jpg" alt="Easy Summer Dishes" />
								</div>
								<div class="post-content">
									<div class="post-meta">
										<span><i class="far fa-user me-1"></i>By John</span>
										<span><i class="far fa-calendar-alt me-1"></i>May 19, 2025</span>
									</div>
									<h4><a href="#blog">Easy Summer Dishes to Keep You Cool & Full</a></h4>
									<a href="#blog" class="read-more style-one">Read More</a>
								</div>
							</div>
						</div>

						<!-- Blog Post 2 -->
						<div class="col-xl-4 col-md-6 col-sm-12">
							<div class="bistly-blog-post mb-5" data-aos="fade-up" data-aos-duration="1200">
								<div class="post-thumbnail">
									<img src="{base}/assets/images/home-restaurant/blog/blog-img2.jpg" alt="Chef Delicia" />
								</div>
								<div class="post-content">
									<div class="post-meta">
										<span><i class="far fa-user me-1"></i>By John</span>
										<span><i class="far fa-calendar-alt me-1"></i>May 19, 2025</span>
									</div>
									<h4><a href="#blog">A Day in the Life of Our Head Chef at Delicia</a></h4>
									<a href="#blog" class="read-more style-one">Read More</a>
								</div>
							</div>
						</div>

						<!-- Blog Post 3 -->
						<div class="col-xl-4 col-md-6 col-sm-12">
							<div class="bistly-blog-post mb-5" data-aos="fade-up" data-aos-duration="1400">
								<div class="post-thumbnail">
									<img src="{base}/assets/images/home-restaurant/blog/blog-img3.jpg" alt="Mediterranean Menu" />
								</div>
								<div class="post-content">
									<div class="post-meta">
										<span><i class="far fa-user me-1"></i>By John</span>
										<span><i class="far fa-calendar-alt me-1"></i>May 19, 2025</span>
									</div>
									<h4><a href="#blog">The Mediterranean Influence Behind Our New Menu Items</a></h4>
									<a href="#blog" class="read-more style-one">Read More</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>

		<!--====== Start Footer ======-->
		<footer class="default-footer rs-footer pt-5 p-r z-1" id="contact">
			<div class="shape shape-one">
				<img src="{base}/assets/images/home-restaurant/footer/shape1.png" alt="Footer decorative shape" />
			</div>
			<div class="shape shape-two">
				<img src="{base}/assets/images/home-restaurant/footer/shape2.png" alt="Footer decorative shape" />
			</div>

			<div class="container">
				<!-- Footer Widget Area -->
				<div class="footer-widget-area py-5">
					<div class="row">
						<div class="col-xl-3 col-md-6">
							<!-- Footer About Widget -->
							<div class="footer-widget footer-about-widget mb-4 pb-3" data-aos="fade-up" data-aos-duration="800">
								<div class="widget-content">
									<a href="/" class="mb-4 d-inline-block">
										<img src="{base}/assets/images/home-restaurant/logo/logo-white.png" alt="Bistly Logo" />
									</a>
									<p class="mb-4">Bistly Restaurant offers flavorful dishes, cozy ambiance, and authentic hospitality.</p>
									<div class="social-box">
										<a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
										<a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
										<a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
										<a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
									</div>
								</div>
							</div>
						</div>

						<div class="col-xl-2 col-md-6">
							<!-- Footer Nav Widget -->
							<div class="footer-widget footer-nav-widget mb-4 pb-3" data-aos="fade-up" data-aos-duration="1000">
								<h4 class="widget-title mb-3 pb-2">Useful Link</h4>
								<div class="widget-content">
									<ul>
										<li><a href="#about">About Us</a></li>
										<li><a href="#chefs">Our Team</a></li>
										<li><a href="#menu">Our Menu</a></li>
										<li><a href="#blog">Our Blog</a></li>
										<li><a href="#contact">Contact</a></li>
									</ul>
								</div>
							</div>
						</div>

						<div class="col-xl-3 col-md-6">
							<!-- Footer Time Widget -->
							<div class="footer-widget footer-time-widget mb-4 pb-3" data-aos="fade-up" data-aos-duration="1200">
								<h4 class="widget-title mb-3 pb-2">Opening Time</h4>
								<div class="widget-content">
									<ul>
										<li><span class="days">Mon - Thu:</span><span class="time">10:00 am - 01:00 am</span></li>
										<li><span class="days">Fri - Sat:</span><span class="time">10:00 am - 01:00 am</span></li>
										<li><span class="days">Sunday:</span><span class="off-day">Off Day</span></li>
									</ul>
								</div>
							</div>
						</div>

						<div class="col-xl-4 col-md-6">
							<!-- Footer Newsletter Widget -->
							<div class="footer-widget footer-newsletter-widget mb-4 pb-3" data-aos="fade-up" data-aos-duration="1400">
								<h4 class="widget-title mb-3 pb-2">Our Newsletter</h4>
								<div class="widget-content">
									<p>Delicious Tips, Dish Updates & More</p>
									<form onsubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }}>
										<div class="form-group d-flex">
											<input
												type="email"
												class="form_control"
												placeholder="Enter Email Address"
												name="email"
												required
											/>
											<button type="submit" class="submit-btn" aria-label="Subscribe to newsletter">
												Subscribe <i class="far fa-paper-plane ms-1"></i>
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Copyright Area -->
				<div class="copyright-area pt-4 pb-4 border-top border-secondary border-opacity-25">
					<div class="row align-items-center">
						<div class="col-md-6">
							<div class="copyright-text" data-aos="fade-right" data-aos-duration="1200">
								<p class="mb-0 text-white-50">&copy; 2025 All rights reserved by Pixelfit</p>
							</div>
						</div>
						<div class="col-md-6">
							<div class="copyright-link float-md-end text-white-50" data-aos="fade-left" data-aos-duration="1400">
								<a href="#terms" class="me-3">Privacy Policy</a>
								<a href="#terms">Terms & Condition</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	</div>
</div>
