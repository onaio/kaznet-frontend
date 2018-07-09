// tasks store Integration tests
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import * as reducers from "../reducers";
import * as taskActions from "../tasks/actions";
import * as selectors from "../selectors";
import * as fixtures from "../tasks/tests/fixtures";
import TaskService from "../../services/tasks";

jest.mock("../../services/tasks");

describe("store/tasks integration", () => {
  let store;

  beforeEach(() => {
    jest.resetAllMocks();
    store = createStore(combineReducers(reducers), applyMiddleware(thunk));
  });

  it("should retrieve all tasks", async () => {
    TaskService.getTaskList.mockReturnValueOnce({
      tasksArray: fixtures.tasksArray,
      pageLinks: fixtures.taskData.links,
      currentPage: 1
    });

    await store.dispatch(taskActions.fetchTasks());
    expect(selectors.getTasksById(store.getState())).toEqual(
      fixtures.tasksById
    );
    expect(selectors.getTasksIdArray(store.getState())).toEqual(
      fixtures.tasksIdArray
    );
  });
});
