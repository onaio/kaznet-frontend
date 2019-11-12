// Forms reducer
import _ from 'lodash';
import Immutable from 'seamless-immutable';
import qs from 'qs';

import * as types from './actionTypes';

const initialState = Immutable({
  formsById: {},
  formsIdArray: [],
  selectOptions: [],
  unusedForms: [],
  currentPage: 1,
  totalPages: 1,
  totalCount: null,
  hasTask: '',

  pageLinks: {
    first: null,
    last: null,
    prev: null,
    next: null
  }
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.FORMS_FETCHED:
      return state.merge({
        formsById: action.formsById,
        pageLinks: action.pageLinks,
        currentPage: action.currentPage,
        totalPages: action.totalPages,
        totalCount: action.totalCount,
        selectOptions: action.selectOptions
      });
    case types.FORM_CHANGE_PAGE:
      return state.merge({
        currentPage: action.pageNumber
      });
    case types.FORM_HAS_TASK:
      return Immutable({
        ...state,
        hasTask: action.hasTask
      });
    case types.FORM_FETCHED:
      return Immutable({
        ...state,
        formsById: {
          ...state.formsById,
          [action.formData.id]: action.formData
        }
      });
    default:
      return state;
  }
}

// selectors

export function getFormsById(state) {
  return state.forms.formsById;
}

export function getFormsIdArray(state) {
  return _.keys(state.forms.formsById);
}

export function getUnusedFormsById(state) {
  const forms = _.filter(state.forms.formsById, form => {
    return !form.attributes.has_task;
  });

  const formsById = _.keyBy(forms, form => {
    return form.id;
  });

  return formsById;
}

export function getFormById(state, id) {
  return _.get(state.forms.formsById, id);
}

export function getPageLinks(state) {
  return state.forms.pageLinks;
}

export function getCurrentPage(state) {
  return state.forms.currentPage;
}

export function getTotalPages(state) {
  return state.forms.totalPages;
}

export function getFirstPage(state) {
  const url = state.forms.pageLinks.first;
  return Number(Object.values(qs.parse(url && url.slice(1)))[0]);
}

export function getNextPage(state) {
  return state.forms.pageLinks.next;
}

export function getPreviousPage(state) {
  return state.forms.pageLinks.prev;
}

export function getLastPage(state) {
  const url = state.forms.pageLinks.last;
  return Number(Object.values(qs.parse(url && url.slice(1)))[0]);
}

export function getTotalCount(state) {
  return state.forms.totalCount;
}

export function getFormOptions(state) {
  return state.forms.selectOptions;
}

export function getHasTask(state) {
  return state.forms.hasTask;
}
