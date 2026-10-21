<script lang="ts">
	import { resolve, asset } from '$app/paths';
	import { aosAction } from '$lib/actions/aos';
</script>

<footer class="default-footer rs-footer pt-5 p-r z-1" id="contact">
	<div class="shape shape-one">
		<img src={asset('/assets/images/home-restaurant/footer/shape1.png')} alt="Footer decorative shape" />
	</div>
	<div class="shape shape-two">
		<img src={asset('/assets/images/home-restaurant/footer/shape2.png')} alt="Footer decorative shape" />
	</div>

	<div class="container">
		<!-- Footer Widget Area -->
		<div class="footer-widget-area py-5">
			<div class="row">
				<div class="col-xl-3 col-md-6">
					<!-- Footer About Widget -->
					<div class="footer-widget footer-about-widget mb-4 pb-3" data-aos="fade-up" data-aos-duration="800" use:aosAction>
						<div class="widget-content">
							<a href={resolve('/')} class="mb-4 d-inline-block brand-logo-footer">
								<img
									src={asset('/assets/logo.svg')}
									alt="Giovanni's Kaffeewelt Logo"
								/>
							</a>
							<p class="mb-4">Giovanni's Kaffeewelt bietet authentische italienische Aromen, Kaffeespezialitäten und ein gemütliches Ambiente.</p>
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
					<div class="footer-widget footer-nav-widget mb-4 pb-3" data-aos="fade-up" data-aos-duration="1000" use:aosAction>
						<h4 class="widget-title mb-3 pb-2">Nützliche Links</h4>
						<div class="widget-content">
							<ul>
								<li><a href={resolve('/uber-uns')}>Über uns</a></li>
								<li><a href="{resolve('/')}#menu">Speisekarte</a></li>
								<li><a href={resolve('/blog')}>Blog & Aktuelles</a></li>
								<li><a href={resolve('/404')}>404 Seite</a></li>
								<li><a href={resolve('/contact')}>Kontakt</a></li>
							</ul>
						</div>
					</div>
				</div>

				<div class="col-xl-3 col-md-6">
					<!-- Footer Time Widget -->
					<div class="footer-widget footer-time-widget mb-4 pb-3" data-aos="fade-up" data-aos-duration="1200" use:aosAction>
						<h4 class="widget-title mb-3 pb-2">Öffnungszeiten</h4>
						<div class="widget-content">
							<ul>
								<li><span class="days">So - Do:</span><span class="time">08:00 - 18:00 Uhr</span></li>
								<li><span class="days">Fr - Sa:</span><span class="time">08:00 - 18:00 Uhr</span></li> 
							</ul>
						</div>
					</div>
				</div>

				<div class="col-xl-4 col-md-6">
					<!-- Footer Newsletter Widget -->
					<div class="footer-widget footer-newsletter-widget mb-4 pb-3" data-aos="fade-up" data-aos-duration="1400" use:aosAction>
						<h4 class="widget-title mb-3 pb-2">Unser Newsletter</h4>
						<div class="widget-content">
							<p>Köstliche Neuigkeiten, Angebote & mehr</p>
							<form onsubmit={(e) => { e.preventDefault(); alert('Vielen Dank für Ihre Anmeldung!'); }}>
								<div class="form-group d-flex">
									<input
										type="email"
										class="form_control"
										placeholder="E-Mail-Adresse eingeben"
										name="email"
										required
									/>
									<button type="submit" class="submit-btn" aria-label="Newsletter abonnieren">
										Abonnieren <i class="far fa-paper-plane ms-1"></i>
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
					<div class="copyright-text" data-aos="fade-right" data-aos-duration="1200" use:aosAction>
						<p class="mb-0 text-white-50">&copy; 2025 Alle Rechte vorbehalten &bull; Giovanni's Kaffeewelt</p>
					</div>
				</div>
				<div class="col-md-6">
					<div class="copyright-link float-md-end text-white-50" data-aos="fade-left" data-aos-duration="1400" use:aosAction>
						<a href="#terms" class="me-3">Datenschutz</a>
						<a href="#terms">AGB</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</footer>

<style>
	:global(.footer-about-widget .brand-logo-footer img) {
		width: 190px;
		height: auto;
		display: block;
	}
</style>
