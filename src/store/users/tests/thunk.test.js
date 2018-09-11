import { Thunk } from "redux-testkit";

import * as actionTypes from "../actionTypes";
import * as users from "../actions";
import UserService from "../../../services/users";
import * as fixtures from "./fixtures";
import * as errorHandlerTypes from "../../errorHandler/actionTypes";

jest.mock("../../../services/users");

describe("store/users/actions", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch users from server", async () => {
    UserService.getUserList.mockReturnValueOnce({
      userArray: fixtures.usersArray,
      pageLinks: fixtures.pageLinks,
      currentPage: fixtures.currentPage,
      totalPages: fixtures.totalPages,
      totalCount: fixtures.totalCount
    });
    const dispatches = await Thunk(users.fetchUsers).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.USERS_FETCHED,
      usersById: fixtures.usersById,
      pageLinks: fixtures.pageLinks,
      currentPage: fixtures.currentPage,
      totalPages: fixtures.totalPages,
      totalCount: fixtures.totalCount
    });
  });

  it("should fetch users given a url", async () => {
    UserService.getUserList.mockReturnValueOnce({
      userArray: fixtures.usersArraySecondPage,
      pageLinks: fixtures.pageLinksSecondPage,
      currentPage: fixtures.currentPageSecondPage,
      totalPages: fixtures.totalPagesSecondPage
    });
    const dispatches = await Thunk(users.fetchUsers).execute(
      fixtures.pageLinks.next
    );
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.USERS_FETCHED,
      usersById: fixtures.usersByIdSecondPage,
      pageLinks: fixtures.pageLinksSecondPage,
      currentPage: fixtures.currentPageSecondPage,
      totalPages: fixtures.totalPagesSecondPage
    });
  });

  it("should change the current page", async () => {
    const dispatches = await Thunk(users.changePageNumber).execute(2);
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.USER_CHANGE_PAGE,
      pageNumber: 2
    });
  });

  it("should fetch users and print to console on error", async () => {
    UserService.getUserList.mockImplementationOnce(() => {
      throw new Error("oops");
    });
    console.error = jest.fn();
    const dispatches = await Thunk(users.fetchUsers).execute();
    expect(dispatches.length).toBe(0);
    expect(console.error).toHaveBeenCalledWith(Error("oops"));
  });

  it("should create User", async () => {
    UserService.createUser.mockReturnValueOnce(fixtures.userData);
    const dispatches = await Thunk(users.createUser).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.USER_CREATED,
      userData: fixtures.userData
    });
    expect(dispatches[1].isPlainObject()).toBe(true);
    expect(dispatches[1].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_SUCCESS
    });
  });

  it("should create user and dispatch on error", async () => {
    UserService.createUser.mockImplementationOnce(() => {
      throw new Error("Wow!");
    });
    const dispatches = await Thunk(users.createUser).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_FAILURE,
      errorMessage: Error("Wow!")
    });
  });
});
