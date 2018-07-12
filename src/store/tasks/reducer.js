// Tasks reducer
import _ from "lodash";
import Immutable from "seamless-immutable";

import * as types from "./actionTypes";
import { defaultAppState } from "../state";

const initialState = Immutable(
  _.merge(defaultAppState, {
    tasksById: {},
    tasksIdArray: []
  })
);

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.TASKS_FETCHED:
      return state.merge({
        tasksById: action.tasksById,
        pageLinks: action.pageLinks,
        currentPage: action.currentPage,
        totalPages: action.totalPages
      });
    case types.TASK_CREATED:
      return Immutable({
        ...state,
        tasksById: {
          ...state.tasksById,
          [action.taskData.id]: action.taskData
        }
      });
    case types.TASK_CHANGE_PAGE:
      return state.merge({
        currentPage: action.pageNumber
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
    default:
      return state;
  }
}

export function getTasksById(state) {
  return state.tasks.tasksById;
}

export function getTasksIdArray(state) {
  return _.keys(state.tasks.tasksById);
}

export function getTaskById(state, id) {
  return _.get(state.tasks.tasksById, id);
}

export function getPageLinks(state, props) {
  return state.tasks.pageLinks;
}

export function getCurrentPage(state, porseps) {
  return state.tasks.currentPage;
}

export function getTotalPages(state, porseps) {
  return state.tasks.totalPages;
}

export function getFirstPage(state, props) {
  return state.tasks.pageLinks.first;
}

export function getNextPage(state, props) {
  return state.tasks.pageLinks.next;
}

export function getPreviousPage(state, props) {
  return state.tasks.pageLinks.prev;
}

export function getLastPage(state, props) {
  return state.tasks.pageLinks.last;
}
