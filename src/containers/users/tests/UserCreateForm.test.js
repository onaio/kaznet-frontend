// Test TaskCreation
import React from "react";
import { shallow } from "enzyme";
import { UserCreateForm } from "../UserCreateForm";
import FormView from "../../../components/FormView";
import UserForm from "../UserForm";
import * as constants from "../../../constants";

describe("containers/task/TaskCreateForm", () => {
  it("renders without crashing", () => {
    shallow(<UserCreateForm noTitle={function() {}} />);
  });

  it("renders both Form View and TaskForm with correct Data", () => {
    const initialData = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmation: "",
      gender: "",
      role: constants.CONTRIBUTOR_ROLE,
      expertise: constants.BEGINNER,
      national_id: "",
      payment_number: "",
      phone_number: "",
      ona_username: ""
    };
    const wrapper = shallow(<UserCreateForm noTitle={function() {}} />).dive();
    expect(wrapper.find(FormView)).toHaveLength(0);
    expect(wrapper.find(UserForm)).toHaveLength(1);
    const data = wrapper.find(UserForm).props().initialData;
    expect(data).toEqual(initialData);
  });
});
