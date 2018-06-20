// test Header
import React from "react";
import { shallow, mount } from "enzyme";
import { Router } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";
import toJson from "enzyme-to-json";

import profile_image from "../../../images/profile.png";
import Header from "../Header";

const history = createBrowserHistory();

describe("components/page/Header", () => {
  it("renders without crashing", () => {
    shallow(<Header />);
  });

  it("renders header correctly", () => {
    const wrapper = mount(
      <Router history={history}>
        <Header profile_image={profile_image} />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
