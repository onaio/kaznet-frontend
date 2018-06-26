// Test TitleSection
import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { Router } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";

import { TitleSection } from "../TitleSection";

const history = createBrowserHistory();

describe("containers/global/TitleSection", () => {
  it("renders without crashing", () => {
    shallow(<TitleSection />).dive();
  });

  it("renders title section correctly", () => {
    const wrapper = mount(
      <Router history={history}>
        <TitleSection />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
