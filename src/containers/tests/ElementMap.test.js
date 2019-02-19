// Test Element Map
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import ElementMap from '../ElementMap';

describe('containers/ElementMap', () => {
  it('renders without crashing', () => {
    const headerItems = ['Name'];
    shallow(<ElementMap items={headerItems} HTMLTag="th" />);
  });

  it('renders tags correctly', () => {
    const headerItems = ['Name'];
    const wrapper = mount(<ElementMap items={headerItems} HTMLTag="div" />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
