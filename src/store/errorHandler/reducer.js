// ErrorHandler reducer
import Immutable from 'seamless-immutable';

import * as types from './actionTypes';

const initialState = Immutable({
  errors: false,
  errorMessage: null
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.REQUEST_FAILURE:
      return Immutable({
        ...state,
        errors: true,
        errorMessage: action.errorMessage
      });
    case types.REQUEST_SUCCESS:
      return Immutable({
        ...state,
        errors: false
      });
    default:
      return state;
  }
}

// Error Handler Selectors

export function getHasError(state) {
  return state.errorHandler.errors;
}

export function getErrorMessage(state) {
  return state.errorHandler.errorMessage;
}
