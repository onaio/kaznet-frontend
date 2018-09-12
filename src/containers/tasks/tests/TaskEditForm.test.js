//Test TaskEditForm
import React from "react";
import { shallow } from "enzyme";
import Immutable from "seamless-immutable";

import * as fixtures from "../../../store/tasks/tests/fixtures";
import { TaskEditForm } from "../TaskEditForm";
import FormView from "../../../components/FormView";
import TaskForm from "../TaskForm";

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

  it("renders both Form View and TaskForm with correct Data", () => {
    let singleTask = fixtures.singleTask;
    singleTask.attributes.task_locations = Immutable(
      singleTask.attributes.task_locations
    );

    const wrapper = shallow(
      <TaskEditForm
        match={{
          params: {
            id: "1"
          }
        }}
        fetchTask={function() {}}
        noTitle={function() {}}
        taskById={fixtures.singleTask}
      />
    ).dive();

    expect(wrapper.find(FormView)).toHaveLength(0);
    expect(wrapper.find(TaskForm)).toHaveLength(1);
    const data = wrapper.find(TaskForm).props().initialData;
    expect(data).toEqual(fixtures.TaskFormInitialData);
  });
});
