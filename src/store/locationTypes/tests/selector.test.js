import Immutable from 'seamless-immutable';
import { Selector } from 'redux-testkit';

import * as locationTypes from '../reducer';
import * as fixtures from './fixtures';

const emptyState = Immutable({
  locationTypes: {
    locationTypesById: {},
    locationTypesIdArray: [],
    selectOptions: []
  }
});

const fullState = Immutable({
  locationTypes: {
    locationTypesById: fixtures.locationTypesById,
    locationTypesIdArray: fixtures.locationTypesIdArray,
    selectOptions: fixtures.selectOptions
  }
});

describe('store/locationTypes/selectors', () => {
  it('should get default locationTypes by id when empty', () => {
    Selector(locationTypes.getLocationTypesById)
      .expect(emptyState)
      .toReturn({});
  });

  it('should get default locationTypes ids array when empty', () => {
    Selector(locationTypes.getLocationTypesIdArray)
      .expect(emptyState)
      .toReturn([]);
  });

  it('should get locationTypes by id when full', () => {
    Selector(locationTypes.getLocationTypesById)
      .expect(fullState)
      .toReturn(fixtures.locationTypesById);
  });

  it('should get locationTypes ids array when full', () => {
    Selector(locationTypes.getLocationTypesIdArray)
      .expect(fullState)
      .toReturn(fixtures.locationTypesIdArray);
  });

  it('should get locationType by id when full', () => {
    Selector(locationTypes.getLocationTypeById)
      .expect(fullState, 1)
      .toReturn(fixtures.locationTypeIdOneById);
  });

  it('should get default selectOptions array when empty', () => {
    Selector(locationTypes.getLocationTypeOptions)
      .expect(emptyState)
      .toReturn([]);
  });

  it('should get selectOptions array when full', () => {
    Selector(locationTypes.getLocationTypeOptions)
      .expect(fullState, 1)
      .toReturn(fixtures.selectOptions);
  });
});
