// Test TaskForm
import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import { TaskForm } from "../TaskForm";

describe("containers/task/TasksList", () => {
  it("renders without crashing", () => {
    shallow(
      <TaskForm
        formActionDispatch={function() {}}
        fetchClients={function() {}}
        fetchForms={function() {}}
        fetchContentTypes={function() {}}
      />
    );
  });

  it("renderes task form correctly", () => {
    const forms = {
      1: { attributes: { title: "name" } }
    };

    const clients = {
      1: { attributes: { name: "title" } }
    };
    const wrapper = mount(
      <TaskForm
        formActionDispatch={function() {}}
        fetchClients={function() {}}
        fetchForms={function() {}}
        fetchContentTypes={function() {}}
        unusedFormsById={forms}
        clientsById={clients}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
