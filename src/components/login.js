import React from "react"
import handleLogin from "../services/auth"

class Login extends React.Component {
    state = {
        username: ``,
        password: ``,
    }

    handleUpdate = event => {
        this.setState({
          [event.target.name] : event.target.value,
        })
    }

    handleSuccess = userData => {
        // TODO: go to user's list: navigate(`/app/list`)
        console.log( userData );
    }

    handleFailure = errorData => {
        // TODO: handle common errors on UI: https://firebase.google.com/docs/reference/js/firebase.auth.Error
        console.error( errorData );
    }

    handleSubmit = event => {
        event.preventDefault()
        handleLogin( this.state, this.handleSuccess, this.handleFailure )
    }

    render() {
        return (
            <form
                method="post"
                onSubmit={ event => {
                    this.handleSubmit( event )
                    // navigate(`/app/profile`)
                }}
            >
                <label>
                    Email
                    <input
                        id="login_email"
                        type="email"
                        name="username"
                        onChange={this.handleUpdate}
                    />
                </label>
    
                <label>
                    Password
                    <input
                        id="login_password"
                        type="password"
                        name="password"
                        onChange={this.handleUpdate}
                    />
                </label>

                <button>Submit</button>
            </form>
        )
    }
}

export default Login