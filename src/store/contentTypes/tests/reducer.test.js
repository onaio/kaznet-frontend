import _ from 'lodash';
import Immutable from 'seamless-immutable';
import { Reducer } from 'redux-testkit';

import contentTypes from '../reducer';
import * as actionTypes from '../actionTypes';
import * as fixtures from './fixtures';

const initialState = {
  contentTypesById: {},
  formContentType: null
};

describe('store/contentTypes/reducer', () => {
  it('should have initial state', () => {
    expect(contentTypes()).toEqual(initialState);
  });

  it('should store fetched contentTypes', () => {
    const { contentTypesById } = fixtures;
    const action = {
      type: actionTypes.CONTENT_TYPES_FETCHED,
      contentTypesById
    };

    const existingState = Immutable(initialState);
    const newState = _.clone(existingState);
    newState.contentTypesById = contentTypesById;

    Reducer(contentTypes)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });
});
