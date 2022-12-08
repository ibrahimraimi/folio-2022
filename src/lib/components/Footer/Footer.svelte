<script lang="ts">
	import ExternalLink from '../UI/ExternalLink.svelte';
</script>

<footer
	class="w-full mx-auto mt-32 border border-red-600 dark:border-white grid md:grid-rows-2 grid-cols-2 md:grid-cols-6 2xl:grid-cols-8 uppercase text-base font-bold md:text-xl transition-all duration-250 ease-in-out"
>
	<div
		class="p-4 md:p-0 border-red-600 dark:border-white border-b border-r flex items-center justify-center md:border-b-0 md:row-span-2"
	>
		<img src="/jason6logo.svg" alt="Jason Logo" class="logo max-h-16" />
	</div>
	<div
		class="p-4 row-start-2 md:row-start-1 md:col-start-2 col-span-2 border-red-600 dark:border-white md:border-r border-b md:col-span-4"
	>
		Mail: raimiibrahim44@gmail.com
	</div>
	<div
		class="p-4 row-start-3 md:row-start-2 border-red-600 dark:border-white border-r  col-span-4 md:col-start-2"
	>
		Website built with SvelteKit. View the code <ExternalLink
			classes="hover:opacity-80"
			ariaLabel="github code"
			href="https://github.com/ibrahimraimi/folio"
		>
			here
		</ExternalLink>
	</div>
	<!-- <div class="p-4 col-span-1 row-span-1">Website built with SvelteKit. View the code here</div> -->
	<div
		class="col-start-2 md:row-start-2 md:col-start-6 xl:col-span-4 border-red-600 dark:border-white border-b md:border-t md:border-b-0 flex justify-center items-center uppercase"
	>
		<a href="/legal"> More About Me </a>
	</div>
</footer>

<style lang="scss">
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(359deg);
		}
	}
	.logo {
		animation: spin 24s infinite linear;

		&:hover {
			animation-play-state: paused;
		}
	}
</style>
