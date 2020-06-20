import React from "react"
import { sendPasswordPresetEmail } from "../services/auth"

const defaultState = {
    username: ``,
}

class PasswordReset extends React.Component {
    constructor( props ) {
        super(props)
        this.state = {
            ...defaultState,
            errorCode: '',
            errorType: ''
        }
    }

    resetState = () => this.setState( defaultState )

    handleUpdate = event => {
        var eventState = this.state[event.target.name]
        if ( typeof eventState !==  'undefined' && eventState !== event.target.value ) {
            this.setState({
              [event.target.name] : event.target.value,
            })
        }
    }

    handleSuccess = userData => {
        this.setState({
            errorCode : 'reset-email-sent',
            errorType : 'success'
        });
        this.resetState();
    }

    handleFailure = errorData => {
        this.setState({
            errorCode : errorData.code
        });
    }

    handleSubmit = event => {
        event.preventDefault()
        sendPasswordPresetEmail( this.state.username, this.handleSuccess, this.handleFailure )
    }

    getMessage = () => {
        var message = ''

        if ( this.state.errorCode !== '' ) {
            
            switch ( this.state.errorCode ) {
                case 'auth/invalid-email' :
                    message = "Invalid email."
                    break
                case 'auth/user-not-found' :
                    message = "No user found at this email address. Sign up for a new account instead?"
                    break
                case 'reset-email-sent' :
                    message = "An email has been sent to reset your password."
                    break
                default:
                    message = "Something went wrong when attempting to login, please try again or contact support."
            }
        }

        return message
    }

    render() {

        var errorClass = ''
        if ( this.state.errorCode === '' ) {
            errorClass = 'hidden'
        }

        var messageClass = 'text-red-light border-red-lighter bg-red-lightest'
        if ( this.state.errorType === 'success' ) {
            messageClass = 'text-green-light border-green-lighter bg-green-lightest'
        }
 
        return (
            <form
                id="form-signin"
                method="post"
                onSubmit={ this.handleSubmit }
            >
                <fieldset className="mb-4">

                    <span className={errorClass}>
                        <small
                            id="form-errors"
                            className={ messageClass + 'block p-2 w-full mx-auto border text-sm' }
                        >
                            { this.getMessage() }
                        </small>
                    </span>

                    <p>Type your email below and we will send you a link to safely reset your password.</p>

                    <input
                        id="login_email"
                        type="email"
                        name="username"
                        value={ this.state.username }
                        onChange={ this.handleUpdate }
                        placeholder="Email Address"
                        className="input input-v input-full input-lg"
                    />

                    <div className="text-center">
                        <button
                            id="form-signin-submit"
                            type="submit"
                            className="btn btn-green btn-lg"
                        >
                            Send Password Reset Email
                        </button>
                    </div>
                </fieldset>
            </form>
        )
    }
}

export default PasswordReset