import _ from "lodash";
import Immutable from "seamless-immutable";
import { Reducer } from "redux-testkit";

import locations from "../reducer";
import * as actionTypes from "../actionTypes";
import * as fixtures from "./fixtures";
import { defaultAppState } from "../../state";

const initialState = _.merge(defaultAppState, {
  locationsById: {},
  locationsIdArray: []
});

describe("store/locations/reducer", () => {
  it("should have initial state", () => {
    expect(locations()).toEqual(initialState);
  });

  it("should store fetched tasks", () => {
    const locationsById = fixtures.locationById;
    const pageLinks = fixtures.locationData.links;
    const currentPage = fixtures.locationData.meta.pagination.page;
    const action = {
      type: actionTypes.LOCATIONS_FETCHED,
      locationsById,
      pageLinks,
      currentPage
    };

    const existingState = Immutable(initialState);
    const newState = _.merge(initialState, {
      pageLinks: fixtures.locationData.links
    });
    newState.locationsById = locationsById;

    Reducer(locations)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });
});
