// Locations reducer
import _ from "lodash";
import Immutable from "seamless-immutable";

import * as types from "./actionTypes";

const initialState = Immutable({
  locationsById: {},
  locationsIdArray: []
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOCATIONS_FETCHED:
      return state.merge({
        locationsById: action.locationsById
      });
    case types.LOCATION_CREATED:
      return Immutable({
        ...state,
        locationsById: {
          ...state.locationsById,
          [action.locationData.id]: action.locationData
        }
      });
    case types.LOCATION_FETCHED:
      return Immutable({
        ...state,
        locationsById: {
          ...state.locationsById,
          [action.locationData.id]: action.locationData
        }
      });
    case types.LOCATION_EDITED:
      return Immutable({
        ...state,
        locationsById: {
          ...state.locationsById,
          [action.locationData.id]: action.locationData
        }
      });
    case types.LOCATION_DELETED:
      const newLocationsById = _.omit(state.locationsById, action.locationId);
      return state.set("locationsById", newLocationsById);
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

export function getLocationById(state, id) {
  return _.get(state.locations.locationsById, id);
}

export function getParentLocationChoicesById(state, id) {
  if (id) {
    return _.omit(state.locations.locationsById, id);
  }
  return state.locations.locationsById;
}
