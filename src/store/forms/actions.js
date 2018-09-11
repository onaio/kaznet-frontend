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
      const selectOptions = formArray
        .filter(function(item) {
          return item.attributes.has_task === false;
        })
        .map(f => ({
          value: f.id,
          label: f.attributes.title
        }));
      dispatch({ type: types.FORMS_FETCHED, formsById, selectOptions });
    } catch (error) {
      console.error(error);
    }
  };
}
