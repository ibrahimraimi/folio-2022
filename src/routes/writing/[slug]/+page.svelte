<!-- src/routes/[slug]/+page.svelte -->
<script lang="ts">
	import { VERTICAL_LINE_ENTITY } from '$lib/constants/entities';

	interface PostData {
		content: any;
		title: string;
		date: string;
		published: boolean;
		featuredImage: string;
		seoMetaDescription: string;
	}

	export let data: PostData;

	const dater = new Date(data.date)?.toLocaleString('en-GB', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric'
	});

	const pageTitle = `${data.title} ${VERTICAL_LINE_ENTITY} Jason Thompson`;
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={data.seoMetaDescription} />
	<meta name="twitter:card" content="summary_large_image" />
	{#if data.featuredImage}
		<meta name="twitter:image" content={data.featuredImage} />
	{/if}
	<meta name="twitter:label1" content="Written by" />
	<meta name="twitter:data1" content={'Jason Thompson'} />
</svelte:head>

<article class="mx-auto max-w-7xl">
	<header class="mb-16">
		<h1 class="text-3xl md:text-4xl tracking-wide text-center uppercase mb-4">{data.title}</h1>

		<p class="text-xl text-red text-center italic">Published: {dater}</p>
	</header>

	<section class="prose-xl lg:prose-xl dark:prose-invert">
		<svelte:component this={data.content} />
	</section>
</article>
