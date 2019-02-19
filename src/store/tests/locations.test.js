// locations store Integration tests
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import * as locationActions from '../locations/actions';
import * as locationSelectors from '../locations/reducer';
import * as fixtures from '../locations/tests/fixtures';
import LocationService from '../../services/locations';

jest.mock('../../services/locations');

describe('store/locations integration', () => {
  let store;

  beforeEach(() => {
    jest.resetAllMocks();
    store = createStore(combineReducers(reducers), applyMiddleware(thunk));
  });

  it('should retrieve all locations', async () => {
    LocationService.getLocationList.mockReturnValueOnce({
      locationArray: fixtures.locationsArray,
      pageLinks: fixtures.pageLinks,
      currentPage: fixtures.currentPage,
      totalPages: fixtures.totalPages
    });

    await store.dispatch(locationActions.fetchLocations());
    expect(locationSelectors.getLocationsById(store.getState())).toEqual(fixtures.locationsById);
    expect(locationSelectors.getLocationsIdArray(store.getState())).toEqual(
      fixtures.locationsIdArray
    );
  });
});
