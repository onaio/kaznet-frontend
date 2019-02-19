// Test TaskCreation
import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import { TaskCreateForm } from '../TaskCreateForm';
import FormView from '../../../components/FormView';
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
});
