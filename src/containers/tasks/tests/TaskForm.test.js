// Test TaskForm
import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import MockDate from "mockdate";

import { TaskForm } from "../TaskForm";
import * as fixtures from "../../../store/tasks/tests/fixtures";
import { clientsById } from "../../../store/clients/tests/fixtures";
import { locationsById } from "../../../store/locations/tests/fixtures";

describe("containers/task/TaskForm", () => {
  it("renders without crashing", () => {
    shallow(
      <TaskForm
        formActionDispatch={function() {}}
        fetchClients={function() {}}
        fetchLocations={function() {}}
        fetchForms={function() {}}
        fetchContentTypes={function() {}}
        locationsById={locationsById}
      />
    );
  });

  it("renders task form correctly", () => {
    MockDate.set("1/2/1986");

    const forms = {
      1: { attributes: { title: "name" } }
    };

    const wrapper = mount(
      <TaskForm
        formActionDispatch={function() {}}
        fetchClients={function() {}}
        fetchLocations={function() {}}
        fetchForms={function() {}}
        fetchContentTypes={function() {}}
        unusedFormsById={forms}
        clientsById={clientsById}
        locationsById={locationsById}
        initialData={fixtures.TaskFormInitialData}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it("renders task form correctly when doing an edit", () => {
    MockDate.set("6/11/1985");

    const initialData = {
      name: "Coconut Quest"
    };

    const forms = {
      1: { attributes: { title: "name" } }
    };

    const wrapper = mount(
      <TaskForm
        formActionDispatch={function() {}}
        fetchClients={function() {}}
        fetchLocations={function() {}}
        fetchForms={function() {}}
        fetchContentTypes={function() {}}
        unusedFormsById={forms}
        clientsById={clientsById}
        locationsById={locationsById}
        initialData={fixtures.TaskFormInitialData}
        initialData={initialData}
        targetId={1337}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
