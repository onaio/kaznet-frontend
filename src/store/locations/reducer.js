// Locations reducer
import _ from "lodash";
import Immutable from "seamless-immutable";

import * as types from "./actionTypes";

const initialState = Immutable({
  locationsById: {},
  locationsIdArray: [],
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
    case types.LOCATIONS_FETCHED:
      return state.merge({
        locationsById: action.locationsById,
        pageLinks: action.pageLinks,
        currentPage: action.currentPage,
        totalPages: action.totalPages
      });
    case types.LOCATIONS_CHANGE_PAGE:
      return state.merge({
        currentPage: action.pageNumber
      });
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

export function getPageLinks(state, props) {
  return state.locations.pageLinks;
}

export function getTotalPages(state, props) {
  return state.locations.totalPages;
}

export function getCurrentPage(state, porseps) {
  return state.locations.currentPage;
}

export function getFirstPage(state, props) {
  return state.locations.pageLinks.first;
}

export function getNextPage(state, props) {
  return state.locations.pageLinks.next;
}

export function getPreviousPage(state, props) {
  return state.locations.pageLinks.prev;
}

export function getLastPage(state, props) {
  return state.locations.pageLinks.last;
}
