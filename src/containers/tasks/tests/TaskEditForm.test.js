//Test TaskEditForm
import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import { TaskEditForm } from "../TaskEditForm";

describe("containers/task/TaskEditForm", () => {
  it("renders without crashing", () => {
    shallow(
      <TaskEditForm
        match={{
          params: {
            id: "1"
          }
        }}
        fetchTask={function() {}}
        noTitle={function() {}}
      />
    );
  });
});
