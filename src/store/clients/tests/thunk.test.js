import { Thunk } from "redux-testkit";

import ClientService from "../../../services/clients";
import * as fixtures from "./fixtures";
import * as clients from "../actions";
import * as actionTypes from "../actionTypes";

jest.mock("../../../services/clients");

describe("store/clients/actions", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch clients from server", async () => {
    ClientService.getClientList.mockReturnValueOnce(fixtures.clientsArray);
    const dispatches = await Thunk(clients.fetchClients).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.CLIENTS_FETCHED,
      clientsById: fixtures.clientsById
    });
  });

  it("should fetch clients and print to console on error", async () => {
    ClientService.getClientList.mockImplementationOnce(() => {
      throw new Error("oops");
    });
    console.error = jest.fn();
    const dispatches = await Thunk(clients.fetchClients).execute();
    expect(dispatches.length).toBe(0);
    expect(console.error).toHaveBeenCalledWith(Error("oops"));
  });
});
