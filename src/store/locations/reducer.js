// Locations reducer
import _ from "lodash";
import Immutable from "seamless-immutable";
import qs from "qs";

import * as types from "./actionTypes";

const initialState = Immutable({
  locationsById: {},
  locationsIdArray: [],
  currentPage: null,
  totalPages: null,
  totalCount: null,
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
        totalPages: action.totalPages,
        totalCount: action.totalCount
      });
    case types.LOCATION_CHANGE_PAGE:
      return state.merge({
        currentPage: action.pageNumber
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

export function getPageLinks(state, props) {
  return state.locations.pageLinks;
}

export function getCurrentPage(state, porseps) {
  return state.locations.currentPage;
}

export function getTotalPages(state, porseps) {
  return state.locations.totalPages;
}

export function getFirstPage(state, props) {
  const url = state.locations.pageLinks.first;
  return Number(Object.values(qs.parse(url && url.slice(1)))[0]);
}

export function getNextPage(state, props) {
  return state.locations.pageLinks.next;
}

export function getPreviousPage(state, props) {
  return state.locations.pageLinks.prev;
}

export function getLastPage(state, props) {
  const url = state.locations.pageLinks.last;
  return Number(Object.values(qs.parse(url && url.slice(1)))[0]);
}

export function getTotalCount(state, porseps) {
  return state.locations.totalCount;
}
