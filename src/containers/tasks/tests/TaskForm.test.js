// Test TaskForm
import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import MockDate from "mockdate";

import { TaskForm } from "../TaskForm";
import * as fixtures from "../../../store/tasks/tests/fixtures";

describe("containers/task/TaskForm", () => {
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

  it("renders task form correctly", () => {
    MockDate.set("1/2/1986");

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
        initialData={fixtures.TaskFormInitialData}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
