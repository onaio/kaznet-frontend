import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { Router } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";
import moment from "moment-timezone";

import { FormsList } from "../FormsList";
import * as fixtures from "../../../store/forms/tests/fixtures";

const history = createBrowserHistory();

describe("containers/forms/FormsList", () => {
  it("renders without crashing", () => {
    shallow(
      <FormsList
        fetchForms={function() {}}
        getHasTask={function() {}}
        changePageTitle={function() {}}
        changePageTitleButton={function() {}}
        changePageTarget={function() {}}
        showListTitle={function() {}}
        changePageNumber={function() {}}
        location={history.location}
        searchVal={function() {}}
        rowsIdArray={fixtures.formsIdArray}
      />
    );
  });

  it("renders form list correctly", () => {
    moment.tz.setDefault("UTC");
    const wrapper = mount(
      <Router history={history}>
        <FormsList
          fetchForms={function() {}}
          getHasTask={function() {}}
          changePageTitle={function() {}}
          changePageTitleButton={function() {}}
          changePageTarget={function() {}}
          showListTitle={function() {}}
          rowsById={fixtures.formsById}
          rowsIdArray={fixtures.formsIdArray}
          endpoint={"forms"}
          pageLinks={fixtures.pageLinks}
          totalPages={fixtures.totalPages}
          currentPage={fixtures.currentPage}
          firstPage={fixtures.firstPage}
          changePageNumber={function() {}}
          lastPage={fixtures.lastPage}
          searchVal={function() {}}
          searchParam={fixtures.searchParam}
          hasTask={undefined}
          location={history.location}
        />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it("renders form list correctly when there is a has_task filter", () => {
    moment.tz.setDefault("UTC");
    const wrapper = mount(
      <Router history={history}>
        <FormsList
          fetchForms={function() {}}
          getHasTask={function() {}}
          changePageTitle={function() {}}
          changePageTitleButton={function() {}}
          changePageTarget={function() {}}
          showListTitle={function() {}}
          rowsById={fixtures.formsById}
          rowsIdArray={fixtures.formsIdArray}
          endpoint={"forms"}
          pageLinks={fixtures.pageLinks}
          totalPages={fixtures.totalPages}
          currentPage={fixtures.currentPage}
          firstPage={fixtures.firstPage}
          changePageNumber={function() {}}
          lastPage={fixtures.lastPage}
          searchVal={function() {}}
          searchParam={fixtures.searchParam}
          hasTask={true}
          location={history.location}
        />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
