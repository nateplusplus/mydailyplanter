/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import Navbar from "./navbar"
import Login from "./login"
import Modal from "./modal"

class Layout extends React.Component {

  constructor( props ) {
    super(props)
    this.state = {
      modalIsToggled : true,
    }

  }

  toggleModal = () => {
    console.log('toggleModal');
    this.setState({ modalIsToggled : !this.state.modalIsToggled });
  }

  render() {
    return (
      <>
        <Modal isToggled={ this.state.modalIsToggled } handleClose={ this.toggleModal }>
          <Login />
        </Modal>
        <Navbar siteTitle={ this.props.metadata.site.siteMetadata.title } siteLogo={ this.props.metadata.siteLogo.childImageSharp.fixed } />
        <main>{this.props.children}</main>
        <footer>
          © {new Date().getFullYear()} Nathan Blair
        </footer>
      </>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  metadata: PropTypes.object.isRequired
}

export default Layout
