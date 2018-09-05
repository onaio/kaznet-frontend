// Test TaskCreation
import React from "react";
import { shallow } from "enzyme";
import moment from "moment";

import { TaskCreateForm } from "../TaskCreateForm";
import FormView from "../../../components/FormView";
import TaskForm from "../TaskForm";
import { TASK_DRAFT, BEGINNER } from "../../../constants";

describe("containers/task/TaskCreateForm", () => {
  it("renders without crashing", () => {
    shallow(<TaskCreateForm noTitle={function() {}} />);
  });

  it("renders both Form View and TaskForm with correct Data", () => {
    const initialData = {
      name: "",
      estimated_time: "15",
      start: moment().format("YYYY-MM-DD"),
      end: moment().format("YYYY-MM-DD"),
      description: "",
      required_expertise: BEGINNER,
      timing_rule: "",
      status: TASK_DRAFT,
      user_submission_target: 10,
      amount: "",
      tasklocation_end: "17:00",
      tasklocation_location: "",
      tasklocation_start: "09:00",
      tasklocation_timing_rule: "FREQ=DAILY;INTERVAL=1;COUNT=1"
    };
    const wrapper = shallow(<TaskCreateForm noTitle={function() {}} />).dive();
    expect(wrapper.find(FormView)).toHaveLength(0);
    expect(wrapper.find(TaskForm)).toHaveLength(1);
    const data = wrapper.find(TaskForm).props().initialData;
    expect(data).toEqual(initialData);
  });
});
