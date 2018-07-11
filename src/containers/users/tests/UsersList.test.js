import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { Router } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";

import { UsersList } from "../UsersList";
import * as fixtures from "../../../store/users/tests/fixtures";
const history = createBrowserHistory();

describe("containers/users/UsersList", () => {
  it("renders without crashing", () => {
    shallow(
      <UsersList
        fetchUsers={function() {}}
        changePageNumber={function() {}}
        changePageTitle={function() {}}
        changePageTitleButton={function() {}}
        showListTitle={function() {}}
      />
    );
  });

  it("renders user list correctly", () => {
    const wrapper = mount(
      <Router history={history}>
        <UsersList
          fetchUsers={function() {}}
          changePageNumber={function() {}}
          changePageTitle={function() {}}
          changePageTitleButton={function() {}}
          showListTitle={function() {}}
          rowsById={fixtures.usersById}
          endpoint={"users"}
          rowsIdArray={fixtures.usersIdArray}
          pageLinks={fixtures.userData.links}
          currentPage={fixtures.userData.meta.pagination.page}
        />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
