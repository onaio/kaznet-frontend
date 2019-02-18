// locationType actions
import _ from 'lodash';

import * as types from './actionTypes';
import * as errorHandlerTypes from '../errorHandler/actionTypes';
import LocationTypeService from '../../services/locationTypes';

// get list of locationTypes
export function fetchLocationTypes(url) {
  return async (dispatch, getState) => {
    try {
      const {
        locationTypeArray,
        pageLinks,
        currentPage,
        totalPages,
        totalCount
      } = await LocationTypeService.getLocationTypeList(url);
      const locationTypesById = _.keyBy(locationTypeArray, locationType => locationType.id);
      const selectOptions = locationTypeArray.map(d => ({
        value: d.id,
        label: d.attributes.name
      }));
      dispatch({
        type: types.LOCATIONTYPES_FETCHED,
        locationTypesById,
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
    dispatch({ type: types.LOCATIONTYPES_CHANGE_PAGE, pageNumber });
  };
}

// create a new locationType
export function createLocationType(locationType_data) {
  return async (dispatch, getState) => {
    try {
      const locationTypeData = await LocationTypeService.createLocationType(locationType_data);
      dispatch({
        type: errorHandlerTypes.REQUEST_SUCCESS
      });
      dispatch({
        type: types.LOCATIONTYPE_CREATED,
        locationTypeData
      });
    } catch (error) {
      dispatch({
        type: errorHandlerTypes.REQUEST_FAILURE,
        errorMessage: error
      });
    }
  };
}

// edits locationType
export function editLocationType(locationType_data, id) {
  return async (dispatch, getState) => {
    try {
      const locationTypeData = await LocationTypeService.editLocationType(locationType_data, id);
      dispatch({
        type: errorHandlerTypes.REQUEST_SUCCESS
      });
      dispatch({
        type: types.LOCATIONTYPE_EDITED,
        locationTypeData
      });
    } catch (error) {
      dispatch({
        type: errorHandlerTypes.REQUEST_FAILURE,
        errorMessage: error
      });
    }
  };
}

// fetch a specific locationType
export function fetchLocationType(id) {
  return async (dispatch, getState) => {
    try {
      const locationTypeData = await LocationTypeService.getLocationType(id);
      dispatch({
        type: errorHandlerTypes.REQUEST_SUCCESS
      });
      dispatch({
        type: types.LOCATIONTYPE_FETCHED,
        locationTypeData
      });
    } catch (error) {
      dispatch({
        type: errorHandlerTypes.REQUEST_FAILURE,
        errorMessage: error
      });
    }
  };
}

// delete locationType
export function deleteLocationType(locationType_id) {
  return async (dispatch, getState) => {
    try {
      const locationTypeId = await LocationTypeService.deleteLocationType(locationType_id);
      dispatch({
        type: errorHandlerTypes.REQUEST_SUCCESS
      });
      dispatch({
        type: types.LOCATIONTYPE_DELETED,
        locationTypeId
      });
    } catch (error) {
      dispatch({
        type: errorHandlerTypes.REQUEST_FAILURE,
        errorMessage: 'Location type was not deleted'
      });
    }
  };
}
