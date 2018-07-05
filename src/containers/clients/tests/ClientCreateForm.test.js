// Test ClientCreateForm
import React from "react";
import { shallow, mount } from "enzyme";

import ClientCreateForm from "../ClientCreateForm";
import FormView from "../../../components/FormView";
import ClientForm from "../ClientForm";

describe("containers/task/TaskCreation", () => {
  it("renders without crashing", () => {
    shallow(<ClientCreateForm />);
  });

  it("renders both Form View and TaskForm with correct Data", () => {
    const wrapper = shallow(<ClientCreateForm />).dive();
    expect(wrapper.find(FormView)).toHaveLength(0);
    expect(wrapper.find(ClientForm)).toHaveLength(1);
  });
});
