// task thunk tests
import { Thunk } from "redux-testkit";

import TaskService from "../../../services/tasks";
import * as fixtures from "./fixtures";
import * as tasks from "../actions";
import * as actionTypes from "../actionTypes";
import * as errorHandlerTypes from "../../errorHandler/actionTypes";

jest.mock("../../../services/tasks");

describe("store/tasks/actions", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch tasks from server", async () => {
    TaskService.getTaskList.mockReturnValueOnce({
      tasksArray: fixtures.tasksArray,
      pageLinks: fixtures.pageLinks,
      currentPage: fixtures.currentPage,
      totalPages: fixtures.totalPages
    });
    const dispatches = await Thunk(tasks.fetchTasks).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.TASKS_FETCHED,
      tasksById: fixtures.tasksById,
      pageLinks: fixtures.pageLinks,
      currentPage: fixtures.currentPage,
      totalPages: fixtures.totalPages
    });
  });

  it("should fetch tasks from server given a url", async () => {});

  it("should fetch tasks and dispatches on error", async () => {
    TaskService.getTaskList.mockImplementationOnce(() => {
      throw new Error("oops");
    });
    const dispatches = await Thunk(tasks.fetchTasks).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_FAILURE,
      errorMessage: Error("oops")
    });
  });

  it("should fetch a tasks data from server", async () => {
    TaskService.getTask.mockReturnValueOnce(fixtures.taskData);
    const dispatches = await Thunk(tasks.fetchTask).execute(1);
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_SUCCESS
    });
    expect(dispatches[1].getAction()).toEqual({
      type: actionTypes.TASK_FETCHED,
      taskData: fixtures.taskData
    });
  });

  it("should fetch a task and dispatch to errorHandler on error", async () => {
    TaskService.getTask.mockImplementationOnce(() => {
      throw new Error("oops");
    });
    const dispatches = await Thunk(tasks.fetchTask).execute(1);
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_FAILURE,
      errorMessage: Error("oops")
    });
  });

  it("should post to server to create new task", async () => {
    TaskService.createTask.mockReturnValueOnce(fixtures.singleTask);
    const dispatches = await Thunk(tasks.createTask).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.TASK_CREATED,
      taskData: fixtures.singleTask
    });
    expect(dispatches[1].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_SUCCESS
    });
  });

  it("should create task and print to console on error", async () => {
    TaskService.createTask.mockImplementationOnce(() => {
      throw new Error("oops");
    });
    console.error = jest.fn(); // mock the console side effect
    const dispatches = await Thunk(tasks.createTask).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_FAILURE,
      errorMessage: Error("oops")
    });
  });
});
