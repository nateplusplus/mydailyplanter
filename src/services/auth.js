import firebase from "gatsby-plugin-firebase"

export const handleLogin = ( state, success, fail ) => {
    firebase
        .auth()
        .signInWithEmailAndPassword( state.username, state.password )
        .then( function( result ) {
            success( result.user );
        }).catch( function( error ) {
            fail( error );
        })
}


export const handleSignup = ( state, success, fail ) => {
    firebase
        .auth()
        .createUserWithEmailAndPassword( state.username, state.password )
        .then( function( result ) {
            success( result.user );
        }).catch( function( error ) {
            fail( error );
        })
}