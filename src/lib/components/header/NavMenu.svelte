<script lang="ts">
	import { resolve, asset } from '$app/paths';

	let {
		mobileMenuOpen = $bindable(false)
	}: {
		mobileMenuOpen?: boolean;
	} = $props();

	let activeSubMenu = $state<string | null>(null);

	function toggleSubMenu(name: string) {
		activeSubMenu = activeSubMenu === name ? null : name;
	}

	function closeMenu() {
		mobileMenuOpen = false;
	}
</script>

<div class="theme-nav-menu {mobileMenuOpen ? 'menu-on' : ''}">
	<!-- Mobile Menu Top -->
	<div class="theme-menu-top d-flex justify-content-between d-block d-lg-none mb-4">
		<div class="site-branding">
			<a href={resolve('/')} class="brand-logo" onclick={closeMenu}>
				<img
					src={asset('/assets/logo.svg')}
					alt="Giovanni's Kaffeewelt Logo"
					style="max-height: 48px; width: auto;"
				/>
			</a>
		</div>
		<button
			class="navbar-close border-0 bg-transparent text-white"
			onclick={closeMenu}
			aria-label="Menü schließen"
		>
			<i class="far fa-times"></i>
		</button>
	</div>

	<!-- Navigation Links -->
	<nav class="main-menu">
		<ul>
			<li class="menu-item has-children">
				<a href={resolve('/')}>
					Startseite
				</a>
			</li>
			<li class="menu-item"><a href="{resolve('/')}#about" onclick={closeMenu}>Über uns</a></li>
			<li class="menu-item has-children">
				<a href="{resolve('/')}#menu" onclick={(e) => { e.preventDefault(); toggleSubMenu('menu'); }}>
					Speisekarte
					<span class="dd-trigger ms-1"><i class="far fa-angle-down"></i></span>
				</a>
				<ul class="sub-menu" style="display: {activeSubMenu === 'menu' || !mobileMenuOpen ? '' : 'none'};">
					<li><a href="{resolve('/')}#menu" onclick={closeMenu}>Hauptmenü</a></li>
					<li><a href="{resolve('/')}#gallery" onclick={closeMenu}>Galerie</a></li>
					<li><a href="{resolve('/')}#chefs" onclick={closeMenu}>Unser Team</a></li>
				</ul>
			</li>
			<li class="menu-item has-children">
				<a href="{resolve('/')}#chefs" onclick={(e) => { e.preventDefault(); toggleSubMenu('pages'); }}>
					Seiten
					<span class="dd-trigger ms-1"><i class="far fa-angle-down"></i></span>
				</a>
				<ul class="sub-menu" style="display: {activeSubMenu === 'pages' || !mobileMenuOpen ? '' : 'none'};">
					<li><a href="{resolve('/')}#chefs" onclick={closeMenu}>Unser Team</a></li>
					<li><a href="{resolve('/')}#opening-time" onclick={closeMenu}>Öffnungszeiten</a></li>
					<li><a href="{resolve('/')}#blog" onclick={closeMenu}>Aktuelles</a></li>
					<li><a href={resolve('/contact')} onclick={closeMenu}>Kontakt</a></li>
				</ul>
			</li>
			<li class="menu-item"><a href={resolve('/contact')} onclick={closeMenu}>Kontakt</a></li>
		</ul>
	</nav>

	<!-- Theme Nav Button (Mobile) -->
	<div class="theme-nav-button mt-3 d-block d-md-none">
		<a href="{resolve('/')}#reservation" class="theme-btn style-one" onclick={closeMenu}>Reservierung</a>
	</div>

	<!-- Theme Menu Bottom (Mobile) -->
	<div class="theme-menu-bottom mt-5 d-block d-lg-none">
		<h5 class="text-white">Folgen Sie uns</h5>
		<ul class="social-link">
			<li><a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a></li>
			<li><a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><i class="fab fa-twitter"></i></a></li>
			<li><a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><i class="fab fa-instagram"></i></a></li>
			<li><a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><i class="fab fa-youtube"></i></a></li>
		</ul>
	</div>
</div>

<style>
	:global(.header-navigation .theme-nav-menu) {
		background-color: var(--primary-black-color, #2D4443) !important;
	}
	:global(.header-navigation .theme-nav-menu .main-menu ul li a) {
		color: #ffffff !important;
	}
	:global(.header-navigation .theme-nav-menu .main-menu ul li .sub-menu) {
		background-color: #213231 !important;
	}
	:global(.header-navigation .theme-nav-menu .navbar-close) {
		color: #ffffff !important;
	}
	:global(.header-navigation .theme-nav-menu .theme-menu-bottom h5) {
		color: #ffffff !important;
	}
</style>
