<script lang="ts">
	import Heading from '$lib/components/UI/Heading.svelte';

	import ExternalLink from '$lib/components/UI/ExternalLink.svelte';
	import Pill from '$lib/components/UI/Pill.svelte';
</script>

<Heading>about</Heading>

<div class="pt-0 md:max-w-[70vw] prose-xl lg:prose-2xl ">
	<h3 class="text-2xl">Ibrahim Raimi | Web Development | Open Source | Copmuter Graphics</h3>
	<p>
		I'm a web developer with particular interest in computer graphics. In my work I build and design
		component-driven interfaces, where I especially like working on more playful / gamified web
		experiences that might diverge from tested UX patterns.
	</p>

	<h2 class="mt-0 mb-4 !text-2xl font-medium">Tech I Like To Use:</h2>
	<div class="w-full flex flex-wrap gap-2 mt-2 mb-4 uppercase font-bold">
		<ExternalLink classes="not-italic" ariaLabel="react" href="https://reactjs.org/">
			<Pill>React</Pill>
		</ExternalLink>
		<ExternalLink classes="not-italic" ariaLabel="svelte" href="https://svelte.dev/">
			<Pill>Svelte</Pill>
		</ExternalLink>
		<ExternalLink classes="not-italic" ariaLabel="threejs" href="https://threejs.org/">
			<Pill>THREE.JS</Pill>
		</ExternalLink>
		<Pill>GLSL</Pill>
		<Pill>Typescript</Pill>
		<ExternalLink classes="not-italic" ariaLabel="nodejs" href="https://nodejs.org/">
			<Pill>Node.js</Pill>
		</ExternalLink>
		<ExternalLink classes="not-italic" ariaLabel="prisma" href="https://www.prisma.io/">
			<Pill>Prisma</Pill>
		</ExternalLink>
		<ExternalLink classes="not-italic" ariaLabel="webpack" href="#">
			<Pill>Parcel</Pill>
		</ExternalLink>
		<ExternalLink classes="not-italic" ariaLabel="postgres" href="https://www.postgresql.org/">
			<Pill>postgresql</Pill>
		</ExternalLink>
	</div>
</div>
