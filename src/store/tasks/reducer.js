// Tasks reducer
import _ from "lodash";
import Immutable from "seamless-immutable";

import * as types from "./actionTypes";

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
      return Immutable({
        ...state,
        tasksById: {
          ...state.tasksById,
          [action.taskData.id]: action.taskData
        }
      });
    case types.TASK_FETCHED:
      // Have to turn state back to immutable
      // Seems the reduces does not do that for us
      return Immutable({
        ...state,
        tasksById: {
          ...state.tasksById,
          [action.taskData.id]: action.taskData
        }
      });
    case types.TASK_EDITED:
      return Immutable({
        ...state,
        tasksById: {
          ...state.tasksById,
          [action.taskData.id]: action.taskData
        }
      });
    case types.TASK_DELETED:
      const newTasks = _.filter(...state.tasksById, task => {
        return task.id !== action.taskId;
      });

      const newTasksById = _.keyBy(newTasks, task => {
        return task.id;
      });
      return state.set({
        tasksById: newTasksById
      });
    case types.TASK_CLONED:
      return Immutable({
        ...state,
        tasksById: {
          ...state.tasksById,
          [action.taskData]: action.taskData
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

export function getTaskById(state, id) {
  return _.get(state.tasks.tasksById, id);
}
