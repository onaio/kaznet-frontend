// users store Integration tests
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import * as reducers from "../reducers";
import * as userActions from "../users/actions";
import * as selectors from "../selectors";
import * as fixtures from "../users/tests/fixtures";
import UserService from "../../services/users";

jest.mock("../../services/users");

describe("store/users", () => {
  let store;

  beforeEach(() => {
    jest.resetAllMocks();
    store = createStore(combineReducers(reducers), applyMiddleware(thunk));
  });

  it("should retrieve all users", async () => {
    UserService.getUserList.mockReturnValueOnce({
      usersArray: fixtures.usersArray,
      pageLinks: fixtures.userData.links,
      currentPage: 1
    });

    await store.dispatch(userActions.fetchUsers());
    expect(selectors.getUsersById(store.getState())).toEqual(
      fixtures.usersById
    );
    expect(selectors.getUsersIdArray(store.getState())).toEqual(
      fixtures.usersIdArray
    );
  });
});
