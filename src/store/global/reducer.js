// Global reducer
import Immutable from "seamless-immutable";

import * as types from "./actionTypes";

const initialState = Immutable({
  pageTitle: "Kaznet",
  pageTitleButton: "Friendly Button",
  pageTarget: "/",
  noTitle: false,
  showDetail: false,
  detailName: null,
  actionLinks: []
});

export default function reduce(state = initialState, action = {}) {
  // return state;
  switch (action.type) {
    case types.CHANGE_PAGETITLE:
      return state.merge({
        pageTitle: action.pageTitle
      });
    case types.CHANGE_PAGETITLE_BUTTON:
      return state.merge({
        pageTitleButton: action.pageTitleButton
      });
    case types.CHANGE_PAGE_TARGET:
      return state.merge({
        pageTarget: action.pageTarget
      });
    case types.TOGGLE_DETAIL_TITLE_ON:
      return state.merge({
        noTitle: false,
        showDetail: true,
        detailName: action.detailName
      });
    case types.TOGGLE_DETAIL_TITLE_OFF:
      return state.merge({
        noTitle: false,
        showDetail: false
      });
    case types.PAGE_TITLE_OFF:
      return state.merge({
        noTitle: true
      });
    case types.PAGE_TITLE_ON:
      return state.merge({
        noTitle: false
      });
    case types.SET_ACTION_LINKS:
      return state.merge({
        actionLinks: action.actionLinks
      });
    default:
      return state;
  }
}

// selectors
export function getPageTitle(state) {
  return state.global.pageTitle;
}

export function getActionLinks(state) {
  return state.global.actionLinks;
}

export function getPageTitleButton(state) {
  return state.global.pageTitleButton;
}

export function getPageTarget(state) {
  return state.global.pageTarget;
}

export function getNoTitle(state) {
  return state.global.noTitle;
}

export function getShowDetail(state) {
  return state.global.showDetail;
}

export function getDetailName(state) {
  return state.global.detailName;
}
