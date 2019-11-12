// form actions
import _ from 'lodash';
import * as types from './actionTypes';
import formService from '../../services/forms';

// get list of forms
export function fetchForms(url) {
  return async dispatch => {
    try {
      const {
        formArray,
        pageLinks,
        currentPage,
        totalPages,
        totalCount
      } = await formService.getFormList(url);

      const formsById = _.keyBy(formArray, form => form.id);
      const selectOptions = formArray
        .filter(function(item) {
          return item.attributes.has_task === false;
        })
        .map(f => ({
          value: f.id,
          label: f.attributes.title
        }));
      dispatch({
        type: types.FORMS_FETCHED,
        formsById,
        pageLinks,
        currentPage,
        totalPages,
        totalCount,
        selectOptions
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function changePageNumber(pageNumber) {
  return async dispatch => {
    dispatch({
      type: types.FORM_CHANGE_PAGE,
      pageNumber
    });
  };
}

export function getHasTask(hasTask) {
  return async dispatch => {
    dispatch({
      type: types.FORM_HAS_TASK,
      hasTask
    });
  };
}

export function fetchForm(id) {
  return async dispatch => {
    try {
      const formData = await formService.getForm(id);
      dispatch({ type: types.FORM_FETCHED, formData });
    } catch (error) {
      console.error(error);
    }
  };
}
