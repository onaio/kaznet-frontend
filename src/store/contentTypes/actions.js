// contentType actions
import _ from 'lodash';
import * as types from './actionTypes';
import contentTypeService from '../../services/contentTypes';

// get list of contentTypes
export function fetchContentTypes() {
  return async (dispatch, getState) => {
    try {
      const contentTypeArray = await contentTypeService.getContentTypeList();
      const contentTypesById = _.keyBy(contentTypeArray, contentType => contentType.id);
      dispatch({ type: types.CONTENT_TYPES_FETCHED, contentTypesById });
    } catch (error) {
      console.error(error);
    }
  };
}
