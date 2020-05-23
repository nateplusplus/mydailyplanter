import firebase from "gatsby-plugin-firebase"

export const getPlantLogsByPlantId = ( plantId, success, fail ) => {
    firebase.database().ref( 'PlantLogs/' + plantId ).once('value').then( function( snapshot ) {
        success( snapshot.val() );
    }).catch( function( error ) {
        fail( error );
    })
}

export const createPlantLog = ( plantId, action, success, fail ) => {
    const newPlantLog = makePlantLogObjectFromData( action );
    firebase
        .database()
        .ref( 'PlantLogs/' + plantId )
        .push( newPlantLog )
        .then( success )
        .catch( fail );
}

export const makePlantLogObjectFromData = ( action ) => {
    return {
        created  : Date.now(),
        action   : action
    }
}

export const getLastWateredLog = ( plantId, success, fail ) => {
    firebase
        .database()
        .ref( 'PlantLogs/' + plantId )
        .orderByChild( 'created' )
        .limitToLast(1)
        .once('value')
        .then( function( snapshot ) {
            success( snapshot.val() );
        }).catch( function( error ) {
            fail( error );
        })
}