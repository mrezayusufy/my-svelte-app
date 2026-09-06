<script lang="ts">
	import { resolve, asset } from '$app/paths';
	import NavMenu from './NavMenu.svelte';

	let scrollY = $state(0);
	let isSticky = $state(false);
	let lastScroll = 0;
	let mobileMenuOpen = $state(false);

	$effect(() => {
		if (scrollY > 200) {
			if (scrollY < lastScroll) {
				isSticky = true;
			} else {
				isSticky = false;
			}
		} else {
			isSticky = false;
		}
		lastScroll = scrollY;
	});
</script>

<svelte:window bind:scrollY={scrollY} />

<!-- Offcanvas Overlay -->
<div
	class="offcanvas__overlay {mobileMenuOpen ? 'overlay-open' : ''}"
	onclick={() => (mobileMenuOpen = false)}
	onkeydown={(e) => e.key === 'Escape' && (mobileMenuOpen = false)}
	role="button"
	tabindex="0"
	aria-label="Close Mobile Menu"
></div>

<!-- Header Area -->
<header class="header-area header-one transparent-header {isSticky ? 'sticky' : ''}">
	<div class="container">
		<div class="header-navigation">
			<div class="nav-inner-menu">
				<div class="primary-menu">
					<!-- Site Branding -->
					<div class="site-branding">
						<a href={resolve('/')} class="brand-logo">
							<img
								src={asset('/assets/logo.svg')}
								alt="Giovanni's Kaffeewelt Logo"
							/>
						</a>
					</div>

					<!-- Nav Menu Component -->
					<NavMenu bind:mobileMenuOpen />

					<!-- Header Nav Right -->
					<div class="nav-right-item">
						<div class="nav-button d-none d-md-block">
							<a href="#reservation" class="theme-btn style-one">Reservation</a>
						</div>
						<button
							class="navbar-toggler {mobileMenuOpen ? 'active' : ''} border-0 bg-transparent"
							onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
							aria-label="Toggle Navigation Menu"
						>
							<span></span>
							<span></span>
							<span></span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</header>

<style>
	:global(.header-navigation .site-branding .brand-logo img) {
		height: 52px;
		width: auto;
		display: block;
	}
</style>
