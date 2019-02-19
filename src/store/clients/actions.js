import _ from 'lodash';
import * as types from './actionTypes';
import * as errorHandlerTypes from '../errorHandler/actionTypes';
import clientService from '../../services/clients';

export function fetchClients(url) {
  // Enables other modules to use/call this function its kind of like a private / public thing

  return async (dispatch, getState) => {
    try {
      const {
        clientArray,
        pageLinks,
        currentPage,
        totalPages,
        totalCount
      } = await clientService.getClientList(url); // reason we are using async
      const clientsById = _.keyBy(clientArray, client => client.id); // Sorts the items ???
      const selectOptions = clientArray.map(c => ({
        value: c.id,
        label: c.attributes.name
      }));
      dispatch({
        type: types.CLIENTS_FETCHED,
        clientsById,
        pageLinks,
        currentPage,
        totalPages,
        totalCount,
        selectOptions
      }); // Returns an object for the action which is {}
    } catch (error) {
      // Kind of like a try and except
      console.error(error); // logs the error on the console
    }
  };
}

export function changePageNumber(pageNumber) {
  return async (dispatch, getState) => {
    dispatch({ type: types.CLIENT_CHANGE_PAGE, pageNumber });
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

export function editClient(client_data, client_id) {
  return async (dispatch, getState) => {
    try {
      const clientData = await clientService.editClient(client_data, client_id);
      dispatch({ type: errorHandlerTypes.REQUEST_SUCCESS });
      dispatch({ type: types.CLIENT_EDITED, clientData });
    } catch (error) {
      dispatch({
        type: errorHandlerTypes.REQUEST_FAILURE,
        errorMessage: error
      });
    }
  };
}

export function getClient(client_id) {
  return async (dispatch, getState) => {
    try {
      const clientData = await clientService.getClient(client_id);
      dispatch({ type: errorHandlerTypes.REQUEST_SUCCESS });
      dispatch({ type: types.CLIENT_FETCHED, clientData });
    } catch (error) {
      dispatch({
        type: errorHandlerTypes.REQUEST_FAILURE,
        errorMessage: error
      });
    }
  };
}

// delete client
export function deleteClient(client_id) {
  return async (dispatch, getState) => {
    try {
      const clientId = await clientService.deleteClient(client_id);
      dispatch({
        type: errorHandlerTypes.REQUEST_SUCCESS
      });
      dispatch({
        type: types.CLIENT_DELETED,
        clientId
      });
    } catch (error) {
      dispatch({
        type: errorHandlerTypes.REQUEST_FAILURE,
        errorMessage: 'Client has not been deleted'
      });
    }
  };
}
