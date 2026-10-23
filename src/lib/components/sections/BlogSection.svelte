<script lang="ts">
	import { resolve, asset } from '$app/paths';
	import { aosAction } from '$lib/actions/aos';
	import type { Post } from '$lib/types/blog';
	import { formatBlogDate } from '$lib/types/blog';
	import { fallbackPosts } from '$lib/data/blogData';

	interface Props {
		posts?: Post[];
	}

	let { posts = fallbackPosts.slice(0, 3) }: Props = $props();

</script>

<section class="rs-blog py-5" id="blog" aria-label="Aktuelle Blogbeiträge">
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
			{#each posts as post, idx}
				{@const duration = 1000 + idx * 200}
				{@const postImage = post.featured_image_url}
				{@const postDate = formatBlogDate(post.published_at || post.created_at)}
				{@const postCategory = post.categories?.name || 'Kaffeewelt'}
				<div class="col-xl-4 col-md-6 col-sm-12">
					<article
						class="giovanni-blog-post mb-5 h-100 d-flex flex-column"
						data-aos="fade-up"
						data-aos-duration={duration}
						use:aosAction={{ animation: 'fade-up', duration }}
					>
						<div class="post-thumbnail flex position-relative overflow-hidden rounded-3">
							<a href={resolve('/blog/[slug]', { slug: post.slug })} aria-label={post.title} class="flex-1">
								<img
									src={postImage}
									alt={post.featured_image_alt || post.title}
									loading="lazy"
									class="img-fluid w-100 object-fit-cover"
									style="height: 240px;"
								/>
							</a>
							<span class="category-tag">
								{postCategory}
							</span>
						</div>
						<div class="post-content p-0 d-flex flex-column flex-1">
							<div class="post-meta mb-2 small text-muted">
								<span><i class="far fa-user me-1 text-gold"></i>Giovanni Team</span>
								{#if postDate}
									<span class="ms-3">
										<i class="far fa-calendar-alt me-1 text-gold"></i>
										<time datetime={post.published_at || post.created_at}>{postDate}</time>
									</span>
								{/if}
							</div>
							<h3 class="post-title text-primary text-lg leading-none mb-1">
								<a href={resolve('/blog/[slug]', { slug: post.slug })} class="text-dark leading-normal text-decoration-none">
									{post.title}
								</a>
							</h3>
							{#if post.excerpt}
								<p class="text-muted small line-clamp-3 mb-1 flex-1 leading-normal">
									{post.excerpt}
								</p>
							{/if}
							<div class="mt-auto">
								<a
									href={resolve('/blog/[slug]', { slug: post.slug })}
									class="read-more style-one d-inline-flex align-items-center mb-3 md:mb-0"
									aria-label="Weiterlesen: {post.title}"
								>
									Weiterlesen <i class="far fa-arrow-right ms-2"></i>
								</a>
							</div>
						</div>
					</article>
				</div>
			{/each}
		</div>

		<div class="row">
			<div class="col-12 text-center mt-2">
				<a href={resolve('/blog')} class="theme-btn style-two">Alle Beiträge ansehen</a>
			</div>
		</div>
	</div>
</section>

<style>
.category-tag {
		background-color: rgba(45, 68, 67, 0.85);
		backdrop-filter: blur(4px);
		letter-spacing: 0.5px;
		left: 0;
		line-height: 1.5;
		padding: 4px 12px;
		font-size: 12px;
		position: absolute;
		top: 0;
		margin: 12px;
		border-radius: 100px;
		color: #fff;
		font-weight: bold;
	}
	.text-gold {
		color: var(--primary-color, #d0965c);
	}


	.post-title a {
		transition: color 0.3s ease;
		line-height: 1;
	}

	.post-title a:hover {
		color: var(--primary-color, #d0965c) !important;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		line-clamp: 3;
		overflow: hidden;
	}
</style>
