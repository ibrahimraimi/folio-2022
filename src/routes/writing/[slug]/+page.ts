import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ params }) => {
	try {
		const post = await import(`../${params.slug}.md`);
		console.log(post);
		const { title, date, published, featuredImage, seoMetaDescription } = post.metadata;
		const content = post.default;

		return {
			content,
			title,
			published,
			date,
			featuredImage,
			seoMetaDescription
		};
	} catch (error) {
		console.log(error);
	}
};
