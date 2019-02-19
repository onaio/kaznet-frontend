// Test UserDetailTitle
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import ErrorBoundary from '../../ErrorBoundary';
import { singleUserData } from '../../../store/users/tests/fixtures';
import UserDetailTitle from '../UserDetailTitle';

const history = createBrowserHistory();

describe('components/users/UserDetailTitle', () => {
  it('renders without crashing', () => {
    shallow(
      <ErrorBoundary>
        <UserDetailTitle user={singleUserData} />
      </ErrorBoundary>
    );
  });
  it('renders the correct html', () => {
    const wrapper = mount(
      <ErrorBoundary>
        <Router history={history}>
          <UserDetailTitle user={singleUserData} />
        </Router>
      </ErrorBoundary>
    );

    expect(toJson(wrapper)).toMatchSnapshot();

    wrapper.unmount();
  });
});
