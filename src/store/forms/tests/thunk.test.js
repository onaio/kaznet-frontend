import { Thunk } from "redux-testkit";

import formService from "../../../services/forms";
import * as fixtures from "./fixtures";
import * as forms from "../actions";
import * as actionTypes from "../actionTypes";
import { options } from "sw-toolbox";

jest.mock("../../../services/forms");

describe("store/forms/actions", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch forms from server", async () => {
    formService.getFormList.mockReturnValueOnce(fixtures.formsArray);
    const dispatches = await Thunk(forms.fetchForms).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.FORMS_FETCHED,
      formsById: fixtures.formsById,
      options: fixtures.getFormOptions,
      isLoading: false
    });
  });

  it("should fetch forms and print to console on error", async () => {
    formService.getFormList.mockImplementationOnce(() => {
      throw new Error("oops");
    });
    console.error = jest.fn();
    const dispatches = await Thunk(forms.fetchForms).execute();
    expect(dispatches.length).toBe(0);
    expect(console.error).toHaveBeenCalledWith(Error("oops"));
  });
});
