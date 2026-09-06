<script lang="ts">
	import { base } from '$app/paths';

	const blogPosts = [
		{
			title: 'Easy Summer Dishes to Keep You Cool & Full',
			author: 'John',
			date: 'May 19, 2025',
			image: `${base}/blog-img1.jpg`,
			duration: 1000
		},
		{
			title: 'A Day in the Life of Our Head Chef at Delicia',
			author: 'John',
			date: 'May 19, 2025',
			image: `${base}/assets/images/home-restaurant/blog/blog-img2.jpg`,
			duration: 1200
		},
		{
			title: 'The Mediterranean Influence Behind Our New Menu Items',
			author: 'John',
			date: 'May 19, 2025',
			image: `${base}/assets/images/home-restaurant/blog/blog-img3.jpg`,
			duration: 1400
		}
	];
</script>

<section class="rs-blog py-5" id="blog">
	<div class="container">
		<div class="row justify-content-center py-5">
			<div class="col-lg-7">
				<div class="section-title text-center mt-4">
					<span class="sub-title" data-aos="fade-down" data-aos-duration="1000">Latest Blog</span>
					<h2 class="text-anm">Our Recent Posts</h2>
				</div>
			</div>
		</div>

		<div class="row justify-content-center pb-xl-4">
			{#each blogPosts as post}
				<div class="col-xl-4 col-md-6 col-sm-12">
					<div class="bistly-blog-post mb-5" data-aos="fade-up" data-aos-duration={post.duration}>
						<div class="post-thumbnail">
							<img src={post.image} alt={post.title} />
						</div>
						<div class="post-content">
							<div class="post-meta">
								<span><i class="far fa-user me-1"></i>By {post.author}</span>
								<span><i class="far fa-calendar-alt me-1"></i>{post.date}</span>
							</div>
							<h4><a href="#blog">{post.title}</a></h4>
							<a href="#blog" class="read-more style-one">Read More</a>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
