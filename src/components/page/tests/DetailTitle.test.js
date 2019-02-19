// test DetailTitle
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import DetailTitle from '../DetailTitle';

const history = createBrowserHistory();

describe('components/page/DetailTitle', () => {
  it('renders without crashing', () => {
    shallow(
      <DetailTitle pageTitle="Kaznet" detailName="Testing!!!" pageTarget="/sol" status="Active" />
    );
  });

  it('renders header correctly', () => {
    const wrapper = mount(
      <Router history={history}>
        <DetailTitle pageTitle="Kaznet" detailName="Testing!!!" pageTarget="/sol" status="Active" />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
