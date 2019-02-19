// Test LocationDetail
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { LocationDetail } from '../LocationDetail';
import * as fixtures from '../../../store/locations/tests/fixtures';
import ErrorBoundary from '../../../components/ErrorBoundary';

const history = createBrowserHistory();

describe('containers/location/LocationDetail', () => {
  it('renders without crashing', () => {
    shallow(
      <LocationDetail
        match={{
          params: {
            id: '1'
          }
        }}
        fetchLocation={function() {}}
        locationById={fixtures.locationById}
        noTitle={function() {}}
      />
    );
  });

  it('renders detail page correctly without delete button', () => {
    const wrapper = mount(
      <Router history={history}>
        <ErrorBoundary>
          <LocationDetail
            match={{
              params: {
                id: '1'
              }
            }}
            fetchLocation={function() {}}
            noTitle={function() {}}
            locationById={fixtures.locationById}
          />
        </ErrorBoundary>
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders detail page correctly with delete button', () => {
    const wrapper = mount(
      <Router history={history}>
        <ErrorBoundary>
          <LocationDetail
            match={{
              params: {
                id: '7'
              }
            }}
            fetchLocation={function() {}}
            noTitle={function() {}}
            locationById={fixtures.locationWithNoSumissions}
          />
        </ErrorBoundary>
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
