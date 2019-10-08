/* eslint-disable react/jsx-no-bind */
// Test TaskCreation
import React from 'react';
import { shallow, mount } from 'enzyme';
import moment from 'moment';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware, connectRouter } from 'connected-react-router';
import { TaskCreateForm } from '../TaskCreateForm';
import FormView from '../../../components/FormView';
// eslint-disable-next-line import/no-named-as-default
import TaskForm from '../TaskForm';
import {
  TASK_DRAFT,
  ESTIMATED_TIME_INT,
  TASK_LOCATION_TIMING_RULE,
  TASK_LOCATION_END,
  TASK_LOCATION_START,
  BEGINNER,
  USER_SUBMISSION_TARGET
} from '../../../constants';
import {
  errorReceivedFromApi,
  formlistApiResult,
  locationlistApi,
  resultsFromClientListApi,
  contentTypeApiResults
} from './fixtures';
import * as reducers from '../../../store/reducers';

global.fetch = require('jest-fetch-mock');

// eslint-disable-next-line import/prefer-default-export
export const history = createBrowserHistory();

const store = createStore(
  connectRouter(history)(combineReducers(reducers)),
  applyMiddleware(thunk, routerMiddleware(history))
);

describe('containers/task/TaskCreateForm', () => {
  it('renders without crashing', () => {
    shallow(<TaskCreateForm noTitle={function() {}} />);
  });

  it('renders both Form View and TaskForm with correct Data', () => {
    const initialData = {
      name: '',
      estimated_time: ESTIMATED_TIME_INT,
      start: moment().format('YYYY-MM-DD'),
      end: moment().format('YYYY-MM-DD'),
      description: '',
      required_expertise: BEGINNER,
      timing_rule: '',
      status: TASK_DRAFT,
      user_submission_target: USER_SUBMISSION_TARGET,
      amount: '',
      taskLocations: [
        {
          start: TASK_LOCATION_START,
          end: TASK_LOCATION_END,
          timing_rule: TASK_LOCATION_TIMING_RULE,
          location: ''
        }
      ]
    };
    const wrapper = shallow(<TaskCreateForm noTitle={function() {}} />).dive();
    expect(wrapper.find(FormView)).toHaveLength(0);
    expect(wrapper.find(TaskForm)).toHaveLength(1);
    const data = wrapper.find(TaskForm).props().initialData;
    expect(data).toEqual(initialData);
  });

  it('onSubmit hander works as expectd', async () => {
    fetch
      .once(JSON.stringify(formlistApiResult), { status: 200 })
      .once(JSON.stringify(resultsFromClientListApi), { status: 200 })
      .once(JSON.stringify(locationlistApi), { status: 200 })
      .once(JSON.stringify(contentTypeApiResults), { status: 200 })
      .once(JSON.stringify(errorReceivedFromApi), { status: 400 });

    store.dispatch({
      clientsById: {
        '1': {
          attributes: {
            created: '2019-09-12T07:58:29.522037+03:00',
            modified: '2019-09-12T07:58:29.522096+03:00',
            name: 'frankline'
          },
          id: '1',
          type: 'Client'
        }
      },
      currentPage: 1,
      pageLinks: {
        first: 'http://127.0.0.1:8000/api/v1/clients/?page=1',
        last: 'http://127.0.0.1:8000/api/v1/clients/?page=1',
        next: null,
        prev: null
      },
      selectOptions: [
        {
          label: 'frankline',
          value: '1'
        }
      ],
      totalCount: 1,
      totalPages: 1,
      type: 'clients.CLIENTS_FETCHED'
    });

    const wrapper = await mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <TaskCreateForm noTitle={function() {}} />
        </ConnectedRouter>
      </Provider>
    );

    const setSubmitting = jest.fn();
    const setErrors = jest.fn();
    const setStatus = jest.fn();

    const values = {
      name: '',
      estimated_time: ESTIMATED_TIME_INT,
      start: moment().format('YYYY-MM-DD'),
      end: moment().format('YYYY-MM-DD'),
      description: '',
      required_expertise: BEGINNER,
      timing_rule: '',
      status: TASK_DRAFT,
      user_submission_target: USER_SUBMISSION_TARGET,
      amount: '',
      taskLocations: [
        {
          start: TASK_LOCATION_START,
          end: TASK_LOCATION_END,
          timing_rule: TASK_LOCATION_TIMING_RULE,
          location: ''
        }
      ]
    };

    await wrapper
      .find('Formik')
      .props()
      .onSubmit(values, { setSubmitting, setErrors, setStatus });

    expect(setErrors.mock.calls).toEqual([
      [
        {
          locations_input: { location: ['This field is required.'] },
          taskLocations: { location: ['This field is required.'] }
        }
      ]
    ]);
    expect(setSubmitting.mock.calls).toEqual([[false]]);
    expect(setStatus).toHaveBeenCalledTimes(0);

    wrapper.unmount();
  });
  it('TaskCreateForm does not crash when you backspace on the select form field', async () => {
    fetch
      .once(JSON.stringify(formlistApiResult), { status: 200 })
      .once(JSON.stringify(resultsFromClientListApi), { status: 200 })
      .once(JSON.stringify(locationlistApi), { status: 200 })
      .once(JSON.stringify(contentTypeApiResults), { status: 200 })
      .once(JSON.stringify(formlistApiResult), { status: 200 });

    store.dispatch({
      clientsById: {
        '1': {
          attributes: {
            created: '2019-09-12T07:58:29.522037+03:00',
            modified: '2019-09-12T07:58:29.522096+03:00',
            name: 'frankline'
          },
          id: '1',
          type: 'Client'
        }
      },
      currentPage: 1,
      pageLinks: {
        first: 'http://127.0.0.1:8000/api/v1/clients/?page=1',
        last: 'http://127.0.0.1:8000/api/v1/clients/?page=1',
        next: null,
        prev: null
      },
      selectOptions: [
        {
          label: 'frankline',
          value: '1'
        }
      ],
      totalCount: 1,
      totalPages: 1,
      type: 'clients.CLIENTS_FETCHED'
    });

    const wrapper = await mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <TaskCreateForm noTitle={function() {}} />
        </ConnectedRouter>
      </Provider>
    );

    const values = { form: [] };
    expect(() =>
      wrapper
        .find('Formik')
        .props()
        .validate(values)
    ).not.toThrow(new TypeError("Cannot read property 'attributes' of undefined"));
  });
});
