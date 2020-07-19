/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { StaticQuery, navigate, graphql } from "gatsby"

import Navbar from "./navbar"
import Login from "./login"
import SignUp from "./signup"
import PasswordReset from "./passwordReset"
import Modal from "./modal"

var jwt = require('jsonwebtoken');

const modalDefaults = {
  name  : 'signin',
  title : 'Sign In',
  body  : ''
}

class Layout extends React.Component {

  constructor( props ) {
    super(props)
    this.state = {
      modalIsToggled : false,
      userData       : {},
      modalData      : modalDefaults,
      isLoading      : true,
    }
  }

  toggleModal = ( name, title, body ) => {
    // Default data
    let modalData      = this.getModalData( name, title, body );

    // TODO: leaving for backwards compatiblitiy - Refactor this.
    if ( name === 'signup' ) {
      modalData.title = 'Sign Up';
      modalData.body  = <SignUp handleLogin={ this.handleLogin } toggleModal={ this.toggleModal } />
    } else if ( name === 'signin' ) {
      modalData.title = 'Sign In';
      modalData.body  = <Login handleLogin={ this.handleLogin } toggleModal={ this.toggleModal } />
    } else if ( name === 'passwordReset' ) {
      modalData.title = 'Reset Your Password';
      modalData.body  = <PasswordReset toggleModal={ this.toggleModal } />
    }

    // Setup modal with data, which will trigger the toggle action
    this.setState({
      modalIsToggled : true,
      modalData      : modalData
    });
  }

  getModalData = ( name, title, body ) => {
    let modalData = modalDefaults;

    if ( name ) {
      modalData.name  = name;
    }
    if ( title ) {
      modalData.title  = title;
    }
    if ( body ) {
      modalData.body  = body;
    }

    return modalData;
  }

  closeModal = ( event ) => {
    if ( event.target === event.currentTarget ) {
      event.preventDefault();
      event.stopPropagation();

      let modalData = this.getModalData();
      this.setState({
        modalIsToggled : false,
        modalData      : modalData
      });
    }
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
        this.setState({
          userData  : userData
        });
      } catch ( error ) {
        console.warn( 'Your session has expired. Please log in again.' );
      }
    }
  }

  componentDidMount = () => {
    this.getUserSession();

    // Give some components time to load first
    window.setTimeout( function() {
      this.setState({
        isLoading : false
      });
    }.bind(this), 700 );
  }

  render() {

    return (
      <>
        <Modal
          isToggled={ this.state.modalIsToggled }
          handleClose={ this.closeModal }
          title={ this.state.modalData.title }
          name={ this.state.modalData.name }
          isLoading={ this.state.isLoading }
        >
          { this.state.modalData.body }
        </Modal>
        <StaticQuery
          query={graphql`
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
            }`
          }
          render={
            data => <Navbar
              siteTitle={ data.site.siteMetadata.title }
              siteLogo={ data.siteLogo.childImageSharp.fixed }
              toggleModal={ this.toggleModal }
              userData={ this.state.userData }
            />
          }
        />
        
        <main className="page-background">{
          React.Children.map( this.props.children, child => {
            let props = {}

            // Don't add props to any DOM elements
            if ( typeof child.type !== 'string' ) {
              props = { toggleModal: this.toggleModal };
            }

            return React.cloneElement( child, props );
          } )
        }</main>
        <footer>
          © {new Date().getFullYear()} Nathan Blair
        </footer>
      </>
    )
  }
}

export default Layout
