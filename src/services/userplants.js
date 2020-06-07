import firebase from "gatsby-plugin-firebase"

export const getPlants = ( userId, success, fail ) => {
    firebase.database().ref( 'Plants/' + userId ).once('value').then( function( snapshot ) {
        success( snapshot.val() );
    }).catch( function( error ) {
        fail( error );
    })

}

export const createPlant = ( userId, plantName, success, fail ) => {
    const newPlant = makePlantObjectFromData( plantName );
    firebase
        .database()
        .ref( 'Plants/' + userId )
        .push( newPlant )
        .then( success )
        .catch( fail );
}

export const makePlantObjectFromData = ( plantName ) => {
    return {
        created  : Date.now(),
        name     : plantName
    }
}

export const removePlant = ( userId, plantId, success, fail ) => {
    firebase
        .database()
        .ref( 'Plants/' + userId + '/' + plantId )
        .remove()
        .then( success )
        .catch( fail );
}

export const handleEditPlant = ( state, success, fail ) => {
    firebase
        .database()
        .ref( 'Plants/' + state.userId + '/' + state.plantId )
        .child( 'name' )
        .set( state.name )
        .then( success )
        .catch( fail )
}