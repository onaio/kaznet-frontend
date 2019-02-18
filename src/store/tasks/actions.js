// task actions
import _ from 'lodash';
import * as types from './actionTypes';
import * as errorHandlerTypes from '../errorHandler/actionTypes';
import taskService from '../../services/tasks';

// get list of tasks
export function fetchTasks(url) {
  return async (dispatch, getState) => {
    try {
      const {
        tasksArray,
        pageLinks,
        currentPage,
        totalPages,
        totalCount
      } = await taskService.getTaskList(url);
      const tasksById = _.keyBy(tasksArray, task => task.id);
      dispatch({
        type: types.TASKS_FETCHED,
        tasksById,
        pageLinks,
        currentPage,
        totalPages,
        totalCount
      });
    } catch (error) {
      dispatch({
        type: errorHandlerTypes.REQUEST_FAILURE,
        errorMessage: error
      });
    }
  };
}
// get search value on task view

// Change the current Page on the task list
export function changePageNumber(pageNumber) {
  return async (dispatch, getState) => {
    dispatch({ type: types.TASK_CHANGE_PAGE, pageNumber });
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

export function deleteTask(task_id) {
  return async (dispatch, getState) => {
    try {
      const taskId = await taskService.deleteTask(task_id);
      dispatch({ type: errorHandlerTypes.REQUEST_SUCCESS });
      dispatch({ type: types.TASK_DELETED, taskId });
    } catch (error) {
      dispatch({
        type: errorHandlerTypes.REQUEST_FAILURE,
        errorMessage: 'Tasks with pre-existing submissions cannot be deleted'
      });
    }
  };
}

export function cloneTask(task_data, task_id) {
  return async (dispatch, getState) => {
    try {
      const taskData = await taskService.cloneTask(task_data, task_id);
      dispatch({ type: errorHandlerTypes.REQUEST_SUCCESS });
      dispatch({ type: types.TASK_CLONED, taskData });
    } catch (error) {
      dispatch({
        type: errorHandlerTypes.REQUEST_FAILURE,
        errorMessage: error
      });
    }
  };
}

export function getStatus(status) {
  return async dispatch => {
    dispatch({
      type: types.TASK_STATUS,
      status
    });
  };
}
