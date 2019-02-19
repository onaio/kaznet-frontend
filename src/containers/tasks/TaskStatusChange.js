// TaskStatus Change Component
// Deals with Switching Active Status of a Task
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import qs from 'qs';

import * as taskSelectors from '../../store/tasks/reducer';
import * as taskActions from '../../store/tasks/actions';
import * as errorHandlerSelectors from '../../store/errorHandler/reducer';
import * as globalAction from '../../store/global/actions';
import { TASK_STATUSES } from '../../constants';

export class TaskStatusChange extends Component {
  componentDidMount() {
    this.props.fetchTask(this.props.match.params.id);
  }

  render() {
    this.task = this.props.taskById;
    if (!this.task) return this.renderLoading();
    const currentStatus = this.task.attributes.status;
    const { status } = qs.parse(this.props.location.search.slice(1));

    if (status && TASK_STATUSES.includes(status) && currentStatus !== status) {
      const payload = {
        data: {
          type: 'Task',
          id: this.task.id,
          attributes: {
            status
          }
        }
      };
      this.props.editTask(payload, this.task.id);
    } else {
      // this status is not valid
      console.log('Invalid status');
    }

    // no matter what, redirect back to the task
    return <Redirect to={`/tasks/${this.task.id}`} />;
  }

  renderLoading() {
    if (this.props.hasError) {
      return <p>Task edit failed</p>;
    }
    return <p>Task edit in progress..</p>;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    taskById: taskSelectors.getTaskById(state, ownProps.match.params.id),
    hasError: errorHandlerSelectors.getHasError
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchTask: taskActions.fetchTask,
      noTitle: globalAction.toggleDetailTitleOff,
      editTask: taskActions.editTask
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskStatusChange);
