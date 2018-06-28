// Test StatisticsSection
import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import StatisticsSection from "../StatisticsSection";

describe("containers/task/StatisticsSection", () => {
  it("renders without crashing", () => {
    shallow(<StatisticsSection />);
  });

  it("renders statistics correctly", () => {
    const wrapper = mount(<StatisticsSection />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
