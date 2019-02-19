import Immutable from 'seamless-immutable';
import { Selector } from 'redux-testkit';

import * as contentTypes from '../reducer';

const emptyState = Immutable({
  errorHandler: {
    errors: false,
    errorMessage: null
  }
});

describe('store/errorHandler/selectors', () => {
  it('should get default errors when empty', () => {
    Selector(contentTypes.getHasError)
      .expect(emptyState)
      .toReturn(false);
  });

  it('should get default errorMessage when empty', () => {
    Selector(contentTypes.getErrorMessage)
      .expect(emptyState)
      .toReturn(null);
  });
});
