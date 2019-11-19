import FormService from '../forms';

import * as fixtures from '../../store/forms/tests/fixtures';

global.fetch = require('jest-fetch-mock');

describe('services/forms', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch forms', async () => {
    const data = fixtures.formData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await FormService.getFormList();
    const {
      links,
      meta: {
        pagination: { page, pages, count }
      }
    } = data;

    const expectedResponse = {
      formArray: fixtures.formsArray,
      pageLinks: links,
      currentPage: page,
      totalPages: pages,
      totalCount: count
    };
    expect(response).toEqual(expectedResponse);
  });

  it('should handle default forms http errors', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await FormService.getFormList();
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('FormService getFormList failed, HTTP status 500'));
  });

  it('should fetch task', async () => {
    const data = fixtures.singleFormData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await FormService.getForm(1996);
    expect(response).toEqual(fixtures.singleForm);
  });
});
