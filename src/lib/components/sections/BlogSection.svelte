<script lang="ts">
	import { asset } from '$app/paths';
	import { aosAction } from '$lib/actions/aos';

	const blogPosts = [
		{
			title: 'Leichte Sommergerichte für erfrischenden Genuss',
			author: 'Giovanni Team',
			date: '19. Mai 2025',
			image: asset('/assets/blog-img1.jpg'),
			duration: 1000
		},
		{
			title: 'Ein Tag im Leben unseres Küchenchefs bei Giovanni’s',
			author: 'Giovanni Team',
			date: '19. Mai 2025',
			image: asset('/assets/images/home-restaurant/blog/blog-img2.jpg'),
			duration: 1200
		},
		{
			title: 'Der mediterrane Einfluss hinter unseren neuen Spezialitäten',
			author: 'Giovanni Team',
			date: '19. Mai 2025',
			image: asset('/assets/images/home-restaurant/blog/blog-img3.jpg'),
			duration: 1400
		}
	];
</script>

<section class="rs-blog py-5" id="blog">
	<div class="container">
		<div class="row justify-content-center py-5">
			<div class="col-lg-7">
				<div class="section-title text-center mt-4">
					<span class="sub-title" data-aos="fade-down" data-aos-duration="1000" use:aosAction>Unser Blog</span>
					<h2 class="text-anm">Neueste Beiträge</h2>
				</div>
			</div>
		</div>

		<div class="row justify-content-center pb-xl-4">
			{#each blogPosts as post}
				<div class="col-xl-4 col-md-6 col-sm-12">
					<div class="giovanni-blog-post mb-5" data-aos="fade-up" data-aos-duration={post.duration} use:aosAction={{ animation: 'fade-up', duration: post.duration }}>
						<div class="post-thumbnail">
							<img src={post.image} alt={post.title} />
						</div>
						<div class="post-content">
							<div class="post-meta">
								<span><i class="far fa-user me-1"></i>Von {post.author}</span>
								<span><i class="far fa-calendar-alt me-1"></i>{post.date}</span>
							</div>
							<h4><a href="#blog">{post.title}</a></h4>
							<a href="#blog" class="read-more style-one">Weiterlesen</a>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
