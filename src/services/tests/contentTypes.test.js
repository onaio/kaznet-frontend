import contentTypeService from '../contentTypes';

import * as fixtures from '../../store/contentTypes/tests/fixtures';

global.fetch = require('jest-fetch-mock');

describe('services/contentTypes', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch contentTypes', async () => {
    const data = fixtures.contentTypeData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await contentTypeService.getContentTypeList();
    expect(response).toEqual(fixtures.contentTypesArray);
  });

  it('should handle default contentTypes http errors', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await contentTypeService.getContentTypeList();
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(
      new Error('ContentTypeService getContentTypeList failed, HTTP status 500')
    );
  });
});
