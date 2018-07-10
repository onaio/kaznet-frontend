import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { Router } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";

import { LocationsList } from "../LocationsList";
import * as fixtures from "../../../store/locations/tests/fixtures";
const history = createBrowserHistory();

describe("containers/locations/LocationList", () => {
  it("renders without crashing", () => {
    shallow(
      <LocationsList
        fetchLocations={function() {}}
        changePageTitle={function() {}}
        changePageTitleButton={function() {}}
        showListTitle={function() {}}
      />
    );
  });

  it("renders location list correctly", () => {
    const wrapper = mount(
      <Router history={history}>
        <LocationsList
          fetchLocations={function() {}}
          changePageTitle={function() {}}
          changePageTitleButton={function() {}}
          showListTitle={function() {}}
          rowsById={fixtures.locationById}
          rowsIdArray={fixtures.locationIdArray}
          pageLinks={fixtures.locationData.links}
          currentPage={fixtures.locationData.meta.pagination.page}
        />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
