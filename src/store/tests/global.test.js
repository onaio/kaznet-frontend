// global store Integration tests
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import * as globalAction from '../global/actions';
import * as globalSelectors from '../global/reducer';

describe('store/global', () => {
  let store;

  beforeEach(() => {
    store = createStore(combineReducers(reducers), applyMiddleware(thunk));
  });

  it('should set page title and parge target and page title button', async () => {
    store.dispatch(globalAction.changePageTitle);
    expect(globalSelectors.getPageTitle(store.getState())).toEqual('Kaznet');

    store.dispatch(globalAction.changePageTitleButton);
    expect(globalSelectors.getPageTitleButton(store.getState())).toEqual('Friendly Button');

    store.dispatch(globalAction.changePageTitle('Title'));
    expect(globalSelectors.getPageTitle(store.getState())).toEqual('Title');

    store.dispatch(globalAction.changePageTitleButton('Button'));
    expect(globalSelectors.getPageTitleButton(store.getState())).toEqual('Button');

    store.dispatch(globalAction.changePageTarget('/zerg'));
    expect(globalSelectors.getPageTarget(store.getState())).toEqual('/zerg');

    store.dispatch(globalAction.changePageTarget('/pool'));
    expect(globalSelectors.getPageTarget(store.getState())).toEqual('/pool');
  });
});
