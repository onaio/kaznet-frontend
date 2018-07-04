// Locations reducer
import _ from "lodash";

import * as types from "./actionTypes";
import { initialState } from "../../constants";

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

function getLocationsById(state) {
  return state.locations.locationsById;
}

function getLocationsIdArray(state) {
  return _.keys(state.locations.locationsById);
}

function getPageLinks(state, props) {
  return state.tasks.pageLinks;
}

function getCurrentPage(state, props) {
  return state.tasks.currentPage;
}

function getFirstPage(state, props) {
  return state.tasks.pageLinks.first;
}

function getNextPage(state, props) {
  return state.tasks.pageLinks.next;
}

function getPreviousPage(state, props) {
  return state.tasks.pageLinks.prev;
}

function getLastPage(state, props) {
  return state.tasks.pageLinks.last;
}

export {
  getLocationsById,
  getLocationsIdArray,
  getPageLinks,
  getCurrentPage,
  getFirstPage,
  getNextPage,
  getPreviousPage,
  getLastPage
};
