// Test DetailView
import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import DetailView from "../DetailView";
import NestedElementMap from "../../containers/NestedElementMap";
import ErrorBoundary from "../ErrorBoundary";

describe("components/DetailView", () => {
  it("renders without crashing", () => {
    const renderMainDetails = function() {
      const detailItems = {
        Name: "Dave",
        Test: "Testing"
      };
      return <NestedElementMap detailitems={detailItems} HTMLTag="td" />;
    };

    const renderAdditionalDetails = function() {
      const detailItems = {
        Gender: "Male"
      };
      return <NestedElementMap detailitems={detailItems} HTMLTag="td" />;
    };

    shallow(
      <DetailView
        renderMainDetails={renderMainDetails}
        renderAdditionalDetails={renderAdditionalDetails}
      />
    );
  });

  it("renders a view", () => {
    const renderMainDetails = function() {
      const detailItems = {
        Name: "Dave",
        Test: "Testing"
      };
      return <NestedElementMap detailitems={detailItems} HTMLTag="td" />;
    };

    const renderAdditionalDetails = function() {
      const detailItems = {
        Gender: "Male"
      };
      return <NestedElementMap detailitems={detailItems} HTMLTag="td" />;
    };

    const wrapper = mount(
      <DetailView
        renderMainDetails={renderMainDetails()}
        renderAdditionalDetails={renderAdditionalDetails()}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
