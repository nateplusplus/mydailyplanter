import React from "react"
// import { handleEditPlantLog } from "../services/plantlogs"

import moment from 'moment'

class PlantLogList extends React.Component {
    constructor( props ) {
        super(props)
        this.state = {
            plantId     : this.props.plantId,
            plantLogs   : this.props.plantLogs,
            errorCode   : ''
        }
    }

    handleUpdate = event => {
        var eventState = this.state[event.target.name]
        if ( typeof eventState !==  'undefined' && eventState !== event.target.value ) {
            this.setState({
              [event.target.name] : event.target.value,
            })
        }
    }

    handleFailure = errorData => {
        this.setState({
            errorCode : errorData.code
        });
    }

    handleSubmit = event => {
        event.preventDefault()
        // handleEditPlantLog( this.state, this.props.handleSuccess, this.handleFailure )
    }

    getErrorMessage = () => {
        var errorMessage = ''

        if ( this.state.errorCode !== '' ) {
            switch ( this.state.errorCode ) {
                default:
                    errorMessage = "Something went wrong when attempting to login, please try again or contact support."
            }
        }

        return errorMessage
    }

    componentWillUpdate( prevState ) {
        if ( this.state.plantId !== prevState.plantId ) {
            this.setState( {
                plantId     : this.props.plantId,
                plantLogs   : this.props.plantLogs,
                errorCode   : ''
            } );
        }
    }

    renderPlantLogs = () => {
        let rows = []
        if ( this.state.plantLogs ) {
            const plantLogs = this.state.plantLogs;
            for ( const log in plantLogs ) {
                let date  = moment(plantLogs[log].created).format('YYYY-MM-DD h:mm a')
                let value = plantLogs[log].action
                let row = <tr key={ 'plantLog-' + log }><td>{ date }</td><td>{ value }</td></tr>
                rows.push( row )
            }
        }
        return rows
    }

    render() {
        var errorClass = ''
        if ( this.state.errorCode === '' ) {
            errorClass = 'hidden'
        }
 
        return (
            <form
                id="form-editPlantLog"
                method="post"
                onSubmit={ event => {
                    this.handleSubmit( event )
                }}
            >
                <fieldset className="mb-4">

                    <span className={errorClass}>
                        <small
                            id="form-errors"
                            className="block p-2 w-full mx-auto text-red-light border border-red-lighter bg-red-lightest text-sm"
                        >
                            { this.getErrorMessage() }
                        </small>
                    </span>

                    <table class="w-full">
                        <thead>
                            <tr>
                                <th class="text-left w-1/2">Date</th>
                                <th class="text-left">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.renderPlantLogs() }
                        </tbody>
                    </table>

                    <small className="block text-right"><a href="#" onClick={ this.props.togglePlantDetails }>Plant Details</a></small>
                </fieldset>
            </form>
        )
    }
}

export default PlantLogList