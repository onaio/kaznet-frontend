// task reducer tests
import _ from 'lodash';
import Immutable from 'seamless-immutable';
import { Reducer } from 'redux-testkit';

import tasks from '../reducer';
import * as actionTypes from '../actionTypes';
import * as fixtures from './fixtures';

const initialState = {
  tasksById: {},
  tasksIdArray: [],
  currentPage: null,
  totalPages: null,
  totalCount: null,
  pageLinks: {
    first: null,
    last: null,
    prev: null,
    next: null
  },
  status: ''
};

const fullState = {
  tasksById: fixtures.tasksById,
  tasksIdArray: fixtures.tasksIdArray,
  status: fixtures.getTaskStatus
};

describe('store/tasks/reducer', () => {
  it('should have initial state', () => {
    expect(tasks()).toEqual(initialState);
  });

  it('should store fetched single task in empty state', () => {
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

  it('should store cloned task', () => {
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

  it('should change page', () => {
    const pageNumber = 2;
    const action = {
      type: actionTypes.TASK_CHANGE_PAGE,
      pageNumber
    };
    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    newState.currentPage = pageNumber;

    Reducer(tasks)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });

  it('should store fetched tasks', () => {
    const { tasksById } = fixtures;
    const { pageLinks } = fixtures;
    const { currentPage } = fixtures;
    const { totalPages } = fixtures;
    const { totalCount } = fixtures;
    const action = {
      type: actionTypes.TASKS_FETCHED,
      tasksById,
      pageLinks,
      currentPage,
      totalPages,
      totalCount
    };

    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    newState.tasksById = tasksById;
    newState.pageLinks = pageLinks;
    newState.currentPage = currentPage;
    newState.totalPages = totalPages;
    newState.totalCount = totalCount;

    Reducer(tasks)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });

  it('should store created task', () => {
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

  it('should add created task to store', () => {
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

  it('should add task status to store', () => {
    const status = fixtures.getTaskStatus;
    const action = {
      type: actionTypes.TASK_STATUS,
      status
    };

    const existingState = Immutable(fullState);
    const newState = _.clone(fullState);
    newState.status = status;

    Reducer(tasks)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });

  it('should remove deleted task from store', () => {
    const taskId = '10';
    const action = { type: actionTypes.TASK_DELETED, taskId };

    const existingState = Immutable(fullState);
    const newState = _.clone(fullState);

    newState.tasksById = _.omit(newState.tasksById, taskId);

    Reducer(tasks)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });
});
