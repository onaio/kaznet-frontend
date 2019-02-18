// Test ClientForm
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { ClientForm } from '../ClientForm';

describe('containers/client/ClientForm', () => {
  it('renders without crashing', () => {
    const initialData = { name: 'Hi' };
    shallow(<ClientForm formActionDispatch={function() {}} initialData={initialData} />);
  });

  it('renders client form correctly', () => {
    const initialData = { name: 'Hi' };
    const wrapper = mount(
      <ClientForm formActionDispatch={function() {}} initialData={initialData} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders client form correctly when doing an edit', () => {
    const initialData = {
      name: 'Umbrella Corporation'
    };
    const wrapper = mount(
      <ClientForm formActionDispatch={function() {}} initialData={initialData} targetId={1337} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
