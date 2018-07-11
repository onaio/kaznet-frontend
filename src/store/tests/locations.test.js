// locations store Integration tests
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import * as reducers from "../reducers";
import * as locationActions from "../locations/actions";
import * as locationSelectors from "../locations/reducer";
import * as fixtures from "../locations/tests/fixtures";
import LocationService from "../../services/locations";

jest.mock("../../services/locations");

describe("store/locations integration", () => {
  let store;

  beforeEach(() => {
    jest.resetAllMocks();
    store = createStore(combineReducers(reducers), applyMiddleware(thunk));
  });

  it("should retrieve all locations", async () => {
    LocationService.getLocationList.mockReturnValueOnce({
      locationArray: fixtures.locationArray,
      pageLinks: fixtures.locationData.links,
      currentPage: fixtures.locationData.meta.pagination.page
    });

    await store.dispatch(locationActions.fetchLocations());
    expect(locationSelectors.getLocationsById(store.getState())).toEqual(
      fixtures.locationById
    );
    expect(locationSelectors.getLocationsIdArray(store.getState())).toEqual(
      fixtures.locationIdArray
    );
  });
});
