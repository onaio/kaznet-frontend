import TaskService from '../tasks';

import * as fixtures from '../../store/tasks/tests/fixtures';

global.fetch = require('jest-fetch-mock');

describe('services/tasks', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch tasks', async () => {
    const data = fixtures.taskData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await TaskService.getTaskList();

    const {
      links,
      meta: {
        pagination: { page, pages, count }
      }
    } = data;

    const expectedResponse = {
      tasksArray: fixtures.tasksArray,
      pageLinks: links,
      currentPage: page,
      totalPages: pages,
      totalCount: count
    };

    expect(response).toEqual(expectedResponse);
  });

  it('should fetch tasks when passed a url', async () => {
    const data = fixtures.taskDataSecondPage;
    const nextUrl = fixtures.taskData.links.next;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await TaskService.getTaskList(nextUrl);

    const {
      links,
      meta: {
        pagination: { page, pages, count }
      }
    } = data;

    const expectedResponse = {
      tasksArray: fixtures.tasksArraySecondPage,
      pageLinks: links,
      currentPage: page,
      totalPages: pages,
      totalCount: count
    };

    expect(response).toEqual(expectedResponse);
  });

  it('should handle fetch tasks http errors', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await TaskService.getTaskList();
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('TaskService getTaskList failed, HTTP status 500'));
  });

  it('should create a task', async () => {
    const data = fixtures.singleTaskData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await TaskService.createTask({});
    expect(response).toEqual(fixtures.singleTask);
  });

  it('should edit a task', async () => {
    const data = fixtures.singleTaskData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await TaskService.editTask(data, '999');
    expect(response).toEqual(fixtures.singleTask);
  });

  it('should clone a task', async () => {
    const data = fixtures.singleTaskData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await TaskService.cloneTask(data, '999');
    expect(response).toEqual(fixtures.singleTask);
  });

  it('should delete a task', async () => {
    fetch.mockResponseOnce('999');
    const response = await TaskService.deleteTask('999');
    expect(response).toEqual('999');
  });

  it('should handle edit task http errors', async () => {
    const data = fixtures.singleTaskData;
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await TaskService.editTask(data, '999');
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('TaskService editTask failed, HTTP status 500'));
  });

  it('should handle clone task http errors', async () => {
    const data = fixtures.singleTaskData;
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await TaskService.cloneTask(data, '999');
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('TaskService cloneTask failed, HTTP status 500'));
  });

  it('should handle delete task http errors', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await TaskService.deleteTask('999');
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('TaskService deleteTask failed, HTTP status 500'));
  });

  it('should handle create task http errors', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await TaskService.createTask();
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(new Error('TaskService createTask failed, HTTP status 500'));
  });

  it('should fetch task', async () => {
    const data = fixtures.singleTaskData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await TaskService.getTask(1);
    expect(response).toEqual(fixtures.singleTask);
  });

  it('should handle get task http errors', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await TaskService.getTask(1);
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('TaskService getTask failed, HTTP status 500'));
  });
});
