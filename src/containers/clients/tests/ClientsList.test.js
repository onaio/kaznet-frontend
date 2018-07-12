import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { Router } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";

import { ClientsList } from "../ClientsList";
import * as fixtures from "../../../store/clients/tests/fixtures";
const history = createBrowserHistory();

describe("containers/clients/ClientsList", () => {
  it("renders without crashing", () => {
    shallow(
      <ClientsList
        fetchClients={function() {}}
        changePageTitle={function() {}}
        changePageTitleButton={function() {}}
        changePageTarget={function() {}}
        changePageNumber={function() {}}
        showListTitle={function() {}}
      />
    );
  });

  it("renders client list correctly", () => {
    const wrapper = mount(
      <Router history={history}>
        <ClientsList
          fetchClients={function() {}}
          changePageTitle={function() {}}
          changePageTitleButton={function() {}}
          changePageTarget={function() {}}
          changePageNumber={function() {}}
          showListTitle={function() {}}
          rowsById={fixtures.clientsById}
          endpoint={"clients"}
          rowsIdArray={fixtures.clientsIdArray}
          pageLinks={fixtures.clientData.links}
          totalPages={fixtures.totalPages}
          currentPage={fixtures.clientData.meta.pagination.page}
        />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
