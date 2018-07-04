import Immutable from "seamless-immutable";

const defaultAppState = {
  locationsById: {},
  locationsIdArray: [],
  clientsById: {},
  clientsIdArray: [],
  tasksById: {},
  tasksIdArray: [],
  usersById: {},
  usersIdArray: [],
  currentPage: 1,
  pageLinks: {
    first: null,
    last: null,
    prev: null,
    next: null
  }
};

const initialState = Immutable(defaultAppState);

export { initialState };
