import _ from 'lodash';

import * as errorHandlerTypes from '../errorHandler/actionTypes';
import * as types from './actionTypes';

import locationService from '../../services/locations';

export function fetchLocations(url) {
  return async (dispatch, getState) => {
    try {
      const {
        locationArray,
        pageLinks,
        currentPage,
        totalPages,
        totalCount
      } = await locationService.getLocationList(url);
      const locationsById = _.keyBy(locationArray, location => location.id);
      const selectOptions = locationArray.map(l => ({
        value: l.id,
        label: l.attributes.name
      }));
      dispatch({
        type: types.LOCATIONS_FETCHED,
        locationsById,
        pageLinks,
        currentPage,
        totalPages,
        totalCount,
        selectOptions
      });
    } catch (error) {
      dispatch({
        type: errorHandlerTypes.REQUEST_FAILURE,
        errorMessage: error
      });
    }
  };
}

export function changePageNumber(pageNumber) {
  return async (dispatch, getState) => {
    dispatch({ type: types.LOCATION_CHANGE_PAGE, pageNumber });
  };
}

// create a new location
export function createLocation(location_data) {
  return async (dispatch, getState) => {
    try {
      const locationData = await locationService.createLocation(location_data);
      dispatch({
        type: errorHandlerTypes.REQUEST_SUCCESS
      });
      dispatch({
        type: types.LOCATION_CREATED,
        locationData
      });
    } catch (error) {
      dispatch({
        type: errorHandlerTypes.REQUEST_FAILURE,
        errorMessage: error
      });
    }
  };
}

// edits location
export function editLocation(location_data, id) {
  return async (dispatch, getState) => {
    try {
      const locationData = await locationService.editLocation(location_data, id);
      dispatch({
        type: errorHandlerTypes.REQUEST_SUCCESS
      });
      dispatch({
        type: types.LOCATION_EDITED,
        locationData
      });
    } catch (error) {
      dispatch({
        type: errorHandlerTypes.REQUEST_FAILURE,
        errorMessage: error
      });
    }
  };
}

// fetch a specific location
export function fetchLocation(id) {
  return async (dispatch, getState) => {
    try {
      const locationData = await locationService.getLocation(id);
      dispatch({
        type: errorHandlerTypes.REQUEST_SUCCESS
      });
      dispatch({
        type: types.LOCATION_FETCHED,
        locationData
      });
    } catch (error) {
      dispatch({
        type: errorHandlerTypes.REQUEST_FAILURE,
        errorMessage: error
      });
    }
  };
}

// delete location
export function deleteLocation(location_id) {
  return async (dispatch, getState) => {
    try {
      const locationId = await locationService.deleteLocation(location_id);
      dispatch({
        type: errorHandlerTypes.REQUEST_SUCCESS
      });
      dispatch({
        type: types.LOCATION_DELETED,
        locationId
      });
    } catch (error) {
      dispatch({
        type: errorHandlerTypes.REQUEST_FAILURE,
        errorMessage: 'Location has not been deleted'
      });
    }
  };
}
