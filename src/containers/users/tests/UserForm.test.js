// Test TaskForm
import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { UserForm } from "../UserForm";
import * as fixtures from "../../../store/users/tests/fixtures";
describe("containers/tasks/TaskForm", () => {
  it("renders without crashing", () => {
    shallow(<UserForm formActionDispatch={function() {}} />);
  });

  it("renders task form correctly", () => {
    const wrapper = mount(
      <UserForm
        formActionDispatch={function() {}}
        initialData={fixtures.UserFormInitialData}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
