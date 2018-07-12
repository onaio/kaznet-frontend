// task reducer tests
import _ from "lodash";
import Immutable from "seamless-immutable";
import { Reducer } from "redux-testkit";

import tasks from "../reducer";
import * as actionTypes from "../actionTypes";
import * as fixtures from "./fixtures";

const initialState = {
  tasksById: {},
  tasksIdArray: []
};

const fullState = {
  tasksById: fixtures.tasksById,
  tasksIdArray: fixtures.tasksIdArray
};

describe("store/tasks/reducer", () => {
  it("should have initial state", () => {
    expect(tasks()).toEqual(initialState);
  });

  it("should store fetched single task in empty state", () => {
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

  it("should store cloned task", () => {
    const taskData = fixtures.singleTask;
    const action = { type: actionTypes.TASK_CLONED, taskData };

    const existingState = Immutable(fullState);
    const newState = _.clone(fullState);
    newState.tasksById[taskData.id] = taskData;

    Reducer(tasks)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });

  it("should store fetched tasks", () => {
    const tasksById = fixtures.tasksById;
    const action = { type: actionTypes.TASKS_FETCHED, tasksById };

    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    newState.tasksById = tasksById;

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
