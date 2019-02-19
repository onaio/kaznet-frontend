// Test TitleSection
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { TitleSection } from '../TitleSection';

const history = createBrowserHistory();

describe('containers/global/TitleSection', () => {
  it('renders without crashing', () => {
    shallow(<TitleSection showTitle showDetail={false} />).dive();
  });

  it('renders page title correctly', () => {
    const wrapper = mount(
      <Router history={history}>
        <TitleSection showTitle showDetail={false} />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders detail title correctly', () => {
    const wrapper = mount(
      <Router history={history}>
        <TitleSection showTitle showDetail pageTarget="/" />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
