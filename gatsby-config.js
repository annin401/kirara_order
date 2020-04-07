module.exports = {
  siteMetadata: {
    title: `Kirara Order`,
    description: `A web app to view publication order of mangatimekirara.`,
    author: `annin401`,
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
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `data`,
    //     path: `${__dirname}/data/`,
    //     ignore: [`**/\.*`], // . から始まるファイルは追跡しない
    //   },
    // },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // `gatsby-plugin-manifest`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
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
