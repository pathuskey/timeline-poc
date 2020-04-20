module.exports = {
  siteMetadata: {
    title: "Timeline POC",
    siteUrl: "http://localhost",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/data`,
        name: "data",
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaultQuality: 75,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-transformer-remark",
  ],
}
