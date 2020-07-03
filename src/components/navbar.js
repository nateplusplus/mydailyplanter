import React from "react"

import { Link } from "gatsby"
import Img from "gatsby-image"

import menuIcon from "../images/menu.svg"
import DropdownMenu from "./dropdownMenu"


class Navbar extends React.Component {

  constructor( props ) {
    super(props)
    this.state = {
      navCollapsed : false,
      isLoggedIn   : false,
    }
  }

  toggleNav = (event) => {
    event.preventDefault();
    let navbarMenu = document.querySelector('.navbar-menu');

    if ( navbarMenu && ! this.state.navCollapsed ) {
      navbarMenu.setAttribute('tabindex', '0');
      navbarMenu.focus();
    }
  }

  handleDropdownFocus = (event) => {
    this.setState( { navCollapsed : true } );
  }

  handleDropdownBlur = (event) => {
    window.setTimeout( () => {
      this.setState( { navCollapsed : false } );
    }, 200 );
  }

  componentDidUpdate() {
    if ( typeof this.props.userData.uid !== 'undefined' && this.state.isLoggedIn === false ) {
      this.setState( { isLoggedIn : true } );
    }
  }

  render() {

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
        <div className="relative alert-flag">
          <button onClick={ this.toggleNav } className="w-6 h-6">
            <img src={ menuIcon } alt="toggle the navigation menu" />
          </button>
          <div className='navbar-menu' onFocus={this.handleDropdownFocus} onBlur={this.handleDropdownBlur}>
            <DropdownMenu
              isLoggedIn={this.state.isLoggedIn}
              toggleModal={ this.props.toggleModal }
              userData={ this.props.userData }
            />
          </div>
        </div>
      </nav>
    )
  } 
}

export default Navbar
