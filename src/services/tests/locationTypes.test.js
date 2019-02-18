import LocationTypeService from '../locationTypes';

import * as fixtures from '../../store/locationTypes/tests/fixtures';

global.fetch = require('jest-fetch-mock');

describe('services/locationTypes', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch locationTypes', async () => {
    const data = fixtures.locationTypeData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await LocationTypeService.getLocationTypeList();

    const {
      links,
      meta: {
        pagination: { page, pages, count }
      }
    } = data;

    const expectedResponse = {
      locationTypeArray: fixtures.locationTypesArray,
      pageLinks: links,
      currentPage: page,
      totalPages: pages,
      totalCount: count
    };
    expect(response).toEqual(expectedResponse);
  });

  it('should handle default locationTypes http errors', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await LocationTypeService.getLocationTypeList();
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(
      new Error('LocationTypeService getLocationTypeList failed, HTTP status 500')
    );
  });

  it('should create a locationType', async () => {
    const data = fixtures.singleLocationTypeData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await LocationTypeService.createLocationType({});
    expect(response).toEqual(fixtures.singleLocationType);
  });

  it('should edit a locationType', async () => {
    const data = fixtures.singleLocationTypeData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await LocationTypeService.editLocationType(data, '999');
    expect(response).toEqual(fixtures.singleLocationType);
  });

  it('should delete a locationType', async () => {
    fetch.mockResponseOnce('999');
    const response = await LocationTypeService.deleteLocationType('999');
    expect(response).toEqual('999');
  });

  it('should handle edit locationType http errors', async () => {
    const data = fixtures.singleLocationTypeData;
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await LocationTypeService.editLocationType(data, '999');
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(
      new Error('LocationTypeService editLocationType failed, HTTP status 500')
    );
  });

  it('should handle delete locationType http errors', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await LocationTypeService.deleteLocationType('999');
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(
      new Error('LocationTypeService deleteLocationType failed, HTTP status 500')
    );
  });

  it('should handle create locationType http errors', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await LocationTypeService.createLocationType();
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(
      new Error('LocationTypeService createLocationType failed, HTTP status 500')
    );
  });

  it('should fetch locationType', async () => {
    const data = fixtures.singleLocationTypeData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await LocationTypeService.getLocationType(1);
    expect(response).toEqual(fixtures.singleLocationType);
  });

  it('should handle get locationType http errors', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await LocationTypeService.getLocationType(1);
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('LocationTypeService getLocationType failed, HTTP status 500'));
  });
});
