import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import { UsersList } from "../UsersList";
import * as fixtures from "../../../store/users/tests/fixtures";

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
      <UsersList
        fetchUsers={function() {}}
        changePageTitle={function() {}}
        changePageTitleButton={function() {}}
        showListTitle={function() {}}
        rowsById={fixtures.usersById}
        rowsIdArray={fixtures.usersIdArray}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
