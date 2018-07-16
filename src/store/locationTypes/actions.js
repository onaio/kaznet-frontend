// locationType actions
import _ from "lodash";
import * as types from "./actionTypes";
import locationTypeService from "../../services/locationTypes";

// get list of locationTypes
export function fetchLocationTypes() {
  return async (dispatch, getState) => {
    try {
      const locationTypeArray = await locationTypeService.getLocationTypeList();
      const locationTypesById = _.keyBy(
        locationTypeArray,
        locationType => locationType.id
      );
      dispatch({ type: types.LOCATIONTYPES_FETCHED, locationTypesById });
    } catch (error) {
      console.error(error);
    }
  };
}
