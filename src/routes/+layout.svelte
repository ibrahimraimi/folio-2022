<script lang="ts">
	import { browser } from '$app/environment';
	import { page, navigating } from '$app/stores';
	import { fade } from 'svelte/transition';
	import DeviceDetector from 'svelte-device-detector';

	import Menu from '$lib/components/Nav/Menu.svelte';
	import Nav from '$lib/components/Nav/Nav.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';
	import Loading from '$lib/components/UI/Loading.svelte';

	import { darkMode } from '$lib/context/darkMode';

	import { loading } from '$lib/context/loading';

	//Styles Global
	import 'prism-themes/themes/prism-dracula.css';
	import '$lib/styles/style.scss';

	let menuOpen = false;

	const menuHandler = (e: Event) => {
		e.preventDefault;
		menuOpen = !menuOpen;
	};

	// let darkMode = true;

	const darkModeHandler = () => {
		darkMode.set(!$darkMode);

		console.log($darkMode);

		localStorage.setItem('theme', $darkMode ? 'dark' : 'light');

		$darkMode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	};

	if (browser) {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			darkMode.set(true);
		} else {
			document.documentElement.classList.remove('dark');
			darkMode.set(false);
		}
	}

	//always false when route changes
	$: (menuOpen = false), $page;
	//always add noscroll to body when menu is open
	$: if (browser) document.body.classList.toggle('noscroll', menuOpen);
	//reactive statement, loading true when navigating is true
	$: $loading = !!$navigating;

	export let data: any;
</script>

<Nav {darkModeHandler} {menuHandler} />

{#key data.currentRoute}
	<main
		class="text-black dark:text-white bg-slate-50 dark:bg-black ml-12 md:ml-28 min-h-screen p-4 md:p-8 max-w-screen md:max-w-[90vw] mx-auto my-0 relative"
		in:fade={{ duration: 150, delay: 150 }}
		out:fade={{ duration: 150 }}
	>
		<Loading />
		<slot />
		<DeviceDetector showInDevice="mobile">
			<Menu {menuOpen} {menuHandler} />
		</DeviceDetector>
		<Footer />
	</main>
{/key}
