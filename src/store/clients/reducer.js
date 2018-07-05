import _ from "lodash";
import Immutable from "seamless-immutable";

import * as types from "./actionTypes";

const initialState = Immutable({
  clientsById: {},
  clientsIdArray: []
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.CLIENTS_FETCHED:
      return state.merge({
        clientsById: action.clientsById
      });
    case types.CLIENT_CREATED:
      return Immutable({
        ...state,
        clientsById: {
          ...state.clientsById,
          [action.clientData.id]: action.clientData
        }
      });
    case types.CLIENT_EDITED:
      return Immutable({
        ...state,
        clientsById: {
          ...state.clientsById,
          [action.clientData.id]: action.clientData
        }
      });
    case types.CLIENT_FETCHED:
      return Immutable({
        ...state,
        clientsById: {
          ...state.clientsById,
          [action.clientData.id]: action.clientData
        }
      });
    default:
      return state;
  }
}

export function getClientsById(state) {
  return state.clients.clientsById;
}

export function getClientsIdArray(state) {
  return _.keys(state.clients.clientsById);
}

export function getClientById(state, id) {
  return _.get(state.clients.clientsById, id);
}
