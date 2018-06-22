import { Thunk } from 'redux-testkit';

import LocationService from '../../../services/locations';
import * as fixtures from './fixtures';
import * as locations from '../actions';
import * as actionTypes from '../actionTypes';

jest.mock('../../../services/locations');

describe('store/locations/actions', () => {

    beforeEach( () => {
        jest.resetAllMocks();
    });

    it('should fetch tasks from server', async () => {
        LocationService.getLocationList.mockReturnValueOnce(fixtures.locationArray);
        const dispatches = await Thunk(locations.fetchLocations).execute();
        expect(dispatches.length).toBe(1);
        expect(dispatches[0].isPlainObject()).toBe(true);
        expect(dispatches[0].getAction()).toEqual({type: actionTypes.LOCATIONS_FETCHED, locationsById: fixtures.locationById});
    });

    it('should fetch tasks and print to console on error', async () => {
        LocationService.getLocationList.mockImplementationOnce(() => { throw new Error('oops'); });
        console.error = jest.fn()
        const dispatches = await Thunk(locations.fetchLocations).execute();
        expect(dispatches.length).toBe(0);
        expect(console.error).toHaveBeenCalledWith(Error('oops'));
    });
});