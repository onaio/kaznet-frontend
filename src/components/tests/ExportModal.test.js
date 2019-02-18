// test ExportModal
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import MockDate from 'mockdate';
import ExportModal from '../ExportModal';

describe('components/ExportModal', () => {
  it('renders without crashing', () => {
    shallow(
      <ExportModal
        isOpen={function() {}}
        toggle={function() {}}
        className="some-fancy-class"
        onFormSubmit={function() {}}
        downloadModalHandler={function() {}}
      />
    );
  });
  it('renders an ExportModal', () => {
    MockDate.set('1/2/1986');
    const wrapper = mount(
      <ExportModal
        isOpen={function() {}}
        toggle={function() {}}
        className="some-fancy-class"
        onFormSubmit={function() {}}
        downloadModalHandler={function() {}}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
