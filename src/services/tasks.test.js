import TaskService from './tasks';

import * as fixtures from '../store/tasks/tests/fixtures';

global.fetch = require('jest-fetch-mock');

describe('services/tasks', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch tasks', async () => {
    const data = fixtures.taskData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await TaskService.getTaskList();
    expect(response).toEqual(fixtures.tasksArray);
  });

  it('should handle default tasks http errors', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try { await TaskService.getTaskList(); } catch (e) { error = e; }
    expect(error).toEqual(new Error('TaskService getTaskList failed, HTTP status 500'));
  });

});