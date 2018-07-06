// Test TaskCreation
import React from "react";
import { shallow } from "enzyme";
import moment from "moment";

import { TaskCreateForm } from "../TaskCreateForm";
import FormView from "../../../components/FormView";
import TaskForm from "../TaskForm";

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
      required_expertise: "1",
      timing_rule: "",
      status: "d",
      user_submission_target: 10,
      amount: undefined
    };
    const wrapper = shallow(<TaskCreateForm noTitle={function() {}} />).dive();
    expect(wrapper.find(FormView)).toHaveLength(0);
    expect(wrapper.find(TaskForm)).toHaveLength(1);
    const data = wrapper.find(TaskForm).props().initialData;
    expect(data).toEqual(initialData);
  });
});
