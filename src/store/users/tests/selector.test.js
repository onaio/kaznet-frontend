import Immutable from "seamless-immutable";
import { Selector } from "redux-testkit";

import * as selectors from "../../selectors";
import * as fixtures from "./fixtures";

const emptyState = Immutable({
  users: {
    usersById: {},
    usersIdArray: [],
    currentPage: 1,
    pageLinks: {
      first: null,
      last: null,
      prev: null,
      next: null
    }
  }
});

const fullState = Immutable({
  users: {
    usersById: fixtures.usersById,
    usersIdAray: fixtures.usersIdArray
  }
});

describe("store/users/selectors", () => {
  it("should get default users by id when empty", () => {
    Selector(selectors.getUsersById)
      .expect(emptyState)
      .toReturn({});
  });

  it("should get default tasks id array when empty", () => {
    Selector(selectors.getUsersIdArray)
      .expect(emptyState)
      .toReturn([]);
  });

  it("should get users by id when full", () => {
    Selector(selectors.getUsersById)
      .expect(fullState)
      .toReturn(fixtures.usersById);
  });

  it("should get users id array when full", () => {
    Selector(selectors.getUsersIdArray)
      .expect(fullState)
      .toReturn(fixtures.usersIdArray);
  });
});
