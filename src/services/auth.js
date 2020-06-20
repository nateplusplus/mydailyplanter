import firebase from "gatsby-plugin-firebase"

export const handleLogin = ( state, success, fail ) => {
    firebase
        .auth()
        .signInWithEmailAndPassword( state.username, state.password )
        .then( function( result ) {
            getUserData( result.user.uid ).then(function( snapshot ){
                const user = makeUserObjectFromData( result.user.uid, snapshot.val() );
                success( user );
            });
        }).catch( function( error ) {
            fail( error );
        })
}


export const handleSignup = ( state, success, fail ) => {
    firebase
    .auth()
    .createUserWithEmailAndPassword( state.username, state.password )
    .then( function( result ) {
            let userData = makeUserObjectFromData( result.user.uid, state );
            createUser( userData, success, fail );
        }).catch( function( error ) {
            fail( error );
        })
}

export const makeUserObjectFromData = ( userId, userData ) => {
    return {
        uid       : userId,
        firstname : userData.firstname,
        lastname  : userData.lastname,
        tos       : userData.tos,
        created   : userData.created || Date.now()
    }
}

export const getUserData = ( userId ) => {
    return firebase.database().ref( 'Users/' + userId ).once('value');
}

export const createUser = ( userData, success, fail ) => {
    let userRef    = firebase.database().ref('Users/' + userData.uid );
    userRef.set({
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

export const sendPasswordPresetEmail = ( email, success, fail ) => {
    firebase
        .auth()
        .sendPasswordResetEmail( email )
        .then( function() {
            // email sent
            success();
        } )
        .catch( function( error ) {
            // uh oh!
            fail( error );
        } );
}