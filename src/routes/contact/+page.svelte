<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve, asset } from '$app/paths';
	import { AOS, aosAction } from '$lib/actions/aos';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { Preloader, Header, Footer } from '$lib/components';
	import { supabase } from '$lib/supabaseClient';
	import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public';

	// Form field states
	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let person = $state('2 Personen');
	let time = $state('18:00 Uhr');
	let message = $state('');

	// Submission UI states
	let isSubmitting = $state(false);
	let isSuccess = $state(false);
	let errorMessage = $state('');

	onMount(() => {
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

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		if (!name.trim()) {
			errorMessage = 'Bitte geben Sie Ihren Namen ein.';
			return;
		}

		if (!phone.trim()) {
			errorMessage = 'Bitte geben Sie Ihre Telefonnummer ein.';
			return;
		}

		isSubmitting = true;
		errorMessage = '';

		const payload = {
			name: name.trim(),
			email: email.trim(),
			phone: phone.trim(),
			guests: parseInt(person) || 2,
			time: time,
			date: new Date().toISOString().split('T')[0],
			note: message.trim() || undefined,
			message: message.trim() || undefined
		};

		let sentSuccessfully = false;
		let lastError = '';

		// 1. Try invoking 'telegram-notify-reservation' via Supabase client
		try {
			const res = await supabase.functions.invoke('telegram-notify-reservation', {
				body: payload
			});

			if (!res.error) {
				sentSuccessfully = true;
			} else {
				console.warn('Supabase invoke error:', res.error);
				lastError = res.error.message || '';
			}
		} catch (err: any) {
			console.warn('Supabase invoke exception:', err);
			lastError = err?.message || '';
		}

		// 2. Fallback: Try quick-action
		if (!sentSuccessfully) {
			try {
				const res = await supabase.functions.invoke('quick-action', {
					body: payload
				});

				if (!res.error) {
					sentSuccessfully = true;
				} else {
					console.warn('Supabase quick-action error:', res.error);
					lastError = res.error.message || lastError;
				}
			} catch (err: any) {
				console.warn('Supabase quick-action exception:', err);
				lastError = err?.message || lastError;
			}
		}

		// 3. Fallback: Try server API endpoint /api/reservation
		if (!sentSuccessfully) {
			try {
				const apiRes = await fetch('/api/reservation', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(payload)
				});

				if (apiRes.ok) {
					sentSuccessfully = true;
				} else {
					const apiJson = (await apiRes.json().catch(() => null)) as Record<string, any> | null;
					lastError = apiJson?.error || `Status ${apiRes.status}`;
				}
			} catch (apiErr: any) {
				console.warn('Server proxy /api/reservation failed:', apiErr);
			}
		}

		isSubmitting = false;

		if (sentSuccessfully) {
			isSuccess = true;
			name = '';
			email = '';
			phone = '';
			message = '';
		} else {
			errorMessage =
				lastError ||
				'Es gab ein Problem beim Absenden Ihrer Anfrage. Bitte kontaktieren Sie uns direkt unter +49 176 41585060.';
		}
	}

	function resetForm() {
		isSuccess = false;
		errorMessage = '';
	}
</script>

<svelte:head>
	<title>Kontakt - Giovanni's Kaffeewelt</title>
	<meta
		name="description"
		content="Kontaktieren Sie Giovanni's Kaffeewelt in Hamburg. Adresse, Öffnungszeiten, Telefonnummer und direktes Kontaktformular."
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
			<!--======  Start Page Banner Section  ======-->
			<section
				class="page-banner bg_cover p-r z-1"
				style="background-image: url('{asset('/assets/contact.avif')}');"
			>
				<div class="container">
					<div class="row justify-content-center">
						<div class="col-lg-10">
							<div class="page-content text-center">
								<h1>Kontakt</h1>
								<ul>
									<li><a href={resolve('/')}>Startseite</a></li>
									<li>/</li>
									<li>Kontakt</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!--======  End Page Banner Section  ======-->

			<!--======  Start Contact Info Section  ======-->
			<section class="contact-info-sec py-5 mt-xl-4">
				<div class="container">
					<div class="row py-5">
						<div class="col-lg-4 col-md-6 col-sm-12">
							<!-- Contact Info Box -->
							<div
								class="contact-info-box text-center mb-4"
								data-aos="fade-up"
								data-aos-duration="800"
								use:aosAction
							>
								<div class="icon">
									<i class="far fa-map-marker-alt"></i>
								</div>
								<div class="content">
									<h3>Unser Standort</h3>
									<p>Böckmannstraße 4, 20099 Hamburg</p>
								</div>
							</div>
						</div>
						<div class="col-lg-4 col-md-6 col-sm-12">
							<!-- Contact Info Box -->
							<div
								class="contact-info-box text-center mb-4"
								data-aos="fade-up"
								data-aos-duration="1000"
								use:aosAction
							>
								<div class="icon">
									<i class="far fa-phone-alt"></i>
								</div>
								<div class="content">
									<h3>Telefonnummer</h3>
									<p><a href="tel:+4917641585060">+49 176 41585060</a></p>
									<p><a href="tel:+4917641585060">Jetzt anrufen</a></p>
								</div>
							</div>
						</div>
						<div class="col-lg-4 col-md-6 col-sm-12">
							<!-- Contact Info Box -->
							<div
								class="contact-info-box text-center mb-4"
								data-aos="fade-up"
								data-aos-duration="1200"
								use:aosAction
							>
								<div class="icon">
									<i class="far fa-envelope"></i>
								</div>
								<div class="content">
									<h3>E-Mail-Adresse</h3>
									<p><a href="mailto:info@giovannikaffeewelt.de">info@giovannikaffeewelt.de</a></p>
									<p><a href="https://giovannikaffeewelt.de" target="_blank" rel="noreferrer">giovannikaffeewelt.de</a></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!--======  End Contact Info Section  ======-->

			<!--======  Start Contact Section  ======-->
			<section class="giovanni-contact-sec pb-5">
				<div class="container">
					<div class="row pb-3 justify-content-center">
						<div class="col-xl-6 col-lg-8">
							<!-- Giovanni Content Box -->
							<div class="giovanni-content-box pe-xl-5">
								<div class="section-title">
									<span class="sub-title" data-aos="fade-down" data-aos-duration="1000" use:aosAction
										>Kontaktieren Sie uns</span
									>
									<h2 class="text-anm">Sprechen Sie uns an</h2>
								</div>
								<p data-aos="fade-up" data-aos-duration="1200" use:aosAction>
									Haben Sie eine Frage, möchten Sie Feedback geben oder einen Tisch reservieren?
									Unser Team ist jederzeit gerne für Sie da – wir freuen uns darauf, von Ihnen zu
									hören oder Sie persönlich bei uns willkommen zu heißen.
								</p>
								<div class="giovanni-opening-time">
									<div class="row">
										<div class="col-lg-6">
											<!-- Giovanni Opening Time -->
											<div
												class="giovanni-open-box mb-5"
												data-aos="fade-up"
												data-aos-duration="1200"
												use:aosAction
											>
												<div class="content">
													<h4>Öffnungszeiten:</h4>
													<ul>
														<li>
															<span class="days">Mo - Do:</span><span class="time"
																>10:00 - 19:00 Uhr</span
															>
														</li>
														<li>
															<span class="days">Fr - Sa:</span><span class="time"
																>10:00 - 18:30 Uhr</span
															>
														</li>
														<li>
															<span class="days">Sonntag:</span><span class="off-day"
																>Ruhetag</span
															>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div class="col-lg-6">
											<!-- Giovanni Opening Time -->
											<div
												class="giovanni-open-box mb-5"
												data-aos="fade-up"
												data-aos-duration="1400"
												use:aosAction
											>
												<div class="content">
													<h4>Verfügbare Zeiten:</h4>
													<ul>
														<li>
															<span class="days">Frühstück:</span><span class="time"
																>07:00 - 11:00 Uhr</span
															>
														</li>
														<li>
															<span class="days">Mittag:</span><span class="time"
																>12:00 - 15:00 Uhr</span
															>
														</li>
														<li>
															<span class="days">Kaffeezeit:</span><span class="time"
																>15:00 - 18:30 Uhr</span
															>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xl-6 col-lg-8">
							<!-- Contact Wrapper -->
							<div
								class="contact-wrapper mt-xl-0 mt-5"
								data-aos="fade-up"
								data-aos-duration="1400"
								use:aosAction
							>
								{#if isSuccess}
									<div class="contact-success-box text-center py-4">
										<div class="success-icon mb-3">
											<i class="fas fa-check-circle"></i>
										</div>
										<h3 class="text-white mb-2">Vielen Dank für Ihre Nachricht!</h3>
										<p class="text-white opacity-75 mb-4">
											Ihre Anfrage wurde erfolgreich an unser Team übermittelt. Wir werden uns schnellstmöglich bei Ihnen melden.
										</p>
										<button type="button" class="theme-btn style-one" onclick={resetForm}>
											Weitere Nachricht senden
										</button>
									</div>
								{:else}
									<form onsubmit={handleSubmit}>
										{#if errorMessage}
											<div class="alert alert-danger mb-4" role="alert">
												<i class="fas fa-exclamation-circle me-2"></i>
												{errorMessage}
											</div>
										{/if}

										<div class="row">
											<div class="col-lg-12">
												<div class="form-group">
													<label for="contact-name">Vollständiger Name <span class="text-danger">*</span></label>
													<input
														id="contact-name"
														type="text"
														class="form_control"
														placeholder="Vollständigen Namen eingeben"
														name="name"
														autocomplete="name"
														bind:value={name}
														required
														disabled={isSubmitting}
													/>
												</div>
											</div>
											<div class="col-lg-6">
												<div class="form-group">
													<label for="contact-email">E-Mail-Adresse</label>
													<input
														id="contact-email"
														type="email"
														class="form_control"
														placeholder="E-Mail eingeben"
														name="email"
														autocomplete="email"
														bind:value={email}
														disabled={isSubmitting}
													/>
												</div>
											</div>
											<div class="col-lg-6">
												<div class="form-group">
													<label for="contact-phone">Telefonnummer <span class="text-danger">*</span></label>
													<input
														id="contact-phone"
														type="tel"
														class="form_control"
														placeholder="Telefonnummer eingeben"
														name="phone"
														autocomplete="tel"
														bind:value={phone}
														required
														disabled={isSubmitting}
													/>
												</div>
											</div>
											<div class="col-lg-6">
												<div class="form-group">
													<label for="contact-person">Personenanzahl</label>
													<select
														id="contact-person"
														class="form_control wide custom-select"
														bind:value={person}
														disabled={isSubmitting}
													>
														<option value="1 Person">1 Person</option>
														<option value="2 Personen">2 Personen</option>
														<option value="3 Personen">3 Personen</option>
														<option value="4 Personen">4 Personen</option>
														<option value="5 Personen">5 Personen</option>
														<option value="6+ Personen">6+ Personen</option>
													</select>
												</div>
											</div>
											<div class="col-lg-6">
												<div class="form-group">
													<label for="contact-time">Gewünschte Zeit</label>
													<select
														id="contact-time"
														class="form_control wide custom-select"
														bind:value={time}
														disabled={isSubmitting}
													>
														<option value="10:00 Uhr">10:00 Uhr</option>
														<option value="11:00 Uhr">11:00 Uhr</option>
														<option value="12:00 Uhr">12:00 Uhr</option>
														<option value="13:00 Uhr">13:00 Uhr</option>
														<option value="14:00 Uhr">14:00 Uhr</option>
														<option value="15:00 Uhr">15:00 Uhr</option>
														<option value="16:00 Uhr">16:00 Uhr</option>
														<option value="17:00 Uhr">17:00 Uhr</option>
														<option value="18:00 Uhr">18:00 Uhr</option>
														<option value="18:30 Uhr">18:30 Uhr</option>
													</select>
												</div>
											</div>
											<div class="col-lg-12">
												<div class="form-group">
													<label for="contact-message">Ihre Nachricht</label>
													<textarea
														id="contact-message"
														class="form_control"
														rows="4"
														cols="5"
														placeholder="Ihre Nachricht oder besondere Wünsche schreiben..."
														name="message"
														bind:value={message}
														disabled={isSubmitting}
													></textarea>
												</div>
											</div>
											<div class="col-lg-12">
												<div class="form-group mb-0">
													<button
														type="submit"
														class="theme-btn style-one w-100"
														disabled={isSubmitting}
													>
														{#if isSubmitting}
															<i class="fas fa-spinner fa-spin me-2"></i> Wird gesendet...
														{:else}
															Anfrage absenden
														{/if}
													</button>
												</div>
											</div>
										</div>
									</form>
								{/if}
							</div>
						</div>
					</div>
				</div>
			</section>
			<!--======  End Contact Section  ======-->

			<!--======  Start Map Section  ======-->
			<section class="map-sec">
				<!--=== Map Box ===-->
				<div class="map-box mt-5 pt-3" data-aos="fade-up" data-aos-duration="1200" use:aosAction>
					<iframe
						title="Standortkarte von Giovanni's Kaffeewelt in Hamburg"
						src="https://maps.google.com/maps?q=B%C3%B6ckmannstra%C3%9Fe%204%2C%2020099%20Hamburg&t=&z=16&ie=UTF8&iwloc=&output=embed"
						loading="lazy"
						style="border:0; width: 100%; height: 500px;"
						allowfullscreen
					></iframe>
				</div>
			</section>
			<!--======  End Map Section  ======-->
		</main>

		<!-- Footer -->
		<Footer />
	</div>
</div>

<style>
	/* Page Banner */
	:global(.page-banner) {
		position: relative;
	}

	/* Contact Info Box */
	.contact-info-box {
		background-color: var(--gray-color, #fbfbfb);
		border: 1px solid var(--border-color, #e9e9e9);
		padding: 40px 30px;
		border-radius: 8px;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.contact-info-box:hover {
		transform: translateY(-5px);
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
	}

	.contact-info-box .icon {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		background-color: var(--primary-black-color, #2d4443);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--white-color, #ffffff);
		font-size: 32px;
		margin-bottom: 20px;
		transition: background-color 0.3s ease, color 0.3s ease;
	}

	.contact-info-box:hover .icon {
		background-color: var(--primary-color, #d0965c);
		color: #ffffff;
	}

	.contact-info-box .content h3 {
		margin-bottom: 15px;
		color: var(--heading-color, #2d4443);
	}

	.contact-info-box .content p {
		margin-bottom: 6px;
		font-size: 17px;
		color: #555555;
	}

	.contact-info-box .content p a {
		color: inherit;
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.contact-info-box .content p a:hover {
		color: var(--primary-color, #d0965c);
	}

	/* Giovanni Open Box */
	.giovanni-open-box .content ul li span.off-day {
		color: var(--primary-color, #d0965c);
		font-weight: 600;
	}

	/* Contact Form Customizations */
	.contact-wrapper {
		background-color: var(--primary-black-color, #2d4443);
		padding: 45px;
		border-radius: 12px;
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
	}

	.contact-wrapper form label {
		font-size: 15px;
		margin-bottom: 8px;
	}

	.contact-wrapper form .form_control {
		border-radius: 6px;
		transition: border-color 0.3s ease, background-color 0.3s ease;
	}

	.contact-wrapper form .form_control:focus {
		background-color: #2b3e3d;
		outline: 1px solid var(--primary-color, #d0965c);
		color: #ffffff;
	}

	.contact-wrapper form select.custom-select {
		appearance: auto;
		-webkit-appearance: auto;
		cursor: pointer;
	}

	.contact-wrapper form select.custom-select option {
		background-color: #213231;
		color: #ffffff;
		padding: 8px;
	}

	/* Success Message Box */
	.contact-success-box .success-icon {
		font-size: 54px;
		color: #4ade80;
	}

	/* Map Box */
	.map-sec .map-box iframe {
		display: block;
		filter: contrast(102%);
	}
</style>
