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
  totalCount: null,
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
    const pageLinks = fixtures.pageLinks;
    const currentPage = fixtures.currentPage;
    const totalPages = fixtures.totalPages;
    const totalCount = fixtures.totalCount;
    const action = {
      type: actionTypes.USERS_FETCHED,
      usersById,
      pageLinks,
      currentPage,
      totalPages,
      totalCount
    };

    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    newState.usersById = usersById;
    newState.pageLinks = pageLinks;
    newState.currentPage = currentPage;
    newState.totalPages = totalPages;
    newState.totalCount = totalCount;

    Reducer(users)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });

  it("should change page", () => {
    const pageNumber = 2;
    const action = {
      type: actionTypes.USER_CHANGE_PAGE,
      pageNumber
    };
    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    newState.currentPage = pageNumber;

    Reducer(users)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });

  it("should store fetched users", () => {
    const userData = fixtures.singleUserData;
    const usersById = fixtures.usersById;
    const action = {
      type: actionTypes.USER_CREATED,
      userData
    };
    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    newState.usersById = usersById;

    Reducer(users)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });
});
