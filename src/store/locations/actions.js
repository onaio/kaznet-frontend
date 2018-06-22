import _ from 'lodash';
import * as types from './actionTypes';
import locationService from '../../services/locations';

export function fetchLocations() {
    return async(dispatch, getState) => {
        try {
            const locationArray = await locationService.getLocationList();
            const locationsById = _.keyBy(locationArray, (location) => location.id);

            dispatch({type: types.LOCATIONS_FETCHED, locationsById});
        } catch (error) {
            console.error(error);
        }
    };
}