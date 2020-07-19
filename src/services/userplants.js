import firebase from "gatsby-plugin-firebase"

export const getPlants = ( userId, success, fail ) => {
    firebase.database().ref( 'Plants/' + userId ).once('value').then( function( snapshot ) {
        let userPlants = addIdToPantObjects( snapshot.val() );
        success( userPlants );
    }).catch( function( error ) {
        fail( error );
    })

}

export const addIdToPantObjects = ( userPlants ) => {
    if ( Object.keys(userPlants).length > 0 ) {
        for ( let plantId in userPlants ) {
            userPlants[plantId].id = plantId;
        }
    }
    return userPlants;
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

    let plant = {
        id           : state.plantId,
        name         : state.name || '',
        description  : state.description || ''
    };

    if ( state.last_watered && state.last_watered !== '' ) {
        plant.last_watered = state.last_watered;
    }

    if ( state.userId ) {
        firebase
            .database()
            .ref( 'Plants/' + state.userId + '/' + plant.id )
            .update( plant )
            .then( success )
            .catch( fail )
    } else {
        fail( new Error('No user ID found when attempting to edit user plant.') );
    }
}