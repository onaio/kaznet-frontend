// Test ListView
import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { Router } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";

import ErrorBoundary from "../ErrorBoundary";
import ElementMap from "../../containers/ElementMap";
import ListView from "../ListView";
const history = createBrowserHistory();

describe("components/ListView", () => {
  it("renders without crashing", () => {
    const rowsById = { "0": "Bob", "1": "Jane" };
    const rowsIdArray = ["0", "1"];

    const currentPage = 1;
    const totalPages = 2;
    const pageLinks = {
      first: null,
      last: null,
      prev: null,
      next: null
    };

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
        pageLinks={pageLinks}
        currentPage={currentPage}
        totalPages={totalPages}
        renderRow={renderRow}
      />
    );
  });

  it("renders a table", () => {
    const rowsById = { "0": "Bob", "1": "Jane" };
    const rowsIdArray = ["0", "1"];
    const currentPage = 1;
    const totalPages = 2;
    const pageLinks = {
      first: null,
      last: null,
      prev: null,
      next: null
    };

    const renderHeader = function() {
      const headerItems = ["Name"];
      return <ElementMap items={headerItems} HTMLTag="th" />;
    };

    const renderRow = function(row) {
      const rowItems = [row];
      return <ElementMap items={rowItems} HTMLTag="td" />;
    };

    const wrapper = mount(
      <Router history={history}>
        <ListView
          renderHeaders={renderHeader}
          rowsIdArray={rowsIdArray}
          rowsById={rowsById}
          renderRow={renderRow}
          pageLinks={pageLinks}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </Router>
    );

    expect(toJson(wrapper)).toMatchSnapshot();

    wrapper.unmount();
  });
});
