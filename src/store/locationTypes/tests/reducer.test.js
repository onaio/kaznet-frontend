import _ from "lodash";
import Immutable from "seamless-immutable";
import { Reducer } from "redux-testkit";

import locationTypes from "../reducer";
import * as actionTypes from "../actionTypes";
import * as fixtures from "./fixtures";

const initialState = {
  locationTypesById: {},
  locationTypesIdArray: []
};

describe("store/locationTypes/reducer", () => {
  it("should have initial state", () => {
    expect(locationTypes()).toEqual(initialState);
  });

  it("should store fetched locationTypes", () => {
    const locationTypesById = fixtures.locationTypesById;
    const action = {
      type: actionTypes.LOCATIONTYPES_FETCHED,
      locationTypesById
    };

    const existingState = Immutable(initialState);
    const newState = _.clone(existingState);
    newState.locationTypesById = locationTypesById;

    Reducer(locationTypes)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });
});
