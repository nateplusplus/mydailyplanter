import React from "react"
import { navigate } from "gatsby"
import PageWrapper from "../components/pageWrapper"

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
          <PageWrapper></PageWrapper>
      )
  }
}

export default LogoutPage
