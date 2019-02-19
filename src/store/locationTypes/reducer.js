// LocationTypes reducer
import _ from 'lodash';
import Immutable from 'seamless-immutable';
import qs from 'qs';
import * as types from './actionTypes';

const initialState = Immutable({
  locationTypesById: {},
  locationTypesIdArray: [],
  selectOptions: [],
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
    case types.LOCATIONTYPES_FETCHED:
      return state.merge({
        locationTypesById: action.locationTypesById,
        pageLinks: action.pageLinks,
        currentPage: action.currentPage,
        totalPages: action.totalPages,
        totalCount: action.totalCount,
        selectOptions: action.selectOptions
      });
    case types.LOCATIONTYPES_CHANGE_PAGE:
      return state.merge({
        currentPage: action.pageNumber
      });
    case types.LOCATIONTYPE_CREATED:
      return Immutable({
        ...state,
        locationTypesById: {
          ...state.locationTypesById,
          [action.locationTypeData.id]: action.locationTypeData
        }
      });
    case types.LOCATIONTYPE_FETCHED:
      return Immutable({
        ...state,
        locationTypesById: {
          ...state.locationTypesById,
          [action.locationTypeData.id]: action.locationTypeData
        }
      });
    case types.LOCATIONTYPE_EDITED:
      return Immutable({
        ...state,
        locationTypesById: {
          ...state.locationTypesById,
          [action.locationTypeData.id]: action.locationTypeData
        }
      });
    case types.LOCATIONTYPE_DELETED:
      const newlocationTypesById = _.omit(state.locationTypesById, action.locationTypeId);
      return state.set('locationTypesById', newlocationTypesById);
    default:
      return state;
  }
}

// selectors

export function getLocationTypesById(state) {
  return state.locationTypes.locationTypesById;
}

export function getLocationTypesIdArray(state) {
  return _.keys(state.locationTypes.locationTypesById);
}

export function getUnusedLocationTypesById(state) {
  const locationTypes = _.filter(state.locationTypes.locationTypesById, locationType => {
    return !locationType.attributes.has_task;
  });

  const locationTypesById = _.keyBy(locationTypes, locationType => {
    return locationType.id;
  });

  return locationTypesById;
}

export function getLocationTypeById(state, id) {
  return _.get(state.locationTypes.locationTypesById, id);
}
export function getPageLinks(state, props) {
  return state.locationTypes.pageLinks;
}

export function getCurrentPage(state, props) {
  return state.locationTypes.currentPage;
}

export function getTotalPages(state, props) {
  return state.locationTypes.totalPages;
}

export function getFirstPage(state, props) {
  const url = state.locationTypes.pageLinks.first;
  return Number(Object.values(qs.parse(url))[0]);
}

export function getNextPage(state, props) {
  return state.locationTypes.pageLinks.next;
}

export function getPreviousPage(state, props) {
  return state.locationTypes.pageLinks.prev;
}

export function getLastPage(state, props) {
  const url = state.locationTypes.pageLinks.last;
  return Number(Object.values(qs.parse(url))[0]);
}

export function getTotalCount(state, props) {
  return state.locationTypes.totalCount;
}

export function getLocationTypeOptions(state, props) {
  return state.locationTypes.selectOptions;
}
