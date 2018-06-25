import formService from "../forms";

import * as fixtures from "../../store/forms/tests/fixtures";

global.fetch = require("jest-fetch-mock");

describe("services/forms", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch forms", async () => {
    const data = fixtures.formData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await formService.getFormList();
    expect(response).toEqual(fixtures.formsArray);
  });

  it("should handle default forms http errors", async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await formService.getFormList();
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(
      new Error("FormService getFormList failed, HTTP status 500")
    );
  });
});
