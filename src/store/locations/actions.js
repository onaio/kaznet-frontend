import _ from "lodash";
import * as types from "./actionTypes";
import locationService from "../../services/locations";

export function fetchLocations(url) {
  return async (dispatch, getState) => {
    try {
      const {
        locationArray,
        pageLinks,
        currentPage,
        totalPages
      } = await locationService.getLocationList(url);
      const locationsById = _.keyBy(locationArray, location => location.id);

      dispatch({
        type: types.LOCATIONS_FETCHED,
        locationsById,
        pageLinks,
        totalPages,
        currentPage
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function changePageNumber(pageNumber) {
  return async (dispatch, getState) => {
    dispatch({ type: types.LOCATIONS_CHANGE_PAGE, pageNumber });
  };
}
