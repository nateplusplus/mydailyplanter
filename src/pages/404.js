import React from "react"

import PageWrapper from "../components/pageWrapper"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <PageWrapper>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </PageWrapper>
)

export default NotFoundPage
