import _ from 'lodash';
import Immutable from 'seamless-immutable';
import { Reducer } from 'redux-testkit';

import locations from '../reducer';
import * as actionTypes from '../actionTypes';
import * as fixtures from './fixtures';

const initialState = {
    "locationsById": {},
    "locationsIdArray": []
}

describe('store/locations/reducer', () => {

    it('should have initial state', () => {
        expect(locations()).toEqual(initialState);
    });

    it('should store fetched tasks', () => {
        const locationsById = fixtures.locationById;
        const action = {type: actionTypes.LOCATIONS_FETCHED, locationsById};

        const existingState = Immutable(initialState);
        const newState= _.clone(initialState);
        newState.locationsById = locationsById

        Reducer(locations).withState(existingState).expect(action).toReturnState(newState);
    });

});