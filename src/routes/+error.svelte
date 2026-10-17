<script lang="ts">
	import { page } from '$app/state';
	import { resolve, asset } from '$app/paths';
	import { AOS, aosAction } from '$lib/actions/aos';
	import { Preloader, Header, Footer } from '$lib/components';
</script>

<svelte:head>
	<title>{page.status} - Seite nicht gefunden | Giovanni's Kaffeewelt</title>
	<meta name="description" content="Die angeforderte Seite wurde nicht gefunden." />
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
								<h1>{page.status === 404 ? '404 Seite' : `Fehler ${page.status}`}</h1>
								<ul>
									<li><a href={resolve('/')}>Startseite</a></li>
									<li>/</li>
									<li>{page.status === 404 ? '404 Seite' : `Fehler ${page.status}`}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!--====== End Page Banner ======-->

			<!--====== Start Error Section ======-->
			<section class="giovanni-404-sec py-5">
				<div class="container">
					<div class="row justify-content-center py-5">
						<div class="col-lg-8">
							<!-- Error Content Box -->
							<div class="error-content-box text-center py-xl-4">
								<div class="giovanni-image mb-5" data-aos="fade-down" data-aos-duration="1000" use:aosAction>
									<img
										src={asset('/assets/images/innerpage/404/404.png')}
										alt="404 Fehlerbild"
										class="img-fluid"
										style="max-width: 480px;"
									/>
								</div>
								<h2 class="mb-3" data-aos="fade-up" data-aos-duration="1200" use:aosAction>
									{page.status === 404 ? 'Hoppla! Dieser Link ist nicht erreichbar!' : 'Ein unerwarteter Fehler ist aufgetreten'}
								</h2>
								<p class="mb-4" data-aos="fade-up" data-aos-duration="1300" use:aosAction>
									{page.error?.message && page.status !== 404
										? page.error.message
										: 'Die gewünschte Seite existiert nicht oder wurde verschoben. Kehren Sie einfach zu unserer Startseite zurück.'}
								</p>
								<div class="giovanni-button text-center" data-aos="fade-up" data-aos-duration="1400" use:aosAction>
									<a href={resolve('/')} class="theme-btn style-one">Zurück zur Startseite</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!--====== End Error Section ======-->
		</main>

		<!-- Footer -->
		<Footer />
	</div>
</div>

<style>
	:global(.page-banner) {
		position: relative;
	}

	.error-content-box h2 {
		font-family: var(--heading-font, 'Marcellus', serif);
		color: var(--heading-color, #2d4443);
		font-size: 54px;
		line-height: 1.2;
	}

	@media (max-width: 991.98px) {
		.error-content-box h2 {
			font-size: 38px;
		}
	}

	@media (max-width: 575.98px) {
		.error-content-box h2 {
			font-size: 28px;
		}
	}

	.error-content-box p {
		font-size: 18px;
		color: #555555;
		max-width: 550px;
		margin-left: auto;
		margin-right: auto;
	}
</style>
