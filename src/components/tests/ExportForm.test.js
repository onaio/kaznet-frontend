// test ExportForm
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import MockDate from 'mockdate';
import ExportForm from '../ExportForm';

describe('components/ExportForm', () => {
  it('renders without crashing', () => {
    shallow(<ExportForm onFormSubmit={function() {}} downloadModalHandler={function() {}} />);
  });
  it('renders an ExportForm', () => {
    MockDate.set('1/2/1986');
    const wrapper = mount(
      <ExportForm onFormSubmit={function() {}} downloadModalHandler={function() {}} />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
