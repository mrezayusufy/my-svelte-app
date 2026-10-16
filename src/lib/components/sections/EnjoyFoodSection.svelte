<script lang="ts">
	import { asset } from '$app/paths';
	let { data } = $props();
</script>

<section class="rs-enjoy-food p-r z-1 py-5">
	<div class="shape shape-one">
		<span><img src={asset('/assets/images/home-restaurant/features/f-shape2.png')} alt="Feature shape" /></span>
	</div>
	<div class="shape shape-two">
		<span><img src={asset('/assets/images/home-restaurant/features/f-shape1.png')} alt="Feature shape" /></span>
	</div>

	<div class="container">
		<div class="row justify-content-center py-5 my-xl-4 align-items-center">
			<!-- Left Feature Images -->
			<div class="col-xl-3 col-md-6 d-xl-block d-none">
				<div class="giovanni-image-box image-box-one">
					<div class="row">
						<div class="col-md-6">
							<div class="giovanni-image image-radius mb-4" data-aos="fade-down" data-aos-duration="1000">
								<img src={data.section_images[0].image_path} alt={data.section_images[0].alt_text} />
							</div>
						</div>
						<div class="col-md-6">
							<div class="giovanni-image image-radius mb-4" data-aos="fade-down" data-aos-duration="1100">
								<img src={data.section_images[1].image_path} alt={data.section_images[1].alt_text} />
							</div>
						</div>
						<div class="col-sm-12">
							<div class="giovanni-image mb-4" data-aos="fade-up" data-aos-duration="1200">
								<img src={data.section_images[2].image_path} alt={data.section_images[2].alt_text} />
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Center Content -->
			<div class="col-xl-6 col-lg-9 order-xl-2 order-2">
				<div class="giovanni-content-box text-white text-center">
					<div class="section-title text-center mb-4">
						<span class="sub-title" data-aos="fade-down" data-aos-duration="1000">{data.subtitle}</span>
						<h2 class="text-anm">{data.title}</h2>
					</div>
					<p class="mb-5 pb-2" data-aos="fade-up" data-aos-duration="1000">
						{data.content}
					</p>
					<div class="giovanni-button" data-aos="fade-up" data-aos-duration="1000">
						<a href="#contact" class="theme-btn style-two">KONTAKTIEREN SIE UNS</a>
					</div>
				</div>
			</div>

			<!-- Right Feature Image -->
			<div class="col-xl-3 col-md-6 order-xl-3 order-1">
				<div class="giovanni-image-box image-box-two mb-xl-0 mb-5">
					<div class="giovanni-image" data-aos="fade-up" data-aos-duration="1000">
						<img src={data.section_images[3].image_path} alt={data.section_images[3].alt_text} />
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
<style>

	.image-box-two img {
		filter: drop-shadow(10px 10px 10px #00000080);
	}
</style>