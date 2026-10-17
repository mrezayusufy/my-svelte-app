<script lang="ts">
	let currentTestimonial = $state(0);

	const testimonials = [
		{
			quote:
				'Italienische Küche neu definiert bietet ein wunderbares kulinarisches Erlebnis. Jedes Gericht vereint traditionelle italienische Aromen mit modernem Flair. Frische Zutaten und herzliche Gastfreundschaft.',
			author: 'John Smith / Chefkoch',
			rating: 5
		},
		{
			quote:
				'Giovanni’s Kaffeewelt ist zu unserem absoluten Lieblingsort geworden. Frische Spezialitäten, handwerkliche Kaffeekunst und eine herrlich einladende Atmosphäre.',
			author: 'Elena Rostova / Restaurantkritikerin',
			rating: 5
		},
		{
			quote:
				'Eine außergewöhnliche gastronomische Reise. Jeder Teller wird mit echter Leidenschaft, perfekter Ausgewogenheit und viel Liebe zum Detail zubereitet.',
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
</script>

<section class="rs-testimonial pb-5 pt-6">
	<div class="container">
		<div class="row justify-content-center py-5">
			<div class="col-xl-8 col-lg-10">
				<div class="testimonial-slider position-relative">
					{#each testimonials as item, idx}
						{#if currentTestimonial === idx}
							<div class="giovanni-testimonial-item mb-4 text-center">
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

					<!-- Slider Navigation Buttons -->
					<div class="d-flex justify-content-center gap-3 mt-4">
						<button
							class="btn btn-outline-light rounded-circle px-3 py-2"
							onclick={prevTestimonial}
							aria-label="Vorherige Bewertung"
						>
							<i class="far fa-angle-left"></i>
						</button>
						<button
							class="btn btn-outline-light rounded-circle px-3 py-2"
							onclick={nextTestimonial}
							aria-label="Nächste Bewertung"
						>
							<i class="far fa-angle-right"></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
