import locationTypeService from "../locationTypes";

import * as fixtures from "../../store/locationTypes/tests/fixtures";

global.fetch = require("jest-fetch-mock");

describe("services/locationTypes", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch locationTypes", async () => {
    const data = fixtures.locationTypeData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await locationTypeService.getLocationTypeList();
    expect(response).toEqual(fixtures.locationTypesArray);
  });

  it("should handle default locationTypes http errors", async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await locationTypeService.getLocationTypeList();
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(
      new Error(
        "LocationTypeService getLocationTypeList failed, HTTP status 500"
      )
    );
  });
});
