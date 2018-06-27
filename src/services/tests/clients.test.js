import ClientService from "../clients";

import * as fixtures from "../../store/clients/tests/fixtures";

global.fetch = require("jest-fetch-mock");

describe("services/clients", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch clients", async () => {
    const data = fixtures.clientData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await ClientService.getClientList();
    expect(response).toEqual(fixtures.clientsArray);
  });

  it("should handle default clients http errors", async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await ClientService.getClientList();
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(
      new Error("ClientService getClientList failed, HTTP status 500")
    );
  });
});
