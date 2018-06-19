// Global reducer
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    pageTitle: 'Kaznet',
    pageTitleButton: 'Friendly Button',
});

export default function reduce(state = initialState, action = {}) {
    return state;
}

// selectors
export function getPageTitle(state) {
    return state.global.pageTitle;
}

export function getPageTitleButton(state) {
    return state.global.pageTitleButton;
}