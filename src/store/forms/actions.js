// form actions
import _ from "lodash";
import * as types from "./actionTypes";
import formService from "../../services/forms";

// get list of forms
export function fetchForms() {
  return async (dispatch, getState) => {
    try {
      const formArray = await formService.getFormList();
      const formsById = _.keyBy(formArray, form => form.id);
      dispatch({ type: types.FORMS_FETCHED, formsById });
    } catch (error) {
      console.error(error);
    }
  };
}
