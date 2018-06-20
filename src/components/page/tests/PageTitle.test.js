// test PageTitle
import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import PageTitle from "../PageTitle";

describe("components/page/PageTitle", () => {
  it("renders without crashing", () => {
    shallow(<PageTitle />);
  });

  it("renders header correctly", () => {
    const wrapper = mount(
      <PageTitle pageTitle={"Kaznet"} pageTitleButton={"Big Red Button"} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
