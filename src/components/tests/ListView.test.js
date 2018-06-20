// Test ListView
import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import ErrorBoundary from "../ErrorBoundary";
import ElementMap from "../../containers/ElementMap";
import ListView from "../ListView";

describe("components/ListView", () => {
  it("renders without crashing", () => {
    const rowsById = { "0": "Bob", "1": "Jane" };
    const rowsIdArray = ["0", "1"];

    const renderHeader = function() {
      const headerItems = ["Name"];
      return <ElementMap items={headerItems} HTMLTag="th" />;
    };

    const renderRow = function(row) {
      const rowItems = [row];
      return <ElementMap items={rowItems} HTMLTag="td" />;
    };

    shallow(
      <ListView
        renderHeaders={renderHeader}
        rowsIdArray={rowsIdArray}
        rowsById={rowsById}
        renderRow={renderRow}
      />
    );
  });

  it("renders a table", () => {
    const rowsById = { "0": "Bob", "1": "Jane" };
    const rowsIdArray = ["0", "1"];

    const renderHeader = function() {
      const headerItems = ["Name"];
      return <ElementMap items={headerItems} HTMLTag="th" />;
    };

    const renderRow = function(row) {
      const rowItems = [row];
      return <ElementMap items={rowItems} HTMLTag="td" />;
    };

    const wrapper = mount(
      <ErrorBoundary>
        <ListView
          renderHeaders={renderHeader}
          rowsIdArray={rowsIdArray}
          rowsById={rowsById}
          renderRow={renderRow}
        />
      </ErrorBoundary>
    );

    expect(toJson(wrapper)).toMatchSnapshot();

    wrapper.unmount();
  });
});
