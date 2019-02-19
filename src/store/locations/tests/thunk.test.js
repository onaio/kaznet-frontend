import { Thunk } from 'redux-testkit';

import LocationService from '../../../services/locations';
import * as fixtures from './fixtures';
import * as locations from '../actions';
import * as errorHandlerTypes from '../../errorHandler/actionTypes';
import * as actionTypes from '../actionTypes';

jest.mock('../../../services/locations');

describe('store/locations/actions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch locations from server', async () => {
    LocationService.getLocationList.mockReturnValueOnce({
      locationArray: fixtures.locationsArray,
      pageLinks: fixtures.pageLinks,
      currentPage: fixtures.currentPage,
      totalPages: fixtures.totalPages,
      totalCount: fixtures.totalCount,
      selectOptions: fixtures.selectOptions
    });
    const dispatches = await Thunk(locations.fetchLocations).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.LOCATIONS_FETCHED,
      locationsById: fixtures.locationsById,
      pageLinks: fixtures.pageLinks,
      currentPage: fixtures.currentPage,
      totalPages: fixtures.totalPages,
      totalCount: fixtures.totalCount,
      selectOptions: fixtures.selectOptions
    });
  });

  it('should fetch locations given a url', async () => {
    LocationService.getLocationList.mockReturnValueOnce({
      locationArray: fixtures.locationsArraySecondPage,
      pageLinks: fixtures.pageLinksSecondPage,
      currentPage: fixtures.currentPageSecondPage,
      totalPages: fixtures.totalPagesSecondPage,
      totalCount: fixtures.totalCount,
      selectOptions: fixtures.selectOptionsSecondPage
    });
    const dispatches = await Thunk(locations.fetchLocations).execute(fixtures.pageLinks.next);
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.LOCATIONS_FETCHED,
      locationsById: fixtures.locationsByIdSecondPage,
      pageLinks: fixtures.pageLinksSecondPage,
      currentPage: fixtures.currentPageSecondPage,
      totalPages: fixtures.totalPagesSecondPage,
      totalCount: fixtures.totalCount,
      selectOptions: fixtures.selectOptionsSecondPage
    });
  });

  it('should change the current page', async () => {
    const dispatches = await Thunk(locations.changePageNumber).execute(2);
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.LOCATION_CHANGE_PAGE,
      pageNumber: 2
    });
  });

  it('should fetch locations and print to console on error', async () => {
    LocationService.getLocationList.mockImplementationOnce(() => {
      throw new Error('oops');
    });
    console.error = jest.fn();
    const dispatches = await Thunk(locations.fetchLocations).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_FAILURE,
      errorMessage: Error('oops')
    });
  });

  it('should fetch a single location from server', async () => {
    LocationService.getLocation.mockReturnValueOnce(fixtures.singleLocation);
    const dispatches = await Thunk(locations.fetchLocation).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[1].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_SUCCESS
    });
    expect(dispatches[1].getAction()).toEqual({
      type: actionTypes.LOCATION_FETCHED,
      locationData: fixtures.singleLocation
    });
  });

  it('should fetch a single location and print to console on error', async () => {
    LocationService.getLocation.mockImplementationOnce(() => {
      throw new Error('oops');
    });
    console.error = jest.fn();
    const dispatches = await Thunk(locations.fetchLocation).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_FAILURE,
      errorMessage: Error('oops')
    });
  });

  it('should create a location', async () => {
    LocationService.createLocation.mockReturnValueOnce(fixtures.singleLocation);
    const dispatches = await Thunk(locations.createLocation).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[1].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_SUCCESS
    });
    expect(dispatches[1].getAction()).toEqual({
      type: actionTypes.LOCATION_CREATED,
      locationData: fixtures.singleLocation
    });
  });

  it('should create a single location and print to console on error', async () => {
    LocationService.createLocation.mockImplementationOnce(() => {
      throw new Error('oops');
    });
    console.error = jest.fn();
    const dispatches = await Thunk(locations.createLocation).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_FAILURE,
      errorMessage: Error('oops')
    });
  });

  it('should edit a location', async () => {
    LocationService.editLocation.mockReturnValueOnce(fixtures.singleLocation);
    const dispatches = await Thunk(locations.editLocation).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[1].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_SUCCESS
    });
    expect(dispatches[1].getAction()).toEqual({
      type: actionTypes.LOCATION_EDITED,
      locationData: fixtures.singleLocation
    });
  });

  it('should edit a single location and print to console on error', async () => {
    LocationService.editLocation.mockImplementationOnce(() => {
      throw new Error('oops');
    });
    console.error = jest.fn();
    const dispatches = await Thunk(locations.editLocation).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_FAILURE,
      errorMessage: Error('oops')
    });
  });

  it('should delete a location', async () => {
    LocationService.deleteLocation.mockReturnValueOnce(999);
    const dispatches = await Thunk(locations.deleteLocation).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[1].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_SUCCESS
    });
    expect(dispatches[1].getAction()).toEqual({
      type: actionTypes.LOCATION_DELETED,
      locationId: 999
    });
  });

  it('should delete a single location and print to console on error', async () => {
    LocationService.deleteLocation.mockImplementationOnce(() => {
      throw new Error('oops');
    });
    console.error = jest.fn();
    const dispatches = await Thunk(locations.deleteLocation).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_FAILURE,
      errorMessage: 'Location has not been deleted'
    });
  });
});
