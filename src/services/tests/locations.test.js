import LocationService from "../locations";

import * as fixtures from "../../store/locations/tests/fixtures";

global.fetch = require("jest-fetch-mock");

describe("services/locations", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch locations", async () => {
    const data = fixtures.locationData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await LocationService.getLocationList();
    expect(response).toEqual(fixtures.locationArray);
  });

  it("should handle default locations http errors", async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await LocationService.getLocationList();
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(
      new Error("LocationService getLocationList failed, HTTP status 500")
    );
  });
});
