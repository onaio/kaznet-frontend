// test ExportModal
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import MisconfiguredForm from '../MisconfiguredForm';
import { formIdThreeById } from '../../../store/forms/tests/fixtures';

describe('components/forms/MisconfiguredForm', () => {
  it('renders without crashing', () => {
    shallow(<MisconfiguredForm form={formIdThreeById} />);
  });
  it('renders the MisconfiguredForm component', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const wrapper = mount(<MisconfiguredForm form={formIdThreeById} />, {
      attachTo: div
    });

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
