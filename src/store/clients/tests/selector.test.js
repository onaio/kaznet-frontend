import Immutable from "seamless-immutable";
import { Selector } from "redux-testkit";

import * as fixtures from "./fixtures";
import * as selectors from "../../selectors";

const emptyState = Immutable({
  clients: {
    clientsById: {},
    clientsIdArray: []
  }
});

const fullState = Immutable({
  clients: {
    clientsById: fixtures.clientsById,
    clientsIdArray: fixtures.clientsIdArray
  }
});

describe("store/clients/selectors", () => {
  it("should get default clients by id when empty", () => {
    Selector(selectors.getClientsById)
      .expect(emptyState)
      .toReturn({});
  });

  it("should get default clients ids array when empty", () => {
    Selector(selectors.getClientsIdArray)
      .expect(emptyState)
      .toReturn([]);
  });

  it("should get clients by id when full", () => {
    Selector(selectors.getClientsById)
      .expect(fullState)
      .toReturn(fixtures.clientsById);
  });

  it("should get clients ids array when full", () => {
    Selector(selectors.getClientsIdArray)
      .expect(fullState)
      .toReturn(fixtures.clientsIdArray);
  });

  it("should get client by id when full", () => {
    Selector(clients.getClientById)
      .expect(fullState, 1)
      .toReturn(fixtures.clientById);
  });
});
