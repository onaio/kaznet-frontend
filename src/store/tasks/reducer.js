// Tasks reducer
import _ from "lodash";
import Immutable from "seamless-immutable";
import queryString from "query-string";

import * as types from "./actionTypes";

const initialState = Immutable({
  tasksById: {},
  tasksIdArray: [],
  currentPage: null,
  totalPages: null,
  pageLinks: {
    first: null,
    last: null,
    prev: null,
    next: null
  }
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.TASKS_FETCHED:
      return state.merge({
        tasksById: action.tasksById,
        pageLinks: action.pageLinks,
        currentPage: action.currentPage,
        totalPages: action.totalPages
      });
    case types.TASK_CHANGE_PAGE:
      return state.merge({
        currentPage: action.pageNumber
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
      const newTasksById = _.omit(state.tasksById, action.taskId);
      return state.set("tasksById", newTasksById);
    case types.TASK_CLONED:
      return Immutable({
        ...state,
        tasksById: {
          ...state.tasksById,
          [action.taskData.id]: action.taskData
        }
      });
    case types.TASK_SEARCH_VAL:
      return Immutable({
        ...state,
        searchVal: action.val
      });
    default:
      return state;
  }
}

// selectors
export function getSearchValue(state) {
  return state.tasks.searchVal;
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
  const url = state.tasks.pageLinks.first;
  return Number(Object.values(queryString.parse(url))[0]);
}

export function getNextPage(state, props) {
  return state.tasks.pageLinks.next;
}

export function getPreviousPage(state, props) {
  return state.tasks.pageLinks.prev;
}

export function getLastPage(state, props) {
  const url = state.tasks.pageLinks.last;
  return Number(Object.values(queryString.parse(url))[0]);
}
