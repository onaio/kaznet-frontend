// Test UserDetail
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { UserDetail } from '../UserDetail';
import * as fixtures from '../../../store/users/tests/fixtures';
import ErrorBoundary from '../../../components/ErrorBoundary';

const history = createBrowserHistory();

describe('containers/users/UserDetail', () => {
  it('renders without crashing', () => {
    shallow(
      <UserDetail
        match={{
          params: {
            id: '1'
          }
        }}
        fetchUser={function() {}}
        userById={fixtures.userById}
        noTitle={function() {}}
      />
    );
  });

  it('renders detail page correctly without delete button', () => {
    const wrapper = mount(
      <Router history={history}>
        <ErrorBoundary>
          <UserDetail
            match={{
              params: {
                id: '1'
              }
            }}
            fetchUser={function() {}}
            noTitle={function() {}}
            userById={fixtures.userById}
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
          <UserDetail
            match={{
              params: {
                id: '7'
              }
            }}
            fetchUser={function() {}}
            noTitle={function() {}}
            userById={fixtures.userById}
          />
        </ErrorBoundary>
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
