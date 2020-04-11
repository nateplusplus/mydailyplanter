module.exports = {
  siteMetadata: {
    title: `My Daily Planter`,
    description: `A web app to help your plants thrive.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: "AIzaSyDiYPCHJ_WmPgKaf1W8D5nzjk00qBJRw00",
          authDomain: "daily-planter.firebaseapp.com",
          databaseURL: "https://daily-planter.firebaseio.com/",
          projectId: "daily-planter",
          storageBucket: "daily-planter.appspot.com",
          messagingSenderId: "335084839509",
          appId: "1:335084839509:web:379b2e86cdc4ecb6e0aadc"
        }
      }
    }
  ],
}
