// Test TaskStatusChange
import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { Router } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";

import { TaskStatusChange } from "../TaskStatusChange";
import * as fixtures from "../../../store/tasks/tests/fixtures";

const history = createBrowserHistory();

describe("containers/task/TaskStatusChange", () => {
  it("renders without crashing", () => {
    shallow(
      <TaskStatusChange
        match={{
          params: {
            id: "1"
          }
        }}
        taskById={fixtures.taskById}
        location={{
          search: "?status=b"
        }}
        fetchTask={function() {}}
        editTask={function() {}}
      />
    );
  });
});
