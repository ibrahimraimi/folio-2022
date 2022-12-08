// +server.js
import { fetchMarkdownPosts } from '$lib/utils';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	const allPosts = await fetchMarkdownPosts();

	const publishedPosts = allPosts.filter((post) => {
		return post.meta.published === true;
	});

	const sortedPosts = publishedPosts?.sort((a, b) => {
		//@ts-ignore
		return new Date(b.meta.date) - new Date(a.meta.date);
	});

	return json(sortedPosts);
};
