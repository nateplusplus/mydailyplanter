/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { Component } from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"

import Navbar from "./navbar"
import Login from "./login"
import SignUp from "./signup"
import Modal from "./modal"

var jwt = require('jsonwebtoken');

class Layout extends Component {

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

    var token = jwt.sign( userData, process.env.JWT_KEY );
    localStorage.setItem( 'dp_auth', token );

    navigate(`/plants`)
  }

  getUserSession = () => {
    var userSession = localStorage.getItem( 'dp_auth' );
    if ( userSession ) {
      try {
        var userData = jwt.verify( userSession, process.env.JWT_KEY );
        this.setState({ userData : userData });
      } catch ( error ) {
        console.warn( 'Your session has expired. Please log in again.' );
      }
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
        <main>{ this.props.children }</main>
        <footer>
          © {new Date().getFullYear()} Nathan Blair
        </footer>
      </>
    )
  }
}

Layout.propTypes = {
  metadata: PropTypes.object.isRequired
}

export default Layout
