import LocationService from '../locations';

import * as fixtures from '../../store/locations/tests/fixtures';

global.fetch = require('jest-fetch-mock');

describe('services/locations', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch locations', async () => {
    const data = fixtures.locationsData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await LocationService.getLocationList();

    const {
      links,
      meta: {
        pagination: { page, pages, count }
      }
    } = data;

    const expectedResponse = {
      locationArray: fixtures.locationsArray,
      pageLinks: links,
      currentPage: page,
      totalPages: pages,
      totalCount: count
    };

    expect(response).toEqual(expectedResponse);
  });

  it('should fetch locations when passed a url', async () => {
    const data = fixtures.locationsDataSecondPage;
    const nextUrl = fixtures.locationsData.links.next;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await LocationService.getLocationList(nextUrl);

    const {
      links,
      meta: {
        pagination: { page, pages, count }
      }
    } = data;

    const expectedResponse = {
      locationArray: fixtures.locationsArraySecondPage,
      pageLinks: links,
      currentPage: page,
      totalPages: pages,
      totalCount: count
    };

    expect(response).toEqual(expectedResponse);
  });

  it('should handle default locations http errors', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await LocationService.getLocationList();
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('LocationService getLocationList failed, HTTP status 500'));
  });

  it('should create a location', async () => {
    const data = fixtures.singleLocationData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await LocationService.createLocation({});
    expect(response).toEqual(fixtures.singleLocation);
  });

  it('should edit a location', async () => {
    const data = fixtures.singleLocationData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await LocationService.editLocation(data, '999');
    expect(response).toEqual(fixtures.singleLocation);
  });

  it('should delete a location', async () => {
    fetch.mockResponseOnce('999');
    const response = await LocationService.deleteLocation('999');
    expect(response).toEqual('999');
  });

  it('should handle edit location http errors', async () => {
    const data = fixtures.singleLocationData;
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await LocationService.editLocation(data, '999');
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('LocationService editLocation failed, HTTP status 500'));
  });

  it('should handle delete location http errors', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await LocationService.deleteLocation('999');
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('LocationService deleteLocation failed, HTTP status 500'));
  });

  it('should handle create location http errors', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await LocationService.createLocation();
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('LocationService createLocation failed, HTTP status 500'));
  });

  it('should fetch location', async () => {
    const data = fixtures.singleLocationData;
    fetch.mockResponseOnce(JSON.stringify(data));
    const response = await LocationService.getLocation(1);
    expect(response).toEqual(fixtures.singleLocation);
  });

  it('should handle get location http errors', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    let error;
    try {
      await LocationService.getLocation(1);
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('LocationService getLocation failed, HTTP status 500'));
  });
});
