// Forms reducer
import _ from "lodash";
import Immutable from "seamless-immutable";

import * as types from "./actionTypes";

const initialState = Immutable({
  formsById: {},
  formsIdArray: [],
  unusedForms: []
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

export function getUnusedFormsById(state) {
  const forms = _.filter(state.forms.formsById, form => {
    return !form.attributes.has_task;
  });

  const formsById = _.keyBy(forms, form => {
    return form.id;
  });

  return formsById;
}

export function getFormById(state, id) {
  return _.get(state.forms.formsById, id);
}
