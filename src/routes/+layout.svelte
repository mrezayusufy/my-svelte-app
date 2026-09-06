<script lang="ts">
	import { base } from '$app/paths';
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Bistly - Restaurant & Cafe</title>
	<!-- Favicon Icon -->
	<link rel="shortcut icon" href="{base}/assets/images/favicon.png" type="image/png" />
	<!-- Google Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Marcellus&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
		rel="stylesheet"
	/>
	<!-- Flaticon css -->
	<link rel="stylesheet" href="{base}/assets/fonts/flaticon/flaticon_bistly.css" />
	<!-- FontAwesome css -->
	<link rel="stylesheet" href="{base}/assets/fonts/fontawesome/css/all.min.css" />
	<!-- Bootstrap css -->
	<link rel="stylesheet" href="{base}/assets/css/plugins/bootstrap.min.css" />
	<!-- AOS Animation -->
	<link rel="stylesheet" href="{base}/assets/css/plugins/aos.css" />
	<!-- Common Style css -->
	<link rel="stylesheet" href="{base}/assets/css/common-style.css" />
	<!-- Style css -->
	<link rel="stylesheet" href="{base}/assets/css/pages/home-restaurant.css" />
</svelte:head>

{@render children()}

