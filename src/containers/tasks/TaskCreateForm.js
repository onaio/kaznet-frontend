import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as taskActions from '../../store/tasks/actions';
import TaskForm from './TaskForm';
import FormView from '../../components/FormView';
import * as globalActions from '../../store/global/actions';
import {
  TASK_DRAFT,
  BEGINNER,
  ESTIMATED_TIME_INT,
  TASK_LOCATION_TIMING_RULE,
  TASK_LOCATION_START,
  TASK_LOCATION_END,
  USER_SUBMISSION_TARGET
} from '../../constants';

export class TaskCreateForm extends Component {
  componentDidMount() {
    this.props.noTitle();
  }

  render() {
    const action = taskActions.createTask;
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

    return (
      <FormView
        form={<TaskForm initialData={initialData} action={action} redirectAfterAction="/tasks" />}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      noTitle: globalActions.toggleTitleOff
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(TaskCreateForm);
