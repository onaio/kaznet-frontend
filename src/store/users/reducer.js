// Users reducer
import _ from 'lodash';
import Immutable from 'seamless-immutable';
import qs from 'qs';

import * as types from './actionTypes';

const initialState = Immutable({
  usersById: {},
  currentUser: {},
  usersIdArray: [],
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
    case types.USERS_FETCHED:
      return state.merge({
        usersById: action.usersById,
        pageLinks: action.pageLinks,
        currentPage: action.currentPage,
        totalPages: action.totalPages,
        totalCount: action.totalCount
      });
    case types.USER_CHANGE_PAGE:
      return state.merge({
        currentPage: action.pageNumber
      });
    case types.USER_CREATED:
      return Immutable({
        ...state,
        usersById: {
          ...state.usersById,
          [action.userData.id]: action.userData
        }
      });
    case types.USER_FETCHED:
      return Immutable({
        ...state,
        usersById: {
          ...state.usersById,
          [action.userData.id]: action.userData
        }
      });
    case types.CURRENT_USER_FETCHED:
      return state.merge({
        currentUser: action.userData
      });
    case types.USER_DELETED:
      const newUsersById = _.omit(state.usersById, action.userId);
      return state.set('usersById', newUsersById);
    case types.USER_EDITED:
      return Immutable({
        ...state,
        usersById: {
          ...state.usersById,
          [action.userData.id]: action.userData
        }
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

export function getUserById(state, id) {
  return _.get(state.users.usersById, id);
}

export function getPageLinks(state, props) {
  return state.users.pageLinks;
}

export function getCurrentPage(state, props) {
  return state.users.currentPage;
}

export function getTotalPages(state, props) {
  return state.users.totalPages;
}

export function getFirstPage(state, props) {
  const url = state.users.pageLinks.first;
  return Number(Object.values(qs.parse(url && url.slice(1)))[0]);
}

export function getNextPage(state, props) {
  return state.users.pageLinks.next;
}

export function currentUser(state, props) {
  return state.users.pageLinks.prev;
}

export function getLastPage(state, props) {
  const url = state.users.pageLinks.last;
  return Number(Object.values(qs.parse(url && url.slice(1)))[0]);
}

export function getTotalCount(state, props) {
  return state.users.totalCount;
}
export function getCurrentUser(state, props) {
  // return _.values(state.users.currentUser)[0];
  return state.users.currentUser;
}
