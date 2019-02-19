import _ from 'lodash';
import Immutable from 'seamless-immutable';
import { Reducer } from 'redux-testkit';

import forms from '../reducer';
import * as actionTypes from '../actionTypes';
import * as fixtures from './fixtures';

const initialState = {
  formsById: {},
  selectOptions: [],
  formsIdArray: [],
  unusedForms: [],
  currentPage: 1,
  totalPages: 1,
  totalCount: null,
  hasTask: '',
  pageLinks: {
    first: null,
    last: null,
    prev: null,
    next: null
  }
};

describe('store/forms/reducer', () => {
  it('should have initial state', () => {
    expect(forms()).toEqual(initialState);
  });

  it('should store fetched forms', () => {
    const { formsById } = fixtures;
    const { pageLinks } = fixtures;
    const { currentPage } = fixtures;
    const { totalPages } = fixtures;
    const { totalCount } = fixtures;
    const { selectOptions } = fixtures;
    const action = {
      type: actionTypes.FORMS_FETCHED,
      formsById,
      pageLinks,
      currentPage,
      totalPages,
      totalCount,
      selectOptions
    };

    const existingState = Immutable(initialState);
    const newState = _.clone(existingState);
    newState.formsById = formsById;
    newState.pageLinks = pageLinks;
    newState.currentPage = currentPage;
    newState.totalPages = totalPages;
    newState.totalCount = totalCount;
    newState.selectOptions = selectOptions;

    Reducer(forms)
      .withState(existingState)
      .expect(action)
      .toReturnState(newState);
  });
});
