import React from "react"
import { navigate } from "gatsby"
import Layout from "../components/layout"

class LogoutPage extends React.Component {
  constructor( props ) {
    super(props)
    this.state = {}
  }

  logoutAndRedirect = () => {
    localStorage.removeItem( 'dp_auth' );
    navigate(`/`)
  }

  componentDidMount() {
      this.logoutAndRedirect();
  }

  render() {
      return(
          <Layout></Layout>
      )
  }
}

export default LogoutPage
