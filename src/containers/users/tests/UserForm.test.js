// Test TaskForm
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { UserForm } from '../UserForm';
import * as fixtures from '../../../store/users/tests/fixtures';

describe('containers/users/UserForm', () => {
  it('renders without crashing', () => {
    shallow(<UserForm formActionDispatch={function() {}} />);
  });

  it('renders user form correctly', () => {
    const wrapper = mount(
      <UserForm formActionDispatch={function() {}} initialData={fixtures.UserFormInitialData} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders user form correctly when doing an edit', () => {
    const wrapper = mount(
      <UserForm
        formActionDispatch={function() {}}
        initialData={fixtures.UserFormInitialData}
        targetId={1337}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
