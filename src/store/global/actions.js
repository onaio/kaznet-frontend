// global actions
import * as types from "./actionTypes";

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
