// global actions
import * as types from './actionTypes';

export function changePageTitle(pageTitle) {
  return async (dispatch, getState) => {
    dispatch({ type: types.CHANGE_PAGETITLE, pageTitle });
  };
}

export function changePageTitleButton(pageTitleButton) {
  return async (dispatch, getState) => {
    dispatch({ type: types.CHANGE_PAGETITLE_BUTTON, pageTitleButton });
  };
}

export function changeDetailStatus(detailStatus) {
  return async (dispatch, getState) => {
    dispatch({ type: types.CHANGE_DETAIL_STATUS, detailStatus });
  };
}

export function setPageActionLinks(actionLinks) {
  return async (dispatch, getState) => {
    dispatch({ type: types.SET_ACTION_LINKS, actionLinks });
  };
}

export function changePageTarget(pageTarget) {
  return async (dispatch, getState) => {
    dispatch({ type: types.CHANGE_PAGE_TARGET, pageTarget });
  };
}

export function toggleDetailTitleOn(detailName) {
  return async (dispatch, getState) => {
    dispatch({ type: types.TOGGLE_DETAIL_TITLE_ON, detailName });
  };
}

export function toggleDetailTitleOff() {
  return async (dispatch, getState) => {
    dispatch({ type: types.TOGGLE_DETAIL_TITLE_OFF });
  };
}

export function toggleTitleOff() {
  return async (dispatch, getState) => {
    dispatch({ type: types.PAGE_TITLE_OFF });
  };
}

export function toggleTitleOn() {
  return async (dispatch, getState) => {
    dispatch({ type: types.PAGE_TITLE_ON });
  };
}

// get search value on task view
export function getSearchVal(searchVal) {
  return async (dispatch, getState) => {
    dispatch({ type: types.GLOBAL_SEARCH_VALUE, searchVal });
  };
}

export function getPageNumber(pageVal) {
  return async (dispatch, getState) => {
    dispatch({ type: types.GLOBAL_PAGE_NUMBER, pageVal });
  };
}
