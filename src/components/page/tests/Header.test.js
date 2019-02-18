// test Header
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';

import Header from '../Header';
import * as reducers from '../../../store/reducers';
import profile_image from '../../../images/profile.png';
import * as fixtures from '../../../store/users/tests/fixtures';

const history = createBrowserHistory();

const store = createStore(
  connectRouter(history)(combineReducers(reducers)),
  applyMiddleware(thunk, routerMiddleware(history))
);

describe('components/page/Header', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    shallow(<Header store={store} />);
  });

  it('renders header correctly', () => {
    const wrapper = mount(
      <Router history={history}>
        <Header store={store} profile_image={profile_image} getCurrentUser={function() {}} />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
