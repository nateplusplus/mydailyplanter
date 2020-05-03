import React, { Component } from "react"
import PropTypes from "prop-types"

class PlantListItem extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            lastWatered : 'Jan 27th, 2020'
        }
    }

    render() {
        return (
            <div className="list-item">
                <div className="list-item-body">
                    <div className="list-item-icon">
                        <svg
                            className="w-8 h-8 stroke-current fill-current text-blue"
                            alt="Click to water plant"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                        </svg>
                    </div>
                    <div className="list-item-text">
                        <div className="cursor-pointer">
                            { this.props.name }
                        </div>
                        <small className="text-grey-darker">
                            Last watered: { this.state.lastWatered }
                        </small>
                    </div>
                    <div className="list-item-actions">
                        <button className="dropdown-toggle" type="button">
                            <span className="leading-normal">...</span>
                        </button>
                        <div className="dropdown-menu hidden">
                            <ul className="list-reset">
                                <li className="py-2 ml:hidden">
                                    <a className="cursor-pointer px-4 py-2 hover:text-grey-darker">Info</a>
                                </li>
                                <li className="py-2">
                                    <a className="cursor-pointer px-4 py-2 hover:text-grey-darker">Edit</a>
                                </li>
                                <li className="py-2">
                                    <a className="cursor-pointer px-4 hover:text-grey-darker">Delete</a>
                                </li>
                            </ul>
                        </div>  
                    </div>
                </div>
            </div>
        );
    }
}

PlantListItem.propTypes = {
    name: PropTypes.string.isRequired,
  }


export default PlantListItem