import _ from 'lodash';
import Immutable from 'seamless-immutable';
import { Reducer } from 'redux-testkit';

import locations from '../reducer';
import * as actionTypes from '../actionTypes';
import * as fixtures from './fixtures';

const initialState = {
  locationsById: {},
  locationsIdArray: [],
  currentLocation: {},
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

const fullState = {
  locationsById: fixtures.locationsById,
  locationsIdArray: fixtures.locationsIdArray
};

describe('store/locations/reducer', () => {
  it('should have initial state', () => {
    expect(locations()).toEqual(initialState);
  });

  it('should store fetched locations', () => {
    const locationsById = fixtures.locationById;
    const { pageLinks } = fixtures;
    const { currentPage } = fixtures;
    const { totalPages } = fixtures;
    const { totalCount } = fixtures;
    const { selectOptions } = fixtures;
    const action = {
      type: actionTypes.LOCATIONS_FETCHED,
      locationsById,
      pageLinks,
      currentPage,
      totalPages,
      totalCount,
      selectOptions
    };

    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    newState.locationsById = locationsById;
    newState.pageLinks = pageLinks;
    newState.currentPage = currentPage;
    newState.totalPages = totalPages;
    newState.totalCount = totalCount;
    newState.selectOptions = selectOptions;

    Reducer(locations)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });

  it('should store created location', () => {
    const locationData = fixtures.singleLocation;
    const action = {
      type: actionTypes.LOCATION_CREATED,
      locationData
    };

    const locationsById = {};
    locationsById[locationData.id] = locationData;

    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    newState.locationsById = locationsById;

    Reducer(locations)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });

  it('should store fetched single location in empty state', () => {
    const locationData = fixtures.singleLocation;
    const action = {
      type: actionTypes.LOCATION_FETCHED,
      locationData
    };

    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    newState.locationsById = fixtures.singleLocationById;
    newState.currentLocation = fixtures.singleLocation;

    Reducer(locations)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });

  it('should remove deleted location from store', () => {
    const locationId = '7';
    const action = {
      type: actionTypes.LOCATION_DELETED,
      locationId
    };

    const existingState = Immutable(fullState);
    const newState = _.clone(fullState);

    newState.locationsById = _.omit(newState.locationsById, locationId);

    Reducer(locations)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });
});
