<script lang="ts">
	import Heading from '../UI/Heading.svelte';
</script>

<section id="projects" class="pt-8">
	<Heading>projects</Heading>

	<div class="grid grid-cols-1 gap-y-8 lg:gap-y-24 mb-8 lg:mb-24">
		<slot />
	</div>
</section>
