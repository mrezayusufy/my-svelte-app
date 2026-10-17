<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public';
	import { aosAction } from '$lib/actions/aos';
	let {data} = $props();
	// Helper to get today's date formatted as YYYY-MM-DD
	function getTodayDateString(): string {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	const minDate = getTodayDateString();

	// Form field states
	let name = $state('');
	let phone = $state('');
	let date = $state(getTodayDateString());
	let time = $state('19:00');
	let guests = $state<number>(2);
	let note = $state('');

	// Submission UI states
	let isSubmitting = $state(false);
	let isSuccess = $state(false);
	let errorMessage = $state('');
	let lastBookingSummary = $state<{ name: string; date: string; time: string; guests: number } | null>(null);

	const timeSlots = [
		'10:00', '10:30', '11:00', '11:30',
		'12:00', '12:30', '13:00', '13:30',
		'14:00', '14:30', '15:00', '15:30',
		'16:00', '16:30', '17:00', '17:30',
		'18:00', '18:30', '19:00', '19:30',
		'20:00', '20:30', '21:00'
	];

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

		if (!date) {
			errorMessage = 'Bitte wählen Sie ein Datum aus.';
			return;
		}

		if (!time) {
			errorMessage = 'Bitte wählen Sie eine Uhrzeit aus.';
			return;
		}

		isSubmitting = true;
		errorMessage = '';

		const payload = {
			name: name.trim(),
			phone: phone.trim(),
			date: date,
			time: time,
			guests: Number(guests) || 2,
			note: note.trim() || undefined,
			message: note.trim() || undefined
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
				console.warn('supabase.functions.invoke(telegram-notify-reservation) error:', res.error);
				lastError = res.error.message || 'Error from telegram-notify-reservation';
			}
		} catch (err: any) {
			console.warn('invoke telegram-notify-reservation exception:', err);
			lastError = err?.message || '';
		}

		// 2. If not sent, try invoking 'quick-action' via Supabase client
		if (!sentSuccessfully) {
			try {
				const res = await supabase.functions.invoke('quick-action', {
					body: payload
				});

				if (!res.error) {
					sentSuccessfully = true;
				} else {
					console.warn('supabase.functions.invoke(quick-action) error:', res.error);
					lastError = res.error.message || lastError;
				}
			} catch (err: any) {
				console.warn('invoke quick-action exception:', err);
				lastError = err?.message || lastError;
			}
		}

		// 3. If client invoke failed, try via direct fetch with CORS & API headers
		if (!sentSuccessfully) {
			const endpoints = [
				`${PUBLIC_SUPABASE_URL}/functions/v1/telegram-notify-reservation`,
				`${PUBLIC_SUPABASE_URL}/functions/v1/quick-action`
			];

			for (const url of endpoints) {
				try {
					const directRes = await fetch(url, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'apikey': PUBLIC_SUPABASE_PUBLISHABLE_KEY,
							'Authorization': `Bearer ${PUBLIC_SUPABASE_PUBLISHABLE_KEY}`
						},
						body: JSON.stringify(payload)
					});

					if (directRes.ok) {
						sentSuccessfully = true;
						break;
					} else {
						const errJson = (await directRes.json().catch(() => null)) as Record<string, any> | null;
						lastError = errJson?.error || errJson?.message || `Status: ${directRes.status}`;
					}
				} catch (fetchErr: any) {
					console.warn(`Direct fetch to ${url} failed:`, fetchErr);
					lastError = fetchErr?.message || lastError;
				}
			}
		}

		// 4. Fallback: Try our server-side API proxy (/api/reservation)
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
			lastBookingSummary = {
				name: payload.name,
				date: payload.date,
				time: payload.time,
				guests: payload.guests
			};
			isSuccess = true;
			// Reset fields
			name = '';
			phone = '';
			note = '';
		} else {
			if (lastError.includes('500') || lastError.includes('secrets are missing') || lastError.includes('Internal Server Error')) {
				errorMessage = 'Fehler beim Senden der Benachrichtigung: Bitte stellen Sie sicher, dass TELEGRAM_BOT_TOKEN und TELEGRAM_CHAT_ID in den Supabase Edge Function Secrets konfiguriert sind.';
			} else {
				errorMessage = lastError || 'Es gab ein Problem beim Absenden der Reservierung. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.';
			}
		}
	}

	function resetForm() {
		isSuccess = false;
		errorMessage = '';
		date = getTodayDateString();
		time = '19:00';
		guests = 2;
	}
</script>

<section
	class="rs-booking bg_cover p-r z-1 py-5"
	id="reservation"
	style="background-image: url('{data.section_images[0].image_path}');background-attachment: fixed;"
>
	<div class="container py-4">
		<!-- Section Header -->
		<div class="row justify-content-center">
			<div class="col-lg-8">
				<div class="giovanni-content-box text-center mb-4">
					<div class="section-title text-center text-white mb-3">
						<span class="sub-title" data-aos="fade-down" data-aos-duration="1000" use:aosAction>{data.subtitle}</span>
						<h2 class="text-anm text-white">{data.title}</h2>
					</div>
					<p class="text-white opacity-75 mb-4" data-aos="fade-up" data-aos-duration="1100" use:aosAction>
						{data.content}
					</p>
				</div>
			</div>
		</div>

		<!-- Main Reservation Card -->
		<div class="row justify-content-center">
			<div class="col-xl-10 col-lg-11">
				<div class="reservation-card p-4 p-md-5" data-aos="fade-up" data-aos-duration="1200" use:aosAction>
					{#if isSuccess && lastBookingSummary}
						<!-- Success State View -->
						<div class="booking-success-box text-center py-4">
							<div class="success-icon mb-4">
								<i class="fas fa-check-circle"></i>
							</div>
							<h3 class="text-white mb-3">Reservierungsanfrage erfolgreich übermittelt!</h3>
							<p class="text-white opacity-75 mb-4">
								Vielen Dank, <strong>{lastBookingSummary.name}</strong>! Ihre Anfrage für
								<strong>{lastBookingSummary.guests} {lastBookingSummary.guests === 1 ? 'Person' : 'Personen'}</strong>
								am <strong>{lastBookingSummary.date}</strong> um <strong>{lastBookingSummary.time} Uhr</strong>
								wurde direkt an unser Team per Telegram übermittelt.
							</p>
							<div class="success-actions">
								<button type="button" class="theme-btn style-two" onclick={resetForm}>
									<i class="fas fa-plus me-2"></i> Weitere Reservierung vornehmen
								</button>
							</div>
						</div>
					{:else}
						<!-- Reservation Form -->
						<form onsubmit={handleSubmit} novalidate>
							{#if errorMessage}
								<div class="alert alert-danger custom-booking-alert mb-4 d-flex align-items-center" role="alert">
									<i class="fas fa-exclamation-triangle me-3 fs-4"></i>
									<div>
										<strong>Hinweis:</strong> {errorMessage}
									</div>
								</div>
							{/if}

							<div class="row g-4">
								<!-- Full Name -->
								<div class="col-md-6">
									<div class="form-group custom-input-group">
										<label for="reservation-name" class="form-label text-white">
											<i class="far fa-user me-2 text-gold"></i> Vollständiger Name <span class="text-danger">*</span>
										</label>
										<input
											id="reservation-name"
											type="text"
											class="form-control custom-form-control"
											placeholder="z.B. Giovanni Rossi"
											bind:value={name}
											required
											disabled={isSubmitting}
										/>
									</div>
								</div>

								<!-- Phone Number -->
								<div class="col-md-6">
									<div class="form-group custom-input-group">
										<label for="reservation-phone" class="form-label text-white">
											<i class="far fa-phone me-2 text-gold"></i> Telefonnummer <span class="text-danger">*</span>
										</label>
										<input
											id="reservation-phone"
											type="tel"
											class="form-control custom-form-control"
											placeholder="z.B. +49 170 1234567"
											bind:value={phone}
											required
											disabled={isSubmitting}
										/>
									</div>
								</div>

								<!-- Date -->
								<div class="col-md-4">
									<div class="form-group custom-input-group">
										<label for="reservation-date" class="form-label text-white">
											<i class="far fa-calendar-alt me-2 text-gold"></i> Datum <span class="text-danger">*</span>
										</label>
										<input
											id="reservation-date"
											type="date"
											class="form-control custom-form-control"
											min={minDate}
											bind:value={date}
											required
											disabled={isSubmitting}
										/>
									</div>
								</div>

								<!-- Time -->
								<div class="col-md-4">
									<div class="form-group custom-input-group">
										<label for="reservation-time" class="form-label text-white">
											<i class="far fa-clock me-2 text-gold"></i> Uhrzeit <span class="text-danger">*</span>
										</label>
										<select
											id="reservation-time"
											class="form-select custom-form-control"
											bind:value={time}
											required
											disabled={isSubmitting}
										>
											{#each timeSlots as slot}
												<option value={slot}>{slot} Uhr</option>
											{/each}
										</select>
									</div>
								</div>

								<!-- Guests Number -->
								<div class="col-md-4">
									<div class="form-group custom-input-group">
										<label for="reservation-guests" class="form-label text-white">
											<i class="far fa-users me-2 text-gold"></i> Personen <span class="text-danger">*</span>
										</label>
										<select
											id="reservation-guests"
											class="form-select custom-form-control"
											bind:value={guests}
											required
											disabled={isSubmitting}
										>
											<option value={1}>1 Person</option>
											<option value={2}>2 Personen</option>
											<option value={3}>3 Personen</option>
											<option value={4}>4 Personen</option>
											<option value={5}>5 Personen</option>
											<option value={6}>6 Personen</option>
											<option value={7}>7 Personen</option>
											<option value={8}>8+ Personen</option>
										</select>
									</div>
								</div>

								<!-- Special Request / Note -->
								<div class="col-12">
									<div class="form-group custom-input-group">
										<label for="reservation-note" class="form-label text-white">
											<i class="far fa-comment-alt me-2 text-gold"></i> Besondere Wünsche / Notiz
										</label>
										<textarea
											id="reservation-note"
											class="form-control custom-form-control"
											rows="3"
											placeholder="z.B. Tisch am Fenster, Kinderstuhl benötigt, Allergien..."
											bind:value={note}
											disabled={isSubmitting}
										></textarea>
									</div>
								</div>

								<!-- Submit Button & Info -->
								<div class="col-12 text-center mt-4">
									<button
										type="submit"
										class="theme-btn style-two px-5 py-3 fs-5"
										disabled={isSubmitting}
									>
										{#if isSubmitting}
											<i class="fas fa-spinner fa-spin me-2"></i> Reservierung wird gesendet...
										{:else}
											<i class="fas fa-calendar-check me-2"></i> Jetzt Tisch Reservieren
										{/if}
									</button>
									<p class="text-white opacity-50 small mt-3 mb-0">
										<i class="fas fa-lock me-1"></i> Ihre Daten werden vertraulich behandelt und direkt an unser Team übermittelt.
									</p>
								</div>
							</div>
						</form>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Reservation Card Styling */
	.reservation-card {
		background-color: rgba(33, 50, 49, 0.92);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(208, 150, 92, 0.35);
		border-radius: 16px;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
	}

	.text-gold {
		color: var(--primary-color, #D0965C);
	}

	.custom-input-group label {
		font-size: 15px;
		font-weight: 500;
		margin-bottom: 8px;
		display: flex;
		align-items: center;
	}

	/* Custom Form Control Styling */
	:global(.custom-form-control) {
		background-color: #263837 !important;
		border: 1px solid rgba(255, 255, 255, 0.15) !important;
		color: #ffffff !important;
		padding: 12px 18px !important;
		border-radius: 8px !important;
		font-size: 15px !important;
		transition: all 0.3s ease !important;
	}

	:global(.custom-form-control:focus) {
		background-color: #2b3e3d !important;
		border-color: var(--primary-color, #D0965C) !important;
		box-shadow: 0 0 0 3px rgba(208, 150, 92, 0.25) !important;
		outline: none !important;
		color: #ffffff !important;
	}

	:global(.custom-form-control::placeholder) {
		color: rgba(255, 255, 255, 0.45) !important;
	}

	:global(select.custom-form-control option) {
		background-color: #213231 !important;
		color: #ffffff !important;
		padding: 8px !important;
	}

	/* Custom Date input calendar icon invert */
	:global(input[type="date"].custom-form-control::-webkit-calendar-picker-indicator) {
		filter: invert(1);
		cursor: pointer;
		opacity: 0.8;
	}

	:global(input[type="date"].custom-form-control::-webkit-calendar-picker-indicator:hover) {
		opacity: 1;
	}

	/* Success State Box */
	.booking-success-box .success-icon {
		font-size: 64px;
		color: #4ade80;
	}

	/* Custom Alert */
	.custom-booking-alert {
		background-color: rgba(220, 38, 38, 0.2);
		border: 1px solid rgba(239, 68, 68, 0.5);
		color: #fecaca;
		border-radius: 8px;
		padding: 16px 20px;
	}
</style>
