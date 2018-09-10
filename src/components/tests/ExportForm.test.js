// test ExportForm
import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import ExportForm from "../ExportForm";

describe("components/ExportForm", () => {
  it("renders without crashing", () => {
    shallow(
      <ExportForm
        onFormSubmit={function() {}}
        handleDateChanges={function() {}}
        downloadModalHandler={function() {}}
      />
    );
  });
  it("renders an ExportForm", () => {
    const wrapper = mount(
      <ExportForm
        onFormSubmit={function() {}}
        handleDateChanges={function() {}}
        downloadModalHandler={function() {}}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
