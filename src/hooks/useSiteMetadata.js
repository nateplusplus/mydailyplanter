import { useStaticQuery, graphql } from "gatsby"

const useSiteMetadata = () => {
  const metadata = useStaticQuery(graphql`
    query SiteDataQuery {
    site {
      siteMetadata {
      title
      }
    }
    siteLogo: file(relativePath: { eq: "logo1-sm.png" }) {
      childImageSharp {
      fixed( height: 36 ) {
        ...GatsbyImageSharpFixed
      }
      }
    }
    }
  `)

  return metadata;
}

export default useSiteMetadata