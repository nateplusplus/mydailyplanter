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
import SignUp from "./signup"
import Modal from "./modal"

var jwt = require('jsonwebtoken');

class Layout extends React.Component {

  constructor( props ) {
    super(props)
    this.state = {
      modalIsToggled : false,
      userData       : {},
      modalData      : {
        name  : 'signin',
        title : 'Sign In'
      }
    }
  }

  toggleModal = ( name ) => {

    let modalData = {
      name  : name,
      title : 'Sign In'
    }

    if ( name === 'signup' ) {
      modalData.title = 'Sign Up'
    }

    this.setState({
      modalIsToggled : !this.state.modalIsToggled,
      modalData      : modalData
    });
  }

  handleLogin = ( userData ) => {
    this.setState({
      userData : userData,
      modalIsToggled : false
    });

    var token = jwt.sign( userData, 'secret' );
    localStorage.setItem( 'dp_auth', token );

    // navigate(`/app/profile`)
  }

  getUserSession = () => {
    var userSession = localStorage.getItem( 'dp_auth' );
    if ( userSession ) {
      var userData = jwt.verify( userSession, 'secret' );
      this.setState({ userData : userData });
    }
  }

  componentDidMount = () => {
    this.getUserSession();
  }

  render() {

    let form = <Login handleLogin={ this.handleLogin } />
    if ( this.state.modalData.name === 'signup' ) {
      form = <SignUp handleLogin={ this.handleLogin } />
    }

    return (
      <>
        <Modal
          isToggled={ this.state.modalIsToggled }
          handleClose={ this.toggleModal }
          title={ this.state.modalData.title }
          name={ this.state.modalData.name }
        >
          { form }
        </Modal>
        <Navbar
          siteTitle={ this.props.metadata.site.siteMetadata.title }
          siteLogo={ this.props.metadata.siteLogo.childImageSharp.fixed }
          toggleModal={ this.toggleModal }
          userData={ this.state.userData }
        />
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
