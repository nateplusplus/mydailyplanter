import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const DropdownMenu = ( { isLoggedIn, toggleModal, userData } ) => {
	if ( isLoggedIn ) {
		return (
			<ul role="menu" className="list-reset p-3 text-right">
				<li className="py-1 mb-2"><b>Hi, { userData.firstname }</b></li>
				<li role="none" className="py-1">
					<Link to="/plants">My Plants</Link>
				</li>
				<li role="none" className="py-1">
					<a href="#settings" role="menuitem"><span className="alert-flag alert-flag-active"></span>Settings</a>
				</li>
				<li role="none" className="py-1">
					<a href="#logout" role="menuitem">Logout</a>
				</li>
				<li role="none" className="py-1 list-separator"></li>
				<li role="none" className="py-1">
					<a href="#help" role="menuitem">Help</a>
				</li>
			</ul>
		)
	} else {
		return (
			<ul role="menu" className="list-reset p-3 text-right">
				<li role="none" className="py-1">
					<a href="#signup" role="menuitem" onClick={ () => toggleModal( 'signup' ) }>New Account</a>
				</li>
				<li role="none" className="py-1">
					<a href="#signin" role="menuitem" onClick={ () => toggleModal( 'signin' ) }>Sign In</a>
				</li>
				<li role="none" className="py-1 list-separator"></li>
				<li role="none" className="py-1">
					<a href="#help" role="menuitem">Help</a>
				</li>
			</ul>
		)
	}
}

DropdownMenu.propTypes = {
	isLoggedIn  : PropTypes.bool.isRequired,
	toggleModal : PropTypes.func.isRequired,
	userData    : PropTypes.object
}

export default DropdownMenu;