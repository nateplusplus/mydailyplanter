import React from "react"
import { handleLogin } from "../services/auth"

const defaultState = {
    username: ``,
    password: ``,
    errorCode: '',
}

class Login extends React.Component {
    constructor( props ) {
        super(props)
        this.state = defaultState
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
        this.props.handleLogin( userData );
        this.resetState();
    }

    handleFailure = errorData => {
        // TODO: handle common errors on UI: https://firebase.google.com/docs/reference/js/firebase.auth.Error
        this.setState({
            errorCode : errorData.code
        });
    }

    handleSubmit = event => {
        event.preventDefault()
        handleLogin( this.state, this.handleSuccess, this.handleFailure )
    }

    handlePasswordReset = event => {
        event.preventDefault()
        this.props.toggleModal( 'passwordReset' )
    }

    getErrorMessage = () => {
        var errorMessage = ''

        if ( this.state.errorCode !== '' ) {
            
            switch ( this.state.errorCode ) {
                case 'auth/invalid-email' :
                    errorMessage = "The email you have provided is not valid. Please try again."
                    break
                case 'auth/user-not-found' :
                case 'auth/wrong-password' :
                    errorMessage = "Wrong username or password. Please double-check and try again."
                    break
                default:
                    errorMessage = "Something went wrong when attempting to login, please try again or contact support."
            }
        }

        return errorMessage
    }

    render() {

        var errorClass = ''
        if ( this.state.errorCode === '' ) {
            errorClass = 'hidden'
        }
 
        return (
            <form
                id="form-signin"
                method="post"
                onSubmit={ event => {
                    this.handleSubmit( event )
                    // navigate(`/app/profile`)
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
                        id="login_email"
                        type="email"
                        name="username"
                        value={ this.state.username }
                        onChange={this.handleUpdate}
                        placeholder="Email Address"
                        className="input input-v input-full input-lg"
                    />

                    <input
                        id="login_password"
                        type="password"
                        name="password"
                        value={ this.state.password }
                        onChange={this.handleUpdate}
                        placeholder="Your Password"
                        className="input input-v input-full input-lg"
                    />

                    <small className="block text-right"><a href="#" onClick={ this.handlePasswordReset }>Forgot Password</a></small>

                    <div className="text-center">
                        <button
                            id="form-signin-submit"
                            type="submit"
                            className="btn btn-green btn-lg"
                        >
                            Sign In
                        </button>
                    </div>
                </fieldset>
            </form>
        )
    }
}

export default Login