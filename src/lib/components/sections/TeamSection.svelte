<script lang="ts">
	import { asset } from '$app/paths';
	import type { SectionItem } from '$lib/types/menu';

	interface TeamMember {
		name: string;
		position: string;
		image: string;
		duration: number;
	}

	let { data }: { data?: SectionItem } = $props();

	// Default fallback chefs if no API data is available
	const defaultChefs: TeamMember[] = [
		{
			name: 'Massimo Bottura',
			position: 'Main Chef',
			image: asset('/assets/images/home-restaurant/team/team-img1.jpg'),
			duration: 1000
		},
		{
			name: 'Alain Ducasse',
			position: 'Junior Chef',
			image: asset('/assets/images/home-restaurant/team/team-img1.jpg'),
			duration: 1200
		},
		{
			name: 'Gordon Ramsay',
			position: 'Junior Chef',
			image: asset('/assets/images/home-restaurant/team/team-img1.jpg'),
			duration: 1400
		}
	];

	let teamMembers = $derived.by<TeamMember[]>(() => {
		if (!data?.section_images || data.section_images.length === 0) {
			return defaultChefs;
		}

		const sorted = [...data.section_images].sort(
			(a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
		);

		return sorted.map((item, index) => {
			let name = 'Team Member';
			let position = 'Chef';

			if (item.alt_text) {
				const parts = item.alt_text.split('|').map((part) => part.trim());
				if (parts.length >= 2) {
					name = parts[0] || name;
					position = parts[1] || position;
				} else if (parts.length === 1 && parts[0]) {
					name = parts[0];
				}
			}

			// Validate image_path URL
			let image = item.image_path

			return {
				name,
				position,
				image,
				duration: 1000 + index * 200
			};
		});
	});

	function handleImageError(e: Event, index: number) {
		const target = e.currentTarget as HTMLImageElement;
		target.src = asset(`/assets/images/home-restaurant/team/team-img1.jpg`);
	}
</script>

<section class="rs-team py-5" id="chefs">
	<div class="container">
		<div class="row justify-content-center py-5">
			<div class="col-lg-6">
				<div class="section-title text-center mt-4">
					<span class="sub-title" data-aos="fade-down" data-aos-duration="1000">
						{data?.subtitle}
					</span>
					<h2 class="text-anm" >
						{data?.title}
					</h2>
				</div>
			</div>
		</div>

		<div class="row justify-content-center pb-5">
			{#each teamMembers as member, idx}
				<div class="col-lg-4 col-md-6 col-sm-12">
					<div class="rs-team-item text-center mb-4" data-aos="fade-up" data-aos-duration={member.duration}>
						<div class="member-image mb-4">
							<img
								src={member.image}
								alt={member.name}
								onerror={(e) => handleImageError(e, idx)}
								loading="lazy"
							/>
						</div>
						<div class="member-info">
							<h3>{member.name}</h3>
							<span class="position">{member.position}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
