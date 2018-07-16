// LocationTypes reducer
import _ from "lodash";
import Immutable from "seamless-immutable";

import * as types from "./actionTypes";

const initialState = Immutable({
  locationTypesById: {},
  locationTypesIdArray: []
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOCATIONTYPES_FETCHED:
      return state.merge({
        locationTypesById: action.locationTypesById
      });
    default:
      return state;
  }
}

// selectors

export function getLocationTypesById(state) {
  return state.locationTypes.locationTypesById;
}

export function getLocationTypesIdArray(state) {
  return _.keys(state.locationTypes.locationTypesById);
}

export function getUnusedLocationTypesById(state) {
  const locationTypes = _.filter(
    state.locationTypes.locationTypesById,
    locationType => {
      return !locationType.attributes.has_task;
    }
  );

  const locationTypesById = _.keyBy(locationTypes, locationType => {
    return locationType.id;
  });

  return locationTypesById;
}

export function getLocationTypeById(state, id) {
  return _.get(state.locationTypes.locationTypesById, id);
}
