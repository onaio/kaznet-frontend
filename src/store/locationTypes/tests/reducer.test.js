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

const fullState = {
  locationTypesById: fixtures.locationTypesById,
  locationTypesIdArray: fixtures.locationTypesIdArray
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

  it("should store created locationType", () => {
    const locationTypeData = fixtures.singleLocationType;
    const action = {
      type: actionTypes.LOCATIONTYPE_CREATED,
      locationTypeData
    };

    const locationTypesById = {};
    locationTypesById[locationTypeData.id] = locationTypeData;

    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    newState.locationTypesById = locationTypesById;

    Reducer(locationTypes)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });

  it("should store fetched single locationType in empty state", () => {
    const locationTypeData = fixtures.singleLocationType;
    const action = {
      type: actionTypes.LOCATIONTYPE_FETCHED,
      locationTypeData
    };

    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    newState.locationTypesById = fixtures.singleLocationTypeById;

    Reducer(locationTypes)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });

  it("should remove deleted locationType from store", () => {
    const locationTypeId = "7";
    const action = {
      type: actionTypes.LOCATIONTYPE_DELETED,
      locationTypeId
    };

    const existingState = Immutable(fullState);
    const newState = _.clone(fullState);

    newState.locationTypesById = _.omit(
      newState.locationTypesById,
      locationTypeId
    );

    Reducer(locationTypes)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });
});
