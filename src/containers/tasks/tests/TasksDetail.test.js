// Test TasksDetail
import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import { TasksDetail } from "../TasksDetail";
import * as fixtures from "../../../store/tasks/tests/fixtures";

describe("containers/task/TasksDetail", () => {
  it("renders without crashing", () => {
    shallow(
      <TasksDetail
        match={{
          params: {
            id: "1"
          }
        }}
        fetchTask={function() {}}
        changePageTitle={function() {}}
      />
    );
  });

  it("renders detail list correctly", () => {
    const wrapper = mount(
      <TasksDetail
        match={{
          params: {
            id: "1"
          }
        }}
        fetchTask={function() {}}
        changePageTitle={function() {}}
        taskById={fixtures.taskById}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
