// errorHandler reducer tests
import _ from 'lodash';
import Immutable from 'seamless-immutable';
import { Reducer } from 'redux-testkit';

import errorHandler from '../reducer';
import * as actionTypes from '../actionTypes';

const initialState = Immutable({
  errors: false,
  errorMessage: null
});

describe('store/errorHandler/reducer', () => {
  it('should have initial state', () => {
    expect(errorHandler()).toEqual(initialState);
  });

  it('should not affect state', () => {
    Reducer(errorHandler)
      .expect({ type: 'NOT_EXISTING' })
      .toReturnState(initialState);
  });

  it('should change errors and errorMessage', () => {
    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    const errorMessage = 'Error!!';
    const action = { type: actionTypes.REQUEST_FAILURE, errorMessage };
    newState.errors = true;
    newState.errorMessage = errorMessage;

    Reducer(errorHandler)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });

  it('should not change errors', () => {
    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    const action = { type: actionTypes.REQUEST_SUCCESS };

    Reducer(errorHandler)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });
});
