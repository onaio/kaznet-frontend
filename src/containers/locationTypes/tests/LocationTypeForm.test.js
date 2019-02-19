// Test LocationTypeForm
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { LocationTypeForm } from '../LocationTypeForm';

describe('containers/locationType/LocationTypeForm', () => {
  it('renders without crashing', () => {
    const initialData = { name: 'Market' };
    shallow(<LocationTypeForm formActionDispatch={function() {}} initialData={initialData} />);
  });

  it('renders locationType form correctly', () => {
    const initialData = { name: 'Market' };
    const wrapper = mount(
      <LocationTypeForm formActionDispatch={function() {}} initialData={initialData} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders locationType form correctly when doing an edit', () => {
    const initialData = {
      name: 'Market'
    };
    const wrapper = mount(
      <LocationTypeForm
        formActionDispatch={function() {}}
        initialData={initialData}
        targetId={1337}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
