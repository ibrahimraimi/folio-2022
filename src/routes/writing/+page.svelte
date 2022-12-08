<script lang="ts">
	// This is the "normal" client-side script
	import Heading from '$lib/components/UI/Heading.svelte';
	import BlogCard from '$lib/components/Blog/BlogCard.svelte';
	export let data: any;
</script>

<Heading>writing</Heading>

<ul>
	{#if data.posts.length > 0}
		{#each data.posts as post}
			<li
				class="first:border-none mb-8 py-4 border-t border-white dark:border-black border-opacity-50"
			>
				<BlogCard {post} />
			</li>
		{/each}
	{/if}
</ul>
