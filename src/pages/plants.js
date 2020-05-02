import React from "react"
// import { Link } from "gatsby"

import PageWrapper from "../components/pageWrapper"
import SEO from "../components/seo"

import "../sass/main.scss";

const PlantsPage = () => (
  <PageWrapper>
    <SEO title="My Plants" />
    <div class="plants-list">
      <h2>My Plants</h2>
      <ul>
        <li>Plant 1</li>
        <li>Plant 2</li>
      </ul>
    </div>
  </PageWrapper>
)

export default PlantsPage
