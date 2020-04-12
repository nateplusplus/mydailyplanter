import PropTypes from "prop-types"
import React from "react"

import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import menuIcon from "../images/menu.svg"


class Navbar extends React.Component {

  constructor( props ) {
    super(props)
    this.state = {
      navCollapsed : true
    }
  }

  toggleNav() {
    this.setState( state => ({
      navCollapsed : ! state.navCollapsed
    }))
  }

  render() {
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
          <button onClick={this.toggleNav()} className="w-6 h-6">
            <img src={ menuIcon } alt="toggle the navigation menu" />
          </button>
          <div v-show="userNav" className="navbar-menu">
            <ul className="list-reset p-3 text-right">
              <li className="py-1 mb-2"><b>Hi, NAME</b></li>
              <li className="py-1">
                <a>My Plants</a>
              </li>
              <li className="py-1">
                <a ><span className="alert-flag alert-flag-active"></span>Settings</a>
              </li>
              <li className="py-1">
                <a>Logout</a>
              </li>
              <li className="py-1 list-separator"></li>
              <li className="py-1">
                  <a>New Account</a>
              </li>
              <li className="py-1">
                <a>Sign In</a>
              </li>
              <li className="py-1 list-separator"></li>
              <li className="py-1">
                <a>Help</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  } 
}

export default Navbar
