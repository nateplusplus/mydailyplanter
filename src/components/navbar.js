import PropTypes from "prop-types"
import React from "react"

import { Link } from "gatsby"
import Img from "gatsby-image"

import menuIcon from "../images/menu.svg"
import DropdownMenu from "./dropdownMenu"


class Navbar extends React.Component {

  constructor( props ) {
    super(props)
    this.state = {
      navCollapsed : true
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

    return (
      <div id="navbar">
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
            <DropdownMenu isLoggedIn={true} />
          </div>
        </div>
      </div>
    )
  } 
}

export default Navbar
