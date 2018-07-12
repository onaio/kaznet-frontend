// Users reducer
import _ from "lodash";
import Immutable from "seamless-immutable";

import * as types from "./actionTypes";

const initialState = Immutable({
  usersById: {},
  usersIdArray: [],
  currentPage: 1,
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
    case types.USERS_CHANGE_PAGE:
      return state.merge({
        currentPage: action.pageNumber
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
