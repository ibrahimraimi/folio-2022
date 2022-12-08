<script lang="ts">
	import { onMount } from 'svelte';

	let target: HTMLElement | null;

	export let hovered: boolean;

	onMount(() => {
		target = document.getElementById('projects');
	});

	const clickHandler = () => {
		target?.scrollIntoView({
			behavior: 'smooth'
		});
	};
</script>

<button
	on:mouseenter={() => (hovered = true)}
	on:mouseleave={() => (hovered = false)}
	on:click={clickHandler}
	class="hover:scale-90 hidden md:flex z-10 p-4 absolute bottom-16 left-1/2 -translate-x-1/2 justify-center items-center border text-red-600 dark:text-white border-red-600 dark:border-white rounded-full transition-all duration-200 ease-in-out"
>
	|
</button>
