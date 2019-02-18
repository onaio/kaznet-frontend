// global reducer tests
import _ from 'lodash';
import Immutable from 'seamless-immutable';
import { Reducer } from 'redux-testkit';

import global from '../reducer';
import * as actionTypes from '../actionTypes';

const initialState = {
  pageTitle: 'Kaznet',
  pageTitleButton: 'Friendly Button',
  pageTarget: '/',
  noTitle: false,
  showDetail: false,
  detailName: null,
  detailStatus: null,
  actionLinks: [],
  searchVal: '',
  pageVal: 1
};

describe('store/global/reducer', () => {
  it('should have initial state', () => {
    expect(global()).toEqual(initialState);
  });

  it('should not affect state', () => {
    Reducer(global)
      .expect({ type: 'NOT_EXISTING' })
      .toReturnState(initialState);
  });

  it('should change page title', () => {
    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    const pageTitle = 'A New Hope';
    const action = { type: actionTypes.CHANGE_PAGETITLE, pageTitle };
    newState.pageTitle = pageTitle;
    Reducer(global)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });
  it('should change search value', () => {
    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    const searchVal = 'hello';
    const action = { type: actionTypes.GLOBAL_SEARCH_VALUE, searchVal };
    newState.searchVal = searchVal;
    Reducer(global)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });
  it('should change pageVal', () => {
    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    const pageVal = 2;
    const action = { type: actionTypes.GLOBAL_PAGE_NUMBER, pageVal };
    newState.pageVal = pageVal;
    Reducer(global)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });
  it('should change page button title', () => {
    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    const pageTitleButton = 'Kill Bill';
    const action = {
      type: actionTypes.CHANGE_PAGETITLE_BUTTON,
      pageTitleButton
    };
    newState.pageTitleButton = pageTitleButton;
    Reducer(global)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });

  it('should change page target', () => {
    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    const pageTarget = '/tasks/new';
    const action = { type: actionTypes.CHANGE_PAGE_TARGET, pageTarget };
    newState.pageTarget = pageTarget;
    Reducer(global)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });

  it('should toggle noTitle and showDetail and Set detailName', () => {
    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    const detailName = 'Detail !!!';
    const action = { type: actionTypes.TOGGLE_DETAIL_TITLE_ON, detailName };
    newState.detailName = detailName;
    newState.noTitle = false;
    newState.showDetail = true;
    Reducer(global)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });

  it('should toggle noTitle and showDetail', () => {
    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    const action = { type: actionTypes.TOGGLE_DETAIL_TITLE_OFF };
    newState.noTitle = false;
    newState.showDetail = false;
    Reducer(global)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });

  it('should toggle noTitle', () => {
    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    const action = { type: actionTypes.PAGE_TITLE_OFF };
    newState.noTitle = true;
    Reducer(global)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);

    const existingState2 = Immutable(newState);
    const newState2 = _.clone(existingState2);
    newState2.noTitle = false;
    const action2 = { type: actionTypes.PAGE_TITLE_ON };
    Reducer(global)
      .withState(existingState2)
      .expect(action2)
      .toReturnState(newState2);
  });

  it('should set action links', () => {
    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    const actionLinks = ['Hey', 'Bye'];
    const action = { type: actionTypes.SET_ACTION_LINKS, actionLinks };
    newState.actionLinks = actionLinks;
    Reducer(global)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });

  it('should change detail Status', () => {
    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    const detailStatus = 'Active';
    const action = { type: actionTypes.CHANGE_DETAIL_STATUS, detailStatus };
    newState.detailStatus = detailStatus;
    Reducer(global)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });
});
