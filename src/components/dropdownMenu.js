import React from "react"

const DropdownMenu = ( { isLoggedIn } ) => {
	if ( isLoggedIn ) {
		return (
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
					<a>Help</a>
				</li>
			</ul>
		)
	} else {
		return (
			<ul className="list-reset p-3 text-right">
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
		)
	}
}

export default DropdownMenu;