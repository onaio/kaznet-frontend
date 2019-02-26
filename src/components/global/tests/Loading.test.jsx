// test ExportModal
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Loading from '../Loading';

describe('components/global/Loading', () => {
  it('renders without crashing', () => {
    shallow(<Loading />);
  });
  it('renders the Loading component', () => {
    const wrapper = mount(<Loading />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
