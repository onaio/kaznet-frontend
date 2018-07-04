// Tasks reducer
import Immutable from "seamless-immutable";

import * as types from "./actionTypes";
import { initialState } from "../state";

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
