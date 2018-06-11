// reducers hold the store's state (the initialState object defines it)
// reducers also handle plain object actions and modify their state (immutably) accordingly
// this is the only way to change the store's state
// the other exports in this file are selectors, which is business logic that digests parts of the store's state
// for easier consumption by views
import _ from 'lodash';
import Immutable from 'seamless-immutable';

import * as types from './actionTypes';

const initialState = Immutable({
  "tasksById": {},
  "tasksIdArray": []
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.TASKS_FETCHED:
      return state.merge({
        tasksById: action.tasksById
      });
    default:
      return state;
  }
}

// selectors

export function getTasksById(state) {
  return state.tasks.tasksById;
}

export function getTasksIdArray(state) {
  return _.keys(state.tasks.tasksById);
}