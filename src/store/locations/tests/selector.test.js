import _ from 'lodash';
import Immutable from 'seamless-immutable';
import { Selector } from 'redux-testkit';

import * as locations from '../reducer';
import * as fixtures from './fixtures';

const emptyState = Immutable({
  locations: {
    locationsById: {},
    locationIdArray: [],
    selectOptions: [],
    currentLocation: {}
  }
});

const fullState = Immutable({
  locations: {
    locationsById: fixtures.locationsById,
    locationsIdArray: fixtures.locationsIdArray,
    selectOptions: fixtures.selectOptions,
    currentLocation: fixtures.singleLocation
  }
});

describe('store/locations/selectors', () => {
  it('should get default locations by id when empty', () => {
    Selector(locations.getLocationsById)
      .expect(emptyState)
      .toReturn({});
  });

  it('should get default locations id array when empty', () => {
    Selector(locations.getLocationsIdArray)
      .expect(emptyState)
      .toReturn([]);
  });

  it('should get locations by id when full', () => {
    Selector(locations.getLocationsById)
      .expect(fullState)
      .toReturn(fixtures.locationsById);
  });

  it('should get one location by id when full', () => {
    Selector(locations.getLocationById)
      .expect(fullState, 1)
      .toReturn(fixtures.locationById);
  });

  it('should get locations ids array when full', () => {
    Selector(locations.getLocationsIdArray)
      .expect(fullState)
      .toReturn(fixtures.locationsIdArray);
  });

  it('should get parent location choices when full', () => {
    Selector(locations.getParentLocationChoicesById)
      .expect(fullState)
      .toReturn(fixtures.locationsById);

    Selector(locations.getParentLocationChoicesById)
      .expect(fullState, 7)
      .toReturn(_.omit(fixtures.locationsById, 7));
  });

  it('should get default selectOptions array when empty', () => {
    Selector(locations.getLocationOptions)
      .expect(emptyState)
      .toReturn([]);
  });

  it('should get selectOptions array when full', () => {
    Selector(locations.getLocationOptions)
      .expect(fullState, 1)
      .toReturn(fixtures.selectOptions);
  });

  it('should get no currentLocation when empty', () => {
    Selector(locations.getCurrentLocation)
      .expect(emptyState)
      .toReturn({});
  });

  it('should get currentLocation when full', () => {
    Selector(locations.getCurrentLocation)
      .expect(fullState, 1)
      .toReturn(fixtures.singleLocation);
  });
});
