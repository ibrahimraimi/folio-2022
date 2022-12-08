import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ fetch }) => {
	const response = await fetch(`/api/posts`);
	const posts = await response.json();

	console.log(posts);

	return {
		posts
	};
};
