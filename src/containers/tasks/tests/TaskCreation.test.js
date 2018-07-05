// Test TaskCreation
import React from "react";
import { shallow, mount } from "enzyme";
import moment from "moment";
import toJson from "enzyme-to-json";

import TaskCreation from "../TaskCreation";
import FormView from "../../../components/FormView";
import TaskForm from "../TaskForm";

describe("containers/task/TaskCreation", () => {
  it("renders without crashing", () => {
    shallow(<TaskCreation />);
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
      amount: ""
    };
    const wrapper = shallow(<TaskCreation />).dive();
    expect(wrapper.find(FormView)).toHaveLength(0);
    expect(wrapper.find(TaskForm)).toHaveLength(1);
    const data = wrapper.find(TaskForm).props().initialData;
    expect(data).toEqual(initialData);
  });
});
