import React from "react"
import { handleEditPlant } from "../services/userplants"

class EditPlant extends React.Component {
    constructor( props ) {
        super(props)
        this.state = {
            userId    : this.props.userId,
            plantId   : this.props.plantId,
            name      : this.props.name,
            errorCode : ''
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
        handleEditPlant( this.state, this.props.handleSuccess, this.handleFailure )
    }

    getErrorMessage = () => {
        var errorMessage = ''

        if ( this.state.errorCode !== '' ) {
            
            switch ( this.state.errorCode ) {
                case 'auth/invalid-email' :
                    errorMessage = "Invalid email."
                    break
                case 'auth/wrong-password' :
                    errorMessage = "Wrong username or password."
                    break
                default:
                    errorMessage = "Something went wrong when attempting to login, please try again or contact support."
            }
        }

        return errorMessage
    }

    componentWillUpdate( prevState ) {
        if ( this.state.plantId !== prevState.plantId ) {
            this.setState( {
                plantId   : this.props.plantId,
                name      : this.props.name,
                errorCode : ''
            } );
        }
    }

    render() {
        var errorClass = ''
        if ( this.state.errorCode === '' ) {
            errorClass = 'hidden'
        }
 
        return (
            <form
                id="form-editPlant"
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

                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={ this.state.name }
                        onChange={ this.handleUpdate }
                        placeholder="Plant Name"
                        className="input input-v input-full input-lg"
                    />

                    <div className="text-center">
                        <button
                            id="form-plant-edit-submit"
                            type="submit"
                            className="btn btn-green btn-lg"
                        >
                            Update
                        </button>
                    </div>
                </fieldset>
            </form>
        )
    }
}

export default EditPlant