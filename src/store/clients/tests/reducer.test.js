import _ from 'lodash';
import Immutable from 'seamless-immutable';
import { Reducer } from 'redux-testkit';

import clients from '../reducer';
import * as actionTypes from '../actionTypes';
import * as fixtures from './fixtures';

const initialState = {
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
};

describe('store/clients/reducer', () => {
  it('should have initial state', () => {
    expect(clients()).toEqual(initialState);
  });

  it('should store fetched clients', () => {
    const { clientsById } = fixtures;
    const { pageLinks } = fixtures;
    const { currentPage } = fixtures;
    const { totalPages } = fixtures;
    const { totalCount } = fixtures;
    const { selectOptions } = fixtures;
    const action = {
      type: actionTypes.CLIENTS_FETCHED,
      clientsById,
      pageLinks,
      currentPage,
      totalPages,
      totalCount,
      selectOptions
    };

    const existingState = Immutable(initialState);
    const newState = _.clone(existingState);
    newState.clientsById = clientsById;
    newState.pageLinks = pageLinks;
    newState.currentPage = currentPage;
    newState.totalPages = totalPages;
    newState.totalCount = totalCount;
    newState.selectOptions = selectOptions;

    Reducer(clients)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });

  it('should store created client', () => {
    const clientData = fixtures.singleClient;
    const action = { type: actionTypes.CLIENT_CREATED, clientData };

    const existingState = Immutable(initialState);
    const newState = _.clone(existingState);
    newState.clientsById = fixtures.clientsById;

    Reducer(clients)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });

  it('should store fetched client', () => {
    const clientData = fixtures.singleClient;
    const action = { type: actionTypes.CLIENT_FETCHED, clientData };

    const existingState = Immutable(initialState);
    const newState = _.clone(existingState);
    newState.clientsById = fixtures.clientsById;

    Reducer(clients)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });

  it('should store edited client', () => {
    const clientData = fixtures.singleClient;
    const action = { type: actionTypes.CLIENT_EDITED, clientData };

    const existingState = Immutable(initialState);
    const newState = _.clone(existingState);
    newState.clientsById = fixtures.clientsById;

    Reducer(clients)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });

  it('should remove deleted client from store', () => {
    const clientId = '10';
    const action = { type: actionTypes.CLIENT_DELETED, clientId };

    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);

    newState.clientsById = _.omit(newState.clientsById, clientId);

    Reducer(clients)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });
});
