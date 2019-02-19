import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import * as taskActions from '../../store/tasks/actions';

export class TaskDeletion extends Component {
  componentDidMount() {
    this.props.deleteTask(this.props.match.params.id);
  }

  render() {
    return <Redirect to="/tasks" />;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      deleteTask: taskActions.deleteTask
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(TaskDeletion);
