// Tasks reducer
import _ from "lodash";
import Immutable from "seamless-immutable";

import * as types from "./actionTypes";
import { Object } from "core-js";

const initialState = Immutable({
  tasksById: {},
  tasksIdArray: []
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.TASKS_FETCHED:
      return state.merge({
        tasksById: action.tasksById
      });
    case types.TASK_CREATED:
      return {
        ...state,
        tasksById: {
          ...state.tasksById,
          [action.taskData.id]: action.taskData
        }
      };
    case types.TASK_FETCHED:
      const key = Object.keys(action.taskById)[0];
      const data = Object.values(action.taskById)[0];

      // Have to turn state back to immutable
      // Seems the reduces does not do that for us
      return Immutable({
        ...state,
        tasksById: {
          ...state.tasksById,
          [key]: data
        }
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

export function getTaskById(state, props) {
  return _.get(state.tasks.tasksById, props.match.params.id);
}
