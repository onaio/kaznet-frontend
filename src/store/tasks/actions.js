import _ from 'lodash';
import * as types from './actionTypes';
import taskService from '../../services/tasks';

export function fetchTasks() {
  return async(dispatch, getState) => {
    try {
      const taskArray = await taskService.getTaskList();
      const tasksById = _.keyBy(taskArray, (task) => task.id);
      dispatch({ type: types.TASKS_FETCHED, tasksById });
    } catch (error) {
      console.error(error);
    }
  };
}