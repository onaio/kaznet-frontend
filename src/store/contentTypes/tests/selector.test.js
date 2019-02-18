import Immutable from 'seamless-immutable';
import { Selector } from 'redux-testkit';

import * as contentTypes from '../reducer';
import * as fixtures from './fixtures';

const emptyState = Immutable({
  contentTypes: {
    contentTypesById: {},
    formContentType: null
  }
});

const fullState = Immutable({
  contentTypes: {
    contentTypesById: fixtures.contentTypesById,
    formContentType: 16
  }
});

describe('store/contentTypes/selectors', () => {
  it('should get default contentTypes by id when empty', () => {
    Selector(contentTypes.getContentTypesById)
      .expect(emptyState)
      .toReturn({});
  });

  it('should get default form content type array when empty', () => {
    Selector(contentTypes.getFormContentType)
      .expect(emptyState)
      .toReturn(null);
  });

  it('should get contentTypes by id when full', () => {
    Selector(contentTypes.getContentTypesById)
      .expect(fullState)
      .toReturn(fixtures.contentTypesById);
  });

  it('should get form content type when full', () => {
    Selector(contentTypes.getFormContentType)
      .expect(fullState)
      .toReturn(16);
  });
});
