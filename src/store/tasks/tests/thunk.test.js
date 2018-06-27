// task thunk tests
import { Thunk } from "redux-testkit";

import TaskService from "../../../services/tasks";
import * as fixtures from "./fixtures";
import * as tasks from "../actions";
import * as actionTypes from "../actionTypes";

jest.mock("../../../services/tasks");

describe("store/tasks/actions", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch tasks from server", async () => {
    TaskService.getTaskList.mockReturnValueOnce(fixtures.tasksArray);
    const dispatches = await Thunk(tasks.fetchTasks).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.TASKS_FETCHED,
      tasksById: fixtures.tasksById
    });
  });

  it("should fetch tasks and print to console on error", async () => {
    TaskService.getTaskList.mockImplementationOnce(() => {
      throw new Error("oops");
    });
    console.error = jest.fn(); // mock the console side effect
    const dispatches = await Thunk(tasks.fetchTasks).execute();
    expect(dispatches.length).toBe(0);
    expect(console.error).toHaveBeenCalledWith(Error("oops"));
  });

  it("should post to server to create new task", async () => {
    TaskService.createTask.mockReturnValueOnce(fixtures.singleTask);
    const dispatches = await Thunk(tasks.createTask).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.TASK_CREATED,
      taskData: fixtures.singleTask
    });
  });

  it("should create task and print to console on error", async () => {
    TaskService.createTask.mockImplementationOnce(() => {
      throw new Error("oops");
    });
    console.error = jest.fn(); // mock the console side effect
    const dispatches = await Thunk(tasks.createTask).execute();
    expect(dispatches.length).toBe(0);
    expect(console.error).toHaveBeenCalledWith(Error("oops"));
  });
});
