// Global reducer
import Immutable from 'seamless-immutable';

import * as types from './actionTypes';

const initialState = Immutable({
  pageTitle: 'Kaznet',
  pageTitleButton: 'Friendly Button',
  pageTarget: '/',
  noTitle: false,
  showDetail: false,
  detailName: null,
  actionLinks: [],
  detailStatus: null,
  searchVal: '',
  pageVal: 1
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
    case types.CHANGE_DETAIL_STATUS:
      return state.merge({
        detailStatus: action.detailStatus
      });
    case types.GLOBAL_SEARCH_VALUE:
      return state.merge({
        searchVal: action.searchVal
      });
    case types.GLOBAL_PAGE_NUMBER:
      return state.merge({
        pageVal: action.pageVal
      });
    default:
      return state;
  }
}

// selectors
export function getPageTitle(state) {
  return state.global.pageTitle;
}
export function getSearchValue(state) {
  return state.global.searchVal;
}
export function getPageNum(state) {
  return state.global.pageVal;
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

export function getDetailStatus(state) {
  return state.global.detailStatus;
}

export function getShowDetail(state) {
  return state.global.showDetail;
}

export function getDetailName(state) {
  return state.global.detailName;
}
