import _ from "lodash";
import Immutable from "seamless-immutable";
import { Reducer } from "redux-testkit";

import forms from "../reducer";
import * as actionTypes from "../actionTypes";
import * as fixtures from "./fixtures";

const initialState = {
  formsById: {},
  formsIdArray: [],
  unusedForms: [],
  options: [],
  isLoading: true
};

describe("store/forms/reducer", () => {
  it("should have initial state", () => {
    expect(forms()).toEqual(initialState);
  });

  it("should store fetched forms", () => {
    const formsById = fixtures.formsById;
    const options = fixtures.getFormOptions;
    const isLoading = false;
    const action = {
      type: actionTypes.FORMS_FETCHED,
      formsById,
      options,
      isLoading
    };

    const existingState = Immutable(initialState);
    const newState = _.clone(existingState);
    newState.formsById = formsById;
    newState.options = options;
    newState.isLoading = isLoading;

    Reducer(forms)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });
});
