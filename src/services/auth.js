import firebase from "gatsby-plugin-firebase"

// handleLogin
const handleLogin = ( state, success, fail ) => {
    firebase
        .auth()
        .signInWithEmailAndPassword( state.username, state.password )
        .then( function( result ) {
            success( result.user );
        }).catch( function( error ) {
            fail( error );
        })
}

export default handleLogin;