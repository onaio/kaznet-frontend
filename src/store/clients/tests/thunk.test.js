import { Thunk } from "redux-testkit";

import ClientService from "../../../services/clients";
import * as fixtures from "./fixtures";
import * as clients from "../actions";
import * as actionTypes from "../actionTypes";
import * as errorHandlerTypes from "../../errorHandler/actionTypes";
import { endOfTomorrow } from "date-fns";

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

  it("should create client", async () => {
    ClientService.createClient.mockReturnValueOnce(fixtures.singleClient);
    const dispatches = await Thunk(clients.createClient).execute(1);
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.CLIENT_CREATED,
      clientData: fixtures.singleClient
    });
    expect(dispatches[1].isPlainObject()).toBe(true);
    expect(dispatches[1].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_SUCCESS
    });
  });

  it("should create client and dispatch on error", async () => {
    ClientService.createClient.mockImplementationOnce(() => {
      throw new Error("Wow!");
    });
    const dispatches = await Thunk(clients.createClient).execute(1);
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_FAILURE,
      errorMessage: Error("Wow!")
    });
  });

  it("should edit client", async () => {
    ClientService.editClient.mockReturnValueOnce(fixtures.singleClient);
    const dispatches = await Thunk(clients.editClient).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_SUCCESS
    });
    expect(dispatches[1].isPlainObject()).toBe(true);
    expect(dispatches[1].getAction()).toEqual({
      type: actionTypes.CLIENT_EDITED,
      clientData: fixtures.singleClient
    });
  });

  it("should edit client and dispatch on error", async () => {
    ClientService.editClient.mockImplementationOnce(() => {
      throw new Error("Wow!");
    });
    const dispatches = await Thunk(clients.editClient).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_FAILURE,
      errorMessage: Error("Wow!")
    });
  });

  it("should get client", async () => {
    ClientService.getClient.mockReturnValueOnce(fixtures.singleClient);
    const dispatches = await Thunk(clients.getClient).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_SUCCESS
    });
    expect(dispatches[1].isPlainObject()).toBe(true);
    expect(dispatches[1].getAction()).toEqual({
      type: actionTypes.CLIENT_FETCHED,
      clientData: fixtures.singleClient
    });
  });

  it("should get client and dispatch on error", async () => {
    ClientService.getClient.mockImplementationOnce(() => {
      throw new Error("Wow!");
    });
    const dispatches = await Thunk(clients.getClient).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_FAILURE,
      errorMessage: Error("Wow!")
    });
  });
});
