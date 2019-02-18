// tasks store Integration tests
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import * as taskActions from '../tasks/actions';
import * as taskSelectors from '../tasks/reducer';
import * as fixtures from '../tasks/tests/fixtures';
import TaskService from '../../services/tasks';

jest.mock('../../services/tasks');

describe('store/tasks integration', () => {
  let store;

  beforeEach(() => {
    jest.resetAllMocks();
    store = createStore(combineReducers(reducers), applyMiddleware(thunk));
  });

  it('should retrieve all tasks', async () => {
    TaskService.getTaskList.mockReturnValueOnce({
      tasksArray: fixtures.tasksArray,
      pageLinks: fixtures.pageLinks,
      currentPage: fixtures.currentPage,
      totalPages: fixtures.totalPages,
      totalCount: fixtures.totalCount
    });

    await store.dispatch(taskActions.fetchTasks());
    expect(taskSelectors.getTasksById(store.getState())).toEqual(fixtures.tasksById);
    expect(taskSelectors.getTasksIdArray(store.getState())).toEqual(fixtures.tasksIdArray);
  });
});
