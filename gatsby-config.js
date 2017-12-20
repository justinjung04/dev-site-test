module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-prismjs`,
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
              ignoreFileExtensions: []
            }
          },
          {
            resolve: `gatsby-remark-external-links`,
            options: {
              target: `_blank`
            }
          }
        ]
      }
    },
    `gatsby-transformer-json`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
  ],
  pathPrefix: `/`,
};