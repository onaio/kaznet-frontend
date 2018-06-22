import _ from "lodash";
import Immutable from "seamless-immutable";
import { Reducer } from "redux-testkit";

import clients from "../reducer";
import * as actionTypes from "../actionTypes";
import * as fixtures from "./fixtures";

const initialState = {
  clientsById: {},
  clientsIdArray: []
};

describe("store/clients/reducer", () => {
  it("should have initial state", () => {
    expect(clients()).toEqual(initialState);
  });

  it("should store fetched clients", () => {
    const clientsById = fixtures.clientsById;
    const action = { type: actionTypes.CLIENTS_FETCHED, clientsById };

    const existingState = Immutable(initialState);
    const newState = _.clone(existingState);
    newState.clientsById = clientsById;

    Reducer(clients)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });
});