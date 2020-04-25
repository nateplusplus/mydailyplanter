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
    let userData = getUserDataFromState( state );
    firebase
        .auth()
        .createUserWithEmailAndPassword( state.username, state.password )
        .then( function( result ) {
            console.log( result );
            console.log( result.user.uid );
            userData.uid = result.user.uid;
            createUser( userData, success, fail );
        }).catch( function( error ) {
            fail( error );
        })
}

export const getUserDataFromState = ( state ) => {
    return {
        firstname : state.firstname,
        lastname  : state.lastname,
        tos       : state.tos,
        created   : Date.now()
    }
}

export const createUser = ( userData, success, fail ) => {
    let userRef    = firebase.database().ref('Users');
    let newUserRef = userRef.push( userData.uid );
    newUserRef.set({
        firstname : userData.firstname,
        lastname  : userData.lastname,
        tos       : userData.tos,
        created   : userData.created
    })
    .then(function(){
        success( userData );
    })
    .catch( function( error ) {
        fail( error );
    } );
}