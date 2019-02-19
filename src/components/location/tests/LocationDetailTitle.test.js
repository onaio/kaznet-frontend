// Test LocationDetailTitle
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import ErrorBoundary from '../../ErrorBoundary';
import { singleLocation } from '../../../store/locations/tests/fixtures';
import LocationDetailTitle from '../LocationDetailTitle';

const history = createBrowserHistory();

describe('components/location/LocationDetailTitle', () => {
  it('renders without crashing', () => {
    shallow(
      <ErrorBoundary>
        <LocationDetailTitle location={singleLocation} />
      </ErrorBoundary>
    );
  });
  it('renders the correct html', () => {
    const wrapper = mount(
      <ErrorBoundary>
        <Router history={history}>
          <LocationDetailTitle location={singleLocation} />
        </Router>
      </ErrorBoundary>
    );

    expect(toJson(wrapper)).toMatchSnapshot();

    wrapper.unmount();
  });
});
