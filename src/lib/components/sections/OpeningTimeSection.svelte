<script lang="ts">
	import { resolve } from '$app/paths';
	import { aosAction } from '$lib/actions/aos';

	const openingHours = [
		{ day: 'Montag', time: '08:00 - 16:00 Uhr', closed: false },
		{ day: 'Dienstag', time: '08:00 - 16:00 Uhr', closed: false },
		{ day: 'Mittwoch', time: '08:00 - 16:30 Uhr', closed: false },
		{ day: 'Donnerstag', time: '08:00 - 16:00 Uhr', closed: false },
		{ day: 'Freitag', time: '08:00 - 18:00 Uhr', closed: false },
		{ day: 'Samstag', time: '08:00 - 18:00 Uhr', closed: false },
		{ day: 'Sonntag', time: '08:00 - 16:00 Uhr', closed: false }
	];
</script>

<section class="rs-time-sec py-5" id="opening-time">
	<div class="container">
		<div class="row justify-content-center py-xl-4 mt-xl-5">
			<div class="col-xl-6 col-lg-8 col-md-10">
				<div class="giovanni-content-box text-white text-center text-xl-start mb-5">
					<div class="section-title mb-4">
						<h2 class="text-anm">Besuchen Sie uns zu unseren Öffnungszeiten</h2>
					</div>
					<p class="mb-4" data-aos="fade-up" data-aos-duration="1000" use:aosAction>
						Besuchen Sie uns während unserer Öffnungszeiten für ein unvergessliches Genusserlebnis voller köstlicher Speisen, herzlicher Atmosphäre und zuvorkommendem Service.
					</p>
					<div class="giovanni-button" data-aos="fade-up" data-aos-duration="1200" use:aosAction>
						<a href={resolve('/contact')} class="theme-btn style-two">Kontaktieren Sie uns</a>
					</div>
				</div>

				<!-- Map Box -->
				<div class="map-box mt-5 pt-3" data-aos="fade-up" data-aos-duration="1400" use:aosAction>
					<iframe
						title="Standortkarte des Restaurants"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2370.3!2d10.018!3d53.553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDMzJzExLjAiTiAxMMKwMDEnMDUuMCJF!5e0!3m2!1sen!2sde!4v1700000000000"
						width="100%"
						height="280"
						style="border:0;"
						loading="lazy"
					></iframe>
				</div>
			</div>

			<div class="col-xl-6 col-lg-8 col-md-10">
				<div class="opening-time-box mb-5 mt-5 mt-xl-0" data-aos="fade-up" data-aos-duration="1000" use:aosAction>
					<h3>Öffnungszeiten</h3>
					<ul>
						{#each openingHours as item}
							<li>
								{item.day}
								{#if item.closed}
									<span class="close">{item.time}</span>
								{:else}
									<span>{item.time}</span>
								{/if}
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>
