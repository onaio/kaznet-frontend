import TaskService from "../tasks";

import * as fixtures from "../../store/tasks/tests/fixtures";

global.fetch = require("jest-fetch-mock");

describe("services/tasks", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch tasks", async () => {
    const data = fixtures.taskData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await TaskService.getTaskList();
    expect(response).toEqual(fixtures.tasksArray);
  });

  it("should handle fetch tasks http errors", async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await TaskService.getTaskList();
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(
      new Error("TaskService getTaskList failed, HTTP status 500")
    );
  });

  it("should create a task", async () => {
    const data = fixtures.singleTaskData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await TaskService.createTask({});
    expect(response).toEqual(fixtures.singleTask);
  });

  it("should edit a task", async () => {
    const data = fixtures.singleTaskData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await TaskService.editTask({}, 1);
    expect(response).toEqual(fixtures.singleTask);
  });

  it("should handle edit task http errors", async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await TaskService.editTask();
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(
      new Error("TaskService editTask failed, HTTP status 500")
    );
  });

  it("should handle create task http errors", async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await TaskService.createTask();
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(
      new Error("TaskService createTask failed, HTTP status 500")
    );
  });

  it("should fetch task", async () => {
    const data = fixtures.taskData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await TaskService.getTask(1);
    expect(response).toEqual(fixtures.taskData);
  });

  it("should handle get task http errors", async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await TaskService.getTask(1);
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(
      new Error("TaskService getTask failed, HTTP status 500")
    );
  });
});
