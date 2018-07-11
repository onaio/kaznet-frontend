// Test TasksList
import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { Router } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";

import { TasksList } from "../TasksList";
import * as fixtures from "../../../store/tasks/tests/fixtures";

const history = createBrowserHistory();

describe("containers/task/TasksList", () => {
  it("renders without crashing", () => {
    shallow(
      <TasksList
        fetchTasks={function() {}}
        changePageNumber={function() {}}
        changePageTitle={function() {}}
        changePageTitleButton={function() {}}
        changePageTarget={function() {}}
        showListTitle={function() {}}
      />
    );
  });

  it("renders task list correctly", () => {
    const wrapper = mount(
      <Router history={history}>
        <TasksList
          fetchTasks={function() {}}
          changePageNumber={function() {}}
          changePageTitle={function() {}}
          changePageTitleButton={function() {}}
          changePageTarget={function() {}}
          showListTitle={function() {}}
          rowsById={fixtures.tasksById}
          pageLinks={fixtures.taskData.links}
          currentPage={fixtures.taskData.meta.pagination.page}
          rowsIdArray={fixtures.tasksIdArray}
        />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
