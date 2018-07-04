// Users reducer
import * as types from "./actionTypes";
import { initialState } from "../state";

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.USERS_FETCHED:
      return state.merge({
        usersById: action.usersById
      });
    default:
      return state;
  }
}
