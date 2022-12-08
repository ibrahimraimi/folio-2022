export const fetchMarkdownPosts = async () => {
	//returns an object where each file’s relative path is the key, and the value is a “resolver” function
	const allPostFiles = import.meta.glob('/src/routes/writing/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]: any[]) => {
			const { metadata } = await resolver();
			const postPath = path.slice(11, -3);

			return {
				meta: metadata,
				path: postPath
			};
		})
	);

	return allPosts;
};
