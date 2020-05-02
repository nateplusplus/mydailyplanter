import React from "react"
import { handleSignup } from "../services/auth"

const defaultState = {
    firstname : '',
    lastname  : '',
    username  : '',
    password  : '',
    tos       : false,
    errorCode : '',
}

class SignUp extends React.Component {
    constructor( props ) {
        super(props)
        this.state = defaultState
    }

    resetState = () => this.setState( defaultState )

    handleUpdate = event => {
        var eventState = this.state[event.target.name]
        var value      = ( event.target.type === 'checkbox' ) ? event.target.checked : event.target.value;
        if ( typeof eventState !==  'undefined' && eventState !== value ) {
            this.setState({
              [event.target.name] : value,
            })
        }
    }

    handleSuccess = userData => {
        this.props.handleLogin( userData );
        this.resetState();
    }

    handleFailure = errorData => {
        // TODO: handle common errors on UI: https://firebase.google.com/docs/reference/js/firebase.auth.Error
        console.error( errorData );
        this.setState({
            errorCode : errorData.code
        });
    }

    handleSubmit = event => {
        event.preventDefault()
        handleSignup( this.state, this.handleSuccess, this.handleFailure )
    }

    getErrorMessage = () => {
        var errorMessage = ''

        if ( this.state.errorCode !== '' ) {
            
            switch ( this.state.errorCode ) {
                case 'auth/invalid-email' :
                    errorMessage = "Oops! Invalid email."
                    break
                case 'auth/wrong-password' :
                    errorMessage = "Oops! Wrong username or password."
                    break
                case 'auth/email-already-in-use':
                    errorMessage = "Oops! This email address is already in use. Try signing in, or click Forgot Password to reset your password."
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
                id="form-signup"
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
                        id="firstname"
                        type="text"
                        name="firstname"
                        required
                        value={ this.state.firstname }
                        onChange={this.handleUpdate}
                        placeholder="First Name"
                        className="input input-v input-full input-lg"
                    />

                    <input
                        id="lastname"
                        type="text"
                        name="lastname"
                        required
                        value={ this.state.lastname }
                        onChange={this.handleUpdate}
                        placeholder="Last Name"
                        className="input input-v input-full input-lg"
                    />

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
                </fieldset>
                <fieldset>
                    <div className="agreement">
                        <input
                            type="checkbox"
                            name="tos"
                            checked={ this.state.tos }
                            onChange={ this.handleUpdate }
                            required
                            aria-label="Check if you agree to the Terms of Use and have read the Privacy Policy." />

                        <small className="agreement-text">
                            I acknowledge that I agree to the <a rel="nofollow noopener noreferrer" href="https://app.termly.io/document/terms-of-use-for-website/5eda962d-30b4-46bd-a198-969858a31a3f" target="_blank">Terms of Use</a> and have read the <a rel="nofollow noopener noreferrer" href="https://s3-us-west-2.amazonaws.com/mydp-docs/privacy.pdf" target="_blank">Privacy Policy</a>.
                        </small>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="text-center">
                        <button
                            id="form-signin-submit"
                            type="submit"
                            className="btn btn-green btn-lg"
                        >
                            Sign Up
                        </button>
                    </div>
                </fieldset>
                <p className="text-center">Do we already know you? <a href="#signin">Sign In</a></p>
            </form>
        )
    }
}

export default SignUp