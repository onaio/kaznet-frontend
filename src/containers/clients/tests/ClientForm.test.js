// Test ClientForm
import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import { ClientForm } from "../ClientForm";

describe("containers/task/ClientForm", () => {
  it("renders without crashing", () => {
    const initialData = { name: "Hi" };
    shallow(
      <ClientForm
        formActionDispatch={function() {}}
        initialData={initialData}
      />
    );
  });

  it("renders client form correctly", () => {
    const initialData = { name: "Hi" };
    const wrapper = mount(
      <ClientForm
        formActionDispatch={function() {}}
        initialData={initialData}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
