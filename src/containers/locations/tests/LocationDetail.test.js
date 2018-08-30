// Test LocationDetail
import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { Router } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";

import { LocationDetail } from "../LocationDetail";
import * as fixtures from "../../../store/tasks/tests/fixtures";

const history = createBrowserHistory();

describe("containers/location/LocationDetail", () => {
  it("renders without crashing", () => {
    shallow(
      <LocationDetail
        match={{
          params: {
            id: "1"
          }
        }}
        fetchLocation={function() {}}
        locationById={fixtures.locationById}
        noTitle={function() {}}
      />
    );
  });

  it("renders detail list correctly", () => {
    const wrapper = mount(
      <Router history={history}>
        <LocationDetail
          match={{
            params: {
              id: "1"
            }
          }}
          fetchLocation={function() {}}
          noTitle={function() {}}
          locationById={fixtures.locationById}
        />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
