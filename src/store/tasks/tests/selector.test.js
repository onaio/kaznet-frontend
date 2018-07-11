// task selector tests
import Immutable from "seamless-immutable";
import { Selector } from "redux-testkit";

import * as tasks from "../reducer";
import * as fixtures from "./fixtures";

const emptyState = Immutable({
  tasks: {
    tasksById: {},
    tasksIdArray: [],
    currentPage: 1,
    pageLinks: {
      first: null,
      last: null,
      prev: null,
      next: null
    }
  }
});

const fullState = Immutable({
  tasks: {
    tasksById: fixtures.tasksById,
    tasksIdArray: fixtures.tasksIdArray,
    currentPage: 1,
    pageLinks: fixtures.pageLinks
  }
});

describe("store/tasks/selectors", () => {
  it("should get default tasks by id when empty", () => {
    Selector(tasks.getTasksById)
      .expect(emptyState)
      .toReturn({});
  });

  it("should get default task ids array when empty", () => {
    Selector(tasks.getTasksIdArray)
      .expect(emptyState)
      .toReturn([]);
  });

  it("should get initial first page when empty", () => {
    Selector(tasks.getFirstPage)
      .expect(emptyState)
      .toReturn(null);
  });

  it("should get initial next page when empty", () => {
    Selector(tasks.getNextPage)
      .expect(emptyState)
      .toReturn(null);
  });

  it("should get initial previous page when empty", () => {
    Selector(tasks.getPreviousPage)
      .expect(emptyState)
      .toReturn(null);
  });

  it("should get initial last page when empty", () => {
    Selector(tasks.getLastPage)
      .expect(emptyState)
      .toReturn(null);
  });

  it("should get tasks by id when full", () => {
    Selector(tasks.getTasksById)
      .expect(fullState)
      .toReturn(fixtures.tasksById);
  });

  it("should get task ids array when full", () => {
    Selector(tasks.getTasksIdArray)
      .expect(fullState)
      .toReturn(fixtures.tasksIdArray);
  });

  it("should get first page when full", () => {
    Selector(tasks.getFirstPage)
      .expect(fullState)
      .toReturn(fixtures.pageLinks.first);
  });

  it("should get next page when full", () => {
    Selector(tasks.getNextPage)
      .expect(fullState)
      .toReturn(fixtures.pageLinks.next);
  });

  it("should get previous page when full", () => {
    Selector(tasks.getPreviousPage)
      .expect(fullState)
      .toReturn(fixtures.pageLinks.prev);
  });

  it("should get last page when full", () => {
    Selector(tasks.getLastPage)
      .expect(fullState)
      .toReturn(fixtures.pageLinks.last);
  });
});
