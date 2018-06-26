// ContentTypes reducer
import _ from "lodash";
import Immutable from "seamless-immutable";

import * as types from "./actionTypes";

const initialState = Immutable({
  contentTypesById: {},
  formContentType: null
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.CONTENT_TYPES_FETCHED:
      return state.merge({
        contentTypesById: action.contentTypesById
      });
    default:
      return state;
  }
}

// selectors

export function getContentTypesById(state) {
  return state.contentTypes.contentTypesById;
}

export function getFormContentType(state) {
  return state.contentTypes.formContentType;
}
