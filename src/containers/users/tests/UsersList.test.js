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
          changePageTitle={function() {}}
          changePageTitleButton={function() {}}
          showListTitle={function() {}}
          rowsById={fixtures.usersById}
          rowsIdArray={fixtures.usersIdArray}
          endpoint={"userprofiles"}
          pageLinks={fixtures.pageLinks}
          totalPages={fixtures.totalPages}
          currentPage={fixtures.currentPage}
          firstPage={fixtures.firstPage}
          lastPage={fixtures.lastPage}
        />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
