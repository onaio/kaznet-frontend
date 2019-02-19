// Test LinkMap
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Router } from 'react-router';
import toJson from 'enzyme-to-json';
import createBrowserHistory from 'history/createBrowserHistory';
import LinkMap from '../LinkMap';

const history = createBrowserHistory();

describe('containers/LinkMap', () => {
  it('renders without crashing', () => {
    const linkItems = {
      test: '/',
      amount: '/'
    };
    shallow(<LinkMap links={linkItems} />);
  });

  it('renders links correctly', () => {
    const linkItems = {
      test: '/',
      amount: '/'
    };

    const wrapper = mount(
      <Router history={history}>
        <LinkMap links={linkItems} />
      </Router>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount;
  });
});
