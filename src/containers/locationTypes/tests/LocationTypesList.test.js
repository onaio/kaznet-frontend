import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import { LocationTypesList } from "../LocationTypesList";
import * as fixtures from "../../../store/locationTypes/tests/fixtures";

describe("containers/LocationTypesLists/LocationTypesList", () => {
  it("renders without crashing", () => {
    shallow(
      <LocationTypesList
        fetchLocationTypes={function() {}}
        changePageTitle={function() {}}
        changePageTarget={function() {}}
        changePageTitleButton={function() {}}
        showListTitle={function() {}}
      />
    );
  });

  it("renders LocationTypesList list correctly", () => {
    const wrapper = mount(
      <LocationTypesList
        fetchLocationTypes={function() {}}
        changePageTitle={function() {}}
        changePageTarget={function() {}}
        changePageTitleButton={function() {}}
        showListTitle={function() {}}
        rowsById={fixtures.LocationTypesListById}
        rowsIdArray={fixtures.LocationTypesListIdArray}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
