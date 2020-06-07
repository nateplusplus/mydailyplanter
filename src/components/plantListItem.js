import React, { Component } from "react"
import PropTypes from "prop-types"

import { createPlantLog, getPlantLogsByPlantId, getLastWateredLog } from "../services/plantlogs"
import EditPlant from '../components/editPlant';

import moment from 'moment';

const defaultState = {
    lastWatered  : 'Never', //'Jan 27th, 2020'
    plantLogs    : {},
    showDropdown : false,
    daysFromNow  : 0
} 

class PlantListItem extends Component {

    constructor( props ) {
        super( props )
        this.state = defaultState;
    }

    handleWaterAction() {
        createPlantLog( this.props.plantId, 'watered', this.handleSuccess.bind( this ), this.handleFailure.bind( this ) );
    }

    handleSuccess( response ) {
        this.getPlantLogs();
        this.getLastWateredLog();
    }

    handleFailure( error ) {
        console.error( 'Error creating plant log: ', error );
    }

    setPlantLogs( plantLogs ) {
        this.setState( { plantLogs } );
    }

    getPlantLogs() {
        getPlantLogsByPlantId( this.props.plantId, this.setPlantLogs.bind( this ), this.handleFailure.bind( this ) );
    }

    getLastWateredLog() {
        getLastWateredLog( this.props.plantId, this.setLastWatered.bind( this ), this.handleFailure.bind( this ) );
    }

    setLastWatered( results ) {
        let dateString = defaultState.lastWatered;
        let lastWateredDate = '';

        if ( results ) {
            const keys        = Object.keys( results );
            const lastWatered = results[ keys[0] ];
            if ( lastWatered && lastWatered.hasOwnProperty( 'created' ) ) {
                lastWateredDate = lastWatered.created;
                dateString      = moment( lastWatered.created ).fromNow();
            }
        }

        if ( this.state.lastWatered !== dateString ) {
            this.setState( {
                lastWatered : dateString,
            });
        }

        const daysFromNow = ( this.state.lastWatered !== 'Never' ) ? moment().diff( lastWateredDate, 'days') : -1;
        this.setState( { daysFromNow : daysFromNow } );
    }

    toggleDropdown() {
        this.setState({ showDropdown : ! this.state.showDropdown });
    }

    handleDelete() {
        this.props.deletePlant( this.props.plantId );
    }

    handlePlantModal = () => {
        const modalBody = <EditPlant
                            name={ this.props.name }
                            handleSuccess={ this.props.handleUpdate }
                            userId={ this.props.userId }
                            plantId={ this.props.plantId }
                        />

        this.props.toggleModal( 'plant', 'Edit Plant', modalBody );
    }

    componentDidMount() {
        this.getPlantLogs();
        this.getLastWateredLog();
    }

    render() {
        const dropdownClass = this.state.showDropdown ? '' : 'hidden';
        const dropletClass  = this.state.daysFromNow === 0 ? '' : 'svg-unfill';

        return (
            <div className="list-item">
                <div className="list-item-body">
                    <div
                        className="list-item-icon"
                        onClick={ this.handleWaterAction.bind( this ) }
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
                    </div>
                    <div className="list-item-text">
                        <div className="cursor-pointer" onClick={ this.handlePlantModal }>
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
                            onClick={ this.toggleDropdown.bind( this ) }
                        >
                            <span className="leading-normal">...</span>
                        </button>
                        <div className={ "dropdown-menu " + dropdownClass }>
                            <ul className="list-reset">
                                <li className="py-2 ml:hidden">
                                    <a className="cursor-pointer px-4 py-2 hover:text-grey-darker">Info</a>
                                </li>
                                <li className="py-2">
                                    <a
                                        className="cursor-pointer px-4 py-2 hover:text-grey-darker"
                                        onClick={ this.handlePlantModal }
                                    >
                                        Edit
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a
                                        className="cursor-pointer px-4 hover:text-grey-darker"
                                        onClick={ this.handleDelete.bind( this ) }
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