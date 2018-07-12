// task reducer tests
import _ from "lodash";
import Immutable from "seamless-immutable";
import { Reducer } from "redux-testkit";

import tasks from "../reducer";
import * as actionTypes from "../actionTypes";
import * as fixtures from "./fixtures";

const initialState = {
  tasksById: {},
  tasksIdArray: [],
  currentPage: 1,
  pageLinks: {
    first: null,
    last: null,
    prev: null,
    next: null
  }
};

const fullState = {
  tasksById: fixtures.tasksById,
  tasksIdArray: fixtures.tasksIdArray,
  currentPage: 1,
  pageLinks: fixtures.pageLinks
};

describe("store/tasks/reducer", () => {
  it("should have initial state", () => {
    expect(tasks()).toEqual(initialState);
  });

  it("should store fetched task", () => {
    const taskData = fixtures.singleTask;
    const action = { type: actionTypes.TASK_FETCHED, taskData };

    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    newState.tasksById = fixtures.singleTaskById;

    Reducer(tasks)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });

  it("should store fetched tasks", () => {
    const tasksById = fixtures.tasksById;
    const pageLinks = fixtures.pageLinks;
    const currentPage = fixtures.taskData.meta.pagination.page;
    const action = {
      type: actionTypes.TASKS_FETCHED,
      tasksById,
      pageLinks,
      currentPage
    };

    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    newState.tasksById = tasksById;
    newState.pageLinks = pageLinks;

    Reducer(tasks)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });

  it("should store created task", () => {
    const taskData = fixtures.singleTask;
    const action = { type: actionTypes.TASK_CREATED, taskData };

    const tasksById = {};
    tasksById[taskData.id] = taskData;

    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    newState.tasksById = tasksById;

    Reducer(tasks)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });

  it("should add created task to store", () => {
    const taskData = fixtures.singleTask;
    const action = { type: actionTypes.TASK_CREATED, taskData };

    const existingState = Immutable(fullState);
    const newState = _.clone(fullState);
    newState.tasksById[taskData.id] = taskData;

    Reducer(tasks)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });
});
