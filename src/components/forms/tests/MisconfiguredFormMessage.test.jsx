// test ExportModal
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import MisconfiguredFormMessage from '../MisconfiguredFormMessage';

describe('components/forms/MisconfiguredFormMessage', () => {
  it('renders without crashing', () => {
    shallow(<MisconfiguredFormMessage />);
  });
  it('renders the MisconfiguredFormMessage component', () => {
    const wrapper = mount(<MisconfiguredFormMessage />);

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
