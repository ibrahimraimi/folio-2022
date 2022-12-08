// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static'
import sveltePreprocess from "svelte-preprocess";
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'null',
			precompress: false,
			strict: false
		}),
	},
	extensions: ['.svelte', '.md'],
	// prerender: {
	// 	handleHttpError: 'ignore',
	// 	handleMissingId: 'ignore',
	// },
	preprocess: [
		sveltePreprocess(),
		mdsvex({
			extensions: ['.md']
		})
	],
};

export default config;

