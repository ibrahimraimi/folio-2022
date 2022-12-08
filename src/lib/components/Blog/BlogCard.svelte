<script lang="ts">
	export let post: any;
</script>

<article>
	<a data-sveltekit-prefetch href={post.path} class="block">
		<h2 class="item__title text-4xl m-0 mb-1 lg:max-w-[70vw]">{post.meta.title}</h2>
		<p class="italic text-base m-0 mb-2">{post.meta.date}</p>
		<p class="text-xl m-0">
			{post.meta.description ? post.meta.description : ''}
		</p>
	</a>
</article>

<style lang="scss">
	article a:first {
		border: none;
	}
</style>
