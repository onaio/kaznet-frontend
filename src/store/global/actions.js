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
