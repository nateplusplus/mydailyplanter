import firebase from "gatsby-plugin-firebase"

export const getPlants = ( userData, success, fail ) => {
    const userId    = userData.uid;
    firebase.database().ref( 'Plants/' + userId ).once('value').then( function( snapshot ) {
        success( snapshot.val() );
    }).catch( function( error ) {
        fail( error );
    })

}

export const createPlant = ( userData, success, fail ) => {
    const userId    = userData.uid;
    // TODO: Create a new plant in Firebase
}

export const makePlantObjectFromData = ( userId, userData ) => {
    return {
        // TODO: Plant structure here
    }
}