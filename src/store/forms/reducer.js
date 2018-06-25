// Forms reducer
import _ from "lodash";
import Immutable from "seamless-immutable";

import * as types from "./actionTypes";

const initialState = Immutable({
  formsById: {},
  formsIdArray: []
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.FORMS_FETCHED:
      return state.merge({
        formsById: action.formsById
      });
    default:
      return state;
  }
}

// selectors

export function getFormsById(state) {
  return state.forms.formsById;
}

export function getFormsIdArray(state) {
  return _.keys(state.forms.formsById);
}
