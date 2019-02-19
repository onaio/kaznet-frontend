import { Thunk } from 'redux-testkit';

import formService from '../../../services/forms';
import * as fixtures from './fixtures';
import * as forms from '../actions';
import * as actionTypes from '../actionTypes';

jest.mock('../../../services/forms');

describe('store/forms/actions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch forms from server', async () => {
    formService.getFormList.mockReturnValueOnce({
      formArray: fixtures.formsArray,
      pageLinks: fixtures.pageLinks,
      currentPage: fixtures.currentPage,
      totalPages: fixtures.totalPages,
      totalCount: fixtures.totalCount,
      selectOptions: fixtures.selectOptions
    });
    const dispatches = await Thunk(forms.fetchForms).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.FORMS_FETCHED,
      formsById: fixtures.formsById,
      pageLinks: fixtures.pageLinks,
      currentPage: fixtures.currentPage,
      totalPages: fixtures.totalPages,
      totalCount: fixtures.totalCount,
      selectOptions: fixtures.selectOptions
    });
  });

  it('should fetch forms given a url', async () => {
    formService.getFormList.mockReturnValueOnce({
      formArray: fixtures.formsArraySecondPage,
      pageLinks: fixtures.pageLinksSecondPage,
      currentPage: fixtures.currentPageSecondPage,
      totalPages: fixtures.totalPagesSecondPage,
      selectOptions: fixtures.selectOptionsSecondPage
    });
    const dispatches = await Thunk(forms.fetchForms).execute(fixtures.pageLinks.next);
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.FORMS_FETCHED,
      formsById: fixtures.formsByIdSecondPage,
      pageLinks: fixtures.pageLinksSecondPage,
      currentPage: fixtures.currentPageSecondPage,
      totalPages: fixtures.totalPagesSecondPage,
      selectOptions: fixtures.selectOptionsSecondPage
    });
  });

  it('should change the current page', async () => {
    const dispatches = await Thunk(forms.changePageNumber).execute(2);
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.FORM_CHANGE_PAGE,
      pageNumber: 2
    });
  });

  it('should fetch forms and print to console on error', async () => {
    formService.getFormList.mockImplementationOnce(() => {
      throw new Error('oops');
    });
    console.error = jest.fn();
    const dispatches = await Thunk(forms.fetchForms).execute();
    expect(dispatches.length).toBe(0);
    expect(console.error).toHaveBeenCalledWith(Error('oops'));
  });
});
