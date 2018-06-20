// Test TitleSection
import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import { TitleSection } from "../TitleSection";

describe("containers/global/TitleSection", () => {
  it("renders without crashing", () => {
    shallow(<TitleSection />).dive();
  });

  it("renders title section correctly", () => {
    const wrapper = mount(<TitleSection />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
