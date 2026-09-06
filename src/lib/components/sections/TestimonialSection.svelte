<script lang="ts">
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
</script>

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

					<!-- Slider Navigation Buttons -->
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
