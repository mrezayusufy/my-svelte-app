<script lang="ts">
	import { base } from '$app/paths';

	const chefs = [
		{
			name: 'Massimo Bottura',
			position: 'Main Chef',
			image: `${base}/assets/images/home-restaurant/team/team-img1.jpg`,
			duration: 1000
		},
		{
			name: 'Alain Ducasse',
			position: 'Junior Chef',
			image: `${base}/assets/images/home-restaurant/team/team-img2.jpg`,
			duration: 1200
		},
		{
			name: 'Gordon Ramsay',
			position: 'Junior Chef',
			image: `${base}/assets/images/home-restaurant/team/team-img3.jpg`,
			duration: 1400
		}
	];
</script>

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
			{#each chefs as chef}
				<div class="col-lg-4 col-md-6 col-sm-12">
					<div class="rs-team-item text-center mb-4" data-aos="fade-up" data-aos-duration={chef.duration}>
						<div class="member-image mb-4">
							<img src={chef.image} alt={chef.name} />
						</div>
						<div class="member-info">
							<h3>{chef.name}</h3>
							<span class="position">{chef.position}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
