// Global reducer
import Immutable from 'seamless-immutable';

import * as types from './actionTypes';

const initialState = Immutable({
    pageTitle: 'Kaznet',
    pageTitleButton: 'Friendly Button'
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
        default:
          return state;
    }
}

// selectors
export function getPageTitle(state) {
    return state.global.pageTitle;
}

export function getPageTitleButton(state) {
    return state.global.pageTitleButton;
}