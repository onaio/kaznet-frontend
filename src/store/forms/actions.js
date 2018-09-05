// form actions
import _ from "lodash";
import * as types from "./actionTypes";
import formService from "../../services/forms";

// get list of forms
export function fetchForms(url) {
  return async (dispatch, getState) => {
    try {
      const formArray = await formService.getFormList(url);
      const formsById = _.keyBy(formArray, form => form.id);
      const options = formArray.map(d => d.attributes.title);
      dispatch({
        type: types.FORMS_FETCHED,
        isLoading: false,
        formsById,
        options
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function formSelectedOption(selectedOption) {
  return async (dispatch, getState) => {
    dispatch({
      type: types.FORM_SELECTED_OPTION,
      selectedOption
    });
  };
}

export function formName(formName) {
  return async (dispatch, getState) => {
    dispatch({ type: types.FORM_NAME, formName });
  };
}
