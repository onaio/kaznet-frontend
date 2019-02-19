import { Thunk } from 'redux-testkit';

import contentTypeService from '../../../services/contentTypes';
import * as fixtures from './fixtures';
import * as contentTypes from '../actions';
import * as actionTypes from '../actionTypes';

jest.mock('../../../services/contentTypes');

describe('store/contentTypes/actions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch contentTypes from server', async () => {
    contentTypeService.getContentTypeList.mockReturnValueOnce(fixtures.contentTypesArray);
    const dispatches = await Thunk(contentTypes.fetchContentTypes).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.CONTENT_TYPES_FETCHED,
      contentTypesById: fixtures.contentTypesById
    });
  });

  it('should fetch contentTypes and print to console on error', async () => {
    contentTypeService.getContentTypeList.mockImplementationOnce(() => {
      throw new Error('oops');
    });
    console.error = jest.fn();
    const dispatches = await Thunk(contentTypes.fetchContentTypes).execute();
    expect(dispatches.length).toBe(0);
    expect(console.error).toHaveBeenCalledWith(Error('oops'));
  });
});
