import Immutable from "seamless-immutable";

const API_ENDPOINT = process.env.REACT_APP_KAZNET_ENDPOINT;
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

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

export { API_ENDPOINT, API_TOKEN, initialState };
