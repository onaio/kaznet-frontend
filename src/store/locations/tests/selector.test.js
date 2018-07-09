import * as selectors from "../../selectors";
import * as fixtures from "./fixtures";

import Immutable from "seamless-immutable";
import { Selector } from "redux-testkit";

const emptyState = Immutable({
  locations: {
    locationsById: {},
    locationIdArray: []
  }
});

const fullState = Immutable({
  locations: {
    locationsById: fixtures.locationById,
    locationsIdArray: fixtures.locationIdArray
  }
});

describe("store/locations/selectors", () => {
  it("should get default locations by id when empty", () => {
    Selector(selectors.getLocationsById)
      .expect(emptyState)
      .toReturn({});
  });

  it("should get default locations id array when empty", () => {
    Selector(selectors.getLocationsIdArray)
      .expect(emptyState)
      .toReturn([]);
  });

  it("should get locations by id when full", () => {
    Selector(selectors.getLocationsById)
      .expect(fullState)
      .toReturn(fixtures.locationById);
  });

  it("should get locations ids array when full", () => {
    Selector(selectors.getLocationsIdArray)
      .expect(fullState)
      .toReturn(fixtures.locationIdArray);
  });
});
