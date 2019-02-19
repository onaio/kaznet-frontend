// test NoResults
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import NoResults from '../NoResults';

describe('components/NoResults', () => {
  it('renders without crashing', () => {
    shallow(<NoResults />);
  });

  it('renders the no results message', () => {
    const wrapper = mount(<NoResults searchVal="peter pan" />);

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
