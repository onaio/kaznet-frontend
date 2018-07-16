import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import { LocationsList } from "../LocationsList";
import * as fixtures from "../../../store/locations/tests/fixtures";

describe("containers/locations/LocationList", () => {
  it("renders without crashing", () => {
    shallow(
      <LocationsList
        fetchLocations={function() {}}
        changePageTitle={function() {}}
        changePageTarget={function() {}}
        changePageTitleButton={function() {}}
        showListTitle={function() {}}
      />
    );
  });

  it("renders location list correctly", () => {
    const wrapper = mount(
      <LocationsList
        fetchLocations={function() {}}
        changePageTitle={function() {}}
        changePageTarget={function() {}}
        changePageTitleButton={function() {}}
        showListTitle={function() {}}
        rowsById={fixtures.locationById}
        rowsIdArray={fixtures.locationIdArray}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
