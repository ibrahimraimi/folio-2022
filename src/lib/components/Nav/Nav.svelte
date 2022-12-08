<script lang="ts">
	import ExternalLink from '../UI/ExternalLink.svelte';
	import Logo from '../Icons/Logo.svelte';
	import Twitter from '../Icons/Twitter.svelte';
	import Github from '../Icons/Github.svelte';

	export let menuHandler: (e: Event) => void;
	export let darkModeHandler: () => void;
	// export let dark: boolean;
</script>

<div
	class="fixed top-0 left-0 z-20 bottom-0 bg-slate-50 dark:bg-black transition-all duration-200 ease-in-out"
>
	<div
		class="w-12 md:w-14 m-0 py-7 text-center float-left h-full border-red-600 dark:border-white border-r-2 flex flex-col items-center justify-between"
	>
		<!-- DARK MODE TOGGLE  -->
		<div
			class="text-red-600 dark:text-white hover:scale-110 lg:transition-transform duration-200 ease-in-out"
		>
			<a
				href="/"
				on:click|preventDefault={() => {
					darkModeHandler();
				}}
			>
				<!-- <img src="/jason6logo.svg" alt="GitHub Logo" class="w-6 h-6" /> -->
				<Logo className="w-8 h-8" />
			</a>
		</div>

		<div
			on:keydown={menuHandler}
			on:click={menuHandler}
			class="md:hidden p-4 writing-mode-vertical rotate-180 tracking-wide cursor-pointer"
		>
			<h3 class="font-bold">Menu</h3>
		</div>

		<div class="flex flex-col p-0 text-red-600 dark:text-white">
			<ExternalLink
				classes="py-4 hover:opacity-80 block"
				ariaLabel="github"
				href="https://github.com/ibrahimraimi"><Github className="w-7 h-7" /></ExternalLink
			>

			<ExternalLink
				classes="hover:opacity-80 block"
				ariaLabel="twitter"
				href="https://twitter.com/ibrahimraimi_"><Twitter className="w-7 h-7" /></ExternalLink
			>
		</div>
	</div>

	<div
		class="hidden w-14 m-0 text-center float-left h-screen border-red-600 dark:border-white border-r-2 md:flex flex-col items-center justify-between"
	>
		<nav class="absolute bottom-0 pb-4 flex items-center">
			<ul class="list-none">
				<li
					class="writing-mode-vertical rotate-180 py-2 max-w-[24px] text-center max-height-[110px] whitespace-nowrap hover:opacity-80"
				>
					<a href={`/`}>
						<h3>HOME</h3>
					</a>
				</li>
				<li
					class=" writing-mode-vertical rotate-180 py-2 max-w-[24px] text-center max-height-[110px] whitespace-nowrap hover:opacity-80"
				>
					<a href="/writing">
						<h3>WRITING</h3>
					</a>
				</li>
				<li
					class="writing-mode-vertical rotate-180 py-2 max-w-(24px) text-center max-height-(110px) whitespace-nowrap hover:opacity-80"
				>
					<a href="/about">
						<h3>ABOUT</h3>
					</a>
				</li>
			</ul>
		</nav>
	</div>
</div>
