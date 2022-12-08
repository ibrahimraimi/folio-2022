import type { Load } from '@sveltejs/kit';

//Put this back to true once there's posts

// export const prerender = true;
export const prerender = 'auto';

export const load: Load = async ({ url }) => {
	const currentRoute = url.pathname;

	return {
		currentRoute
	};
};
