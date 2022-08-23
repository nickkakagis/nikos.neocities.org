import rss from "@astrojs/rss";

// @ts-ignore
const postImportResult = import.meta.glob("./blog/*.md", { eager: true });
const posts = Object.values(postImportResult);

export const get = () => {
	return rss({
		title: "Mastronikos",
		description: "Nick Kakagis' personal website",
		// @ts-ignore
		site: import.meta.env.SITE,
		// @ts-ignore
		items: posts.map((post) => {
			// @ts-ignore
			const [day, month, year] = post.frontmatter.pubDate
				.split("-")
				.reverse();

			return {
				// @ts-ignore
				link: post.url,
				// @ts-ignore
				title: post.frontmatter.title,
				pubDate: (() => {
					new Date(
						parseInt(year),
						parseInt(month),
						parseInt(day)
					).toISOString();
				})(),
				// @ts-ignore
				description: post.frontmatter.desc,
			};
		}),
	});
};
