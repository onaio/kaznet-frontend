/* eslint-disable react/jsx-no-bind */
// Test TaskCreation
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
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

    // const temp = await fetch().then(response => response.json());
    // expect(temp).toEqual({});

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
  });
});
