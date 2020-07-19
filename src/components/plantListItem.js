import React, { Component } from "react"
import PropTypes from "prop-types"

import { createPlantLog, getPlantLogsByPlantId, getLastWateredLog } from "../services/plantlogs"
import { handleEditPlant } from "../services/userplants"
import EditPlant from '../components/editPlant'
import PlantLogList from './plantLogList'

import moment from 'moment'

const defaultState = {
    lastWatered    : 'Never', //'Jan 27th, 2020'
    plantLogs      : {},
    daysFromNow    : 0,
    dropdownActive : false
} 

class PlantListItem extends Component {

    constructor( props ) {
        super( props )
        this.state = defaultState;
    }

    handleWaterAction = () => {
        createPlantLog( this.props.plantId, 'watered', this.handleSuccess, this.handleFailure )
    }

    handleSuccess = ( response ) => {
        this.getPlantLogs()
        this.getLastWateredLog()
    }

    handleFailure = ( error ) => {
        console.error( 'Error creating plant log: ', error )
    }

    setPlantLogs = ( plantLogs ) => {
        this.setState( { plantLogs } )
    }

    getPlantLogs = () => {
        getPlantLogsByPlantId( this.props.plantId, this.setPlantLogs, this.handleFailure )
    }

    getLastWateredLog = () => {
        getLastWateredLog( this.props.plantId, this.setLastWatered, this.handleFailure )
    }

    setLastWatered = ( results ) => {
        let dateString = defaultState.lastWatered;
        let lastWateredDate = '';

        if ( results ) {
            const keys        = Object.keys( results );
            const lastWatered = results[ keys[0] ];
            if ( lastWatered && lastWatered.hasOwnProperty( 'created' ) ) {
                lastWateredDate = lastWatered.created;

                let plant = {
                    userId       : this.props.userId,
                    plantId      : this.props.plantId,
                    name         : this.props.name,
                    description  : this.props.description,
                    last_watered : lastWateredDate
                }
                handleEditPlant( plant, this.props.handleWatered, this.handleFailure );

                dateString = moment( lastWatered.created ).fromNow();
            }
        }

        if ( this.state.lastWatered !== dateString ) {
            this.setState( {
                lastWatered : dateString,
            });
        }

        const daysFromNow = ( this.state.lastWatered !== 'Never' ) ? moment().diff( lastWateredDate, 'days') : -1
        this.setState( { daysFromNow : daysFromNow } )
    }

    toggleDropdown = ( event ) => {
        event.preventDefault();

        let dropdownToggle = event.target;
        if ( ! event.target.classList.contains( 'dropdown-toggle') ) {
            dropdownToggle = event.target.parentNode;
        }

        event.stopPropagation();
        let dropdownMenu  = dropdownToggle.nextElementSibling;

        if ( dropdownMenu && ! this.state.dropdownActive ) {
            dropdownMenu.setAttribute('tabindex', '0');
            dropdownMenu.focus();
        }
    }

    handleDropdownFocus = ( event ) => {
        this.setState( { dropdownActive : true } );
    }
    handleDropdownBlur = ( event ) => {
        window.setTimeout( () => {
            this.setState( { dropdownActive : false } );
        }, 200);
    }

    handleDelete = () => {
        this.props.deletePlant( this.props.plantId )
    }

    handlePlantModal = () => {
        let description = ''
        if ( typeof this.props.description !== 'undefined' ) {
            description = this.props.description
        }

        const modalBody = <EditPlant
                            name={ this.props.name }
                            description={ description }
                            handleSuccess={ this.props.handleUpdate }
                            userId={ this.props.userId }
                            plantId={ this.props.plantId }
                            togglePlantLog={ this.togglePlantLog }
                        />

        this.props.toggleModal( 'plant', 'Plant Details', modalBody )
    }

    togglePlantLog = ( event ) => {
        event.preventDefault()

        const modalBody = <PlantLogList
                            plantId={ this.props.plantId }
                            plantLogs={ this.state.plantLogs }
                            handleSuccess={ this.props.handleUpdate }
                            togglePlantDetails={ this.handlePlantModal }
                        />

        this.props.toggleModal( 'plantLog', this.props.name + ' - Log', modalBody )
    }

    componentDidMount = () => {
        this.getPlantLogs()
        this.getLastWateredLog()
    }

    render() {
        const dropletClass  = this.state.daysFromNow === 0 ? '' : 'svg-unfill'

        return (
            <div className="list-item">
                <div className="list-item-body">
                    <a
                        className="list-item-icon"
                        onClick={ this.handleWaterAction }
                        tabIndex='0'
                    >
                        <svg
                            className={ "w-8 h-8 stroke-current fill-current text-blue " + dropletClass }
                            alt="Click to water plant"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                        </svg>
                    </a>
                    <div className="list-item-text">
                        <div tabIndex='0' className="cursor-pointer" onClick={ this.handlePlantModal }>
                            { this.props.name }
                        </div>
                        <small className="text-grey-darker">
                            Last watered: { this.state.lastWatered }
                        </small>
                    </div>
                    <div className="list-item-actions">
                        <button
                            className="dropdown-toggle"
                            type="button"
                            onClick={ this.toggleDropdown }
                        >
                            <span className="leading-normal">...</span>
                        </button>
                        <div tabIndex='0' className="dropdown-menu" onFocus={ this.handleDropdownFocus } onBlur={ this.handleDropdownBlur }>
                            <ul className="list-reset">
                                <li className="py-2">
                                    <a
                                        className="cursor-pointer px-4 py-2 hover:text-grey-darker"
                                        onClick={ this.handlePlantModal }
                                        tabIndex='0'
                                    >
                                        Edit
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a
                                        className="cursor-pointer px-4 hover:text-grey-darker"
                                        onClick={ this.handleDelete }
                                        tabIndex='0'
                                    >
                                        Delete
                                    </a>
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