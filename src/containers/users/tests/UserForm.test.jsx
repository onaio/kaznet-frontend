/* eslint-disable func-names */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { UserForm } from '../UserForm';
import * as fixtures from '../../../store/users/tests/fixtures';
import response1 from './fixtures';

global.fetch = require('jest-fetch-mock');

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
  it('onSubmit handler works as expected', () => {
    const wrapper = mount(
      <UserForm
        formActionDispatch={function() {}}
        initialData={fixtures.UserFormInitialData}
        targetId={1337}
      />
    );

    fetch.mockResponseOnce(JSON.stringify(response1), { status: 400 });

    const values = {
      confirmation: 'hello123',
      email: 'kamau@gmail.com',
      expertise: 'Intermediate',
      first_name: 'kamau',
      gender: 'male',
      last_name: 'kahama',
      national_id: '30090087',
      ona_username: 'kahama',
      password: 'hello123',
      payment_number: '',
      phone_number: '',
      role: 'Admin'
    };

    const setSubmitting = jest.fn();
    const setErrors = jest.fn();
    const setStatus = jest.fn();

    wrapper
      .find('Formik')
      .props()
      .onSubmit(values, { setSubmitting, setErrors, setStatus });

    expect(toJson(wrapper.find('form'))).toMatchSnapshot('formik');
  });
});
