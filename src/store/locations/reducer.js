import _ from 'lodash';
import Immutable from 'seamless-immutable';

import * as types from './actionTypes';

const initialState = Immutable({
    "locationsById": {},
    "locationsIdArray": []
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.LOCATIONS_FETCHED:
            return state.merge({
                locationsById: action.locationsById
            });
        default:
            return state;
    }
}

export function getLocationsById(state) {
    return state.locations.locationsById;
}

export function getLocationsIdArray(state) {
    return _.keys(state.locations.locationsById);
}