/* eslint-disable func-names */
/* eslint-disable react/jsx-no-bind */
// Test TaskCreation
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';
import { UserCreateForm } from '../UserCreateForm';
import FormView from '../../../components/FormView';
// eslint-disable-next-line import/no-named-as-default
import UserForm from '../UserForm';
import * as constants from '../../../constants';
import { response1 } from './fixtures';
import * as reducers from '../../../store/reducers';

// eslint-disable-next-line import/prefer-default-export
export const history = createBrowserHistory();

const store = createStore(
  connectRouter(history)(combineReducers(reducers)),
  applyMiddleware(thunk, routerMiddleware(history))
);

global.fetch = require('jest-fetch-mock');

describe('containers/task/TaskCreateForm', () => {
  it('renders without crashing', () => {
    shallow(<UserCreateForm noTitle={function() {}} />);
  });

  it('renders both Form View and TaskForm with correct Data', () => {
    const initialData = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmation: '',
      gender: '',
      role: constants.CONTRIBUTOR_ROLE,
      expertise: constants.BEGINNER,
      national_id: '',
      payment_number: '',
      phone_number: '',
      ona_username: ''
    };
    const wrapper = shallow(<UserCreateForm noTitle={function() {}} />).dive();
    expect(wrapper.find(FormView)).toHaveLength(0);
    expect(wrapper.find(UserForm)).toHaveLength(1);
    const data = wrapper.find(UserForm).props().initialData;
    expect(data).toEqual(initialData);
  });
  it('onSubmit handler works as expected', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <UserCreateForm noTitle={function() {}} />
      </Provider>
    );

    // expect(response1).toEqual([]);

    // eslint-disable-next-line prettier/prettier
    fetch.mockResponseOnce(JSON.stringify(response1), {status: 400, statusText: 'error'});

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

    await wrapper
      .find('Formik')
      .props()
      .onSubmit(values, { setSubmitting, setErrors, setStatus });

    expect(setErrors.mock.calls).toEqual([
      [
        {
          national_id: 'Profile with this National ID Number already exists.',
          ona_username: 'Profile with this Ona Username already exists.'
        }
      ]
    ]);
    expect(setSubmitting.mock.calls).toEqual([[false]]);
    expect(setStatus).toHaveBeenCalledTimes(0);

    wrapper.unmount();
  });

  it('Correct errors are shown only after form fields are touched and not before', () => {
    const wrapper = mount(
      <Provider store={store}>
        <UserCreateForm noTitle={function() {}} />
      </Provider>
    );

    // we should not have any invalid feedback before we touch the form
    expect(toJson(wrapper.find('.invalid-feedback'))).toEqual(null);

    // valid email
    wrapper
      .find("input[name='email']")
      .simulate('change', { target: { name: 'email', value: 'invalid email' } });
    wrapper.update();

    wrapper.find('form').simulate('submit');

    // passwords must match
    wrapper
      .find("input[name='password']")
      .simulate('change', { target: { name: 'password', value: 'password1' } });
    wrapper
      .find("input[name='confirmation']")
      .simulate('change', { target: { name: 'password', value: 'password2' } });
    wrapper.update();

    expect(toJson(wrapper.find('.invalid-feedback'))).toMatchSnapshot('ivalid email and password');
    wrapper.unmount();
  });

  it('ensure user can not submit without filling in required fields', () => {
    const wrapper = mount(
      <Provider store={store}>
        <UserCreateForm noTitle={function() {}} />
      </Provider>
    );
    wrapper.find('form').simulate('submit');
    expect(toJson(wrapper.find('.invalid-feedback'))).toMatchSnapshot('invalid feedback');
    wrapper.unmount();
  });
});
