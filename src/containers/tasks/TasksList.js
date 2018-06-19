import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TasksList.css';
import * as taskActions from '../../store/tasks/actions';
import * as taskSelectors from '../../store/tasks/reducer';
import ListView from '../../components/ListView';

class TasksList extends Component {

  componentDidMount() {
    this.props.dispatch(taskActions.fetchTasks());
  }

  render() {
    if (!this.props.rowsById) return this.renderLoading();
    return (
      <div className="TasksList">
        <ListView
          renderHeaders={this.renderHeaders}
          rowsIdArray={this.props.rowsIdArray}
          rowsById={this.props.rowsById}
          renderRow={this.renderRow} />
      </div>
    );
  }

  renderLoading() {
    return (
      <p>Loading...</p>
    );
  }

  renderHeaders() {
    return (
      [
        <th>Status</th>,
        <th>Name</th>,
        <th>Need Review</th>,
        <th>Created</th>,
        <th>Expires</th>,
        <th>Form</th>,
      ]
    );
  }

  renderRow(row) {
    return (
      [
        <td>{row.attributes.status}</td>,
        <td>{row.attributes.name}</td>,
        <td>{row.attributes.pending_submissions_count} / {row.attributes.submission_count}</td>,
        <td>{row.attributes.created}</td>,
        <td>{row.attributes.end}</td>,
        <td>XFORM GOES HERE</td>
      ]
    );
  }

}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {
    rowsById: taskSelectors.getTasksById(state),
    rowsIdArray: taskSelectors.getTasksIdArray(state)
  };
}

export default connect(mapStateToProps)(TasksList);