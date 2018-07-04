// Users reducer
import _ from "lodash";
import Immutable from "seamless-immutable";

import * as types from "./actionTypes";
import { defaultPageState } from "../../constants.js";

const initialState = Immutable(defaultPageState);

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

// selectors
function getUsersById(state) {
  return state.users.usersById;
}

function getUsersIdArray(state) {
  return _.keys(state.users.usersById);
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
  getUsersById,
  getUsersIdArray,
  getPageLinks,
  getCurrentPage,
  getFirstPage,
  getNextPage,
  getPreviousPage,
  getLastPage
};
