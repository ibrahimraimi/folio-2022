<script lang="ts">
	import Canvas from '../Canvas/Canvas.svelte';

	export let menuOpen: boolean;

	export let menuHandler: (e: Event) => void;
</script>

<div
	class="mobilemenu {menuOpen
		? 'left-0'
		: '-left-full'} md:hidden bg-gray-400 fixed top-0 w-full h-screen z-10 grid place-items-center"
>
	<Canvas />
	<!-- <div class="overlay bg-gray-400 absolute w-full h-full opacity-80" /> -->
	<div class="container flex flex-row items-stretch gap-24 z-20">
		<div class="ml-12 flex flex-col items-center w-full">
			<a
				on:click={menuHandler}
				class="font-title font-bold text-3xl md:text-6xl leading-loose md:leading-relaxed md:transform md:-translate-x-16"
				href="/"
				style="opacity: 1;">Home</a
			>
			<a
				on:click={menuHandler}
				class="font-title font-bold text-3xl md:text-6xl leading-loose md:leading-relaxed md:transform md:translate-x-16"
				href="/about"
				style="opacity: 1;">About</a
			>
			<a
				on:click={menuHandler}
				class="font-title font-bold text-3xl md:text-6xl leading-loose md:leading-relaxed md:transform md:translate-x-16"
				href="/writing"
				style="opacity: 1;">Writing</a
			>
		</div>
	</div>
</div>

<style lang="scss">
	.mobilemenu {
		transition: all 0.25s ease-in-out;
	}

	// .open {
	// 	left: 0;
	// }

	// .closed {
	// 	left: -100%;
	// }

	.container {
		width: 100%;
		max-width: 1200px;
		padding-left: 32px;
		padding-right: 32px;
		margin-left: auto;
		margin-right: auto;
	}
</style>
