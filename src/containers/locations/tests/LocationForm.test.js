// Test LocationForm
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Immutable from 'seamless-immutable';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import ErrorBoundary from '../../../components/ErrorBoundary';
import { LocationForm } from '../LocationForm';
import * as locationFixtures from '../../../store/locations/tests/fixtures';
import * as locationTypeFixtures from '../../../store/locationTypes/tests/fixtures';
import { locationTypesById } from '../../../store/locationTypes/tests/fixtures';

const history = createBrowserHistory();

describe('containers/location/LocationForm', () => {
  it('renders without crashing', () => {
    const initialData = {
      name: 'Kitui',
      parent: '',
      location_type: '',
      geopoint: '36,-1',
      radius: '9',
      shapefile: ''
    };
    shallow(
      <LocationForm
        formActionDispatch={function() {}}
        fetchLocations={function() {}}
        fetchLocationTypes={function() {}}
        initialData={initialData}
        locationsById={locationFixtures.locationsById}
        locationTypesById={locationTypesById}
        locationTypeOptions={Immutable(locationTypeFixtures.selectOptions)}
        parentOptions={Immutable(locationFixtures.selectOptions)}
      />
    );
  });

  it('renders location form correctly', () => {
    const initialData = {
      name: 'Kitui',
      parent: '',
      location_type: '',
      geopoint: '36,-1',
      radius: '9',
      shapefile: ''
    };
    const wrapper = mount(
      <Router history={history}>
        <ErrorBoundary>
          <LocationForm
            formActionDispatch={function() {}}
            fetchLocations={function() {}}
            fetchLocationTypes={function() {}}
            initialData={initialData}
            locationsById={locationFixtures.locationsById}
            locationTypesById={locationTypesById}
            locationTypeOptions={Immutable(locationTypeFixtures.selectOptions)}
            parentOptions={Immutable(locationFixtures.selectOptions)}
          />
        </ErrorBoundary>
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders location form correctly when editting', () => {
    const initialData = {
      name: 'Voi',
      parent: '',
      location_type: { value: 1337, label: 'Mars' },
      geopoint: '36.9898,-1.1111',
      radius: '2',
      shapefile: ''
    };
    const wrapper = mount(
      <Router history={history}>
        <ErrorBoundary>
          <LocationForm
            formActionDispatch={function() {}}
            fetchLocations={function() {}}
            fetchLocationTypes={function() {}}
            initialData={initialData}
            locationsById={locationFixtures.locationsById}
            locationTypesById={locationTypesById}
            locationTypeOptions={Immutable(locationTypeFixtures.selectOptions)}
            parentOptions={Immutable(locationFixtures.selectOptions)}
          />
        </ErrorBoundary>
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
