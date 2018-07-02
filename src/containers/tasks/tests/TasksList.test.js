// Test TasksList
import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import { TasksList } from "../TasksList";
import * as fixtures from "../../../store/tasks/tests/fixtures";

describe("containers/task/TasksList", () => {
  it("renders without crashing", () => {
    shallow(
      <TasksList
        fetchTasks={function() {}}
        changePageTitle={function() {}}
        changePageTitleButton={function() {}}
        changePageTarget={function() {}}
        showListTitle={function() {}}
      />
    );
  });

  it("renders task list correctly", () => {
    const wrapper = mount(
      <TasksList
        fetchTasks={function() {}}
        changePageTitle={function() {}}
        changePageTitleButton={function() {}}
        changePageTarget={function() {}}
        showListTitle={function() {}}
        rowsById={fixtures.tasksById}
        rowsIdArray={fixtures.tasksIdArray}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
