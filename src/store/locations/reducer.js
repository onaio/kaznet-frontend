// Locations reducer
import _ from "lodash";
import Immutable from "seamless-immutable";

import * as types from "./actionTypes";
import { defaultAppState } from "../state";

const initialState = Immutable(
  _.merge(defaultAppState, {
    locationsById: {},
    locationsIdArray: []
  })
);

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
