import React from "react"

import { Link } from "gatsby"
import Img from "gatsby-image"

import menuIcon from "../images/menu.svg"
import DropdownMenu from "./dropdownMenu"


class Navbar extends React.Component {

  constructor( props ) {
    super(props)
    this.state = {
      navCollapsed : true,
      isLoggedIn   : false
    }
  }

  toggleNav = () => {
    this.setState( state => ({
      navCollapsed : ! state.navCollapsed
    }))
  }

  render() {

    var menuClass = "navbar-menu";
    if ( this.state.navCollapsed ) {
      menuClass += " nav-collapsed";
    }

    if ( typeof this.props.userData.uid !== 'undefined' && this.state.isLoggedIn === false ) {
      this.setState( { isLoggedIn : true } );
    }

    return (
      <nav role="menubar" id="navbar">
        <div>
          <Link to="/">
            <Img
              fixed={ this.props.siteLogo }
              alt="Daily Planter Logo"
              className="site-logo"
            />
            <h1>{ this.props.siteTitle }</h1>
          </Link>
        </div>
        <div className="relative alert-flag alert-flag-active">
          <button onClick={ this.toggleNav } className="w-6 h-6">
            <img src={ menuIcon } alt="toggle the navigation menu" />
          </button>
          <div className={ menuClass }>
            <DropdownMenu isLoggedIn={this.state.isLoggedIn} toggleModal={ this.props.toggleModal } />
          </div>
        </div>
      </nav>
    )
  } 
}

export default Navbar
