// global reducer tests
import _ from 'lodash';
import Immutable from 'seamless-immutable';
import { Reducer } from 'redux-testkit';

import global from '../reducer';
import * as actionTypes from '../actionTypes';

const initialState = {
    pageTitle: 'Kaznet',
    pageTitleButton: 'Friendly Button'
};

describe('store/global/reducer', () => {

  it('should have initial state', () => {
    expect(global()).toEqual(initialState);
  });

  it('should not affect state', () => {
    Reducer(global).expect({type: 'NOT_EXISTING'}).toReturnState(initialState);
  });

  it('should change page title', () => {
    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    const pageTitle = 'A New Hope';
    const action = {type: actionTypes.CHANGE_PAGETITLE, pageTitle};
    newState.pageTitle = pageTitle
    Reducer(global).withState(existingState).expect(action).toReturnState(newState);
  });

  it('should change page button title', () => {
    const existingState = Immutable(initialState);
    const newState = _.clone(initialState);
    const pageTitleButton = 'Kill Bill';
    const action = {type: actionTypes.CHANGE_PAGETITLE_BUTTON, pageTitleButton};
    newState.pageTitleButton = pageTitleButton
    Reducer(global).withState(existingState).expect(action).toReturnState(newState);
  });

});