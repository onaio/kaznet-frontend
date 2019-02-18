import { Thunk } from 'redux-testkit';

import LocationTypeService from '../../../services/locationTypes';
import * as fixtures from './fixtures';
import * as locationTypes from '../actions';
import * as actionTypes from '../actionTypes';
import * as errorHandlerTypes from '../../errorHandler/actionTypes';

jest.mock('../../../services/locationTypes');

describe('store/locationTypes/actions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch locationTypes from server', async () => {
    LocationTypeService.getLocationTypeList.mockReturnValueOnce({
      locationTypeArray: fixtures.locationTypesArray,
      pageLinks: fixtures.pageLinks,
      currentPage: fixtures.currentPage,
      totalPages: fixtures.totalPages,
      totalCount: fixtures.totalCount,
      selectOptions: fixtures.selectOptions
    });

    const dispatches = await Thunk(locationTypes.fetchLocationTypes).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.LOCATIONTYPES_FETCHED,
      locationTypesById: fixtures.locationTypesById,
      pageLinks: fixtures.pageLinks,
      currentPage: fixtures.currentPage,
      totalPages: fixtures.totalPages,
      totalCount: fixtures.totalCount,
      selectOptions: fixtures.selectOptions
    });
  });

  it('should fetch locationTypes and print to console on error', async () => {
    LocationTypeService.getLocationTypeList.mockImplementationOnce(() => {
      throw new Error('oops');
    });
    console.error = jest.fn();
    const dispatches = await Thunk(locationTypes.fetchLocationTypes).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_FAILURE,
      errorMessage: Error('oops')
    });

    // expect(console.error).toHaveBeenCalledWith(Error("oops"));
  });

  it('should fetch a single locationType from server', async () => {
    LocationTypeService.getLocationType.mockReturnValueOnce(fixtures.singleLocationType);
    const dispatches = await Thunk(locationTypes.fetchLocationType).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[1].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_SUCCESS
    });
    expect(dispatches[1].getAction()).toEqual({
      type: actionTypes.LOCATIONTYPE_FETCHED,
      locationTypeData: fixtures.singleLocationType
    });
  });

  it('should fetch a single locationType and print to console on error', async () => {
    LocationTypeService.getLocationType.mockImplementationOnce(() => {
      throw new Error('oops');
    });
    console.error = jest.fn();
    const dispatches = await Thunk(locationTypes.fetchLocationType).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_FAILURE,
      errorMessage: Error('oops')
    });
  });

  it('should create a locationType', async () => {
    LocationTypeService.createLocationType.mockReturnValueOnce(fixtures.singleLocationType);
    const dispatches = await Thunk(locationTypes.createLocationType).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[1].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_SUCCESS
    });
    expect(dispatches[1].getAction()).toEqual({
      type: actionTypes.LOCATIONTYPE_CREATED,
      locationTypeData: fixtures.singleLocationType
    });
  });

  it('should create a single locationType and print to console on error', async () => {
    LocationTypeService.createLocationType.mockImplementationOnce(() => {
      throw new Error('oops');
    });
    console.error = jest.fn();
    const dispatches = await Thunk(locationTypes.createLocationType).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_FAILURE,
      errorMessage: Error('oops')
    });
  });

  it('should edit a locationType', async () => {
    LocationTypeService.editLocationType.mockReturnValueOnce(fixtures.singleLocationType);
    const dispatches = await Thunk(locationTypes.editLocationType).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[1].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_SUCCESS
    });
    expect(dispatches[1].getAction()).toEqual({
      type: actionTypes.LOCATIONTYPE_EDITED,
      locationTypeData: fixtures.singleLocationType
    });
  });

  it('should edit a single locationType and print to console on error', async () => {
    LocationTypeService.editLocationType.mockImplementationOnce(() => {
      throw new Error('oops');
    });
    console.error = jest.fn();
    const dispatches = await Thunk(locationTypes.editLocationType).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_FAILURE,
      errorMessage: Error('oops')
    });
  });

  it('should delete a locationType', async () => {
    LocationTypeService.deleteLocationType.mockReturnValueOnce(999);
    const dispatches = await Thunk(locationTypes.deleteLocationType).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[1].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_SUCCESS
    });
    expect(dispatches[1].getAction()).toEqual({
      type: actionTypes.LOCATIONTYPE_DELETED,
      locationTypeId: 999
    });
  });

  it('should delete a single locationType and print to console on error', async () => {
    LocationTypeService.deleteLocationType.mockImplementationOnce(() => {
      throw new Error('oops');
    });
    console.error = jest.fn();
    const dispatches = await Thunk(locationTypes.deleteLocationType).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      type: errorHandlerTypes.REQUEST_FAILURE,
      errorMessage: 'Location type was not deleted'
    });
  });
});
