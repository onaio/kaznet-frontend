// task actions
import _ from "lodash";
import * as types from "./actionTypes";
import * as errorHandlerTypes from "../errorHandler/actionTypes";
import taskService from "../../services/tasks";

// get list of tasks
export function fetchTasks() {
  return async (dispatch, getState) => {
    try {
      const taskArray = await taskService.getTaskList();
      const tasksById = _.keyBy(taskArray, task => task.id);
      dispatch({ type: types.TASKS_FETCHED, tasksById });
    } catch (error) {
      console.error(error);
    }
  };
}

// create a new task
export function createTask(task_data) {
  return async (dispatch, getState) => {
    try {
      const taskData = await taskService.createTask(task_data);
      dispatch({ type: types.TASK_CREATED, taskData });
      dispatch({ type: errorHandlerTypes.REQUEST_SUCCESS });
    } catch (error) {
      dispatch({
        type: errorHandlerTypes.REQUEST_FAILURE,
        errorMessage: error
      });
    }
  };
}

// edits task
export function editTask(task_data, id) {
  return async (dispatch, getState) => {
    try {
      const taskData = await taskService.editTask(task_data, id);
      dispatch({ type: errorHandlerTypes.REQUEST_SUCCESS });
      dispatch({ type: types.TASK_EDITED, taskData });
    } catch (error) {
      dispatch({
        type: errorHandlerTypes.REQUEST_FAILURE,
        errorMessage: error
      });
    }
  };
}

// fetch a specific task
export function fetchTask(id) {
  return async (dispatch, getState) => {
    try {
      const taskData = await taskService.getTask(id);
      dispatch({ type: errorHandlerTypes.REQUEST_SUCCESS });
      dispatch({ type: types.TASK_FETCHED, taskData });
    } catch (error) {
      dispatch({
        type: errorHandlerTypes.REQUEST_FAILURE,
        errorMessage: error
      });
    }
  };
}
