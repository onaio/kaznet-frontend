// Client reducer
import _ from "lodash";
import Immutable from "seamless-immutable";
import * as types from "./actionTypes";

import { defaultAppState } from "../state";

const initialState = Immutable(
  _.merge(defaultAppState, {
    clientsById: {},
    clientsIdArray: []
  })
);

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.CLIENTS_FETCHED:
      return state.merge({
        clientsById: action.clientsById,
        pageLinks: action.pageLinks,
        currentPage: action.currentPage,
        totalPages: action.totalPages
      });
    case types.CLIENT_CREATED:
      return Immutable({
        ...state,
        clientsById: {
          ...state.clientsById,
          [action.clientData.id]: action.clientData
        }
      });
    case types.CLIENT_EDITED:
      return Immutable({
        ...state,
        clientsById: {
          ...state.clientsById,
          [action.clientData.id]: action.clientData
        }
      });
    case types.CLIENT_FETCHED:
      return Immutable({
        ...state,
        clientsById: {
          ...state.clientsById,
          [action.clientData.id]: action.clientData
        }
      });
    default:
      return state;
  }
}

export function getClientsById(state) {
  return state.clients.clientsById;
}

export function getClientById(state, id) {
  return _.get(state.clients.clientsById, id);
}

export function getClientsIdArray(state) {
  return _.keys(state.clients.clientsById);
}

export function getPageLinks(state, props) {
  return state.clients.pageLinks;
}

export function getTotalPages(state, props) {
  return state.clients.totalPages;
}

export function getCurrentPage(state, porseps) {
  return state.clients.currentPage;
}

export function getFirstPage(state, props) {
  return state.clients.pageLinks.first;
}

export function getNextPage(state, props) {
  return state.clients.pageLinks.next;
}

export function getPreviousPage(state, props) {
  return state.clients.pageLinks.prev;
}

export function getLastPage(state, props) {
  return state.clients.pageLinks.last;
}
