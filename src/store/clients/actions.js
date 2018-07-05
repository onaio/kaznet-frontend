import _ from "lodash";
import * as types from "./actionTypes";
import * as errorHandlerTypes from "../errorHandler/actionTypes";
import clientService from "../../services/clients";

export function fetchClients() {
  // Enables other modules to use/call this function its kind of like a private / public thing

  return async (dispatch, getState) => {
    try {
      const clientArray = await clientService.getClientList(); // reason we are using async
      const clientsById = _.keyBy(clientArray, task => task.id); // Sorts the items ???
      dispatch({ type: types.CLIENTS_FETCHED, clientsById }); // Returns an object for the action which is {}
    } catch (error) {
      // Kind of like a try and except
      console.error(error); // logs the error on the console
    }
  };
}

export function createClient(client_data) {
  return async (dispatch, getState) => {
    try {
      const clientData = await clientService.createClient(client_data);
      dispatch({ type: types.CLIENT_CREATED, clientData });
      dispatch({ type: errorHandlerTypes.REQUEST_SUCCESS });
    } catch (error) {
      dispatch({
        type: errorHandlerTypes.REQUEST_FAILURE,
        errorMessage: error
      });
    }
  };
}
