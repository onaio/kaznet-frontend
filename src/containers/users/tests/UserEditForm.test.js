// Test UserEditForm
import React from 'react';
import { shallow } from 'enzyme';

import * as fixtures from '../../../store/users/tests/fixtures';
import { UserEditForm } from '../UserEditForm';
import FormView from '../../../components/FormView';
import UserForm from '../UserForm';

describe('containers/users/UserEditForm', () => {
  it('renders without crashing', () => {
    shallow(
      <UserEditForm
        match={{
          params: {
            id: '1'
          }
        }}
        fetchUser={function() {}}
        noTitle={function() {}}
      />
    );
  });

  it('renders both Form View and UserForm with correct Data', () => {
    const wrapper = shallow(
      <UserEditForm
        match={{
          params: {
            id: '1'
          }
        }}
        fetchUser={function() {}}
        noTitle={function() {}}
        userById={fixtures.singleUser}
      />
    ).dive();

    const expected = {
      first_name: 'Davis',
      last_name: 'Raymond',
      email: 'sol@admin.me',
      password: '',
      confirmation: '',
      gender: '1',
      role: '1',
      expertise: '1',
      national_id: '',
      payment_number: '',
      phone_number: '',
      ona_username: 'davisraym'
    };

    expect(wrapper.find(FormView)).toHaveLength(0);
    expect(wrapper.find(UserForm)).toHaveLength(1);
    const data = wrapper.find(UserForm).props().initialData;
    expect(data).toEqual(expected);
  });
});
