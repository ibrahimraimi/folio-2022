<script lang="ts">
	import { fade } from 'svelte/transition';
	import ExternalLink from '../UI/ExternalLink.svelte';

	import Pill from '../UI/Pill.svelte';

	export let title: string;
	export let img: string;
	export let description: string;
	export let activeLink: string | undefined | null;
	export let roles: string[];
	export let tech: string[];
</script>

<div class="project-wrapper">
	<div class="project lg:flex" transition:fade={{ delay: 200 }}>
		<div class="mb-4">
			<img
				src={img}
				alt={title}
				class="webgl-image md:h-[50vh] w-full md:w-[50vw] md:min-w-[40vw] object-cover"
			/>
		</div>
		<section class="lg:px-8 lg:py-4 lg:flex flex-col justify-between">
			<div>
				<h2 class="item__title mb-2 text-4xl uppercase">{title || 'PROJECT'}</h2>
				<p class="text-xl lg:text-2xl m-0 mb-4">
					{description}
				</p>
				<div class="text-xl lg:text-2xl m-0 mb-4">
					{#if activeLink}
						<ExternalLink classes="hover:opacity-80" href={activeLink} ariaLabel="Grapevine">
							<span>Visit</span>
						</ExternalLink>
					{/if}
					<!-- {#if activeLink}
						<ExternalLink classes="hover:opacity-80" href="https://www.grapevineberlin.com/" ariaLabel="Grapevine">
							<span>Code</span>
						</ExternalLink>
						{/if} -->
				</div>
			</div>

			<div class="">
				<p class="text-xl lg:text-2xl m-0">Role:</p>
				<div class="flex gap-2 mt-2 mb-4">
					{#each roles as role}
						<Pill>{role}</Pill>
					{/each}
				</div>
				<p class="text-xl lg:text-2xl m-0">Tech:</p>
				<div class="flex gap-2 mt-2 mb-4">
					{#each tech as techOption}
						<Pill>{techOption}</Pill>
					{/each}
				</div>
			</div>
		</section>
	</div>
</div>

<style lang="scss">
	.project-wrapper {
		&:nth-of-type(even) {
			.project {
				flex-direction: row-reverse;
				section {
					padding-left: 0;
				}
			}
		}
	}
</style>
