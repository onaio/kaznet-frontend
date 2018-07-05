// Test ClientForm
import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import { ClientForm } from "../ClientForm";

describe("containers/task/ClientForm", () => {
  it("renders without crashing", () => {
    shallow(<ClientForm formActionDispatch={function() {}} />);
  });

  it("renders client form correctly", () => {
    const forms = {
      1: { attributes: { title: "name" } }
    };

    const clients = {
      1: { attributes: { name: "title" } }
    };
    const wrapper = mount(<ClientForm formActionDispatch={function() {}} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
