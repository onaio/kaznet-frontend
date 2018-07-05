//Test TaskEditForm
import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

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
    const initialData = {
      amount: 55,
      client: "7",
      descripton: undefined,
      end: "2019-01-30",
      estimated_time: 15,
      form: 1,
      name: "Awesome Task",
      required_expertise: "1",
      start: "2018-06-21",
      status: "a",
      timing_rule: "RRULE:FREQ=DAILY;INTERVAL=10;COUNT=12",
      user_submission_target: 100
    };
    const wrapper = shallow(
      <TaskEditForm
        match={{
          params: {
            id: "1"
          }
        }}
        fetchTask={function() {}}
        noTitle={function() {}}
        taskById={fixtures.taskById}
      />
    ).dive();

    expect(wrapper.find(FormView)).toHaveLength(0);
    expect(wrapper.find(TaskForm)).toHaveLength(1);
    const data = wrapper.find(TaskForm).props().initialData;
    expect(data).toEqual(initialData);
  });
});
