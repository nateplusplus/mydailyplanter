const mockUserData = {
    firstname : 'Nate',
    lastname  : 'Blair',
    tos       : 1,
    created   : Date.now()
}

import { getUserDataFromState } from '../src/services/auth';

describe( 'getUserDataFromState', () => {
    it( 'should create a user object matching the mock', () => {
        const mockState = {
            firstname: 'Nate',
            lastname : 'Blair',
            tos      : 1
        }
        let data = getUserDataFromState( mockState );
        expect( data ).toEqual( mockUserData );
    } );
});