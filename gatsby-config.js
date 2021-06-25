module.exports = {
  siteMetadata: {
    title: "team-blazing",
  },
  flags: {
    FUNCTIONS: true,
  },
  plugins: [
    "gatsby-plugin-gatsby-cloud",
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
  ],
};
