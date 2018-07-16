import { Thunk } from "redux-testkit";

import locationTypeService from "../../../services/locationTypes";
import * as fixtures from "./fixtures";
import * as locationTypes from "../actions";
import * as actionTypes from "../actionTypes";

jest.mock("../../../services/locationTypes");

describe("store/locationTypes/actions", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch locationTypes from server", async () => {
    locationTypeService.getLocationTypeList.mockReturnValueOnce(
      fixtures.locationTypesArray
    );
    const dispatches = await Thunk(locationTypes.fetchLocationTypes).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.LOCATIONTYPES_FETCHED,
      locationTypesById: fixtures.locationTypesById
    });
  });

  it("should fetch locationTypes and print to console on error", async () => {
    locationTypeService.getLocationTypeList.mockImplementationOnce(() => {
      throw new Error("oops");
    });
    console.error = jest.fn();
    const dispatches = await Thunk(locationTypes.fetchLocationTypes).execute();
    expect(dispatches.length).toBe(0);
    expect(console.error).toHaveBeenCalledWith(Error("oops"));
  });
});
