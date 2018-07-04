// Locations reducer
import * as types from "./actionTypes";
import { initialState } from "../state";

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
