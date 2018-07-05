import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import { ClientsList } from "../ClientsList";
import * as fixtures from "../../../store/clients/tests/fixtures";

describe("containers/clients/ClientsList", () => {
  it("renders without crashing", () => {
    shallow(
      <ClientsList
        fetchClients={function() {}}
        changePageTitle={function() {}}
        changePageTitleButton={function() {}}
        changePageTarget={function() {}}
        showListTitle={function() {}}
      />
    );
  });

  it("renders client list correctly", () => {
    const wrapper = mount(
      <ClientsList
        fetchClients={function() {}}
        changePageTitle={function() {}}
        changePageTitleButton={function() {}}
        changePageTarget={function() {}}
        showListTitle={function() {}}
        rowsById={fixtures.clientsById}
        rowsIdArray={fixtures.clientsIdArray}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
