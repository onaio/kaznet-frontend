// test PageTitle
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import PageTitle from '../PageTitle';

const history = createBrowserHistory();

describe('components/page/PageTitle', () => {
  it('renders without crashing', () => {
    shallow(<PageTitle pageTitle="Kaznet" pageTitleButton="Big Red Button" pageTarget="/zerg" />);
  });

  it('renders header correctly', () => {
    const wrapper = mount(
      <Router history={history}>
        <PageTitle pageTitle="Kaznet" pageTitleButton="Big Red Button" pageTarget="/zerg" />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
