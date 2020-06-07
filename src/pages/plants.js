import React from "react"
import { navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import AddPlantForm from '../components/addPlantForm'
import PlantList from "../components/plantList"

import "../sass/main.scss";

class PlantsPage extends React.Component {
  constructor( props ) {
    super(props)
  }

  render () {
    return (
      <Layout>
        <SEO title="My Plants" />
        <PlantList />
      </Layout>
    );
  }
}

export default PlantsPage
