import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import * as taskActions from '../../store/tasks/actions';
import * as taskSelectors from '../../store/tasks/reducer';

export class TaskClone extends Component {
  componentDidMount() {
    this.props.fetchTask(this.props.match.params.id);
  }

  render() {
    this.task = this.props.taskData;
    if (!this.task) return this.renderLoading();
    const payload = {
      data: {
        type: 'Task',
        id: this.task.id
      }
    };
    this.props.cloneTask(payload, this.task.id);
    return <Redirect to="/tasks" />;
  }

  renderLoading() {
    return <p>Cloning Task</p>;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    taskData: taskSelectors.getTaskById(state, ownProps.match.params.id)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchTask: taskActions.fetchTask,
      cloneTask: taskActions.cloneTask
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskClone);
