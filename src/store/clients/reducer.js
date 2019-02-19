import _ from 'lodash';
import Immutable from 'seamless-immutable';
import qs from 'qs';

import * as types from './actionTypes';

const initialState = Immutable({
  clientsById: {},
  clientsIdArray: [],
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
    case types.CLIENTS_FETCHED:
      return state.merge({
        clientsById: action.clientsById,
        pageLinks: action.pageLinks,
        currentPage: action.currentPage,
        totalPages: action.totalPages,
        totalCount: action.totalCount,
        selectOptions: action.selectOptions
      });
    case types.CLIENT_CHANGE_PAGE:
      return state.merge({
        currentPage: action.pageNumber
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
    case types.CLIENT_DELETED:
      const newClientsById = _.omit(state.clientsById, action.clientId);
      return state.set('clientsById', newClientsById);
    default:
      return state;
  }
}

export function getClientsById(state) {
  return state.clients.clientsById;
}

export function getClientsIdArray(state) {
  return _.keys(state.clients.clientsById);
}

export function getClientById(state, id) {
  return _.get(state.clients.clientsById, id);
}

export function getPageLinks(state, props) {
  return state.clients.pageLinks;
}

export function getCurrentPage(state, props) {
  return state.clients.currentPage;
}

export function getTotalPages(state, props) {
  return state.clients.totalPages;
}

export function getFirstPage(state, props) {
  const url = state.clients.pageLinks.first;
  return Number(Object.values(qs.parse(url && url.slice(1)))[0]);
}

export function getNextPage(state, props) {
  return state.clients.pageLinks.next;
}

export function getPreviousPage(state, props) {
  return state.clients.pageLinks.prev;
}

export function getLastPage(state, props) {
  const url = state.clients.pageLinks.last;
  return Number(Object.values(qs.parse(url && url.slice(1)))[0]);
}

export function getTotalCount(state, props) {
  return state.clients.totalCount;
}

export function getClientOptions(state, props) {
  return state.clients.selectOptions;
}
