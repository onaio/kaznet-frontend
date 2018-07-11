// Users reducer
import _ from "lodash";
import Immutable from "seamless-immutable";

import * as types from "./actionTypes";
import { defaultAppState } from "../state";

const initialState = Immutable(
  _.merge(defaultAppState, {
    usersById: {},
    usersIdArray: []
  })
);

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.USERS_FETCHED:
      return state.merge({
        usersById: action.usersById,
        pageLinks: action.pageLinks,
        currentPage: action.currentPage,
        totalPages: action.totalPages
      });
    default:
      return state;
  }
}

export function getUsersById(state) {
  return state.users.usersById;
}

export function getUsersIdArray(state) {
  return _.keys(state.users.usersById);
}

export function getPageLinks(state, props) {
  return state.users.pageLinks;
}

export function getCurrentPage(state, porseps) {
  return state.users.currentPage;
}

export function getTotalPages(state, porseps) {
  return state.users.totalPages;
}

export function getFirstPage(state, props) {
  return state.users.pageLinks.first;
}

export function getNextPage(state, props) {
  return state.users.pageLinks.next;
}

export function getPreviousPage(state, props) {
  return state.users.pageLinks.prev;
}

export function getLastPage(state, props) {
  return state.users.pageLinks.last;
}
