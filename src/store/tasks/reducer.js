// Tasks reducer
import _ from "lodash";
import Immutable from "seamless-immutable";

import * as types from "./actionTypes";

import { defaultPageState } from "../../constants.js";

const initialState = Immutable(defaultPageState);

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.TASKS_FETCHED:
      return state.merge({
        tasksById: action.tasksById,
        pageLinks: action.pageLinks,
        currentPage: action.currentPage
      });
    case types.TASK_CREATED:
      return Immutable({
        ...state,
        tasksById: {
          ...state.tasksById,
          [action.taskData.id]: action.taskData
        }
      };
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

// selectors
function getTasksById(state) {
  return state.tasks.tasksById;
}

function getTasksIdArray(state) {
  return _.keys(state.tasks.tasksById);
}

function getTaskById(state, id) {
  return _.get(state.tasks.tasksById, id);
}

function getPageLinks(state, props) {
  return state.tasks.pageLinks;
}

function getCurrentPage(state, props) {
  return state.tasks.currentPage;
}

function getFirstPage(state, props) {
  return state.tasks.pageLinks.first;
}

function getNextPage(state, props) {
  return state.tasks.pageLinks.next;
}

function getPreviousPage(state, props) {
  return state.tasks.pageLinks.prev;
}

function getLastPage(state, props) {
  return state.tasks.pageLinks.last;
}

export {
  getTasksById,
  getTasksIdArray,
  getTaskById,
  getPageLinks,
  getCurrentPage,
  getFirstPage,
  getNextPage,
  getPreviousPage,
  getLastPage
};
