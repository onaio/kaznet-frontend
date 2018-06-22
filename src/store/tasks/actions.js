// task actions
import _ from "lodash";
import * as types from "./actionTypes";
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
    } catch (error) {
      console.error(error);
    }
  };
}
