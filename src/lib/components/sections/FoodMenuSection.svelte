<script lang="ts">
	import { asset } from '$app/paths';

	let activeFood = $state<number | null>(null);
	let foodX = $state(0);
	let foodY = $state(0);

	const foodItems = [
		{
			name: 'Lobster',
			desc: 'Mixed Salad & Drinks',
			image: asset('/assets/images/home-restaurant/menu/menu-img1.jpg')
		},
		{
			name: 'Chickens',
			desc: 'Mixed Salad & Soft Drinks',
			image: asset('/assets/images/home-restaurant/menu/menu-img2.jpg')
		},
		{
			name: 'Risotto',
			desc: 'Mixed Soft Drinks',
			image: asset('/assets/images/home-restaurant/menu/menu-img3.jpg')
		}
	];

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
</script>

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
						class="giovanni-food-item position-relative"
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
				<div class="giovanni-button mb-xl-4 text-center" data-aos="fade-down" data-aos-duration="1600">
					<a href="#menu" class="theme-btn style-two">View All Menu Item</a>
				</div>
			</div>
		</div>
	</div>
</section>
