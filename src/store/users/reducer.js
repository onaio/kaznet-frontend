// Users reducer
import _ from "lodash";
import Immutable from "seamless-immutable";

import * as types from "./actionTypes";

const initialState = Immutable({
  usersById: {},
  usersIdArray: [],
  currentPage: null,
  totalPages: null,
  pageLinks: {
    first: null,
    last: null,
    prev: null,
    next: null
  }
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.USERS_FETCHED:
      return state.merge({
        usersById: action.usersById,
        pageLinks: action.pageLinks,
        currentPage: action.currentPage,
        totalPages: action.totalPages
      });
    case types.USER_CHANGE_PAGE:
      return state.merge({
        currentPage: action.pageNumber
      });
    default:
      return state;
  }
}

// selectors

export function getUsersById(state) {
  return state.users.usersById;
}

export function getUsersIdArray(state) {
  return _.keys(state.users.usersById);
}
