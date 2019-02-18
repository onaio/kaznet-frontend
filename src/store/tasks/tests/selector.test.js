// task selector tests
import Immutable from 'seamless-immutable';
import { Selector } from 'redux-testkit';

import * as tasks from '../reducer';
import * as fixtures from './fixtures';

const emptyState = Immutable({
  tasks: {
    tasksById: {},
    tasksIdArray: [],
    status: ''
  }
});

const fullState = Immutable({
  tasks: {
    tasksById: fixtures.tasksById,
    tasksIdArray: fixtures.tasksIdArray,
    status: fixtures.getTaskStatus
  }
});

describe('store/tasks/selectors', () => {
  it('should get default tasks by id when empty', () => {
    Selector(tasks.getTasksById)
      .expect(emptyState)
      .toReturn({});
  });

  it('should get default task ids array when empty', () => {
    Selector(tasks.getTasksIdArray)
      .expect(emptyState)
      .toReturn([]);
  });

  it('should get tasks by id when full', () => {
    Selector(tasks.getTasksById)
      .expect(fullState)
      .toReturn(fixtures.tasksById);
  });

  it('should get one task by id when full', () => {
    Selector(tasks.getTaskById)
      .expect(fullState, 4)
      .toReturn(fixtures.taskById);
  });

  it('should get task ids array when full', () => {
    Selector(tasks.getTasksIdArray)
      .expect(fullState)
      .toReturn(fixtures.tasksIdArray);
  });

  it('should task status when full', () => {
    Selector(tasks.getTaskStatus)
      .expect(fullState, 'a')
      .toReturn(fixtures.getTaskStatus);
  });

  it('should get task status when empty', () => {
    Selector(tasks.getTaskStatus)
      .expect(emptyState)
      .toReturn('');
  });
});
