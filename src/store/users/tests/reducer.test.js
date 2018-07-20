import Immutable from "seamless-immutable";
import _ from "lodash";
import { Reducer } from "redux-testkit";

import users from "../reducer";
import * as fixtures from "./fixtures";
import * as actionTypes from "../actionTypes";

const initialState = {
  usersById: {},
  usersIdArray: [],
  currentPage: null,
  totalPages: null,
  pageLinks: {
    first: null,
    last: null,
    prev: null,
    next: null
  }
};

describe("store/users/reducer", () => {
  it("should have initial state", () => {
    expect(users()).toEqual(initialState);
  });

  it("should store fetched users", () => {
    const usersById = fixtures.usersById;
    const action = { type: actionTypes.USERS_FETCHED, usersById };

    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    newState.usersById = usersById;

    Reducer(users)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });
});
