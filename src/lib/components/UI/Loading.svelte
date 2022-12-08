<script lang="ts">
	import { loading } from '$lib/context/loading';

	const wait = () => new Promise((resolve) => setTimeout(resolve, 800));
</script>

{#if $loading}
	{#await wait()}
		<div />
	{:then a}
		<div class="absolute top-0 left-0 w-full h-screen bg-gray-400/80">
			<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
				<h2>Loading...</h2>
			</div>
		</div>
	{/await}
{/if}
