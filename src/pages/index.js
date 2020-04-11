import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Login from "../components/login"

import "../sass/main.scss";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Simple Login</h1>
    <Login />
    {/* <Link to="/page-2/">Go to page 2</Link> */}
  </Layout>
)

export default IndexPage
