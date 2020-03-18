module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    'gatsby-plugin-emotion',
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: `gatsby-plugin-graphql-codegen`,
      options: {
        fileName: `types/graphqlTypes.d.ts`,
      },
    },
    `gatsby-plugin-react-helmet`,
    // `gatsby-source-filesystem`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // `gatsby-plugin-manifest`,
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        content: [
          require('path').join(
            process.cwd(),
            'src/**/!(*.d).{js,jsx,ts,tsx,md,mdx}'
          ),
        ],
        printRejected: true, // 被害者リストをprintする
        develop: false, // gatsby develop の実行時にもPurgeCSSを発動させるか
        tailwind: true, // Tailwindと使う時にonする
        whitelist: ['emoji'], // ここに書いたのは消されない
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
